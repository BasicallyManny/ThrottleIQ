interface SectionHeadingProps {
    eyebrow: string
    title: string
    description?: string
    align?: "left" | "center"
}

export const SectionHeading = ({ eyebrow, title, description, align = "center" }: SectionHeadingProps) => {
    const alignment =
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left"

    return (
        <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-(--color-border)/30 bg-(--color-border)/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-(--color-border)">
                {eyebrow}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-(--color-text) sm:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="text-base leading-relaxed text-(--color-muted)">{description}</p>
            )}
        </div>
    )
}
