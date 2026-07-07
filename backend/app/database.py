from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.config import CONFIG



engine = create_async_engine(
    CONFIG.database_url,
    echo=True
)

AsyncSessionLocal= async_sessionmaker(engine, class_= AsyncSession, expire_on_commit=False)
Base=declarative_base()

async def init_db():
    async with AsyncSessionLocal() as session:
        yield session
    