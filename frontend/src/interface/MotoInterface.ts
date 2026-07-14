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
    weight_kg:number | null

    raw_specs:Record<string,string>;
}

export interface MotoTitleCardProps{
    make:string;
    model:string;
    year:string;
    image_url:string;
}