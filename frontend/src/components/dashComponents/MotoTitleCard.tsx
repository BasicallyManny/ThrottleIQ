import type { MotoTitleCardProps } from "../../interface/MotoInterface"

export const MotoTitleCard = ({
    make,
    model,
    year,
    image_url,
}: MotoTitleCardProps) => {
    return (
        <section
            className="relative w-full h-full overflow-hidden bg-cover bg-center rounded-2xl"
            style={{
                backgroundImage: `url(${image_url})`,
            }}
        >
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-16 left-8 text-white md:left-16">
                <p className="text-xl tracking-widest text-orange-400">
                    {year}
                </p>
                <h1 className="text-6xl font-bold uppercase tracking-tight">
                    {make}
                </h1>
                <h2 className="text-5xl font-light uppercase">
                    {model}
                </h2>
                <button className="mt-8 rounded-full bg-orange-500 px-8 py-3 font-semibold text-black transition hover:bg-orange-400">
                    View Dashboard
                </button>
            </div>
        </section>
    );
};