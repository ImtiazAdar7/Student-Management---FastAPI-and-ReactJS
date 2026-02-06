import os

from sqlalchemy.ext.asyncio import AsyncSession
from app.models import models
from app.schemas import schema
from app.auth import auth
from fastapi import HTTPException, Depends
from sqlalchemy import select

async def create_student(db: AsyncSession, student: schema.StudentCreate):
    if student.password != student.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    hashed_password = auth.hash_password(student.password)
    db_student = models.User(
        first_name=student.first_name,
        last_name=student.last_name,
        email=student.email,
        username=student.username,
        gender=student.gender,
        department=student.department,
        password=hashed_password,
        role=models.RoleEnum.student
    )
    db.add(db_student)
    await db.commit()
    await db.refresh(db_student)
    return db_student

async def create_admin(db: AsyncSession, admin: schema.AdminCreate):
    if admin.password != admin.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    if admin.university_token != os.getenv("UNIVERSITY_TOKEN"):
        raise HTTPException(status_code=403, detail="Invalid university token")
    hashed_password = auth.hash_password(admin.password)
    db_admin = models.User(
        first_name=admin.first_name,
        last_name=admin.last_name,
        email=admin.email,
        username=admin.username,
        gender=admin.gender,
        password=hashed_password,
        role=models.RoleEnum.admin
    )
    db.add(db_admin)
    await db.commit()
    await db.refresh(db_admin)
    return db_admin

async def authenticate_user(db: AsyncSession, username: str, password: str):
    user = await db.execute(select(models.User).where(models.User.username == username))
    result = user.scalar_one_or_none()
    if not result or not auth.verify_password(password, result.password):
        return None
    return result

async def get_user(db: AsyncSession, user_id: int):
    user = await db.execute(select(models.User).where(models.User.id == user_id))
    result = user.scalar_one_or_none()
    return result

async def get_student_only(db: AsyncSession, user_id: int):
    result = await db.execute(
        select(models.User).where(models.User.id == user_id,
            models.User.role == models.RoleEnum.student
        )
    )
    return result.scalar_one_or_none()


async def get_user_list(db: AsyncSession, skip: int = 0, limit: int = 10):
    res = await db.execute(
        select(models.User)
        .where(models.User.role == models.RoleEnum.student)
        .offset(skip)
        .limit(limit)
    )
    result = res.scalars().all()
    return result

async def update_student_only(
    db: AsyncSession,
    student_id: int,
    updates: schema.StudentUpdate
):
    student = await get_student_only(db, student_id)

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    data = updates.dict(exclude_unset=True)

    if "password" in data:
        data["password"] = auth.hash_password(data["password"])

    for key, value in data.items():
        setattr(student, key, value)

    await db.commit()
    await db.refresh(student)
    return student


async def update_user(db: AsyncSession, user_id: int, updates: schema.StudentUpdate):
    user = await get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    data = updates.dict(exclude_unset=True)
    if 'password' in data:
        data["password"] = auth.hash_password(data["password"])
    for key, value in data.items():
        setattr(user, key, value)
    await db.commit()
    await db.refresh(user)
    return user

async def delete_user(db: AsyncSession, user_id: int):
    user = await get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await db.delete(user)
    await db.commit()
    return {"detail": "User deleted"}

async def delete_student_only(db: AsyncSession, student_id: int):
    student = await get_student_only(db, student_id)

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    await db.delete(student)
    await db.commit()
