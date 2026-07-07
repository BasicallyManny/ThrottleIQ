""" Logger configuration file"""

import logging

def loggerSetup():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )

logger=logging.getLogger("motospecs")