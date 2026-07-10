import {SearchForm} from "../../components/dashComponents/SearchForm";
import {useState} from "react";
import type { SearchFormData } from "../../interface/MotoInterface";
export const Dashboard = () =>{

    const [searchData,setSearchData]=useState<SearchFormData>()

    return(
        <div className="flex flex-col items-center h-full">
            {/**Collect Motocycle data*/}
            <SearchForm onSearch={setSearchData}/>
            {searchData ? (
                <div className="flex flex-col h-full w-full items-center justify-center">
                    <div>
                        {searchData.make}
                    </div>
                        {searchData.model}
                    <div>
                         {searchData.year}
                    </div>
                    <div>
                        {JSON.stringify(searchData.raw_specs)}
                    </div>
                </div>
            ):(
                <div>No SEARCH DATA</div>
            )}


        </div>
    )
}