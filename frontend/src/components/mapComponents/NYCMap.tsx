/**
 * MapLibre GL JS renders the NYC base map; deck.gl overlays a WebGL heatmap of
 * motorcycle crash density. DeckGL owns the camera in this integration - Map is
 * a passive child renderer, so all pan/zoom/bounds logic lives on DeckGL's
 * controller + viewState, not on Map's own props.
 */
import { useCallback, useMemo, useState } from 'react'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { DeckGL } from '@deck.gl/react'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import type { CrashHeatMap, CrashLocation } from '../../interface/mapInterface'
import { useElementSize } from '../../hooks/useElementSize'
import { MapLayerControls } from './MapLayerControls'
import {
    MAP_STYLE,
    NYC_BOUNDS,
    FATAL_COLOR,
    NON_FATAL_COLOR,
    getFittedViewState,
    clampZoomAndTilt,
    type MapViewState,
} from '../../constants/mapConstants'

interface NYCMapProps {
    data: CrashHeatMap | null
}

const EMPTY_LOCATIONS: CrashLocation[] = []

// Stable references so deck.gl doesn't see a "new" accessor prop on every render.
const getPosition = (d: CrashLocation): [number, number] => [d.longitude, d.latitude]
const getWeight = () => 1

function heatmapColorRange(rgb: [number, number, number]): [number, number, number, number][] {
    const [r, g, b] = rgb
    return [0.15, 0.3, 0.45, 0.6, 0.8, 1].map((alpha) => [r, g, b, Math.round(alpha * 255)])
}

const FATAL_COLOR_RANGE = heatmapColorRange(FATAL_COLOR)
const NON_FATAL_COLOR_RANGE = heatmapColorRange(NON_FATAL_COLOR)

export const NYCMap = ({ data }: NYCMapProps) => {
    const { ref: containerRef, size: containerSize } = useElementSize<HTMLDivElement>()
    // User-driven camera changes (pan/zoom). Stays null until the first interaction,
    // so the camera starts out fitted to the container's real measured size below.
    const [userViewState, setUserViewState] = useState<MapViewState | null>(null)

    const fittedViewState = useMemo(
        () => (containerSize ? getFittedViewState(containerSize.width, containerSize.height) : null),
        [containerSize]
    )
    const viewState = userViewState ?? fittedViewState

    const [showFatal, setShowFatal] = useState(true)
    const [showNonFatal, setShowNonFatal] = useState(true)

    const handleViewStateChange = useCallback(({ viewState: next }: { viewState: Record<string, unknown> }) => {
        setUserViewState((current) => clampZoomAndTilt({ ...(current ?? fittedViewState), ...next } as MapViewState))
    }, [fittedViewState])

    const fatalLocations = data?.fatal_locations ?? EMPTY_LOCATIONS
    const allLocations = data?.locations ?? EMPTY_LOCATIONS

    // The API only returns "all" and "fatal" sets; derive non-fatal once per fetch.
    const nonFatalLocations = useMemo(() => {
        if (fatalLocations.length === 0) return allLocations
        const fatalIds = new Set(fatalLocations.map((loc) => loc.collision_id))
        return allLocations.filter((loc) => !fatalIds.has(loc.collision_id))
    }, [allLocations, fatalLocations])

    // Both layers stay mounted at all times; toggling flips `visible` instead of
    // adding/removing them from the array. Removing a HeatmapLayer tears down its
    // GPU aggregation resources (FBOs/textures), and re-adding it immediately on
    // the next toggle can crash the WebGL context - `visible` is the cheap, safe
    // way deck.gl expects layer show/hide to be done.
    const layers = useMemo(
        () => [
            new HeatmapLayer({
                id: 'non-fatal-heatmap',
                data: nonFatalLocations,
                getPosition,
                getWeight,
                radiusPixels: 25,
                colorRange: NON_FATAL_COLOR_RANGE,
                opacity: 0.75,
                visible: showNonFatal,
            }),
            new HeatmapLayer({
                id: 'fatal-heatmap',
                data: fatalLocations,
                getPosition,
                getWeight,
                radiusPixels: 25,
                colorRange: FATAL_COLOR_RANGE,
                opacity: 0.85,
                visible: showFatal,
            }),
        ],
        [showFatal, showNonFatal, fatalLocations, nonFatalLocations]
    )

    const toggleFatal = useCallback(() => setShowFatal((v) => !v), [])
    const toggleNonFatal = useCallback(() => setShowNonFatal((v) => !v), [])

    return (
        <div ref={containerRef} className="relative h-full w-full">
            {viewState && (
                <DeckGL
                    viewState={viewState}
                    onViewStateChange={handleViewStateChange}
                    controller={{ dragRotate: false, touchRotate: false, maxBounds: NYC_BOUNDS }}
                    layers={layers}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Map mapStyle={MAP_STYLE} style={{ width: '100%', height: '100%' }} />
                </DeckGL>
            )}
            <MapLayerControls
                showFatal={showFatal}
                showNonFatal={showNonFatal}
                onToggleFatal={toggleFatal}
                onToggleNonFatal={toggleNonFatal}
                fatalCount={fatalLocations.length}
                nonFatalCount={nonFatalLocations.length}
            />
        </div>
    )
}
