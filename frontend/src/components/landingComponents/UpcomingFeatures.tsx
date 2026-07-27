import type { ReactNode } from "react"
import { FiNavigation, FiSmartphone, } from "react-icons/fi"
import { SectionHeading } from "./SectionHeading"
import { Reveal } from "./Reveal"

interface RoadmapItem {
    quarter: string
    title: string
    description: string
    icon: ReactNode
}

const ROADMAP: RoadmapItem[] = [
    {
        quarter: "Q4 2026",
        title: "Route Planner",
        description: "Plan a ride across NYC that automatically routes around scenic pic.",
        icon: <FiNavigation className="h-4 w-4" />,
    },
    {
        quarter: "Q2 2027",
        title: "ThrottleIQ Mobile",
        description: "A native iOS and Android app with offline-ready maps for riders on the go.",
        icon: <FiSmartphone className="h-4 w-4" />,
    },
]

export const UpcomingFeatures = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
            <Reveal className="mb-12">
                <SectionHeading
                    eyebrow="On the roadmap"
                    title="Where ThrottleIQ is headed next."
                    description="These features are in active development and not yet available. Timelines are directional and may shift as we build."
                />
            </Reveal>

            <div className="relative mx-auto max-w-3xl">
                <div className="absolute left-4 top-2 bottom-2 w-px bg-linear-to-b from-(--color-border)/60 via-white/10 to-transparent sm:left-5" />

                <ul className="flex flex-col gap-4">
                    {ROADMAP.map((item, i) => (
                        <Reveal key={item.title} delay={i * 70}>
                            <li className="relative flex gap-4 pl-11 sm:gap-5 sm:pl-14">
                                <span className="absolute left-0 top-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--color-border)/30 bg-(--color-background) text-(--color-border) sm:h-10 sm:w-10">
                                    {item.icon}
                                </span>

                                <div className="flex flex-1 flex-col gap-2 rounded-2xl border border-white/5 bg-(--color-surface) p-5 shadow-md shadow-black/15 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-sm font-bold text-(--color-text)">{item.title}</h3>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-border)/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-border)">
                                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-border)" />
                                                Coming Soon
                                            </span>
                                        </div>
                                        <p className="mt-1.5 max-w-md text-xs leading-relaxed text-(--color-muted)">
                                            {item.description}
                                        </p>
                                    </div>

                                    <span className="shrink-0 self-start rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-(--color-muted)">
                                        {item.quarter}
                                    </span>
                                </div>
                            </li>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    )
}
