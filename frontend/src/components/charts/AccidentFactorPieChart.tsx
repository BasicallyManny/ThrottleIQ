import { ResponsiveContainer, PieChart, Pie, Tooltip, type TooltipContentProps } from "recharts"
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { CrashFactor } from "../../interface/crashStatInterface"

interface CrashFactorProps {
    data: CrashFactor[]
}

interface PieRow extends CrashFactor {
    fill: string
}

const MAX_SLICES = 7

const COLORS = [
    "var(--color-chart-cat-1)",
    "var(--color-chart-cat-2)",
    "var(--color-chart-cat-3)",
    "var(--color-chart-cat-4)",
    "var(--color-chart-cat-5)",
    "var(--color-chart-cat-6)",
    "var(--color-chart-cat-7)",
    "var(--color-chart-cat-8)",
]
const OTHER_COLOR = "var(--color-chart-other)"

function toPieData(data: CrashFactor[]): PieRow[] {
    const sorted = [...data].sort((a, b) => b.count - a.count)
    const head = sorted.slice(0, MAX_SLICES).map((row, index) => ({ ...row, fill: COLORS[index % COLORS.length] }))
    if (sorted.length <= MAX_SLICES) return head

    const tail = sorted.slice(MAX_SLICES)
    const other = tail.reduce(
        (acc, row) => ({
            factor: "Other",
            count: acc.count + row.count,
            percentage: acc.percentage + row.percentage,
            fill: OTHER_COLOR,
        }),
        { factor: "Other", count: 0, percentage: 0, fill: OTHER_COLOR }
    )
    return [...head, other]
}

const CustomTooltip = ({ active, payload }: TooltipContentProps<ValueType, NameType>) => {
    if (!active || !payload?.length) return null;

    const row = payload[0].payload as CrashFactor;

    return (
        <div className="max-w-60 rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 shadow-md">
            <p className="mb-1 text-sm font-bold text-(--color-text)">{row.factor}</p>
            <p className="text-xs text-(--color-muted)">
                <span className="text-(--color-text)">{row.percentage.toFixed(1)}%</span> ({row.count.toLocaleString()} crashes)
            </p>
        </div>
    );
};

export const AccidentFactorPieChart = ({ data }: CrashFactorProps) => {
    const pieData = toPieData(data)

    return (
        <div className="flex h-full min-h-0 items-center gap-3">
            <div className="relative h-full min-w-0 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="percentage"
                            nameKey="factor"
                            cx="50%"
                            cy="50%"
                            innerRadius="55%"
                            outerRadius="90%"
                            paddingAngle={2}
                            stroke="var(--color-surface)"
                            strokeWidth={2}
                        />
                        <Tooltip content={CustomTooltip} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <ul className="grid h-full w-40 min-w-0 flex-none auto-rows-min grid-cols-1 content-center gap-y-1 overflow-hidden">
                {pieData.map((entry) => (
                    <li key={`legend-${entry.factor}`} className="flex min-w-0 items-center gap-1.5 text-[11px]">
                        <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: entry.fill }}
                        />
                        <span className="min-w-0 flex-1 truncate text-(--color-text)" title={entry.factor}>
                            {entry.factor}
                        </span>
                        <span className="shrink-0 text-(--color-muted)">{entry.percentage.toFixed(1)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
