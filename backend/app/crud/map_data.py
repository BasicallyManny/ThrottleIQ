from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

async def getMotoAccidentLocations(db: AsyncSession):
    """Returns every motorcycle crash location plus the fatal subset in a single
    query, so callers who need both layers (e.g. an "all crashes" and a "fatal
    crashes" map layer) don't pay for two full scans of Crashes."""
    query = text("""
        SELECT
            json_agg(
                json_build_object(
                    'collision_id', collision_id,
                    'latitude', Latitude,
                    'longitude', Longitude
                )
            ) AS locations,
            json_agg(
                json_build_object(
                    'collision_id', collision_id,
                    'latitude', Latitude,
                    'longitude', Longitude
                )
            ) FILTER (WHERE severity = 'FATAL') AS fatal_locations
        FROM Crashes
        WHERE motorcycle_involved = true
    """)

    result = await db.execute(query)
    row = result.mappings().one()

    return {
        "locations": row["locations"] or [],
        "fatal_locations": row["fatal_locations"] or [],
    }
