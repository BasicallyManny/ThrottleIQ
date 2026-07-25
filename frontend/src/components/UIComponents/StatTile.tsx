import type { ReactNode } from "react"

interface StatTileProps {
    label: string
    value: string
    hint?: string
    icon: ReactNode
}

export const StatTile = ({ label, value, hint, icon }: StatTileProps) => {
    return (
        <div className="w-full rounded-2xl border border-white/5 bg-(--color-surface) p-3 shadow-md shadow-black/15">
            <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-[11px] font-medium uppercase tracking-wider text-(--color-muted)">{label}</p>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-(--color-border)/15 text-(--color-border)">
                    {icon}
                </span>
            </div>
            <p className="truncate text-lg font-bold text-(--color-text)" title={value}>{value}</p>
            {hint && <p className="truncate text-[11px] text-(--color-muted)" title={hint}>{hint}</p>}
        </div>
    )
}
