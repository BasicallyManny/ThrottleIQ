import axios from "axios";

const URL_BASE_API_DEV = import.meta.env.VITE_URL_BASE_API_DEV;

export const getSeverityBreakdownVyMotorcycleInvolved = async () => {
    const response = await axios.get(`${URL_BASE_API_DEV}/api/crashStats/get_severity_breakdown_by_motorcycle_involved`)
    return response.data
}

export const loadMotorcycleAccidentsPerHour = async () =>{
    const response= await axios.get(`${URL_BASE_API_DEV}/api/crashStats/get_motorcycle_accident_breakdown_by_hour`)
    return response.data
}

export const loadMotorcycleFatalitiesPerHour =async () =>{
    const response= await axios.get(`${URL_BASE_API_DEV}/api/crashStats/get_motorcycle_fatalitity_breakdown_by_hour`)
    return response.data
}

export const loadMotorcycleFatalitiesPerYear =async () =>{
    const response= await axios.get(`${URL_BASE_API_DEV}/api/crashStats/get_motorcycle_fatalitity_breakdown_by_year`)
    return response.data
}

export const loadMotorcycleAccidentsPerMonth = async() => {
    const response= await axios.get(`${URL_BASE_API_DEV}/api/crashStats/get_motorcycle_accident_breakdown_by_month`)
    return response.data
}

export const loadMotorcycleFatalitiesPerMonth = async() => {
    const response= await axios.get(`${URL_BASE_API_DEV}/api/crashStats/get_motorcycle_fatalitity_breakdown_by_month`)
    return response.data
}

export const loadMotoAccidentPerBorough = async () =>{
    const response= await axios.get(`${URL_BASE_API_DEV}/api/crashStats/get_motorcycle_accident_by_borough`)
    return response.data
}

export const loadMotorcycleAccidentFactor = async () =>{
    const response = await axios.get(`${URL_BASE_API_DEV}/api/crashStats/get_motorcycle_accident_factor`)
    return response.data
}

export const loadMotorcycleFatalityFactor = async () =>{
    const response = await axios.get(`${URL_BASE_API_DEV}/api/crashStats/get_motorcycle_fatality_factor`)
    return response.data
}

