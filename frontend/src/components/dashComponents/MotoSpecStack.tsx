import type { Motorcycle } from "../../interface/MotoInterface";
import { PerformanceCard } from "./PerformanceCard";
import { EngineCard } from "./EngineCard";
import { ChassisCard } from "./ChassisCard";
import { useMotoCardProps } from "../../hooks/useMotoCardProps";

interface MotoSpecStackProps {
    motorcycle: Motorcycle;
}

export const MotoSpecStack = ({ motorcycle }: MotoSpecStackProps) => {
    const { engineProps, chasisProps, performanceProps } = useMotoCardProps(motorcycle);

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
            <PerformanceCard {...performanceProps} />
            {engineProps && <EngineCard {...engineProps} />}
            {chasisProps && <ChassisCard {...chasisProps} />}
        </div>
    );
};
