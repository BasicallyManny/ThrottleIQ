import type { EngineCardProps } from "../../interface/MotoInterface";
import { SpecCard } from "./shared/SpecCard";
import { StatTile } from "./shared/StatTile";

export const EngineCard = (params: EngineCardProps) => {

    const specs = [
        { label: "Engine", value: params.engine },
        { label: "Displacement", value: params.displacement, size: "base" as const },
        { label: "Compression", value: params.compression, size: "base" as const },
        { label: "Cooling", value: params.cooling },
        { label: "Fuel System", value: params.fuel_system },
        { label: "Valves Per Cylinder", value: params.valves_per_cylinder },
    ];

    const footerStats = [
        { label: "Gearbox", value: params.gearbox },
        { label: "Fuel Tank", value: params.fuel_tank },
    ];

    return (
        <SpecCard title="Engine Specs" className="w-full">
            <div className="grid grid-cols-3 gap-3">
                {specs.map((spec) => (
                    <StatTile key={spec.label} label={spec.label} value={spec.value} size={spec.size} />
                ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-(--color-border) pt-3 text-center">
                {footerStats.map((spec) => (
                    <StatTile key={spec.label} label={spec.label} value={spec.value} variant="footer" />
                ))}
            </div>
        </SpecCard>
    );
};
