import type { ReactNode } from "react";
import { FiDatabase, FiExternalLink } from "react-icons/fi";

type DataTransparencySection = {
    label: string;
    content: string;
};

type DataTransparencyCardProps = {
    title?: string;
    description?: string;
    icon?: ReactNode;
    sections: DataTransparencySection[];
    sourceUrl?: string;
    lastUpdated?: string;
    className?: string;
};

export default function DataTransparencyCard({
    title = "Data Transparency",
    description = "Understand the source and limitations of this data.",
    icon = <FiDatabase className="h-4 w-4" />,
    sections,
    sourceUrl,
    lastUpdated,
    className = "",
}: DataTransparencyCardProps) {
    return (
        <div
            className={`
                flex w-full flex-col
                rounded-2xl border border-white/5
                bg-(--color-surface)
                p-4
                shadow-md shadow-black/15
                ${className}
            `}
        >
            {/* Header */}
            <div className="flex items-start gap-2">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--color-border)/15 text-(--color-border)">
                    {icon}
                </span>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-snug text-(--color-text)">
                        {title}
                    </h3>

                    <p className="mt-1 whitespace-normal text-xs leading-relaxed text-(--color-muted)">
                        {description}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="mt-4 flex flex-col gap-4">
                {sections.map((section) => (
                    <div key={section.label}>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-(--color-muted)">
                            {section.label}
                        </p>

                        <p className="mt-1 whitespace-normal wrap-break-word text-sm leading-relaxed text-(--color-text)">
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            {(sourceUrl || lastUpdated) && (
                <div className="mt-4 flex flex-col gap-1 border-t border-white/5 pt-3">
                    {sourceUrl && (
                        <a
                            href={sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-(--color-border) hover:underline"
                        >
                            <FiExternalLink className="h-3 w-3 shrink-0" />
                            <span className="truncate">{sourceUrl}</span>
                        </a>
                    )}

                    {lastUpdated && (
                        <p className="text-xs text-(--color-muted)">
                            Last updated: {lastUpdated}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}