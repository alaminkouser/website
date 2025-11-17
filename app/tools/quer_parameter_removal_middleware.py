from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import RedirectResponse


class QueryParameterRemovalMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        if request.url.query:
            return RedirectResponse(
                url=str(request.url.replace(query=None)),
                status_code=307
            )
        
        return await call_next(request)