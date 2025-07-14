from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import logging

from app.db import connect_to_mongo, close_mongo_connection
from app.routes.login import router as login_router
from app.routes.users import router as user_router
from app.routes.devices import router as device_router
from app.routes.variables import router as varible_router
from app.routes.webhook import router as webhook_router
from app.emqx_api import router as emqx_api_router, init_emqx_resources
from app.routes.alarms import router as alarms_router



logging.basicConfig(level=logging.INFO)

app = FastAPI()


app.include_router(login_router)
app.include_router(user_router)
app.include_router(device_router)
app.include_router(varible_router)
app.include_router(webhook_router)
app.include_router(emqx_api_router)
app.include_router(alarms_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Para permitir cualquier origen (puedes restringir luego)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()
    await init_emqx_resources()
  

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

@app.get("/")
def home():
    return {"message": "API funcionando correctamente"}


from fastapi.staticfiles import StaticFiles
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
