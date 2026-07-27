import { memo } from "react"

interface MapLayerControlsProps {
    showFatal: boolean
    showNonFatal: boolean
    onToggleFatal: () => void
    onToggleNonFatal: () => void
    fatalCount: number
    nonFatalCount: number
}

export const MapLayerControls = memo(
    ({ showFatal, showNonFatal, onToggleFatal, onToggleNonFatal, fatalCount, nonFatalCount }: MapLayerControlsProps) => {
        return (
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-0.5 rounded-xl border border-white/10 bg-(--color-surface)/90 p-2 shadow-lg shadow-black/25 backdrop-blur-sm">
                <p className="px-1.5 pb-1 text-[10px] font-semibold tracking-wider text-(--color-muted) uppercase">Layers</p>
                <LayerToggle
                    label="Fatal Accidents"
                    count={fatalCount}
                    color="var(--color-chart-cat-8)"
                    active={showFatal}
                    onClick={onToggleFatal}
                />
                <LayerToggle
                    label="All Other Accidents"
                    count={nonFatalCount}
                    color="var(--color-chart-cat-1)"
                    active={showNonFatal}
                    onClick={onToggleNonFatal}
                />
            </div>
        )
    }
)
MapLayerControls.displayName = "MapLayerControls"

interface LayerToggleProps {
    label: string
    count: number
    color: string
    active: boolean
    onClick: () => void
}

const LayerToggle = ({ label, count, color, active, onClick }: LayerToggleProps) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-transparent px-1.5 py-1.5 text-left text-xs transition-colors duration-150 hover:border-white/10 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-border)"
    >
        <span
            className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white/20 ring-inset transition-opacity duration-150"
            style={{ backgroundColor: color, opacity: active ? 1 : 0.3 }}
        />
        <span className={`flex-1 whitespace-nowrap ${active ? "text-(--color-text)" : "text-(--color-muted)"}`}>
            {label}
        </span>
        <span className="tabular-nums text-(--color-muted)">{count.toLocaleString()}</span>
        <span
            className={`relative h-4 w-7 shrink-0 rounded-full transition-colors duration-150 ${
                active ? "bg-(--color-border)" : "bg-white/15"
            }`}
        >
            <span
                className={`absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform duration-150 ${
                    active ? "translate-x-3" : "translate-x-0"
                }`}
            />
        </span>
    </button>
)
