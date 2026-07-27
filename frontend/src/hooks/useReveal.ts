import { useEffect, useRef, useState } from "react"

export function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
    const ref = useRef<T | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setIsVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.15, ...options }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [options])

    return { ref, isVisible }
}
