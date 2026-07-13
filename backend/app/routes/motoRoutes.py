from fastapi import APIRouter, HTTPException, Query, Depends
from logging_config import logger
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.moto_crud import get_or_create_motorcycle, get_motorcycle
from app.services.api_ninjas import fetch_moto_specs
from app.database import init_db

motorcycleRoutes=APIRouter(prefix="/api/motorcycles", tags=["motorcycles"])

@motorcycleRoutes.get("/lookup_motorcycle")
async def lookup_motorcycle(
    make:str = Query(...),
    model:str=Query(...),
    year:str=Query(...),
    db: AsyncSession = Depends(init_db),
):
    makeValue=make.strip()
    modelValue=model.strip()
    yearValue=year.strip()
    
    #check if the data is already in the database. If the data is in the database pull the value directly from it
    cached = await get_motorcycle(db=db,make=makeValue,model=modelValue,year=yearValue)
    #if already cahced return it directly
    if cached:
            logger.info(f"Cache hit: {yearValue} {makeValue} {modelValue}")
            return cached
    else:
        #if not cached make the api call
        api_data = await fetch_moto_specs(make=makeValue,year=yearValue,model=modelValue)
    
        if not api_data:
            raise HTTPException(status_code=404, detail="Motorcycle not found in Ninja DB")
        #add and return the fetched data to the database
        try:
            record= await get_or_create_motorcycle(db,item=api_data[0])
        except ValueError as e:
            logger.warning(f"Malformed record from API Ninjas: {e}")
            raise HTTPException(status_code=502, detail="Received invalid data from upstream API")
    
        return record
        
    
    