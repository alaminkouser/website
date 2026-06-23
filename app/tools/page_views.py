from fastapi import Request
from google.cloud.firestore import SERVER_TIMESTAMP
from app.tools.firebase import db


async def page_views(request: Request) -> None:
    await db.collection("page_views").add(
        {
            "created_at": SERVER_TIMESTAMP,
            "path": request.url.path,
            "ip": request.client.host if request.client else "0.0.0.0",
            "referer": request.headers.get("referer"),
            "user_agent": request.headers.get("user-agent"),
        }
    )
