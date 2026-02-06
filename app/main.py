from contextlib import asynccontextmanager
from app.db.database import engine, Base
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from app.routes.apiroutes import router

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(lifespan=lifespan, title='STUDENT MANAGEMENT', description='It is a student management project using FastAPI. There are two roles. One is student, and another one is admin. Admin can login, register(using the university token), see student list, a particular student, update and delete a student himself. '
                                                                         'Students can register and login, see their profile, update their profiles. JWT'
                                                                         ' authentication is used here. Admin and Student both need JWT authentication. There will be a refresh token as well which will save their time to get back into their respective profiles again with a newly generated access token.',
               version='1.0', contact={
        "name": "Imtiaz Adar",
        "email": "imtiazadarofficial@gmail.com",
        "url": "https://tinyurl.com/Portfolio1Imtiaz",
    })
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.include_router(router)