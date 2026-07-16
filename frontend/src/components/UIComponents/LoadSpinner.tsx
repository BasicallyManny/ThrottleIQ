
import { GiCartwheel } from "react-icons/gi";
export const LoadSpinner = () => {
    return (
        <div className="flex flex-col items-center">
            <GiCartwheel className="h-10 w-10 animate-spin rounded-full border-t-transparent" />
            <p className="mt-3">Loading motorcycle data...</p>
        </div>
    )
}