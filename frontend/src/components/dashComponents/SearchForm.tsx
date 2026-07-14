import { useState } from 'react'
//import{getMotoSpecs} from '../../services/motorycleAPI'
import type { SearchFormProps, SearchFormData } from '../../interface/MotoInterface';


export const SearchForm = ({ onSearch }: SearchFormProps) => {
    // ex: passes {
    //      year:2017,
    //      make:kawsaki,
    //      model: Ninja 400
    //  } up to the parent
    const [formData, setFormData] = useState<SearchFormData>({
        year: "",
        make: "",
        model: "",
    })


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        //check if the year is valid
        const YEAR_REGEX = /^\d{4}$/;
        if (!YEAR_REGEX.test(formData.year)) {
            alert("Please enter a valid 4-digit year");
            return;
        }
        //check if model input field is empty
        if (!formData.model) {
            alert("Please Enter a valid model")
            return
        }
        //check if make input field is empty
        if (!formData.make) {
            alert("Please Enter a valid make")
            return
        }
        onSearch(formData)
    }


    return (
        <div className="flex justify-center px-4">
            <form onSubmit={handleSubmit} autoComplete='off' className="flex w-full max-w-3xl flex-col gap-3 rounded-2xl border border-(--color-border) bg-(--color-surface) p-4 shadow-xl sm:flex-row" >
                <input value={formData.year ?? ""}  autoComplete='off' onChange={handleChange} name="year" type="text" placeholder="Year" className="sm:flex-1 rounded-md bg-transparent px-3 py-2 outline-none placeholder:text-(--color-muted)" />
                <input value={formData.make}  autoComplete='off' onChange={handleChange} name="make" type="text" placeholder="Make" className="sm:flex-1 rounded-md bg-transparent px-3 py-2 outline-none placeholder:text-(--color-muted)" />
                <input value={formData.model}  autoComplete='off' onChange={handleChange} name="model" type="text" placeholder="model" className="sm:flex-1 rounded-md bg-transparent px-3 py-2 outline-none placeholder:text-(--color-muted)" />
                <button type="submit" className="rounded-md bg-(--color-border) px-5 py-2 font-semibold text-(--color-background) transition hover:brightness-110 hover:scale-105">
                    Search
                </button>
            </form>
        </div>
    );
}