from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import RedirectResponse
from fastapi import status


class QueryParameterRemovalMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        if request.url.query and not request.url.path.startswith("/docs/pagefind"):
            return RedirectResponse(
                url=str(request.url.replace(query=None)),
                status_code=status.HTTP_307_TEMPORARY_REDIRECT,
            )

        return await call_next(request)
