import type { MotoTitleCardProps } from "../../interface/MotoInterface"
import {useState, useEffect} from 'react'

export const MotoTitleCard = ({
    make,
    model,
    year,
    image_url,
}: MotoTitleCardProps) => {

    const [loaded,setLoaded] = useState<boolean>(false)
    //preload the image.
    useEffect(()=>{
        if(!image_url) return

        const img= new Image();
        img.src=image_url
        img.onload = () =>setLoaded(true)
    },[image_url])

    return (
        <section
            className="relative w-full h-[calc(100vh-200px)] overflow-hidden bg-cover bg-center rounded-2xl"
            style={{
                backgroundImage: loaded ? `url(${image_url})` : undefined,
            }}
        >
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-16 left-8 text-white md:left-16">
                <p className="text-xl tracking-widest text-orange-400">
                    {year}
                </p>
                <h1 className="text-5xl font-bold uppercase tracking-tight">
                    {make}
                </h1>
                <h2 className="text-4xl font-light uppercase">
                    {model}
                </h2>
                <button className="mt-8 rounded-full bg-orange-500 px-8 py-3 font-semibold text-black transition hover:bg-orange-400">
                    View Dashboard
                </button>
            </div>
        </section>
    );
};