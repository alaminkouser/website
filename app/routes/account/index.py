from fastapi import APIRouter

router_account = APIRouter()


@router_account.get("/")
async def account_get():
    return "ACCOUNT ROOT"
