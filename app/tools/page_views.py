from fastapi import Request
from firebase_admin import firestore_async
from app.tools.firebase import db
from asyncio import sleep


async def page_views(request: Request) -> None:
    print("START")
    await sleep(3)
    await db.collection("page_views").add(
        {
            "created_at": firestore_async.SERVER_TIMESTAMP,
            "path": request.url.path,
            "ip": request.client.host,
            "referer": request.headers.get("referer"),
            "user_agent": request.headers.get("user-agent"),
        }
    )
    print("END")
