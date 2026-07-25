import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Bar,
    Tooltip,
    LabelList,
    type TooltipContentProps,
} from "recharts"
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { MotoAccidentByBoroughStats } from "../../interface/crashStatInterface"

interface BoroughChartProps {
    data: MotoAccidentByBoroughStats[]
}

const CustomTooltip = ({ active, payload, label }: TooltipContentProps<ValueType, NameType>) => {
    if (!active || !payload?.length) return null;

    const row = payload[0].payload as MotoAccidentByBoroughStats;

    return (
        <div className="rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 shadow-md">
            <p className="mb-1 text-sm font-bold text-(--color-text)">{label}</p>
            <p className="text-xs text-(--color-muted)">
                <span
                    className="mr-1 inline-block h-2 w-2 rounded-full align-middle"
                    style={{ backgroundColor: "var(--color-chart-motorcycle)" }}
                />
                <span className="text-(--color-text)">Accidents: </span>
                {row.percentage.toFixed(1)}% ({row.count.toLocaleString()})
            </p>
        </div>
    );
};

export const AccidentsPerBorough = ({ data: BoroughStats }: BoroughChartProps) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={BoroughStats}
                barSize={48}
                margin={{ top: 16, right: 16, left: 8, bottom: 4 }}
            >
                <CartesianGrid vertical={false} stroke="var(--color-chart-grid)" />
                <XAxis
                    dataKey="borough"
                    tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                    axisLine={{ stroke: "var(--color-chart-grid)" }}
                    tickLine={false}
                />
                <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip content={CustomTooltip} cursor={{ fill: "rgba(253,255,255,0.05)" }} />
                <Bar dataKey="percentage" name="percentage" fill="var(--color-chart-motorcycle)" radius={[4, 4, 0, 0]}>
                    <LabelList
                        dataKey="percentage"
                        position="top"
                        formatter={(v) => `${Number(v).toFixed(1)}%`}
                        fill="var(--color-text)"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}
