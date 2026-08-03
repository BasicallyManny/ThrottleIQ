#shared pytest fixtures
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from app.core.config import CONFIG
from app.main import app
from app.core.database import Base, init_db
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

Database_URL=CONFIG.database_url
test_engine= create_async_engine(Database_URL)
TestSessionLocal= async_sessionmaker(bind=test_engine, expire_on_commit=False)

#create db connectionion fixture
@pytest_asyncio.fixture
async def db_session():
    """
    Creates all tables fresh before each test and drops them afterward
    """
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with TestSessionLocal() as session:
        yield session
        
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        
@pytest_asyncio.fixture
async def client(db_session):
    """Tell fast api to hit the test session instead of the real database session"""
    async def override_get_db():
        yield db_session
        
    app.dependency_overrides[init_db] = override_get_db()
    
    #hit Fastapi endpoints without starting a real server on a real port
    transport = ASGITransport(app=app)
    
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
        
    app.dependency_overrides.clear()