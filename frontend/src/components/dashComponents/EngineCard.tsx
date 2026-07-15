import type { EngineCardProps } from "../../interface/MotoInterface";
import { CgUnavailable } from "react-icons/cg";

export const EngineCard = (params: EngineCardProps) => {

    const specs = [
        { label: "Engine", value: params.engine },
        { label: "Displacement", value: params.displacement, size: "large", },
        {label: "Compression",value: params.compression,size: "large",},
        {label: "Cooling",value: params.cooling},
        {label: "Fuel System",value: params.fuel_system,},
        {label: "Valves Per Cylinder",value: params.valves_per_cylinder },
    ];

    const footerStats = [
        {label: "Gearbox",value: params.gearbox},
        {label: "Fuel Tank",value: (<>{params.fuel_tank}</> ),},
    ];

    return (
        <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-lg w-full overflow-clip">
            <h2 className="mb-6 text-xl font-bold text-(--color-text)">
                Engine Specs
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {specs.map((spec) => (
                    <div key={spec.label} className="rounded-lg bg-(--color-background) p-4">
                        <p className="text-sm text-(--color-muted)">
                            {spec.label}
                        </p>

                        <p className={`mt-2 font-bold text-(--color-text) ${spec.size === "large" ? "text-lg" : "text-md"}`}>
                            {spec.value || null ? <>{spec.value}</> : <CgUnavailable color="red"/>}
                        </p>
                    </div>
                ))}

            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-(--color-border) pt-4 text-center">
                {footerStats.map((spec) => (
                    <div key={spec.label}>
                        <p className="text-md font-bold text-(--color-text)">
                            {spec.value ? <>{spec.value}</> : <CgUnavailable color="red"/>}
                        </p>
                        <p className="text-sm text-(--color-muted)">
                            {spec.label}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
};