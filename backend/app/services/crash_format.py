from typing import Sequence
from sqlalchemy.engine import Row
from app.core.logging_config import loggerSetup,logger

SeverityBreakdown = dict[str, dict[str, dict[str, int | float]]]
loggerSetup()

def format_severity_rows(rows:Sequence[Row])->SeverityBreakdown:
    """Returns the percentage of fatal,injury, or property damage of all accidents"""
    
    
    result: SeverityBreakdown = {"motorcycle":{}, "non_motorcycle":{}}
    
    for row in rows:
        group = "motorcycle" if row.motorcycle_involved else "non_motorcycle"
        severity = row.severity.lower().replace(" ","_")
        
        result[group][severity] = {
            "count":row.crash_count,
            "percentage":float(row.percentage)
        }
        
    return result

def format_hourly_stats(rows:Sequence[Row]) -> list[dict]:
    #build lookup from the query
    by_hour = {int(row.hour_of_day): {"count": row.crash_count, "percentage": float(row.percentage)} for row in rows}
        
    result=[]
    
    for hour in range(24):
        data=by_hour.get(hour, {"count" : 0, "percentage": 0.0})
        result.append({
            "hour":hour,
            "count":data["count"],
            "percentage":data["percentage"]
        })
        
    return result


def format_monthly_stats(rows:Sequence[Row]) -> list[dict]:
    #build lookup from the query
    month_of_year = {int(row.month_of_year): {"count": row.crash_count, "percentage": float(row.percentage)} for row in rows}
        
    result=[]
    
    for month in range(12):
        data=month_of_year.get(month, {"count" : 0, "percentage": 0.0})
        result.append({
            "month":month,
            "count":data["count"],
            "percentage":data["percentage"]
        })
        
    return result


def format_yearly_crashes(rows:Sequence[Row]) -> list[dict]:
    #build look up
    year_lookup = {int(row._year): {"count": row.motorcycle_fatalities, "percentage": float(row.percentage)} for row in rows}

    if not year_lookup:
        return []

    results=[]

    for year in range(min(year_lookup), max(year_lookup) + 1):
        data=year_lookup.get(
            year,
            {"count":0, "percentage":0.0}
        )
        results.append({
            "year":year,
            "count":data["count"],
            "percentage":data["percentage"]
        })

    return results

def format_total_accident_per_borough(rows: Sequence[Row]) -> list[dict]:
    borough_lookup = {
        row.borough: {
            "count": row.total_moto_accidents,
            "percentage": float(row.percentage)
        }
        for row in rows
    }

    if not borough_lookup:
        return []

    results = []
    
    borough_order = [
        "BRONX",
        "BROOKLYN",
        "MANHATTAN",
        "QUEENS",
        "STATEN ISLAND"
    ]
    
    unexpected = set(borough_lookup.keys()) - set(borough_order)
    if unexpected:
        logger.warning(f"Unexpected borough values found and excluded: {unexpected}")

    for borough in borough_order:
        data = borough_lookup.get(
            borough,
            {"count": 0, "percentage": 0.0}
        )

        results.append({
            "borough": borough,
            "count": data["count"],
            "percentage": data["percentage"]
        })

    return results

def format_crash_factor(rows:Sequence[Row]) ->list:
    return [
        {
            "factor": row[0],
            "count": row[1],
            "percentage": float(row[2])
        }
        for row in rows
    ]
    
    