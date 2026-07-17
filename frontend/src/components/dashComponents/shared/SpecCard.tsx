import type { ReactNode } from "react";

interface SpecCardProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export const SpecCard = ({ title, children, className = "" }: SpecCardProps) => {
    return (
        <div className={`rounded-xl border border-(--color-border) bg-(--color-surface) p-4 shadow-md overflow-hidden ${className}`}>
            <h2 className="mb-3 text-lg font-bold text-(--color-text)">
                {title}
            </h2>
            {children}
        </div>
    );
};
