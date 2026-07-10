export interface  SearchFormData {
    year:string;
    model:string;
    make:string;
    raw_specs:object | null;
}

export interface SearchFormProps{
    onSearch: (data:SearchFormData) => void
}

export interface Motorcycle {
    year:string ;
    make:string ;
    model:string ;
    raw_specs:{
        "make": string;
        "model": string;
        "year": string;
        "top_speed": string;
    } | null;
}