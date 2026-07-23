import httpx
from app.core.config import CONFIG
from app.core.logging_config import loggerSetup,logger

loggerSetup()
#wikipedia URL to pull images
WIKI_COMMONS_URL="https://commons.wikimedia.org/w/api.php"

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
        
async def get_moto_image(make:str,model:str)->str|None:
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"{make} {model}",
        "gsrnamespace": 6,
        "gsrlimit": 1,
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json",
    }
    #for wiki-commons to know I am not a robot
    headers= {
        "User-Agent":CONFIG.WIKI_USER_AGENT
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response=await client.get(WIKI_COMMONS_URL, params=params, headers=headers, timeout=10)
            response.raise_for_status()
            data = response.json()
            logger.info(data)
        except httpx.HTTPStatusError as e:
            logger.error(f"Response error code: {e.response.status_code} : {e.response.text}")
            return None
        except httpx.RequestError as e:
            logger.error(f"Response failed: {e}")
        #get pages from the JSON output
        pages=data.get("query", {}).get("pages")
        #if the pages is empty return none
        if not pages:
            return None
        first_page=next(iter(pages.values()))
        image_info=first_page.get("imageinfo")
        #if there is nothing return None
        if not image_info:
            return None
                 
    return image_info[0].get("url")

# {
#   "continue": {
#     "iistart": "2018-03-06T13:28:16Z",
#     "continue": "||"
#   },
#   "query": {
#     "pages": {
#       "67108278": {
#         "pageid": 67108278,
#         "ns": 6,
#         "title": "File:Kawasaki Ninja 400.jpg",
#         "index": 1,
#         "imagerepository": "local",
#         "imageinfo": [
#           {
#             "url": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Kawasaki_Ninja_400.jpg",
#             "descriptionurl": "https://commons.wikimedia.org/wiki/File:Kawasaki_Ninja_400.jpg",
#             "descriptionshorturl": "https://commons.wikimedia.org/w/index.php?curid=67108278"
#           }
#         ]
#       }
#     }
#   }
# }

def main():
    data=get_moto_image(make="kawasaki" , model = "ninja 400")
    print(data)

if __name__ == "__main__":
    main()
        
        

            
        