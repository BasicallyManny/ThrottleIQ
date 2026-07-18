"""
Fetch NYC Motor Vehicle Collision data (last 3 years) from NYC Open Data
and save to CSV.

Source: Motor Vehicle Collisions - Crashes
https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95

"""

import requests
from datetime import datetime, UTC, time, timedelta
import csv

from app.core.logging_config import loggerSetup, logger

loggerSetup()

BASE_URL = "https://data.cityofnewyork.us/resource/h9gi-nx95.json"
PAGE_SIZE=50000
OUTPUT_FILE="raw_crash_data.csv"
#3 years
end_date=datetime.now(UTC)
start_date=end_date - timedelta(days=365*3)
#format to strings
start_str=start_date.strftime("%Y-%m-%dT%H:%M:%S")
end_str=end_date.strftime("%Y-%m-%dT%H:%M:%S")

SELECT_FIELDS = [
    "crash_date",
    "crash_time",
    "borough",
    "zip_code",
    "latitude",
    "longitude",
    "on_street_name",
    "cross_street_name",
    "off_street_name",
    "number_of_persons_injured",
    "number_of_persons_killed",
    "number_of_pedestrians_injured",
    "number_of_pedestrians_killed",
    "number_of_cyclist_injured",
    "number_of_cyclist_killed",
    "number_of_motorist_injured",
    "number_of_motorist_killed",
    "contributing_factor_vehicle_1",
    "collision_id",
    "vehicle_type_code1",
    "vehicle_type_code2",
    "vehicle_type_code_3",
    "vehicle_type_code_4",
    "vehicle_type_code_5",
]

MOTORCYCLE_KEYWORDS = ("MOTORCY", "MOPED", "MINIBIKE", "DIRT BIKE")

VEHICLE_TYPE_FIELDS = [
    "vehicle_type_code1",
    "vehicle_type_code2",
    "vehicle_type_code_3",
    "vehicle_type_code_4",
    "vehicle_type_code_5",
]


def get_crash_data():
    """Get crash Data from the BASE URL. It is already in JSON format. Doing some light cleaning of the data
    - Last 3 years
    - Limiting to 50000 results
    - Ordering by earliest to latest
    
    """
    rows=[]
    offset=0
    
    while True:
        params = {
            "$select": ",".join(SELECT_FIELDS),
            "$where": f"crash_date >= '{start_str}' AND crash_date < '{end_str}'",
            "$limit":PAGE_SIZE,
            "$offset":offset,
            "$order":"crash_date"
        }
        
        try:
            response=requests.get(BASE_URL,params=params,timeout=60)
            response.raise_for_status()
            batch=response.json()
        except requests.exceptions.Timeout:
            logger.warning("Request timed out. Retrying...")
            time.sleep(5)
            continue
        except requests.exceptions.RequestException as e:
            logger.exception(f"Request failed: {e}")
            time.sleep(5)
            continue

        except ValueError:
            logger.error("Invalid JSON response")
            break

        if not batch:
            break
        
        if not batch:
            break
        
        rows.extend(batch)
        
        offset+=PAGE_SIZE
        
        if(len(batch) >= PAGE_SIZE):
            break
        
        time.sleep(0.5)
        
    return rows

def is_motorcycle(row:list) -> bool:
    """create a is_motorcycle tag to easily mark motorcycles"""
    for field in VEHICLE_TYPE_FIELDS:
        value=(row.get(field) or "").upper()
        if any(k in value for k in MOTORCYCLE_KEYWORDS):
            return True   
    return False

def severity(row:list) -> str:
    """Return wether the crash was fatal, injury, or property damage"""
    
    killed = int(row.get("number_of_persons_killed") or 0)
    injured =int(row.get("number_of_persons_injured") or 0)
    
    if killed > 0:
        return "Fatal"
    
    if injured > 0:
        return "Injury"
    
    return "Property Damage"

def main():
    rows = get_crash_data()
    
    #output csv field names 
    
    fieldnames = [
       "crash_date",
        "crash_time",
        "latitude",
        "longitude",
        "borough",
        "zip_code",
        "motorcycle_involved",
        "severity",
        "persons_injured",
        "persons_killed",
        "on_street_name",
        "cross_street_name",
        "off_street_name",
        "contributing_factor_vehicle_1",
        "vehicle_type_code1",
        "vehicle_type_code2",
        "vehicle_type_code_3",
        "collision_id",
    ]
    
    #build the csv
    with open(OUTPUT_FILE, "w" , newline="",encoding="utf-8") as f:
        writer=csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in rows:
            writer.writerow({
                 "crash_date": row.get("crash_date", "").split("T")[0],
                "crash_time": row.get("crash_time", ""),
                "latitude": row.get("latitude", ""),
                "longitude": row.get("longitude", ""),
                "borough": row.get("borough", ""),
                "zip_code": row.get("zip_code", ""),
                "motorcycle_involved": is_motorcycle(row),
                "severity": severity(row),
                "persons_injured": row.get("number_of_persons_injured", 0),
                "persons_killed": row.get("number_of_persons_killed", 0),
                "on_street_name": row.get("on_street_name", ""),
                "cross_street_name": row.get("cross_street_name", ""),
                "off_street_name": row.get("off_street_name", ""),
                "contributing_factor_vehicle_1": row.get("contributing_factor_vehicle_1", ""),
                "vehicle_type_code1": row.get("vehicle_type_code1", ""),
                "vehicle_type_code2": row.get("vehicle_type_code2", ""),
                "vehicle_type_code_3": row.get("vehicle_type_code_3", ""),
                "collision_id": row.get("collision_id", ""),
            })
            
        logger.info(f"Done. Wrote {len(rows)} rows to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
