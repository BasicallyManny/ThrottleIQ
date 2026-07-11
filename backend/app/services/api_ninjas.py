import httpx
from app.config import CONFIG
from logging_config import loggerSetup,logger

loggerSetup()

async def fetch_moto_specs(make:str, model:str, year:int)->list[dict]:
    """Fetch API Data from API Ninjas Motorycycle API"""
    
    params = {
        "make" : make,
        "model": model,
        "year": year,
    }
    
    #make api call to api_ninjas
    async with httpx.AsyncClient() as client:
        try:
            logger.info("Fetching moto specs ... ")
            response=await client.get(
                CONFIG.API_NINJAS_URL,
                params=params,
                headers={
                    'X-Api-Key': CONFIG.API_NINJAS_KEY
                },
                timeout=10,
            )
            #check for response failure
            response.raise_for_status()
            return response.json()
        
        except httpx.HTTPStatusError as e:
            logger.error(
                f"Response error code: {e.response.status_code} : {e.response.text} "
            )
            return None
        except httpx.RequestError  as e:
            logger.error(
                f"Response failed: {e}"
            )
            return None
        
        

            
        