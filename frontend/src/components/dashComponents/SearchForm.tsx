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
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="flex w-full max-w-xl items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) p-1.5"
            >
                <input
                    value={formData.year ?? ""}
                    onChange={handleChange}
                    name="year"
                    type="text"
                    placeholder="Year"
                    autoComplete="off"
                    className="w-20 rounded-full bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-(--color-muted)"
                />

                <input
                    value={formData.make}
                    onChange={handleChange}
                    name="make"
                    type="text"
                    placeholder="Make"
                    autoComplete="off"
                    className="min-w-0 flex-1 rounded-full bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-(--color-muted)"
                />

                <input
                    value={formData.model}
                    onChange={handleChange}
                    name="model"
                    type="text"
                    placeholder="Model"
                    autoComplete="off"
                    className="min-w-0 flex-1 rounded-full bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-(--color-muted)"
                />

                <button
                    type="submit"
                    className="rounded-full bg-(--color-border) px-4 py-1.5 text-sm font-medium text-(--color-background) transition hover:brightness-110"
                >
                    Search
                </button>
            </form>
        </div>
    );
}