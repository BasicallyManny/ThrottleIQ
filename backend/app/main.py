from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager
from logging_config import loggerSetup, logger
from app.routes.motoRoutes import motorcycleRoutes
from app.database import init_db, engine
from app.config import CONFIG

loggerSetup()
@asynccontextmanager
async def lifespan(app:FastAPI):
    """Handle application startup and shut down"""
    logger.info("Starting up ThrottleIQ API...")
    try:
        async with engine.connect() as conn: 
            await conn.execute(text("SELECT 1"))
        logger.info("Database Connection verified on startup")
    except Exception as e:
        logger.error(f"Startup DB failed: {e}")
        raise
    
    yield
    
    #on shutdown
    logger.info("Shutting down ThrottleIQ API...")
    await engine.dispose()
    logger.info("Database engine disposed cleanly")
    
app = FastAPI( title="ThrottleIQ API",lifespan=lifespan)
#add CORs
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CONFIG.VITE_URL_BASE_API_DEV],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
#add routes to fastapi app
app.include_router(motorcycleRoutes)

@app.get("/")
async def check_status():
    return {"status":"Online"}

@app.get("/health/db")
async def check_db(db:AsyncSession=Depends(init_db)):
    logger.info ("checking database connection...")
    result = await db.execute(text("SELECT 1"))
    return {"Database": "Connected", "Result":result.scalar()}
        