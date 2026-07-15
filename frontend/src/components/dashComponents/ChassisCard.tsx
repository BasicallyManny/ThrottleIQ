import type { ChassisCardProps } from "../../interface/MotoInterface";
import { SpecCard } from "./shared/SpecCard";
import { StatTile } from "./shared/StatTile";

export const ChassisCard = (params: ChassisCardProps) => {

    const specs = [
        { label: "Frame", value: params.frame },
        { label: "Total Height", value: params.total_height },
        { label: "Front Suspension", value: params.front_suspension },
        { label: "Total Width", value: params.total_width },
        { label: "Rear Suspension", value: params.rear_suspension },
        { label: "Total Length", value: params.total_length },
    ];

    const footerSpecs = [
        { label: "Wheelbase", value: params.wheelbase },
        { label: "Seat Height", value: params.seat_height },
        { label: "Ground Clearance", value: params.ground_clearance },
    ];

    return (
        <SpecCard title="Chassis">
            <div className="grid grid-cols-3 gap-3">
                {specs.map((spec) => (
                    <StatTile key={spec.label} label={spec.label} value={spec.value} />
                ))}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3 border-t border-(--color-border) pt-3 text-center">
                {footerSpecs.map((spec) => (
                    <StatTile key={spec.label} label={spec.label} value={spec.value} variant="footer" />
                ))}
            </div>
        </SpecCard>
    );
};
