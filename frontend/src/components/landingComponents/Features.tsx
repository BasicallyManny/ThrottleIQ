import type { ReactNode } from "react"
import { FiBarChart2, FiDatabase, FiGift, FiMap, FiRefreshCw, FiSearch  } from "react-icons/fi"
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { SectionHeading } from "./SectionHeading"
import { Reveal } from "./Reveal"
import { useReveal } from "../../hooks/useReveal"

const MAP_DOTS = [
    { top: "20%", left: "30%", color: "var(--color-chart-motorcycle)" },
    { top: "55%", left: "62%", color: "var(--color-chart-non-motorcycle)" },
    { top: "70%", left: "25%", color: "var(--color-chart-cat-4)" },
    { top: "35%", left: "75%", color: "var(--color-chart-cat-3)" },
    { top: "62%", left: "45%", color: "var(--color-chart-motorcycle)" },
]

const MiniMapPreview = () => (
    <div
        className="relative h-32 w-full overflow-hidden rounded-xl border border-white/5"
        style={{
            backgroundImage:
                "linear-gradient(rgba(124,137,139,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(124,137,139,0.12) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundColor: "#0d1321",
        }}
    >
        {MAP_DOTS.map((dot, i) => (
            <span
                key={i}
                className="absolute flex items-center justify-center"
                style={{ top: dot.top, left: dot.left }}
            >
                <span className="absolute inline-flex h-3.5 w-3.5 animate-ping rounded-full opacity-40" style={{ backgroundColor: dot.color }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot.color }} />
            </span>
        ))}
    </div>
)

const BAR_HEIGHTS = [38, 62, 45, 80, 55, 70, 30]

const MiniBarPreview = () => {
    const { ref, isVisible } = useReveal<HTMLDivElement>()
    return (
        <div ref={ref} className="flex h-32 w-full items-end gap-2 rounded-xl border border-white/5 bg-(--color-background)/60 p-4">
            {BAR_HEIGHTS.map((h, i) => (
                <span
                    key={i}
                    className="flex-1 origin-bottom rounded-t-sm bg-linear-to-t from-(--color-border) to-(--color-border)/40 transition-transform duration-700 ease-out"
                    style={{
                        height: `${h}%`,
                        transform: isVisible ? "scaleY(1)" : "scaleY(0)",
                        transitionDelay: `${i * 80}ms`,
                    }}
                />
            ))}
        </div>
    )
}

const MiniComparePreview = () => (
    <div className="flex h-32 w-full items-center gap-2 rounded-xl border border-white/5 bg-(--color-background)/60 p-3">
        {["CBR600RR", "MT-07"].map((name, i) => (
            <div key={name} className="flex flex-1 flex-col gap-1.5 rounded-lg bg-white/5 p-2.5">
                <p className="truncate text-[11px] font-semibold text-(--color-text)">{name}</p>
                {["HP", "Torque", "Weight"].map((spec, j) => (
                    <div key={spec} className="flex items-center justify-between text-[10px] text-(--color-muted)">
                        <span>{spec}</span>
                        <span className="font-mono text-(--color-text)/80">
                            {i === 0 ? [118, 66, 194][j] : [72, 68, 183][j]}
                        </span>
                    </div>
                ))}
            </div>
        ))}
    </div>
)

interface FeatureTile {
    icon: ReactNode
    title: string
    description: string
}

const SUPPORT_TILES: FeatureTile[] = [
    { icon: <FiDatabase className="h-5 w-5" />, title: "Data-Driven", description: "Every visualization is generated from 200,000+ official NYPD crash records, ensuring comprehensive and evidence-based insights.." },
    { icon: <FiRefreshCw className="h-5 w-5" />, title: "Always Fresh", description: "Datasets are checked and refreshed at the start of every month." },
    { icon: <HiOutlineExclamationTriangle className="h-5 w-5" />, title: "Actionable Risk Analysis", description: "Identify when and where motorcycle riders face the highest risk using temporal and geographic trend analysis." },
    { icon: <FiGift className="h-5 w-5" />, title: "Free. No Login.", description: "Every tool is free to use — no account, no paywall, no fine print." },
]

export const Features = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
            <Reveal className="mb-12">
                <SectionHeading
                    eyebrow="What you get"
                    title="Three tools. One clear picture of the road."
                    description="ThrottleIQ NYC isn't a dashboard full of generic charts — it's a purpose-built toolkit for understanding risk, trends, and machines in New York City."
                />
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-12">
                <Reveal className="lg:col-span-7">
                    <article className="group flex h-full flex-col justify-between gap-5 rounded-3xl border border-white/5 bg-(--color-surface) p-6 shadow-xl shadow-black/25 transition-colors duration-300 hover:border-(--color-border)/30 sm:p-8">
                        <div className="flex flex-col gap-4">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-border)/15 text-(--color-border)">
                                <FiMap className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="text-xl font-bold text-(--color-text)">Live Accident Map</h3>
                                <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">
                                    See risk before you ride. Explore crash density across all five boroughs, filter by
                                    severity and time of day, and spot the corridors that matter most.
                                </p>
                            </div>
                        </div>
                        <MiniMapPreview />
                    </article>
                </Reveal>

                <Reveal className="lg:col-span-5" delay={100}>
                    <article className="group flex h-full flex-col justify-between gap-5 rounded-3xl border border-white/5 bg-(--color-surface) p-6 shadow-xl shadow-black/25 transition-colors duration-300 hover:border-(--color-border)/30 sm:p-8">
                        <div className="flex flex-col gap-4">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-chart-non-motorcycle)/15 text-(--color-chart-non-motorcycle)">
                                <FiBarChart2 className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="text-xl font-bold text-(--color-text)">Crash Analytics</h3>
                                <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">
                                    Numbers that tell the real story — severity breakdowns, hourly and seasonal
                                    trends, and the leading contributing factors behind every incident.
                                </p>
                            </div>
                        </div>
                        <MiniBarPreview />
                    </article>
                </Reveal>

                <Reveal className="lg:col-span-5">
                    <article className="group flex h-full flex-col justify-between gap-5 rounded-3xl border border-white/5 bg-(--color-surface) p-6 shadow-xl shadow-black/25 transition-colors duration-300 hover:border-(--color-border)/30 sm:p-8">
                        <div className="flex flex-col gap-4">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-chart-cat-3)/15 text-(--color-chart-cat-3)">
                                <FiSearch className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="text-xl font-bold text-(--color-text)">Motorcycle Spec Search</h3>
                                <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">
                                    Know your machine. Look up specs by year, make, and model — or compare two
                                    bikes side by side in seconds.
                                </p>
                            </div>
                        </div>
                        <MiniComparePreview />
                    </article>
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2">
                    {SUPPORT_TILES.map((tile, i) => (
                        <Reveal key={tile.title} delay={i * 80}>
                            <div className="flex h-full flex-col gap-3 rounded-3xl border border-white/5 bg-(--color-surface)/60 p-5">
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-(--color-text)">
                                    {tile.icon}
                                </span>
                                <div>
                                    <h4 className="text-sm font-semibold text-(--color-text)">{tile.title}</h4>
                                    <p className="mt-1 text-xs leading-relaxed text-(--color-muted)">{tile.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
