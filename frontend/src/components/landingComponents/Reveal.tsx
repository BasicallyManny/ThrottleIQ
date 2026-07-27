import type { ReactNode } from "react"
import { useReveal } from "../../hooks/useReveal"

interface RevealProps {
    children: ReactNode
    className?: string
    delay?: number
}

export const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
    const { ref, isVisible } = useReveal<HTMLDivElement>()

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                } ${className}`}
        >
            {children}
        </div>
    )
}
