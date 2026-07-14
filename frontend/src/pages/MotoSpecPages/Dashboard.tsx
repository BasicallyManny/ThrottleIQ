import {useState} from "react";
import axios from "axios";

import {SearchForm} from "../../components/dashComponents/SearchForm";
import type {SearchFormData,Motorcycle } from "../../interface/MotoInterface";
import {MotoTitleCard} from "../../components/dashComponents/MotoTitleCard"
import { getMotoSpecs } from "../../services/motorycleAPI";

export const Dashboard = () =>{

    const [motorcycle, setMotorcycle]=useState<Motorcycle | null>(null)
    const [loading,setLoading]=useState<boolean>(false)
    const[error,setError]=useState<string|null>(null)

    //Form Data is propped up from onSearch function we use that Form to call the FastAPI endpoint
    async function handleSearch(data:SearchFormData){
        //if no searchValue dont do anything
        try {
            setLoading(true)
            console.log(data)
            const motoData = await getMotoSpecs(data)
            setMotorcycle(motoData)
        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response?.status===404){
                    setError("Motorcycle not found")
                } else if(error.response?.status===502){
                    setError("Upstream value source returned invalid Data")
                } else{
                    setError("Something went wrong please try again")
                }
            } else{
                setError("An unexpected error occured")
            }
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="flex flex-col w-full h-full">
            {/**Collect Motorcycle data*/}
            <SearchForm onSearch={handleSearch}/>
            {loading && <div className="text-center mt-6 text-orange-600">Loading...</div>}
            {error && <div className="text-center mt-6 text-red-500">{error}</div>}
            {motorcycle ? (
                <div className="flex flex-col h-full w-full mt-3 p-4 items-center">
                    <MotoTitleCard make={motorcycle.make || ""} model={motorcycle.model || ""} year={motorcycle.year || ""} image_url={motorcycle.image_url || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} />
                </div>
            ):(
                <div>No SEARCH DATA</div>
            )}
        </div>
    )
}