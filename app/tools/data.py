import os
import aiohttp
import json

DATA_URL = os.getenv("DATA_URL", "")
DATA_KEY = os.getenv("DATA_KEY", "")


async def data(put: str | None = None) -> str:
    text = ""
    body = [DATA_KEY]
    if put:
        body.append(put)
    async with aiohttp.ClientSession() as session:
        async with session.post(
            DATA_URL, data=json.dumps(body), allow_redirects=True
        ) as response:
            if response.status == 200:
                text = await response.text()

    return text
