import os
from fastapi import APIRouter, Request, status, BackgroundTasks
from fastapi.responses import FileResponse, Response
from app.tools.home import home
from app.tools.page_views import page_views

page_router = APIRouter()

CACHE_CONTROL_HEADER_1M = {"Cache-Control": "max-age=60, immutable"}
CACHE_CONTROL_HEADER_1H = {"Cache-Control": "public, max-age=3600, immutable"}


@page_router.get("{path:path}")
def page(request: Request, path: str, background_tasks: BackgroundTasks):
    def not_found(request: Request):
        html_string = home.get_template("templates/404.html").render(request=request)
        return Response(
            content=html_string,
            media_type="text/html",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    if path.startswith("/templates/"):
        return not_found(request)

    if (
        path.endswith("/")
        and os.path.exists(f"app/home{path}index.html")
        and os.path.isfile(f"app/home{path}index.html")
    ):
        background_tasks.add_task(page_views, request)
        html_string = home.get_template(f"{path}index.html").render(request=request)
        return Response(
            content=html_string, media_type="text/html", headers=CACHE_CONTROL_HEADER_1M
        )

    if (
        not path.endswith(".html")
        and os.path.exists(f"app/home{path}")
        and os.path.isfile(f"app/home{path}")
    ):
        return FileResponse(
            f"app/home{path}",
            headers=(CACHE_CONTROL_HEADER_1H),
        )

    return not_found(request)
