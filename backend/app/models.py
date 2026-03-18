from pydantic import BaseModel
from typing import Optional


class AdminLogin(BaseModel):
    username: str
    password: str


class ClientLogin(BaseModel):
    access_code: str
    password: str


class ClientCreate(BaseModel):
    name: str
    email: Optional[str] = ""
    phone: Optional[str] = ""
    subscription_plan: Optional[str] = "basic"
    subscription_price: Optional[float] = 0
    subscription_status: Optional[str] = "active"
    profit_fees_percent: Optional[float] = 0
    total_investment: Optional[float] = 0
    total_profit: Optional[float] = 0
    daily_profit: Optional[float] = 0
    balance: Optional[float] = 0
    notes: Optional[str] = ""


class ClientUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    subscription_plan: Optional[str] = None
    subscription_price: Optional[float] = None
    subscription_status: Optional[str] = None
    profit_fees_percent: Optional[float] = None
    total_investment: Optional[float] = None
    total_profit: Optional[float] = None
    daily_profit: Optional[float] = None
    balance: Optional[float] = None
    notes: Optional[str] = None
    is_active: Optional[int] = None


class ProfitRecordCreate(BaseModel):
    client_id: int
    amount: float
    description: Optional[str] = ""


class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    message: str


class ChangePassword(BaseModel):
    old_password: str
    new_password: str
