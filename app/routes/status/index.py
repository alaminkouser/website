from fastapi import APIRouter, Request, Response
import app.tools.data
from app.tools.home import home

status_router = APIRouter()


@status_router.get("/")
async def status():
    text = await app.tools.data.data()

    if text == "":
        text = "404"
        html_string = home.get_template("status/index.html").render(status=text)
        return Response(content=html_string, media_type="text/html")
    else:
        html_string = home.get_template("status/index.html").render(status=text)
        return Response(content=html_string, media_type="text/html")
