import { lazy, Suspense, useEffect, useState } from "react"
import { getCrashLocationData } from "../services/mapDataAPI"
import type { CrashHeatMap } from "../interface/mapInterface"
import { LoadSpinner } from "../components/UIComponents/LoadSpinner"
import { ErrorMessage } from "../components/UIComponents/ErrorMessage"

// deck.gl + maplibre-gl are heavy; keep them out of the main bundle until this page mounts.
const NYCMap = lazy(() =>
    import("../components/mapComponents/NYCMap").then((module) => ({ default: module.NYCMap }))
)

export const AccidentMap = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [heatMapData, setHeatMapData] = useState<CrashHeatMap | null>(null)

    useEffect(() => {
        let cancelled = false

        const getCrashData = async () => {
            setLoading(true)
            setError("")
            try {
                const data = await getCrashLocationData()
                if (!cancelled) setHeatMapData(data)
            } catch (err) {
                if (!cancelled) setError(`Failed to load crash locations: ${err}`)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        getCrashData()
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <div className="flex h-full min-h-0 w-full flex-col gap-3 px-4 py-3 lg:px-10 lg:py-4">
            <header className="shrink-0">
                <h1 className="text-lg font-bold text-(--color-text) sm:text-xl">NYC Motorcycle Accident Map</h1>
                <p className="text-xs text-(--color-muted)">
                    Fatal and non-fatal motorcycle crash density across the five boroughs.
                </p>
            </header>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/5 bg-(--color-surface) shadow-xl shadow-black/25">
                <Suspense
                    fallback={
                        <div className="flex h-full w-full items-center justify-center">
                            <LoadSpinner />
                        </div>
                    }
                >
                    <NYCMap data={heatMapData} />
                </Suspense>

                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-(--color-surface)/70">
                        <LoadSpinner />
                    </div>
                )}
                {!loading && error && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <ErrorMessage message={error} />
                    </div>
                )}
            </div>
        </div>
    )
}
