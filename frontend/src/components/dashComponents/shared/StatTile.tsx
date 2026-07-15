interface StatTileProps {
    label: string;
    value: string | number | null | undefined;
    size?: "sm" | "base";
    variant?: "grid" | "footer";
}

export const StatTile = ({ label, value, size = "sm", variant = "grid" }: StatTileProps) => {
    const sizeClass = size === "base" ? "text-base" : "text-sm";

    const valueContent =
        value !== null && value !== undefined && value !== "" ? (
            value
        ) : (
            <span aria-label={`${label} not available`} className="font-sans text-(--color-muted)">
                —
            </span>
        );

    if (variant === "footer") {
        return (
            <div>
                <p className={`font-bold font-mono text-(--color-text) ${sizeClass}`}>{valueContent}</p>
                <p className="text-xs text-(--color-muted)">{label}</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg bg-(--color-background) p-3 overflow-hidden">
            <p className="text-xs text-(--color-muted)">{label}</p>
            <p className={`mt-1 font-bold font-mono text-(--color-text) ${sizeClass}`}>{valueContent}</p>
        </div>
    );
};
