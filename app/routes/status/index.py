from fastapi import APIRouter, Request, Response
from app.tools.data import data
from app.tools.home import home

status_router = APIRouter()


@status_router.get("/")
async def status():
    text = await data()

    if text == "":
        text = "404"
        html_string = home.get_template("status/index.html").render(status=text)
        return Response(content=html_string, media_type="text/html")
    else:
        html_string = home.get_template("status/index.html").render(status=text)
        return Response(content=html_string, media_type="text/html")
