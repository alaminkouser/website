from fastapi import Request
import os
from fastapi import APIRouter, Response, Body
from app.tools.home import home
import sshsig
from app.tools.redis_client import redis_client

status_router = APIRouter()


@status_router.get("/")
async def status_get(request: Request):
    status = await redis_client.get("status")
    html_string = home.get_template("status/index.html").render(
        status=status, request=request
    )
    return Response(
        content=html_string,
        media_type="text/html",
        headers={"Cache-Control": "max-age=60, immutable"},
    )


@status_router.put("/")
async def status_put(body: str = Body(...)) -> bool:
    message = body.split("\n")[0]
    signature = "\n".join(body.split("\n")[1:])
    try:
        public_key = sshsig.check_signature(message, signature, namespace="file")
        if str(public_key) != os.getenv("SSH_PUBLIC_KEY", ""):
            return False
    except:
        return False
    await redis_client.set("status", message)
    return True
