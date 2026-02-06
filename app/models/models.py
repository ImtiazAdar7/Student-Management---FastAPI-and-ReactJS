from sqlalchemy import Column, Integer, String, Enum
from app.db.database import Base
import enum

class GenderEnum(str, enum.Enum):
    male = "male"
    female = "female"
    other = "other"

class RoleEnum(str, enum.Enum):
    student = "student"
    admin = "admin"

class User(Base):
    __tablename__ = "students__"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=True)
    gender = Column(Enum(GenderEnum), nullable=True)
    password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.student)