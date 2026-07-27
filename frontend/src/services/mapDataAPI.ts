import axios from 'axios'
import type {CrashHeatMap} from '../interface/mapInterface'


const URL_BASE_API_DEV = import.meta.env.VITE_URL_BASE_API_DEV;


export const getCrashLocationData = async():Promise<CrashHeatMap> =>{
    const response = await axios.get<CrashHeatMap>(`${URL_BASE_API_DEV}/api/crashStats/get_accident_locations`)
    return response.data
}