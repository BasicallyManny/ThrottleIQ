import type { ReactNode } from "react"
import { Link } from "react-router-dom"

interface CTAButtonProps {
    to: string
    children: ReactNode
    variant?: "primary" | "secondary"
    icon?: ReactNode
    className?: string
}

const VARIANT_STYLES: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
    primary:
        "bg-(--color-border) text-(--color-background) shadow-lg shadow-(--color-border)/25 hover:shadow-xl hover:shadow-(--color-border)/40 hover:-translate-y-0.5 active:translate-y-0",
    secondary:
        "border border-white/15 bg-white/5 text-(--color-text) backdrop-blur-md hover:border-white/30 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0",
}

export const CTAButton = ({ to, children, variant = "primary", icon, className = "" }: CTAButtonProps) => {
    return (
        <Link
            to={to}
            className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-background) ${VARIANT_STYLES[variant]} ${className}`}
        >
            {children}
            {icon && (
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    {icon}
                </span>
            )}
        </Link>
    )
}
