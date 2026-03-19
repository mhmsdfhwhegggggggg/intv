from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from app.database import get_db, init_db
from app.auth import (
    hash_password, verify_password, create_access_token,
    get_admin_user, get_client_user, generate_access_code, generate_password
)
from app.models import (
    AdminLogin, ClientLogin, ClientCreate, ClientUpdate,
    ProfitRecordCreate, ContactMessageCreate, ChangePassword
)
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


# ==================== ADMIN AUTH ====================

@app.post("/api/admin/login")
async def admin_login(data: AdminLogin):
    with get_db() as conn:
        admin = conn.execute(
            "SELECT * FROM admins WHERE username = ?", (data.username,)
        ).fetchone()
        if not admin or not verify_password(data.password, admin["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        token = create_access_token({"sub": str(admin["id"]), "role": "admin", "username": admin["username"]})
        return {"token": token, "username": admin["username"]}


@app.post("/api/admin/change-password")
async def admin_change_password(data: ChangePassword, admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        admin_row = conn.execute(
            "SELECT * FROM admins WHERE id = ?", (int(admin["sub"]),)
        ).fetchone()
        if not admin_row or not verify_password(data.old_password, admin_row["password_hash"]):
            raise HTTPException(status_code=400, detail="Current password is incorrect")
        conn.execute(
            "UPDATE admins SET password_hash = ? WHERE id = ?",
            (hash_password(data.new_password), int(admin["sub"]))
        )
        return {"message": "Password updated successfully"}


# ==================== CLIENT AUTH ====================

@app.post("/api/client/login")
async def client_login(data: ClientLogin):
    with get_db() as conn:
        client = conn.execute(
            "SELECT * FROM clients WHERE access_code = ?", (data.access_code,)
        ).fetchone()
        if not client or not verify_password(data.password, client["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid access code or password")
        if not client["is_active"]:
            raise HTTPException(status_code=403, detail="Account is deactivated")
        token = create_access_token({"sub": str(client["id"]), "role": "client", "name": client["name"]})
        return {"token": token, "name": client["name"], "client_id": client["id"]}


# ==================== ADMIN: CLIENT MANAGEMENT ====================

@app.get("/api/admin/clients")
async def get_all_clients(admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        clients = conn.execute("SELECT * FROM clients ORDER BY created_at DESC").fetchall()
        return [dict(c) for c in clients]


@app.get("/api/admin/clients/{client_id}")
async def get_client(client_id: int, admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        client = conn.execute("SELECT * FROM clients WHERE id = ?", (client_id,)).fetchone()
        if not client:
            raise HTTPException(status_code=404, detail="Client not found")
        return dict(client)


@app.post("/api/admin/clients")
async def create_client(data: ClientCreate, admin: dict = Depends(get_admin_user)):
    access_code = generate_access_code()
    raw_password = generate_password()
    password_hash = hash_password(raw_password)
    with get_db() as conn:
        cursor = conn.execute(
            """INSERT INTO clients (name, email, phone, access_code, password_hash,
               subscription_plan, subscription_price, subscription_status,
               profit_fees_percent, total_investment, total_profit, daily_profit, balance, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (data.name, data.email, data.phone, access_code, password_hash,
             data.subscription_plan, data.subscription_price, data.subscription_status,
             data.profit_fees_percent, data.total_investment, data.total_profit,
             data.daily_profit, data.balance, data.notes)
        )
        client_id = cursor.lastrowid
        return {
            "id": client_id,
            "access_code": access_code,
            "password": raw_password,
            "message": "Client created successfully"
        }


@app.put("/api/admin/clients/{client_id}")
async def update_client(client_id: int, data: ClientUpdate, admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        existing = conn.execute("SELECT * FROM clients WHERE id = ?", (client_id,)).fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail="Client not found")

        updates = {}
        for field, value in data.model_dump(exclude_unset=True).items():
            if value is not None:
                updates[field] = value

        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")

        set_clause = ", ".join(f"{k} = ?" for k in updates.keys())
        values = list(updates.values())
        values.append(client_id)
        conn.execute(
            f"UPDATE clients SET {set_clause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            values
        )
        return {"message": "Client updated successfully"}


@app.delete("/api/admin/clients/{client_id}")
async def delete_client(client_id: int, admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        existing = conn.execute("SELECT * FROM clients WHERE id = ?", (client_id,)).fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail="Client not found")
        conn.execute("DELETE FROM clients WHERE id = ?", (client_id,))
        return {"message": "Client deleted successfully"}


@app.post("/api/admin/clients/{client_id}/reset-password")
async def reset_client_password(client_id: int, admin: dict = Depends(get_admin_user)):
    raw_password = generate_password()
    password_hash = hash_password(raw_password)
    with get_db() as conn:
        existing = conn.execute("SELECT * FROM clients WHERE id = ?", (client_id,)).fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail="Client not found")
        conn.execute(
            "UPDATE clients SET password_hash = ? WHERE id = ?",
            (password_hash, client_id)
        )
        return {
            "access_code": existing["access_code"],
            "new_password": raw_password,
            "message": "Password reset successfully"
        }


# ==================== ADMIN: PROFIT RECORDS ====================

@app.get("/api/admin/profits")
async def get_all_profits(admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        profits = conn.execute("""
            SELECT pr.*, c.name as client_name
            FROM profit_records pr
            JOIN clients c ON pr.client_id = c.id
            ORDER BY pr.date DESC
        """).fetchall()
        return [dict(p) for p in profits]


@app.get("/api/admin/clients/{client_id}/profits")
async def get_client_profits(client_id: int, admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        profits = conn.execute(
            "SELECT * FROM profit_records WHERE client_id = ? ORDER BY date DESC",
            (client_id,)
        ).fetchall()
        return [dict(p) for p in profits]


@app.post("/api/admin/profits")
async def add_profit_record(data: ProfitRecordCreate, admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        client = conn.execute("SELECT * FROM clients WHERE id = ?", (data.client_id,)).fetchone()
        if not client:
            raise HTTPException(status_code=404, detail="Client not found")
        conn.execute(
            "INSERT INTO profit_records (client_id, amount, description) VALUES (?, ?, ?)",
            (data.client_id, data.amount, data.description)
        )
        new_total = client["total_profit"] + data.amount
        new_balance = client["balance"] + data.amount
        conn.execute(
            "UPDATE clients SET total_profit = ?, balance = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (new_total, new_balance, data.client_id)
        )
        return {"message": "Profit record added successfully"}


@app.delete("/api/admin/profits/{profit_id}")
async def delete_profit_record(profit_id: int, admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        profit = conn.execute("SELECT * FROM profit_records WHERE id = ?", (profit_id,)).fetchone()
        if not profit:
            raise HTTPException(status_code=404, detail="Profit record not found")
        client = conn.execute("SELECT * FROM clients WHERE id = ?", (profit["client_id"],)).fetchone()
        if client:
            new_total = client["total_profit"] - profit["amount"]
            new_balance = client["balance"] - profit["amount"]
            conn.execute(
                "UPDATE clients SET total_profit = ?, balance = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                (new_total, new_balance, profit["client_id"])
            )
        conn.execute("DELETE FROM profit_records WHERE id = ?", (profit_id,))
        return {"message": "Profit record deleted successfully"}


# ==================== ADMIN: CONTACT MESSAGES ====================

@app.get("/api/admin/messages")
async def get_messages(admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        messages = conn.execute(
            "SELECT * FROM contact_messages ORDER BY created_at DESC"
        ).fetchall()
        return [dict(m) for m in messages]


@app.put("/api/admin/messages/{message_id}/read")
async def mark_message_read(message_id: int, admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        conn.execute(
            "UPDATE contact_messages SET is_read = 1 WHERE id = ?", (message_id,)
        )
        return {"message": "Marked as read"}


@app.delete("/api/admin/messages/{message_id}")
async def delete_message(message_id: int, admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        conn.execute("DELETE FROM contact_messages WHERE id = ?", (message_id,))
        return {"message": "Message deleted"}


# ==================== ADMIN: DASHBOARD STATS ====================

@app.get("/api/admin/stats")
async def get_dashboard_stats(admin: dict = Depends(get_admin_user)):
    with get_db() as conn:
        total_clients = conn.execute("SELECT COUNT(*) as count FROM clients").fetchone()["count"]
        active_clients = conn.execute(
            "SELECT COUNT(*) as count FROM clients WHERE subscription_status = 'active'"
        ).fetchone()["count"]
        total_investment = conn.execute(
            "SELECT COALESCE(SUM(total_investment), 0) as total FROM clients"
        ).fetchone()["total"]
        total_profits = conn.execute(
            "SELECT COALESCE(SUM(total_profit), 0) as total FROM clients"
        ).fetchone()["total"]
        unread_messages = conn.execute(
            "SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0"
        ).fetchone()["count"]
        return {
            "total_clients": total_clients,
            "active_clients": active_clients,
            "total_investment": total_investment,
            "total_profits": total_profits,
            "unread_messages": unread_messages
        }


# ==================== CLIENT PORTAL ====================

@app.get("/api/client/profile")
async def get_client_profile(client: dict = Depends(get_client_user)):
    with get_db() as conn:
        client_data = conn.execute(
            "SELECT id, name, email, phone, subscription_plan, subscription_price, "
            "subscription_status, profit_fees_percent, total_investment, total_profit, "
            "daily_profit, balance, join_date FROM clients WHERE id = ?",
            (int(client["sub"]),)
        ).fetchone()
        if not client_data:
            raise HTTPException(status_code=404, detail="Client not found")
        return dict(client_data)


@app.get("/api/client/profits")
async def get_my_profits(client: dict = Depends(get_client_user)):
    with get_db() as conn:
        profits = conn.execute(
            "SELECT id, amount, description, date FROM profit_records WHERE client_id = ? ORDER BY date DESC",
            (int(client["sub"]),)
        ).fetchall()
        return [dict(p) for p in profits]


# ==================== PUBLIC: CONTACT ====================

@app.post("/api/contact")
async def submit_contact(data: ContactMessageCreate):
    with get_db() as conn:
        conn.execute(
            "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)",
            (data.name, data.email, data.phone, data.message)
        )
        return {"message": "Message sent successfully"}
