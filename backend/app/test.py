from pathlib import Path

import pandas as pd

CSV_PATH = Path(__file__).resolve().parent / "data" / "raw" / "raw_crash_data.csv"
df = pd.read_csv(CSV_PATH)
df["crash_date"] = pd.to_datetime(df["crash_date"], errors="coerce")
print(df["crash_date"].dt.year.value_counts().sort_index())