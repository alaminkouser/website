from fastapi import FastAPI, Request
from .tools.query_parameter_removal_middleware import QueryParameterRemovalMiddleware
from .tools.minify_middleware import MinifyMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import Response
from fastapi import status

from app.tools.home import home
from .routes.status.index import status_router
from .routes.page import page_router

app = FastAPI(title="AL AMIN KOUSER", docs_url=None, redoc_url=None, openapi_url=None)


app.add_middleware(QueryParameterRemovalMiddleware)

app.add_middleware(MinifyMiddleware)

app.add_middleware(GZipMiddleware, minimum_size=0, compresslevel=9)

app.include_router(
    status_router, prefix="/status", tags=["status"], include_in_schema=False
)

app.include_router(page_router, prefix="", tags=["page"], include_in_schema=False)


@app.exception_handler(RequestValidationError)
async def request_validation_exception_handler(
    request: Request, exc: RequestValidationError
):
    reason = None
    for error in exc.errors():
        if "ctx" in error and "reason" in error["ctx"]:
            reason = error["ctx"]["reason"]
            break
    error_html = home.get_template("error/index.html").render(
        request=request, reason=reason
    )
    return Response(
        content=error_html,
        media_type="text/html",
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
    )
