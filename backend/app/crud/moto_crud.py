from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from app.models import Motorcycle
from app.utils.parser import parse_specs

from logging_config import loggerSetup, logger

loggerSetup()
async def get_motorcycle(db:AsyncSession,make:str,year:str,model:str):
    """Get motorycle from postgres"""
    stmt=select(Motorcycle).where(
        Motorcycle.make.ilike(make),
        Motorcycle.year.ilike(year),
        Motorcycle.model.ilike(f"%{model}%")
    )
    
    #try to run the sql statement
    try:
        result = await db.execute(stmt)
        logger.info("successfully fetched from database")
        
        return result.scalar_one_or_none()
    
    except SQLAlchemyError as e:
        await db.rollback()
        logger.error(f"SQL Query failed: {e}")
    
async def get_or_create_motorcycle(db:AsyncSession, item:dict):
    """Check if the motorcycle already"""
    #gather elements from item
    make=item["make"].strip()
    model=item["model"].strip()
    year=item["year"].strip()
    #check if the spec is already saved in postgres
    existing = await get_motorcycle(db=db,make=make,year=year,model=model)
    #if its already saved just return the existing value. If it doesnt exist  add it to postgres
    #The purpose of this is to limit the amount of api calls to api ninja and to build our own database
    if existing:
        return existing
    #if it doesnt exist
    #create new motorcycle record
    parsed=parse_specs(item)
    
    new_record=Motorcycle(
        make=make,
        model=model,
        year=year,
        raw_specs=item,
        weight_kg=parsed["weight_kg"],
        torque_nm=parsed["torque_nm"],
        horsepower=parsed["horsepower"]
    )
    #try to add new_record to postgres
    try:
        #add to sqlalchemy session
        db.add(new_record)
        #insert new record to database
        await db.commit()
        await db.refresh(new_record)
        return new_record
    #handle duplicate inserts
    except IntegrityError:
        await db.rollback()
        return await get_motorcycle(
            db=db,
            model=model,
            year=year,
            make=make
        )
    except SQLAlchemyError as e:
        #undo failed insertion so session can be resued
        await db.rollback()
        logger.error(f"Failed to insert to database {e}")
        return None
    
    