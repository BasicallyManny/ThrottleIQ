from fastapi import APIRouter, Depends
from app.crud import crash_analytics
from app.core.database import init_db
from sqlalchemy.ext.asyncio import AsyncSession


crashStatRouter=APIRouter(prefix="/api/crashStats", tags=["crash stats"])

@crashStatRouter.get("/get_severity_breakdown_by_motorcycle_involved")
async def get_severity_breakdown_by_motorcycle_involved(db: AsyncSession=Depends(init_db)):
    """Endpoint to get motorcycle accident count based on hour of day"""
    return await crash_analytics.get_severity_breakdown_by_motorcycle_involved(db)

@crashStatRouter.get("/get_motorcycle_accident_breakdown_by_hour")
async def get_motorcycle_accident_breakdown_by_hour(db: AsyncSession=Depends(init_db)):
    """Endpoint to get motorcycle accident count based on hour of year"""
    return await crash_analytics.get_motorcycle_accident_breakdown_by_hour(db)

@crashStatRouter.get("/get_motorcycle_accident_breakdown_by_month")
async def get_motorcycle_accident_breakdown_by_month(db: AsyncSession=Depends(init_db)):
    """Endpoint to get motorcycle accident count based on month of year"""
    return await crash_analytics.get_motorcycle_accident_breakdown_by_month(db)

@crashStatRouter.get("/get_motorcycle_fatalitity_breakdown_by_month")
async def get_motorcycle_accident_breakdown_by_month(db: AsyncSession=Depends(init_db)):
    """Endpoint to get motorcycle accident count based on month of year"""
    return await crash_analytics.get_motorcycle_fatalities_per_month(db)