import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import type { MotoAccidentByMonth } from "../../interface/crashStatInterface";

interface CrashChartProps {
    accidentData: MotoAccidentByMonth[];
    fatalityData: MotoAccidentByMonth[];
}

interface CrashChartRow {
    month: number;
    accidentPct: number;
    fatalityPct: number;
}

const monthLabels = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function mergeMonthlyData(
    accidentData: MotoAccidentByMonth[],
    fatalityData: MotoAccidentByMonth[]
): CrashChartRow[] {
    const accidentByMonth = new Map(
        accidentData.map((row) => [row.month, row.percentage])
    );

    const fatalityByMonth = new Map(
        fatalityData.map((row) => [row.month, row.percentage])
    );

    return Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;

        return {
            month,
            accidentPct: accidentByMonth.get(month) ?? 0,
            fatalityPct: fatalityByMonth.get(month) ?? 0,
        };
    });
}

export const MonthlyAccidentChart = ({
    accidentData,
    fatalityData,
}: CrashChartProps) => {
    const chartData = mergeMonthlyData(accidentData, fatalityData);

    const labeledData = chartData.map((item) => ({
        ...item,
        monthLabel: monthLabels[item.month],
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={labeledData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <XAxis dataKey="monthLabel" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} width={30} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />

                <Line
                    type="monotone"
                    dataKey="accidentPct"
                    name="% of Annual Accidents"
                    stroke="var(--color-chart-motorcycle)"
                />

                <Line
                    type="monotone"
                    dataKey="fatalityPct"
                    name="% of Annual Fatalities"
                    stroke="var(--color-chart-non-motorcycle)"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};