
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import type { MotoCrashByHour } from "../../interface/crashStatInterface";

interface CrashChartProps {
    accidentData: MotoCrashByHour[]
    fatalityData: MotoCrashByHour[]
}

interface CrashChartRow {
    hour: number
    accidentPct: number
    fatalityPct: number
}

const hourLabels = [
    "12 AM", "1 AM", "2 AM", "3 AM",
    "4 AM", "5 AM", "6 AM", "7 AM",
    "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM",
    "4 PM", "5 PM", "6 PM", "7 PM",
    "8 PM", "9 PM", "10 PM", "11 PM"
];

function mergeHourlyData(accidentData: MotoCrashByHour[], fatalityData: MotoCrashByHour[]): CrashChartRow[] {
    const fatalityByHour = new Map(fatalityData.map((row) => [row.hour, row.percentage]))
    return accidentData.map((row) => ({
        hour: row.hour,
        accidentPct: row.percentage,
        fatalityPct: fatalityByHour.get(row.hour) ?? 0,
    }))
}

export const HourlyAccidentChart = ({ accidentData, fatalityData }: CrashChartProps) => {
    const chartData = mergeHourlyData(accidentData, fatalityData)

    const labeledData = chartData.map(item=>({
        ...item,
        hourLabel:hourLabels[item.hour]
    }))

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={labeledData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <XAxis dataKey='hourLabel' tick={{ fontSize: 11 }} interval={2}/>
                <YAxis tick={{ fontSize: 11 }} width={30}/>
                <Tooltip/>
                <Legend wrapperStyle={{ fontSize: 11 }}/>
                <Line type="monotone" dataKey="accidentPct" name="Accidents" stroke="var(--color-chart-motorcycle)"/>
                <Line type="monotone" dataKey="fatalityPct" name="Fatalities" stroke="var(--color-chart-non-motorcycle)"/>
            </LineChart>
        </ResponsiveContainer>
    )
}