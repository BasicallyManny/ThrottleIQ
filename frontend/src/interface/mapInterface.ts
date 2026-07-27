export interface CrashLocation{
    collision_id:number
    latitude:number,
    longitude:number,
}

export interface CrashHeatMap{
    locations:CrashLocation[],
    fatal_locations:CrashLocation[]
}