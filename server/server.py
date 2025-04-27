import requests
from webpush import WebPush, WebPushSubscription, WebPushException
from pathlib import Path
import aiohttp
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost",
    "https://localhost",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:4173",
    "http://127.0.0.1",
    "https://127.0.0.1"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

wp = WebPush(
    private_key=Path(".env/webpush-keys/private_key.pem"),
    public_key=Path(".env/webpush-keys/public_key.pem"),
    subscriber="emil@aarestrup.nu"
)

application_server_key = Path(".env/webpush-keys/applicationServerKey").read_text().strip()

@app.get("/notification/key")
async def get_public_key() -> JSONResponse:
    return JSONResponse(content={"public_key": application_server_key})

@app.post("/notification/subscribe")
async def subscribe(subscription: WebPushSubscription) -> JSONResponse:
    message = wp.get(message="Hello World", subscription=subscription)
    async with aiohttp.ClientSession() as session:
        await session.post(
            url=str(subscription.endpoint),
            data=message.encrypted,
            headers=message.headers
        )
    return JSONResponse(content={"status": "ok"})