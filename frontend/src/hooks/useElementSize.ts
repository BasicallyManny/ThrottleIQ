import { useLayoutEffect, useRef, useState } from "react"

interface ElementSize {
    width: number
    height: number
}

/** Tracks an element's content-box size via ResizeObserver, for layout-dependent
 * calculations (eg. fitting a map viewport to its actual container size). */
export function useElementSize<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [size, setSize] = useState<ElementSize | null>(null)

    useLayoutEffect(() => {
        const el = ref.current
        if (!el) return

        const updateSize = () => {
            const { width, height } = el.getBoundingClientRect()
            if (width === 0 || height === 0) return
            setSize((prev) => (prev && prev.width === width && prev.height === height ? prev : { width, height }))
        }

        updateSize()
        const observer = new ResizeObserver(updateSize)
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return { ref, size }
}
