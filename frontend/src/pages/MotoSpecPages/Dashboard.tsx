import { useState } from "react";
import axios from "axios";

import { SearchForm } from "../../components/dashComponents/SearchForm";
import type { SearchFormData, Motorcycle } from "../../interface/MotoInterface";
import { MotoTitleCard } from "../../components/dashComponents/MotoTitleCard"
import { getMotoSpecs } from "../../services/motorycleAPI";
import { GiFullMotorcycleHelmet, GiCartwheel } from "react-icons/gi";



export const Dashboard = () => {

    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    //Form Data is propped up from onSearch function we use that Form to call the FastAPI endpoint
    async function handleSearch(data: SearchFormData) {
        //if no searchValue dont do anything
        try {
            setLoading(true)
            console.log(data)
            const motoData = await getMotoSpecs(data)
            setMotorcycle(motoData)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    setError("Motorcycle not found")
                } else if (error.response?.status === 502) {
                    setError("Upstream value source returned invalid Data")
                } else {
                    setError("Something went wrong please try again")
                }
            } else {
                setError("An unexpected error occured")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col w-full h-full relative">
            <SearchForm onSearch={handleSearch} />

            {loading ? (
                <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center">
                        <GiCartwheel className="h-10 w-10 animate-spin rounded-full border-t-transparent" />
                        <p className="mt-3">Loading motorcycle data...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="flex h-full w-full flex-col items-center justify-center text-center">
                    <h3 className="text-base font-medium text-red-500">
                        Something went wrong
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {error}
                    </p>
                </div>
            ) : motorcycle ? (
                <div className="flex flex-col h-full w-full mt-3 p-4 items-center">
                    <MotoTitleCard
                        make={motorcycle.make || ""}
                        model={motorcycle.model || ""}
                        year={motorcycle.year || ""}
                        image_url={
                            motorcycle.image_url ||
                            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                        }
                    />
                </div>
            ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-center">
                    <GiFullMotorcycleHelmet size={100} />

                    <h3 className="text-base font-medium text-gray-700">
                        No search results yet
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        Use the search bar above to find what you're looking for.
                    </p>
                </div>
            )}
        </div>
    )
}