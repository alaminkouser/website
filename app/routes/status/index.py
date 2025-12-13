from fastapi import APIRouter, Request, Response
import os
import aiohttp
import json
from app.tools.home import home

status_router = APIRouter()


@status_router.get("/")
async def status():
    DATA_URL = os.getenv("DATA_URL")
    DATA_KEY = os.getenv("DATA_KEY")

    async with aiohttp.ClientSession() as session:
        async with session.post(
            DATA_URL, data=json.dumps([DATA_KEY]), allow_redirects=True
        ) as response:
            if response.status == 200:
                text = await response.text()
                if text == "":
                    text = "404"
                html_string = home.get_template("status/index.html").render(status=text)
                return Response(content=html_string, media_type="text/html")
            else:
                html_string = home.get_template("status/index.html").render(
                    status="404"
                )
                return Response(content=html_string, media_type="text/html")
