import { WebMercatorViewport } from '@deck.gl/core'

export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

// Southwest / northeast corners covering all five NYC boroughs with a small margin.
// Used both to fit the initial camera and to clamp how far a user can pan.
export const NYC_BOUNDS: [[number, number], [number, number]] = [
    [-74.29, 40.475],
    [-73.68, 40.925],
]

export const NYC_MIN_ZOOM = 9
export const NYC_MAX_ZOOM = 18

// Mirror the app's validated categorical chart palette (--color-chart-cat-8 / --color-chart-cat-1)
// so the map reads consistently with the rest of the dashboard.
export const FATAL_COLOR: [number, number, number] = [230, 103, 103]
export const NON_FATAL_COLOR: [number, number, number] = [57, 135, 229]

export interface MapViewState {
    longitude: number
    latitude: number
    zoom: number
    bearing: number
    pitch: number
}

/** Fits the NYC bounds to the given viewport pixel size, so the initial camera frames all five boroughs regardless of device/window size. */
export function getFittedViewState(width: number, height: number): MapViewState {
    const viewport = new WebMercatorViewport({ width, height })
    const { longitude, latitude, zoom } = viewport.fitBounds(NYC_BOUNDS, { padding: 24 })

    return {
        longitude,
        latitude,
        zoom: Math.min(Math.max(zoom, NYC_MIN_ZOOM), NYC_MAX_ZOOM),
        bearing: 0,
        pitch: 0,
    }
}

/** Clamps zoom and locks rotate/pitch, which the flat crash map doesn't use.
 * Pan is constrained separately via the controller's native `maxBounds`. */
export function clampZoomAndTilt(viewState: MapViewState): MapViewState {
    return {
        ...viewState,
        zoom: Math.min(Math.max(viewState.zoom, NYC_MIN_ZOOM), NYC_MAX_ZOOM),
        bearing: 0,
        pitch: 0,
    }
}
