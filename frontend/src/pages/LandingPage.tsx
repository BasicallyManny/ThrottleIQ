import { Hero } from "../components/landingComponents/Hero"
import { Features } from "../components/landingComponents/Features"
import { UpcomingFeatures } from "../components/landingComponents/UpcomingFeatures"
import { FinalCTA } from "../components/landingComponents/FinalCTA"
import { Footer } from "../components/landingComponents/Footer"

export const LandingPage = () => {
    return (
        <div className="flex w-full flex-col">
            <Hero />
            <div
                className="mx-auto h-px w-full max-w-7xl opacity-30"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(90deg, var(--color-border) 0 24px, transparent 24px 48px)",
                }}
            />
            <Features />
            <UpcomingFeatures />
            <FinalCTA />
            <Footer />
        </div>
    )
}
