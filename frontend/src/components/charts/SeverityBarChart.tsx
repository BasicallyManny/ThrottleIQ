import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    LabelList,
    type TooltipContentProps,
} from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { SeverityChartData } from "../../interface/crashStatInterface";

interface SeverityBarChartProps {
    data: SeverityChartData[];
}

const SERIES_LABEL: Record<string, string> = {
    motorcyclePct: "Motorcycle",
    nonMotorcyclePct: "Non-motorcycle",
};

const CustomTooltip = ({ active, payload, label }: TooltipContentProps<ValueType, NameType>) => {
    if (!active || !payload?.length) return null;

    const row = payload[0].payload as SeverityChartData;

    return (
        <div className="rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 shadow-md">
            <p className="mb-1 text-sm font-bold text-(--color-text)">{label}</p>
            {payload.map((entry) => {
                const isMotorcycle = entry.dataKey === "motorcyclePct";
                const count = isMotorcycle ? row.motorcycleCount : row.nonMotorcycleCount;
                return (
                    <p key={entry.dataKey as string} className="text-xs text-(--color-muted)">
                        <span
                            className="mr-1 inline-block h-2 w-2 rounded-full align-middle"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-(--color-text)">{SERIES_LABEL[entry.dataKey as string]}: </span>
                        {(entry.value as number).toFixed(1)}% ({count.toLocaleString()})
                    </p>
                );
            })}
        </div>
    );
};

export const SeverityBarChart = ({ data: chartData }: SeverityBarChartProps) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                layout="vertical"
                barSize={20}
                barGap={2}
                margin={{ top: 4, right: 36, left: 8, bottom: 4 }}
            >
                <CartesianGrid horizontal={false} stroke="var(--color-chart-grid)" />
                <XAxis
                    type="number"
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                    axisLine={{ stroke: "var(--color-chart-grid)" }}
                    tickLine={false}
                />
                <YAxis
                    type="category"
                    dataKey="severity"
                    width={110}
                    tick={{ fill: "var(--color-text)", fontSize: 13 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip content={CustomTooltip} cursor={{ fill: "rgba(253,255,255,0.05)" }} />
                <Legend
                    verticalAlign="top"
                    align="right"
                    height={32}
                    formatter={(value) => (
                        <span className="text-xs text-(--color-text)">{SERIES_LABEL[value] ?? value}</span>
                    )}
                />
                <Bar dataKey="motorcyclePct" name="motorcyclePct" fill="var(--color-chart-motorcycle)" radius={[0, 4, 4, 0]}>
                    <LabelList
                        dataKey="motorcyclePct"
                        position="right"
                        formatter={(v) => `${Number(v).toFixed(1)}%`}
                        fill="var(--color-text)"
                        fontSize={12}
                    />
                </Bar>
                <Bar dataKey="nonMotorcyclePct" name="nonMotorcyclePct" fill="var(--color-chart-non-motorcycle)" radius={[0, 4, 4, 0]}>
                    <LabelList
                        dataKey="nonMotorcyclePct"
                        position="right"
                        formatter={(v) => `${Number(v).toFixed(1)}%`}
                        fill="var(--color-text)"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
