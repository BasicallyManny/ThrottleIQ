import os
import pandas as pd
import argparse
"""
CLEAN DATA FROM THE RAW_CSV FILE.
    -Removing all rows with no longitude and latitude
    -All coords should be real numeric types, drop missing/unparseable, drop (0,0) placeholders
    -Remove duplicate collision
    -drop unused columns
    -convert datetimes
    -make sure all bool values are bool
    -make sure all text are normalized
    -make sure all NaN is None
    -remove double spaces and trim white space
    -normalize spacing
    -normalize crash time to (hour,Minute,AM/PM) 
"""

def main():
    parser= argparse.ArgumentParser(description="Clean raw NYC crash data")
    parser.add_argument("--input", required=True, help="Path to raw CSV")
    parser.add_argument("--output", required=True, help="Path to write cleaned CSV")
    args=parser.parse_args()
    #read the csv file
    df=pd.read_csv(args.input)
    #Coordinates
    #convert to numeric
    df["latitude"] = pd.to_numeric(df["latitude"], errors="coerce")
    df["longitude"] = pd.to_numeric(df["longitude"], errors="coerce")
    #drop empty
    df = df.dropna(subset=["latitude", "longitude"])
    #NYC uses (0,0) as a placeholder
    df = df[(df["latitude"] != 0) | (df["longitude"] != 0)]
    #drop duplicate collision ids
    df = df.drop_duplicates(subset="collision_id")
    # Confirm this matches your real raw column name before trusting errors="ignore"
    df = df.drop(columns=["vehicle_type_code_3"], errors="ignore")
    # Formatting for display happens later, in the backend's API response layer.
    df["crash_date"] = pd.to_datetime(df["crash_date"], errors="coerce")
    df["crash_time"] = pd.to_datetime(df["crash_time"], format="%H:%M", errors="coerce")

    # Boolean conversion — unmatched values become NaN, then None at the final cleanup step
    df["motorcycle_involved"] = (
        df["motorcycle_involved"].astype(str).str.upper().map({"TRUE": True, "FALSE": False})
    )

    # persons_injured / persons_killed — numeric; missing stays None, present becomes a real int
    for col in ["persons_injured", "persons_killed"]:
        df[col] = pd.to_numeric(df[col], errors="coerce")
        df[col] = df[col].apply(lambda x: int(x) if pd.notnull(x) else None)

    # Normalize all text columns
    text_columns = df.select_dtypes(include="object").columns
    for col in text_columns:
        df[col] = df[col].str.strip().str.replace(r"\s+", " ", regex=True)

    df["borough"] = df["borough"].str.upper()

    # Replace any remaining NaN with None (catches motorcycle_involved's unmatched cases too)
    df = df.where(pd.notnull(df), None)

    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    df.to_csv(args.output, index=False)
    print(f"Cleaned {len(df)} rows -> {args.output}")

if __name__ == "__main__":
    main()
    