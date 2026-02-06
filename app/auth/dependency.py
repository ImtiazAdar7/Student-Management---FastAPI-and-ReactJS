from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.models import models
from app.auth import auth
from sqlalchemy import select

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    try:
        payload = auth.decode_token(token)
        user = await db.execute(select(models.User).where(models.User.id==payload.get("user_id")))
        result = user.scalar_one_or_none()
        if not result:
            raise HTTPException(status_code=404, detail="User not found")
        return result
    except Exception:
        raise HTTPException(status_code=404, detail="Invalid token")

async def admin_required(current_user: models.User = Depends(get_current_user)):
    if current_user.role != models.RoleEnum.admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return current_user