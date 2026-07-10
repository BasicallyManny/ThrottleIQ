import { useState } from 'react'
import type { SearchFormData } from '../../interface/MotoInterface';
import type {SearchFormProps} from '../../interface/MotoInterface'
export const SearchForm = ({onSearch}:SearchFormProps) => {


    const [formData, setFormData] = useState<SearchFormData>({
        year:"",
        make: "",
        model: "",
        raw_specs: {
            "make": "",
            "model": "",
            "year": "",
            "top_speed": "150mph",
        }
    })



    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value,
        }))
    }

    function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()

        //check if the year is valid
        const year = Number(formData.year)
        if(!Number.isInteger(year)||formData.year.length !== 4){
            alert("Please Enter a valid date")
            return
        }
        //check if model input field is empty
        if(!formData.model){
            alert("Please Enter a valid model")
            return
        }
        //check if make input field is empty
        if(!formData.make){
            alert("Please Enter a valid make")
            return
        }
        console.log(formData)
        onSearch(formData)   
    }


    return (
        <div className="flex justify-center px-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-3xl items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-surface) p-3 shadow-lg " >
                <input value={formData.year ?? ""} onChange={handleChange} name="year" type="text" placeholder="Year" className="sm:flex-1 rounded-md bg-transparent px-3 py-2 outline-none placeholder:text-(--color-muted)" />
                <input value={formData.make} onChange={handleChange} name="make" type="text" placeholder="Make" className="sm:flex-1 rounded-md bg-transparent px-3 py-2 outline-none placeholder:text-(--color-muted)" />
                <input value={formData.model} onChange={handleChange} name="model" type="text" placeholder="model" className="sm:flex-1 rounded-md bg-transparent px-3 py-2 outline-none placeholder:text-(--color-muted)" />
                <button type="submit" className="rounded-md bg-(--color-border) px-5 py-2 font-semibold text-(--color-background) transition hover:brightness-110 hover:scale-105">
                    Search
                </button> 
            </form>
        </div>
    );
}