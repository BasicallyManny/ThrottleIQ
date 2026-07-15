import type { PerformanceCardProps } from "../../interface/MotoInterface";
import { SpecCard } from "./shared/SpecCard";
import { StatTile } from "./shared/StatTile";

export const PerformanceCard = ({ horsepower, torque_nm, weight_kg }: PerformanceCardProps) => {

    const performanceStats = [
        { label: "Horsepower", value: horsepower !== null ? `${horsepower} HP` : null },
        { label: "Torque", value: torque_nm !== null ? `${torque_nm} Nm` : null },
        { label: "Total Weight", value: weight_kg !== null ? `${weight_kg} kg` : null },
    ];

    return (
        <SpecCard title="Performance" className="w-full">
            <div className="grid grid-cols-3 gap-3">
                {performanceStats.map((spec) => (
                    <StatTile key={spec.label} label={spec.label} value={spec.value} />
                ))}
            </div>
        </SpecCard>
    );
};
