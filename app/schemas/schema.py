from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from enum import Enum

class GenderEnum(str, Enum):
    male = "male"
    female = "female"
    other = "other"

class RoleEnum(str, Enum):
    student = "student"
    admin = "admin"

class StudentCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    username: str
    gender: GenderEnum
    department: str
    password: str
    confirm_password: str

class AdminCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    username: str
    gender: GenderEnum
    university_token: str
    password: str
    confirm_password: str

class Login(BaseModel):
    username: str
    password: str

class StudentUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[EmailStr]
    username: Optional[str]
    gender: Optional[GenderEnum]
    department: Optional[str]
    password: Optional[str]

class StudentOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str
    gender: Optional[GenderEnum]
    department: Optional[str]
    role: RoleEnum

    model_config = {
        "from_attributes": True
    }