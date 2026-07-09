from fastapi import FastAPI, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import init_db, engine
from contextlib import asynccontextmanager
from logging_config import loggerSetup, logger
from app.routes.motoRoutes import motorcycleRoutes



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
        