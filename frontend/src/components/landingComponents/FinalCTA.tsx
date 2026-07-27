import { FiArrowRight, FiSearch } from "react-icons/fi"
import { CTAButton } from "./CTAButton"
import { Reveal } from "./Reveal"

export const FinalCTA = () => {
    return (
        <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <Reveal className="mx-auto max-w-6xl">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-(--color-surface) px-6 py-14 text-center shadow-2xl shadow-black/30 sm:px-12 sm:py-20">
                    {/* Center-stripe accent, evoking a road center line, plus a single glow anchored behind the headline */}
                    <div
                        className="absolute inset-x-0 top-0 h-0.5 opacity-40"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(90deg, var(--color-border) 0 24px, transparent 24px 48px)",
                        }}
                    />
                    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                        <div className="h-72 w-72 rounded-full bg-(--color-border)/15 blur-[110px]" />
                    </div>

                    <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-(--color-text) sm:text-4xl lg:text-5xl">
                        Your next ride starts with better data.
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-(--color-muted) sm:text-lg">
                        Free, transparent, and built for New York. No account required — just open the map
                        and see the city the way the data does.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <CTAButton to="/accident-map" icon={<FiArrowRight className="h-4 w-4" />}>
                            Launch ThrottleIQ
                        </CTAButton>
                        <CTAButton to="/motorcycle-search" variant="secondary" icon={<FiSearch className="h-4 w-4" />}>
                            Search a Motorcycle
                        </CTAButton>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}
