import { useState } from "react";
import type { SearchFormProps, SearchFormData } from "../../interface/MotoInterface";

export const SearchForm = ({ onSearch }: SearchFormProps) => {
    const [formData, setFormData] = useState<SearchFormData>({
        year: "",
        make: "",
        model: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const YEAR_REGEX = /^\d{4}$/;

        if (!YEAR_REGEX.test(formData.year)) {
            alert("Please enter a valid 4-digit year");
            return;
        }

        if (!formData.model) {
            alert("Please Enter a valid model");
            return;
        }

        if (!formData.make) {
            alert("Please Enter a valid make");
            return;
        }

        onSearch(formData);
    }

    return (
        <div className="flex w-full justify-center lg:w-auto">
            <form onSubmit={handleSubmit} autoComplete="off" className="flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-(--color-border) bg-(--color-surface) p-2 sm:flex-row sm:items-center sm:rounded-full">
                <input
                    value={formData.year}
                    onChange={handleChange}
                    name="year"
                    type="text"
                    placeholder="Year"
                    autoComplete="off"
                    className="w-full rounded-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-(--color-muted) sm:w-20"
                />

                <input
                    value={formData.make}
                    onChange={handleChange}
                    name="make"
                    type="text"
                    placeholder="Make"
                    autoComplete="off"
                    className="w-full min-w-0 rounded-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-(--color-muted) sm:flex-1"
                />

                <input
                    value={formData.model}
                    onChange={handleChange}
                    name="model"
                    type="text"
                    placeholder="Model"
                    autoComplete="off"
                    className="w-full min-w-0 rounded-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-(--color-muted) sm:flex-1"
                />

                <button type="submit" className="w-full rounded-full bg-(--color-border) px-4 py-2 text-sm font-medium text-(--color-background) transition hover:brightness-110 sm:w-auto">
                    Search
                </button>
            </form>
        </div>
    );
};