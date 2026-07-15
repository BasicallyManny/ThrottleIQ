import type { ChasisCardProps } from "../../interface/MotoInterface";
import { CgUnavailable } from "react-icons/cg";


export const ChassisCard = (params: ChasisCardProps) => {

    const specs = [
        { label: "Frame", value: params.frame },
        { label: "Total Height", value: params.total_height },
        { label: "Front Suspension", value: params.front_suspension },
        { label: "Total Width", value: params.total_width },
        { label: "Rear Suspension", value: params.rear_suspension },
        { label: "Total Length", value: params.total_length },
    ]

    const footerSpecs = [
        { label: "Wheelbase", value: params.wheelbase },
        { label: "Seat Height", value: params.seat_height },
        { label: "Ground Clearance", value: params.ground_clearance },
    ]
    return (
        <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-6 shadow-lg overflow-clip">
            <h2 className="mb-6 text-xl font-bold text-(--color-text)">
                Chassis
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {/* <div className="rounded-lg bg-(--color-background) p-4">
                    <p className="text-sm text-(--color-muted)">Frame</p>
                </div> */}
                {specs.map((spec) => (
                    <div key={spec.label} className="rounded-lg bg-(--color-background) p-4 overflow-clip">
                        <p className="text-sm text-(--color-muted)">{spec.label}</p>
                        <p className="mt-2 text-md font-bold text-(--color-text)">
                            {spec.value || null ? <>{spec.value}</> : <CgUnavailable color="red"/>}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex w-full justify-around border-t border-(--color-border) pt-4 text-center">

                {/* <div>
                    <p className="text-xl font-bold text-(--color-text)">
                        1370<span className="text-sm font-normal">mm</span>
                    </p>
                    <p className="text-sm text-(--color-muted)">
                        Wheelbase
                    </p>
                </div> */}
                {footerSpecs.map((spec) => (
                    <div key={spec.label}>
                        <p className="text-md font-bold text-(--color-text)">
                            {spec.value ? <>{spec.value}</>: <CgUnavailable color="red"/>}
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