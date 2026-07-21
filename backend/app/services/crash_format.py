from typing import Sequence
from sqlalchemy.engine import Row

SeverityBreakdown = dict[str, dict[str, dict[str, int | float]]]

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

def format_monthly_crash_stats(rows:Sequence[Row]) -> list[dict]:
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

def format_monthly_fatal_crashes(rows:Sequence[Row]) -> list[dict]:
    #build look up
    month_of_year = {int(row.month_of_year): {"count": row.motorcycle_fatalities, "percentage": float(row.percentage)} for row in rows}
    
    results=[]
    
    for month in range(12):
        data=month_of_year.get(month,{"count":0, "percentage":0.0})
        results.append({
            "month":month,
            "count":data["count"],
            "percentage":data["percentage"]
        })
        
    return results

def format_yearly_fatal_crashes(rows:Sequence[Row]) -> list[dict]:
    #build look up
    year_lookup = {int(row._year): {"count": row.motorcycle_fatalities, "percentage": float(row.percentage)} for row in rows}

    if not year_lookup:
        return []

    results=[]

    for year in range(min(year_lookup), max(year_lookup) + 1):
        data=year_lookup.get(year,{"count":0, "percentage":0.0})
        results.append({
            "year":year,
            "count":data["count"],
            "percentage":data["percentage"]
        })

    return results