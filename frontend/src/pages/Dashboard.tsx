import { useState } from "react";
import axios from "axios";

import { SearchForm } from "../components/dashComponents/SearchForm";
import type { SearchFormData, Motorcycle } from "../interface/MotoInterface";
import { MotoTitleCard } from "../components/dashComponents/MotoTitleCard"
import { MotoSpecStack } from "../components/dashComponents/MotoSpecStack";
import { LoadSpinner } from "../components/UIComponents/LoadSpinner"
import { ErrorMessage } from "../components/UIComponents/ErrorMessage";
import { getMotoSpecs } from "../services/motorycleAPI";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaCodeCompare } from "react-icons/fa6";



export const Dashboard = () => {

    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null)
    const [secondBike, setSecondBike] = useState<Motorcycle | null>(null)

    const [loading, setLoading] = useState<boolean>(false)
    const [comparing, setComparing] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    //Form Data is propped up from onSearch function we use that Form to call the FastAPI endpoint
    async function handleSearch(data: SearchFormData, dataSet: (data: Motorcycle) => void) {
        //if no searchValue dont do anything
        try {
            setLoading(true)
            console.log(data)
            const motoData = await getMotoSpecs(data)
            dataSet(motoData)
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
            <div className="flex flex-col w-full justify-center items-center lg:flex-row">
                <SearchForm onSearch={(data) => handleSearch(data, setMotorcycle)} />

                <button
                    onClick={() => {
                        if (comparing) {
                            setSecondBike(null);
                        }
                        setComparing(prev => !prev)
                    }}
                    className={`flex justify-center m-2 p-2 rounded-full transition-all duration-200 ease-in-out w-1/20
                             ${comparing
                            ? "bg-[#f18f01] text-white shadow-md scale-105"
                            : "bg-[#f18f01] text-[#151d2e] hover:scale-105 hover:text-gray-700"
                        }`}
                >
                    <FaCodeCompare className={`text-lg transition-transform duration-200 ${comparing ? "rotate-180" : "rotate-0"}`} />
                </button>

                {comparing && <SearchForm onSearch={(data) => handleSearch(data, setSecondBike)} />}
            </div>
            {loading ? (
                <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                    <LoadSpinner />
                </div>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : motorcycle || secondBike ? (
                <div className="flex flex-col lg:flex-row w-full mt-3 px-8 gap-4">
                    {motorcycle && (
                        <div className="flex flex-col w-full gap-4">
                            <MotoTitleCard
                                make={motorcycle.make || ""}
                                model={motorcycle.model || ""}
                                year={motorcycle.year || ""}
                                image_url={
                                    motorcycle.image_url ||
                                    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                                }
                                horsepower={motorcycle.horsepower}
                                torque_nm={motorcycle.torque_nm}
                                weight_kg={motorcycle.weight_kg}
                                displacement={motorcycle.displacement}
                            />
                            <MotoSpecStack motorcycle={motorcycle} />
                        </div>
                    )}

                    {comparing && secondBike && (
                        <div className="flex flex-col w-full gap-4">
                            <MotoTitleCard
                                make={secondBike.make || ""}
                                model={secondBike.model || ""}
                                year={secondBike.year || ""}
                                image_url={
                                    secondBike.image_url ||
                                    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                                }
                                horsepower={secondBike.horsepower}
                                torque_nm={secondBike.torque_nm}
                                weight_kg={secondBike.weight_kg}
                                displacement={secondBike.displacement}
                            />
                            <MotoSpecStack motorcycle={secondBike} />
                        </div>
                    )}
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
