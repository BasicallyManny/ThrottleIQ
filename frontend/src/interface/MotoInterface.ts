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
    image_url:string | null;
    raw_specs:Record<string,string>;
}