import os
from redis import asyncio as redis

redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", ""),
    port=int(os.getenv("REDIS_PORT", 1024)),
    decode_responses=True,
    username=os.getenv("REDIS_USERNAME", ""),
    password=os.getenv("REDIS_PASSWORD", ""),
)
