import sqlite3
import os
from contextlib import contextmanager

# Use /data for persistent storage in production, local for dev
DB_PATH = os.environ.get("DATABASE_PATH", "/data/app.db") if os.path.exists("/data") else "app.db"


def get_db_path():
    return DB_PATH


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


@contextmanager
def get_db():
    conn = get_connection()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    """Initialize database tables and default admin."""
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS admins (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                access_code TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                subscription_plan TEXT DEFAULT 'basic',
                subscription_price REAL DEFAULT 0,
                subscription_status TEXT DEFAULT 'active',
                profit_fees_percent REAL DEFAULT 0,
                total_investment REAL DEFAULT 0,
                total_profit REAL DEFAULT 0,
                daily_profit REAL DEFAULT 0,
                balance REAL DEFAULT 0,
                join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                notes TEXT DEFAULT '',
                is_active INTEGER DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS profit_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                client_id INTEGER NOT NULL,
                amount REAL NOT NULL,
                description TEXT DEFAULT '',
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
            )
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT DEFAULT '',
                message TEXT NOT NULL,
                is_read INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.execute("""
            CREATE TABLE IF NOT EXISTS subscription_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                country TEXT NOT NULL,
                phone TEXT NOT NULL,
                account_wallet TEXT NOT NULL,
                plan_name TEXT NOT NULL,
                notes TEXT DEFAULT '',
                status TEXT DEFAULT 'pending', -- pending, approved, rejected
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS site_settings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT UNIQUE NOT NULL,
                value TEXT NOT NULL
            )
        """)

        # Default settings
        conn.execute("INSERT OR IGNORE INTO site_settings (key, value) VALUES ('telegram_url', 'https://T.me/PU_M_P_O')")
        conn.execute("INSERT OR IGNORE INTO site_settings (key, value) VALUES ('support_email', 'support@investcorp-capital.com')")
        conn.execute("INSERT OR IGNORE INTO site_settings (key, value) VALUES ('support_phone', '+966 50 000 0000')")

        # Create default admin if not exists
        from app.auth import hash_password
        existing = conn.execute("SELECT id FROM admins WHERE username = 'admin'").fetchone()
        if not existing:
            conn.execute(
                "INSERT INTO admins (username, password_hash) VALUES (?, ?)",
                ("admin", hash_password("admin123"))
            )
