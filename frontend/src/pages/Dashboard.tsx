import { useState } from "react";
import axios from "axios";
import { SearchForm } from "../components/dashComponents/SearchForm";
import  DataTransparencyCard  from "../components/UIComponents/DataTransparencyCard"
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
            setError(null)
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

    const hasResults = Boolean(motorcycle || secondBike)

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 lg:flex-row lg:gap-6 lg:px-10">
            <DataTransparencyCard
                className="w-full shrink-0 lg:w-72 lg:self-start"
                sections={[
                    {
                        label: "Data Source",
                        content:
                            "API Ninjas motorcycle API",
                    },
                    {
                        label: "Coverage",
                        content:
                            "Motorcycle specifications from manufacturers worldwide. Coverage varies by manufacturer, model year, and available source data.",
                    },
                    {
                        label: "Limitations",
                        content:
                            `The API Ninjas Motorcycle API provides manufacturer-supplied and publicly available motorcycle specifications. Not every motorcycle, trim, or model year may be available, and some records may have missing or incomplete specification fields depending on the source data.

For consistency and accuracy, ThrottleIQNYC displays only the data returned by the API. Specifications such as engine displacement, horsepower, torque, weight, fuel capacity, and seat height may vary by market, model variant, or manufacturer revisions and should be used as a general reference rather than an official specification sheet.`,
                    },
                ]}
                sourceUrl="https://api-ninjas.com/api/motorcycles"
            />

            <div className="flex w-full min-w-0 flex-1 flex-col">
                <header className="mb-3 flex shrink-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h1 className="text-lg font-bold text-(--color-text) sm:text-xl">Motorcycle Spec Lookup</h1>
                    <p className="text-xs text-(--color-muted) sm:text-right">
                        Search by year, make, and model — or compare two bikes side by side.
                    </p>
                </header>

                <div className="flex shrink-0 flex-col items-center justify-center gap-2 lg:flex-row">
                    <SearchForm onSearch={(data) => handleSearch(data, setMotorcycle)} />

                    <button
                        onClick={() => {
                            if (comparing) {
                                setSecondBike(null);
                            }
                            setComparing(prev => !prev)
                        }}
                        aria-pressed={comparing}
                        aria-label="Compare a second motorcycle"
                        className={`flex shrink-0 justify-center rounded-full border border-(--color-border) p-2.5 transition-all duration-200 ease-in-out
                             ${comparing
                                ? "scale-105 bg-(--color-border) text-(--color-background) shadow-md shadow-black/25"
                                : "bg-transparent text-(--color-border) hover:scale-105 hover:bg-(--color-border)/10"
                            }`}
                    >
                        <FaCodeCompare className={`text-lg transition-transform duration-200 ${comparing ? "rotate-180" : "rotate-0"}`} />
                    </button>

                    {comparing && <SearchForm onSearch={(data) => handleSearch(data, setSecondBike)} />}
                </div>

                <div className="mt-2 min-h-0 flex-1">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <LoadSpinner />
                        </div>
                    ) : error ? (
                        <div className="py-16">
                            <ErrorMessage message={error} />
                        </div>
                    ) : hasResults ? (
                        <div className="flex flex-col gap-4 lg:flex-row">
                            {motorcycle && (
                                <div className="flex w-full flex-col gap-4">
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
                                <div className="flex w-full flex-col gap-4">
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
                        <div className="flex min-h-80 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-(--color-surface)/40 text-center">
                            <GiFullMotorcycleHelmet size={72} className="text-(--color-muted)" />

                            <h3 className="text-base font-medium text-(--color-text)">
                                No search results yet
                            </h3>

                            <p className="text-sm text-(--color-muted)">
                                Use the search bar above to find what you're looking for.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
