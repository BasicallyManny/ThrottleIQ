type Borough =   | "BRONX"| "BROOKLYN" | "MANHATTAN"| "QUEENS"| "STATEN ISLAND";

interface BreakDownValues {
    count:number,
    percentage:number
}

interface SeverityBreakDown {
    fatal:BreakDownValues,
    injury:BreakDownValues,
    property_damage:BreakDownValues
}

export interface CrashSeverityBreakDown {
    motorcycle:SeverityBreakDown,
    non_motorcycle:SeverityBreakDown
}

export interface MotoAccidentByBoroughStats {
  borough: Borough;
  count: number;
  percentage: number;
}

export interface MotoAccidentByYear {
    year: number,
    count:number,
    percentage:number
}

export interface MotoCrashByHour {
    hour: number,
    count:number,
    percentage:number
}

export interface MotoAccidentByMonth {
    month: number,
    count:number,
    percentage:number
}

export interface SeverityChartData {
    severity: string;
    motorcyclePct: number;
    motorcycleCount: number;
    nonMotorcyclePct: number;
    nonMotorcycleCount: number;
}

export interface CrashFactor {
    factor:string;
    count:number;
    percentage:number;
}


export const toSeverityChartData = (data: CrashSeverityBreakDown): SeverityChartData[] => [
    {
        severity: "Fatal",
        motorcyclePct: data.motorcycle.fatal.percentage,
        motorcycleCount: data.motorcycle.fatal.count,
        nonMotorcyclePct: data.non_motorcycle.fatal.percentage,
        nonMotorcycleCount: data.non_motorcycle.fatal.count,
    },
    {
        severity: "Injury",
        motorcyclePct: data.motorcycle.injury.percentage,
        motorcycleCount: data.motorcycle.injury.count,
        nonMotorcyclePct: data.non_motorcycle.injury.percentage,
        nonMotorcycleCount: data.non_motorcycle.injury.count,
    },
    {
        severity: "Property damage",
        motorcyclePct: data.motorcycle.property_damage.percentage,
        motorcycleCount: data.motorcycle.property_damage.count,
        nonMotorcyclePct: data.non_motorcycle.property_damage.percentage,
        nonMotorcycleCount: data.non_motorcycle.property_damage.count,
    },
];




