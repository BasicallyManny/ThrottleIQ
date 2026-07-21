""""
EDA on cleaned crash data
"""
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.crash_format import format_severity_rows, format_hourly_stats,format_monthly_crash_stats,format_monthly_fatal_crashes


async def get_severity_breakdown_by_motorcycle_involved(db:AsyncSession):
    "Run the select query"
    SEVERITY_QUERY = text(
        """
        SELECT
            motorcycle_involved,
            severity,
            COUNT(*) AS crash_count,
            ROUND(
                100.0 * COUNT(*) / SUM(COUNT(*)) OVER (PARTITION BY motorcycle_involved),
                2
            ) AS percentage
        FROM crashes
        GROUP BY motorcycle_involved, severity
        ORDER BY motorcycle_involved, severity;
        """
    )
    
    result = await db.execute(SEVERITY_QUERY)
    rows=result.all()
    
    return format_severity_rows(rows)

async def get_motorcycle_accident_breakdown_by_hour(db:AsyncSession):
    """Returns the total count and percentage of motorcycle accidents based on hour"""
    HOUR_QUERY = text(
        """
        SELECT
            EXTRACT(HOUR FROM crash_datetime) AS hour_of_day,
            COUNT(*) AS crash_count,
            ROUND(
                100.0 * COUNT(*) / SUM(COUNT(*)) OVER (),
                2
            ) AS percentage
        FROM crashes
        WHERE motorcycle_involved = true
            AND crash_datetime IS NOT NULL
        GROUP BY hour_of_day
        ORDER BY hour_of_day;
        """
    ) 
    
    result = await db.execute(HOUR_QUERY)
    rows=result.all()
    
    return format_hourly_stats(rows)

async def get_motorcycle_accident_breakdown_by_month(db:AsyncSession):
    """Returns the total count and percentage of motorcycle accidents based on month"""
    MONTH_QUERY = text(
        """
        SELECT
            EXTRACT(MONTH FROM crash_datetime) AS month_of_year,
            COUNT(*) AS crash_count,
            ROUND(
                100.0 * COUNT(*) / SUM(COUNT(*)) OVER (),
                2
            ) AS percentage
        FROM crashes
        WHERE motorcycle_involved = true
            AND crash_datetime IS NOT NULL
        GROUP BY month_of_year
        ORDER BY month_of_year;
        """
        ) 
    
    result = await db.execute(MONTH_QUERY)
    rows=result.all()
    
    return format_monthly_crash_stats(rows)

async def get_motorcycle_fatalities_per_month(db:AsyncSession):
    """Returns the total count and percentage of motorcycle accidents based on month"""
    FATALITIES_PER_MONTH_QUERY = text(
        """
        SELECT 
	        EXTRACT(MONTH FROM crash_datetime) AS month_of_year,
	        count(*) as motorcycle_fatalities,
	        ROUND(
                100.0 * COUNT(*) / SUM(COUNT(*)) OVER (),
                2
            ) AS percentage
        FROM crashes
        WHERE
	    motorcycle_involved=true
	    AND
	    severity='FATAL'
	    AND 
	    crash_datetime IS NOT NULL
        GROUP BY month_of_year
        ORDER BY month_of_year
        """
    )
    results= await db.execute(FATALITIES_PER_MONTH_QUERY)
    
    return format_monthly_fatal_crashes(results)


