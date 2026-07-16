import { useMemo } from "react";
import type { Motorcycle, EngineCardProps, ChassisCardProps } from "../interface/MotoInterface";

interface MotoCardProps {
    engineProps: EngineCardProps | null;
    chasisProps: ChassisCardProps | null;
}

export function useMotoCardProps(motorcycle: Motorcycle | null): MotoCardProps {
    return useMemo(() => {
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

        const chasisProps: ChassisCardProps | null = motorcycle ? {
            frame: motorcycle.raw_specs["frame"],
            front_suspension: motorcycle.raw_specs["front_suspension"],
            rear_suspension: motorcycle.raw_specs["rear_suspension"],
            ground_clearance: motorcycle.raw_specs["ground_clearance"],
            wheelbase: motorcycle.raw_specs["wheelbase"],
            seat_height: motorcycle.raw_specs["seat_height"],
            total_width: motorcycle.raw_specs["total_width"],
            total_height: motorcycle.raw_specs["total_height"],
            total_length: motorcycle.raw_specs["total_length"],
        } : null;

        return { engineProps, chasisProps };
    }, [motorcycle]);
}
