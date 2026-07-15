export interface  SearchFormData {
    year:string;
    model:string;
    make:string;
}

export interface SearchFormProps{
    onSearch: (data:SearchFormData) => void
}

export interface Motorcycle {
    id:number
    year:string ;
    make:string ;
    model:string ;
    image_url:string |null;
    horsepower:number| null;
    torque_nm:number | null;
    weight_kg:number | null;

    raw_specs:Record<string,string>;
}

export interface MotoTitleCardProps{
    make:string;
    model:string;
    year:string;
    image_url:string;
}

export interface PeromanceCardProps{
    horsepower:number| null;
    torque_nm:number | null;
    weight_kg:number | null;
}

export interface EngineCardProps{
    engine:string | null;
    displacement:string | null;
    compression:string | null;
    cooling:string | null;
    fuel_system:string | null;
    valves_per_cylinder:string| null;
    gearbox:string | null;
    fuel_tank:string| null
}

export interface ChasisCardProps{
    frame:string | null;
    front_suspension : string | null;
    rear_suspension: string | null;
    ground_clearance: string | null;
    wheelbase:string | null;
    seat_height:string | null;
    total_width: string | null;
    total_height: string | null;
    total_length: string | null;
}