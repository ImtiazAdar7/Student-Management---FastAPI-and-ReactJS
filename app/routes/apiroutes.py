from fastapi import APIRouter, HTTPException, status, Query, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
from app.auth import auth, dependency
from app.models import models
from app.services import services
from app.schemas import schema

router = APIRouter(prefix="/api", tags=["Student and Admin API"])

# -------------------------
# Registration & Login
# -------------------------
@router.post("/register/student", response_model=schema.StudentOut)
async def register_student(student: schema.StudentCreate, db: AsyncSession = Depends(dependency.get_db)):
    return await services.create_student(db, student)

@router.post("/register/admin", response_model=schema.StudentOut)
async def register_admin(admin: schema.AdminCreate, db: AsyncSession = Depends(dependency.get_db)):
    return await services.create_admin(db, admin)

@router.post("/login")
async def login(user: schema.Login, db: AsyncSession = Depends(dependency.get_db)):
    db_user = await services.authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = auth.create_access_token({"user_id": db_user.id})
    refresh_token = auth.create_refresh_token({"user_id": db_user.id})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

# -------------------------
# Student Profile
# -------------------------
@router.get("/me", response_model=schema.StudentOut)
def read_own_profile(current_user: models.User = Depends(dependency.get_current_user)):
    return current_user

@router.put("/me", response_model=schema.StudentOut)
async def update_own_profile(updates: schema.StudentUpdate, db: AsyncSession = Depends(dependency.get_db),
                       current_user: models.User = Depends(dependency.get_current_user)):
    return await services.update_user(db, current_user.id, updates)

# -------------------------
# Admin Student CRUD
# -------------------------
@router.get("/students", response_model=List[schema.StudentOut])
async def get_students(page: int = Query(1, ge=1), size: int = Query(10, ge=1), db: AsyncSession = Depends(dependency.get_db),
                 current_user: models.User = Depends(dependency.admin_required)):
    skip = (page - 1) * size
    return await services.get_user_list(db, skip=skip, limit=size)

@router.get("/students/{student_id}", response_model=schema.StudentOut)
async def get_student(student_id: int, db: AsyncSession = Depends(dependency.get_db),
                current_user: models.User = Depends(dependency.admin_required)):
    student = await services.get_student_only(db, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.put("/students/{student_id}", response_model=schema.StudentOut)
async def update_student(student_id: int, updates: schema.StudentUpdate, db: AsyncSession = Depends(dependency.get_db),
                   current_user: models.User = Depends(dependency.admin_required)):
    return await services.update_student_only(db, student_id, updates)

@router.delete("/students/{student_id}")
async def delete_student(student_id: int, db: AsyncSession = Depends(dependency.get_db),
                   current_user: models.User = Depends(dependency.admin_required)):
    return await services.delete_student_only(db, student_id)