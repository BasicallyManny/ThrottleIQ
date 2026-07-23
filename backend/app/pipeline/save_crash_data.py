"""Save crash data to postgress"""
from datetime import datetime, time
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker

from typing import cast
import pandas as pd
import argparse
from app.core.config import CONFIG
from app.models import Crash, SeverityEnum,CrashVechicle
from app.core.logging_config import logger,loggerSetup

loggerSetup()

def sync_database():
    """Sync engine to postgres"""
    #swap postgress url from async to the synced one. The script runs sync to thread
    sync_url=CONFIG.database_url.replace("postgresql+asyncpg://", "postgresql+psycopg://")
    return create_engine(sync_url)

def row_to_datetime(row: pd.Series) -> datetime | None:
    crash_date = cast(pd.Timestamp | None, row.get("crash_date"))
    crash_time = cast(time | None, row.get("crash_time"))

    if crash_date is None or crash_time is None:
        return None

    if pd.isnull(crash_date) or pd.isnull(crash_time):
        return None

    return datetime.combine(crash_date.date(), crash_time.time())

def row_to_crash(row:pd.Series) -> Crash:
    """create crash object to be saved to postgres"""
    return Crash(
        collision_id=int(row["collision_id"]),
        crash_datetime=row_to_datetime(row),
        latitude=row["latitude"],
        longitude=row["longitude"],
        borough=row.get("borough"),
        zip_code=row.get("zip_code"),
        on_street_name=row.get("on_street_name"),
        cross_street_name=row.get("cross_street_name"),
        off_street_name=row.get("off_street_name"),
        motorcycle_involved=row.get("motorcycle_involved"),
        severity=SeverityEnum(row["severity"]),
        persons_injured=row.get("persons_injured"),
        persons_killed=row.get("persons_killed"),
    )
    
def row_to_vehicle(row:pd.Series)->list[CrashVechicle]:
    """
    Build a CrashVehicle for vehicle 1 if vehicle_type_code1 (or the contributing factor) is present, and conditionally another for vehicle 2
    checking for None/NaN before deciding whether that second vehicle actually exists for this row.
    """
    vehicle=[]
    collisionId=int(row["collision_id"])

    vehicle_type_1=row.get("vehicle_type_code1")
    vehicle_type_2=row.get("vehicle_type_code2")
    #check if vehicle type 1 exists add it to output list
    if pd.notnull(vehicle_type_1):
        vehicle.append(
            CrashVechicle(
                collision_id=collisionId,
                vehicle_number=1,
                vehicle_type=vehicle_type_1,
                contributing_factor=row.get("contributing_factor_vehicle_1")
            )
        )

    #check if vehicle type 2 exists add it to output list
    if pd.notnull(vehicle_type_2):
        vehicle.append(
            CrashVechicle(
                collision_id=collisionId,
                vehicle_number=2,
                vehicle_type=vehicle_type_2,
                contributing_factor=row.get("contributing_factor_vehicle_2"),
            )
        )


    return vehicle

def load_crash_data(csv_path:str,batch_size:int = 5000):
    """"Load and save crash data to db. If crash id exisitins ignore. If its new add to db"""
    engine = sync_database()
    Session=sessionmaker(bind=engine)
    
    df=pd.read_csv(csv_path)
    #convert time str to datetime
    df['crash_time'] = pd.to_datetime(df['crash_time'],errors='coerce')
    df['crash_date'] = pd.to_datetime(df['crash_date'],errors='coerce')
    
    with Session() as session:
        #get all exisiting collision IDs
        exisiting_ids=set(session.scalars(select(Crash.collision_id)))
        new_crashes=[]
        new_vehicles=[]
        skipped=0 # count number of rows skipped
        skipped_errors = 0 #count number of errors skipped

        for _, row in df.iterrows():
            collisionId=int(row["collision_id"])

            if collisionId in exisiting_ids:
                #skip if already exists
                skipped+=1
                continue
            try:
                crash=row_to_crash(row)
                vehicle=row_to_vehicle(row)
            except (ValueError,TypeError,KeyError) as e:
                logger.error(f"Skipping collision_id {collisionId}: {e}")
                
            new_crashes.append(crash)
            new_vehicles.extend(vehicle)

        logger.info(f"{len(new_crashes)} new crashes to insert, {skipped} skipped (already exist)")

        #batch commit new crashes to database
        for i in range(0,len(new_crashes),batch_size):
            batch=new_crashes[i:i+batch_size]
            session.add_all(batch)
            session.commit()
            logger.info(f"Committed crashes {i} - {i + len(batch)}")

        #batch commit new vehicles to database
        for i in range(0,len(new_vehicles),batch_size):
            batch=new_vehicles[i:i+batch_size]
            session.add_all(batch)
            session.commit()
            logger.info(f"Committed vehicles {i} - {i + len(batch)}")
            
            
def main():
    #add argument for script
    parser=argparse.ArgumentParser(description="load cleaned data into db")
    parser.add_argument("--input", required=True, help ="cleaned csv path")
    args=parser.parse_args()
    
    load_crash_data(args.input)    
            
if __name__ == "__main__":
    main()

    