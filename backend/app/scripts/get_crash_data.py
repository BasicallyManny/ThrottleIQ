"""script to get, clean, normalize, save data to postgres"""

import subprocess
import sys
from pathlib import Path

from app.core.logging_config import loggerSetup, logger

loggerSetup()

APP_DIR = Path(__file__).resolve().parent.parent

RAW_DIR = APP_DIR / "data" / "raw"
CLEAN_DIR = APP_DIR / "data" / "cleaned"

RAW_CRASH_DATA_PATH = RAW_DIR / "raw_crash_data.csv"
CLEANED_CSV_PATH = CLEAN_DIR / "cleaned_crash_data.csv"


def run_step(module: str, *args: str) -> None:
    logger.info(f"Running {module} {' '.join(args)}")
    subprocess.run([sys.executable, "-m", module, *args], check=True)


def main():
    run_step("app.pipeline.ingest")
    run_step(
        "app.pipeline.clean_data",
        "--input", str(RAW_CRASH_DATA_PATH),
        "--output", str(CLEANED_CSV_PATH),
    )
    logger.info(f"Done. Cleaned data written to {CLEANED_CSV_PATH}")


if __name__ == "__main__":
    main()
