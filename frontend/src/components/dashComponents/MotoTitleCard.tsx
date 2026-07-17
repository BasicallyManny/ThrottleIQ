import type { MotoTitleCardProps } from "../../interface/MotoInterface";
import { useState, useEffect } from "react";
import { GiSpeedometer, GiWrench, GiWeight } from "react-icons/gi";
import { PerformanceRadarChart } from "../charts/PerformanceRadarChart";

// Reasonable real-world ceilings used to scale each metric onto the chart's shared 0-100 axis.
const RADAR_MAX = {
    horsepower: 300,
    torque_nm: 200,
    weight_kg: 300,
    displacement: 2500,
};

const normalize = (value: number | null, max: number): number | null =>
    value === null ? null : Math.min(100, Math.round((value / max) * 100));

export const MotoTitleCard = ({
    make,
    model,
    year,
    image_url,
    horsepower,
    torque_nm,
    weight_kg,
    displacement
}: MotoTitleCardProps) => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!image_url) return;

        const img = new Image();
        img.src = image_url;
        img.onload = () => setLoaded(true);
    }, [image_url]);

    const stats = [
        { icon: GiSpeedometer, label: "Horsepower", value: horsepower, unit: "HP" },
        { icon: GiWrench, label: "Torque", value: torque_nm, unit: "Nm" },
        { icon: GiWeight, label: "Weight", value: weight_kg, unit: "kg" },
    ];

    const radarCharData = [
        { metric: "Power", value: normalize(horsepower, RADAR_MAX.horsepower) },
        { metric: "Torque", value: normalize(torque_nm, RADAR_MAX.torque_nm) },
        { metric: "Weight", value: normalize(weight_kg, RADAR_MAX.weight_kg) },
        { metric: "Displacement", value: normalize(displacement, RADAR_MAX.displacement) }
    ]

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 my-2.5">

            {/* Hero Image with title + performance stats overlaid */}
            <section
                className="relative flex min-h-105 w-full flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center sm:min-h-125"
                style={{ backgroundImage: loaded ? `url(${image_url})` : undefined }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/10" />

                <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-10">
                    <div>
                        <p className="text-sm font-semibold tracking-[0.3em] text-(--color-border)">
                            {year}
                        </p>

                        <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
                            {make}
                        </h1>

                        <h2 className="text-xl font-light uppercase tracking-wide text-white/70 sm:text-2xl">
                            {model}
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
                        {stats.map(({ icon: Icon, label, value, unit }) => (
                            <div key={label} className="flex items-center gap-3">
                                <Icon className="h-6 w-6 shrink-0 text-(--color-border)" />

                                <div>
                                    <p className="text-xs uppercase tracking-widest text-white/60">
                                        {label}
                                    </p>

                                    <p className="font-mono text-lg font-bold text-white">
                                        {value !== null ? (
                                            <>
                                                {value}
                                                <span className="ml-1 text-xs font-normal text-white/60">
                                                    {unit}
                                                </span>
                                            </>
                                        ) : (
                                            <span aria-label={`${label} not available`}>—</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Chart Placeholder */}
            <div className="flex w-full min-h-62.5 items-center justify-center rounded-xl border border-dashed border-(--color-border) bg-(--color-surface)">
                <div className="w-full text-center">
                    <PerformanceRadarChart radarCharData={radarCharData} ></PerformanceRadarChart>
                </div>
            </div>

        </div>
    );
};
