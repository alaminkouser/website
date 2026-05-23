from typing import Callable, Awaitable
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import RedirectResponse, Response
from fastapi import status


class QueryParameterRemovalMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self, request: Request, call_next: Callable[[Request], Awaitable[Response]]
    ) -> Response:
        if request.url.query and not request.url.path.startswith("/docs/pagefind"):
            return RedirectResponse(
                url=str(request.url.replace(query=None)),
                status_code=status.HTTP_307_TEMPORARY_REDIRECT,
            )

        return await call_next(request)
