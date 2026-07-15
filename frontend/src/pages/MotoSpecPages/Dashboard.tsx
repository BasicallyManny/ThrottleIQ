import { useState } from "react";
import axios from "axios";

import { SearchForm } from "../../components/dashComponents/SearchForm";
import type { SearchFormData, Motorcycle, EngineCardProps, ChasisCardProps } from "../../interface/MotoInterface";
import { MotoTitleCard } from "../../components/dashComponents/MotoTitleCard"
import { PerformanceCard } from "../../components/dashComponents/PerformanceCard"
import { EngineCard } from "../../components/dashComponents/EngineCard";
import { ChassisCard } from "../../components/dashComponents/ChasisCard";
import { LoadSpinner } from "../../components/UIComponents/LoadSpinner"
import { getMotoSpecs } from "../../services/motorycleAPI";
import { GiFullMotorcycleHelmet } from "react-icons/gi";



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

    const engineProps: EngineCardProps | null = motorcycle ? {
        engine: motorcycle.raw_specs["engine"],
        displacement: motorcycle.raw_specs["displacement"],
        compression: motorcycle.raw_specs["compression"],
        cooling: motorcycle.raw_specs["cooling"],
        valves_per_cylinder: motorcycle.raw_specs["valves_per_cylinder"],
        gearbox: motorcycle.raw_specs["gearbox"],
        fuel_tank: motorcycle.raw_specs["fuel_capacity"],
        fuel_system: motorcycle.raw_specs["fuel_system"],

    } : null;

    const chasisProps: ChasisCardProps | null = motorcycle ? {
        frame: motorcycle.raw_specs["frame"],
        front_suspension: motorcycle.raw_specs["front_suspension"],
        rear_suspension: motorcycle.raw_specs["rear_suspension"],
        ground_clearance: motorcycle.raw_specs["ground_clearance"],
        wheelbase: motorcycle.raw_specs["wheelbase"],
        seat_height: motorcycle.raw_specs["seat_height"],
        total_width: motorcycle.raw_specs["total_width"],
        total_height: motorcycle.raw_specs["total_height"],
        total_length: motorcycle.raw_specs["total_length"],
    } : null

    return (
        <div className="flex flex-col w-full h-full relative">
            <SearchForm onSearch={handleSearch} />
            {loading ? (
                <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                    <LoadSpinner />
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
                <div className="flex flex-col w-full mt-3 py-4 px-8 gap-4">
                    <MotoTitleCard
                        make={motorcycle.make || ""}
                        model={motorcycle.model || ""}
                        year={motorcycle.year || ""}
                        image_url={
                            motorcycle.image_url ||
                            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                        }
                    />
                    <div className="flex w-full  flex-col gap-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <PerformanceCard
                                weight_kg={motorcycle.weight_kg}
                                torque_nm={motorcycle.torque_nm}
                                horsepower={motorcycle.horsepower}
                            />

                            {engineProps && (
                                <EngineCard {...engineProps} />
                            )}
                        </div>
                        {chasisProps && (
                            <ChassisCard {...chasisProps} />
                        )}
                    </div>
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