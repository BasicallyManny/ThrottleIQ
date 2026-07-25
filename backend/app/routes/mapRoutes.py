from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import init_db
from app.crud.map_data import getMotoAccidentLocations

mapDataRouter=APIRouter(prefix="/api/crashStats", tags=["Map Data"])

@mapDataRouter.get(
    "/get_accident_locations",
    summary="Returns all motorcycle crash locations, plus the fatal subset, in a single response",
)
async def getAccidentLocations(db:AsyncSession = Depends(init_db)):
    """Endpoint to get motorcycle crash locations and fatal motorcycle crash locations"""

    return await getMotoAccidentLocations(db)

