import { FiArrowRight, FiBarChart2 } from "react-icons/fi"
import { FaMotorcycle } from "react-icons/fa"
import { CTAButton } from "./CTAButton"

interface IncidentDot {
    top: string
    left: string
    color: string
    size: string
    delay: string
}

const INCIDENT_DOTS: IncidentDot[] = [
    { top: "22%", left: "28%", color: "var(--color-chart-motorcycle)", size: "h-2.5 w-2.5", delay: "0s" },
    { top: "38%", left: "58%", color: "var(--color-chart-non-motorcycle)", size: "h-2 w-2", delay: "0.6s" },
    { top: "60%", left: "22%", color: "var(--color-chart-cat-4)", size: "h-2 w-2", delay: "1.2s" },
    { top: "68%", left: "70%", color: "var(--color-chart-motorcycle)", size: "h-3 w-3", delay: "0.3s" },
    { top: "48%", left: "42%", color: "var(--color-chart-cat-3)", size: "h-1.5 w-1.5", delay: "0.9s" },
    { top: "30%", left: "78%", color: "var(--color-chart-non-motorcycle)", size: "h-2 w-2", delay: "1.5s" },
    { top: "78%", left: "45%", color: "var(--color-chart-cat-4)", size: "h-1.5 w-1.5", delay: "0.4s" },
]

export const Hero = () => {
    return (
        <section className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
            {/* Background: asphalt lane-line texture + a glow anchored behind the map preview (not a floating orphan blob) */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(120deg, transparent 0 88px, var(--color-text) 88px 90px, transparent 90px 160px)",
                    }}
                />
                <div className="absolute -right-10 top-10 h-104 w-104 rounded-full bg-(--color-border)/10 blur-[120px] lg:right-16" />
                <FaMotorcycle className="absolute -left-8 bottom-0 h-56 w-56 -rotate-6 text-white/4 sm:h-64 sm:w-64" />
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-10">
                {/* Copy */}
                <div className="flex flex-col items-start gap-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-(--color-muted) backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-border) opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-border)" />
                        </span>
                        Powered by NYC Open Data · Updated Monthly
                    </span>

                    <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-(--color-text) sm:text-5xl lg:text-6xl">
                        Ride New York with
                        <span className="block bg-linear-to-r from-(--color-border) to-orange-300 bg-clip-text text-transparent">
                            data on your side.
                        </span>
                    </h1>

                    <p className="max-w-xl text-base leading-relaxed text-(--color-muted) sm:text-lg">
                        ThrottleIQ NYC turns three years of NYC crash records into a live incident map,
                        real-time analytics, and instant motorcycle specs — so every ride starts with
                        knowledge, not guesswork.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <CTAButton to="/accident-map" icon={<FiArrowRight className="h-4 w-4" />}>
                            Explore the Live Map
                        </CTAButton>
                        <CTAButton to="/analytics" variant="secondary" icon={<FiBarChart2 className="h-4 w-4" />}>
                            View Crash Analytics
                        </CTAButton>
                    </div>

                    <dl className="mt-4 grid grid-cols-3 gap-6 border-t border-white/5 pt-6 sm:gap-10">
                        {[
                            { value: "60K+", label: "Crashes analyzed" },
                            { value: "5", label: "NYC boroughs" },
                            { value: "3 yrs", label: "Historical data" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col gap-1">
                                <dt className="font-mono text-2xl font-bold text-(--color-text) sm:text-3xl">
                                    {stat.value}
                                </dt>
                                <dd className="text-xs text-(--color-muted)">{stat.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Visual: mock live-map product card */}
                <div className="relative">
                    <div className="animate-float-slow relative rounded-3xl border border-white/10 bg-(--color-surface) shadow-2xl shadow-black/40">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                            <span className="mx-auto flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] text-(--color-muted)">
                                throttleiq.app/accident-map
                            </span>
                        </div>

                        {/* Map body */}
                        <div
                            className="relative h-72 overflow-hidden rounded-b-3xl sm:h-80"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(124,137,139,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(124,137,139,0.12) 1px, transparent 1px)",
                                backgroundSize: "28px 28px",
                                backgroundColor: "#0d1321",
                            }}
                        >
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-(--color-border)/10 via-transparent to-(--color-chart-non-motorcycle)/10" />

                            {INCIDENT_DOTS.map((dot, i) => (
                                <span
                                    key={i}
                                    className="absolute flex items-center justify-center"
                                    style={{ top: dot.top, left: dot.left, animationDelay: dot.delay }}
                                >
                                    <span
                                        className="absolute inline-flex h-4 w-4 animate-ping rounded-full opacity-40"
                                        style={{ backgroundColor: dot.color, animationDelay: dot.delay }}
                                    />
                                    <span
                                        className={`relative inline-flex rounded-full ${dot.size}`}
                                        style={{ backgroundColor: dot.color }}
                                    />
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Floating stat chips */}
                    <div className="animate-float-slow absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-2xl border border-white/10 bg-(--color-background)/90 px-4 py-2.5 shadow-xl shadow-black/30 backdrop-blur-md sm:block" style={{ animationDelay: "1s" }}>
                        <p className="text-[10px] uppercase tracking-wide text-(--color-muted)">Fatal Rate</p>
                        <p className="font-mono text-lg font-bold text-(--color-border)">2.4%</p>
                    </div>
                    <div className="animate-float-slow absolute -bottom-5 -right-4 hidden rounded-2xl border border-white/10 bg-(--color-background)/90 px-4 py-2.5 shadow-xl shadow-black/30 backdrop-blur-md sm:block" style={{ animationDelay: "2s" }}>
                        <p className="text-[10px] uppercase tracking-wide text-(--color-muted)">Top Borough</p>
                        <p className="text-lg font-bold text-(--color-text)">Brooklyn</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
