from fastapi import APIRouter, Request, Response, Form
from typing import Annotated
from app.tools.home import home

router_account = APIRouter()


@router_account.get("/")
async def account_get(request: Request) -> Response:
    html_string = home.get_template("account/index.html").render(request=request)
    return Response(
        content=html_string,
        media_type="text/html",
    )


@router_account.post("/")
async def account_post(email: Annotated[str, Form()]) -> Response:
    return Response(
        content=email,
        media_type="text/html",
    )
