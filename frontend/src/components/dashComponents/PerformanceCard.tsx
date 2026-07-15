import type { PeromanceCardProps } from "../../interface/MotoInterface"
import { CgUnavailable } from "react-icons/cg";

export const PerformanceCard = ({ horsepower, torque_nm, weight_kg }: PeromanceCardProps) => {

    const performanceStats = [
        {label: "Horsepower", value: (horsepower ? <>{horsepower} HP</> : <CgUnavailable color="red"/>)},
        { label: "Torque", value: (torque_nm ? <>{torque_nm} Nm </> : <CgUnavailable color="red"/>) },
        { label: "Total Weight", value: (weight_kg ? <>{weight_kg} kg</> : <CgUnavailable color="red"/>) },

    ]
    return (
        <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-lg w-full overflow-clip">
            <h2 className="mb-6 text-lg font-bold text-(--color-text)">
                Performance
            </h2>

            <div className="grid grid-rows-2 gap-4">
                {/* <div className="rounded-lg bg-(--color-background) p-4">
                    <p className="text-sm text-(--color-muted)">Horsepower</p>
                    <p className="mt-2 text-3xl font-bold text-(--color-text)">
                        {horsepower ? <>{horsepower}<span className="text-lg font-normal">HP</span></> : <>---</>}
                    </p>
                    <p className="mt-1 text-sm text-(--color-muted)">@ 8000 RPM</p>
                </div> */}

                {performanceStats.map((spec) => (
                    <div key={spec.label} className="rounded-lg bg-(--color-background) p-4">
                        <p className="text-sm text-(--color-muted)">{spec.label}</p>
                        <p className="mt-2 text-lg font-bold text-(--color-text)">
                            {spec.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}