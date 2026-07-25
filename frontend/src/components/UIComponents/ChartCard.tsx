import type { ReactNode } from "react"

type ChartCardSize = "lg" | "md" | "sm"

interface ChartCardProps {
    title: string
    subtitle?: string
    icon: ReactNode
    size?: ChartCardSize
    className?: string
    children: ReactNode
}

const SIZE_STYLES: Record<ChartCardSize, {
    padding: string
    iconBox: string
    title: string
    subtitle: string
    shadow: string
    gap: string
}> = {
    lg: {
        padding: "p-4",
        iconBox: "h-8 w-8",
        title: "text-sm font-semibold",
        subtitle: "text-xs",
        shadow: "shadow-xl shadow-black/25",
        gap: "mb-2",
    },
    md: {
        padding: "p-3",
        iconBox: "h-7 w-7",
        title: "text-xs font-semibold",
        subtitle: "text-[11px]",
        shadow: "shadow-lg shadow-black/20",
        gap: "mb-2",
    },
    sm: {
        padding: "p-3",
        iconBox: "h-6 w-6",
        title: "text-xs font-semibold",
        subtitle: "text-[11px]",
        shadow: "shadow-md shadow-black/15",
        gap: "mb-1",
    },
}

export const ChartCard = ({ title, subtitle, icon, size = "md", className, children }: ChartCardProps) => {
    const styles = SIZE_STYLES[size]

    return (
        <section
            className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/5 bg-(--color-surface) ${styles.padding} ${styles.shadow} ${className ?? ""}`}
        >
            <header className={`flex shrink-0 items-center gap-2 ${styles.gap}`}>
                <span className={`flex shrink-0 items-center justify-center rounded-lg bg-(--color-border)/15 text-(--color-border) ${styles.iconBox}`}>
                    {icon}
                </span>
                <div className="min-w-0">
                    <h2 className={`text-(--color-text) ${styles.title}`}>{title}</h2>
                    {subtitle && <p className={`truncate text-(--color-muted) ${styles.subtitle}`}>{subtitle}</p>}
                </div>
            </header>
            <div className="min-h-0 flex-1">{children}</div>
        </section>
    )
}
