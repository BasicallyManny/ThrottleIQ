import { Link } from "react-router-dom"
import { FiExternalLink } from "react-icons/fi"

const PRODUCT_LINKS = [
    { label: "Live Accident Map", to: "/accident-map" },
    { label: "Crash Analytics", to: "/analytics" },
    { label: "Motorcycle Search", to: "/motorcycle-search" },
]

const RESOURCE_LINKS = [
    { label: "NYC Open Data", href: "https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95" },
    { label: "API Ninjas Motorcycle API", href: "https://api-ninjas.com/api/motorcycles" },
]

export const Footer = () => {
    return (
        <footer className="border-t border-white/5 px-4 py-12 sm:px-6 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:justify-between">
                <div className="max-w-xs">
                    <Link to="/" className="text-lg font-extrabold tracking-tight">
                        <span className="text-(--color-border)">Throttle</span>
                        <span className="text-(--color-text)">IQ</span>
                        <span className="text-(--color-muted)">NYC</span>
                    </Link>
                    <p className="mt-3 text-sm leading-relaxed text-(--color-muted)">
                        An independent data project turning public NYC crash records into clear, honest
                        insight for riders. Not affiliated with NYC DOT.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-10 sm:gap-16">
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-(--color-muted)">Product</h3>
                        <ul className="mt-4 flex flex-col gap-2.5">
                            {PRODUCT_LINKS.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-(--color-text)/80 transition-colors duration-200 hover:text-(--color-border)"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-(--color-muted)">Data Sources</h3>
                        <ul className="mt-4 flex flex-col gap-2.5">
                            {RESOURCE_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm text-(--color-text)/80 transition-colors duration-200 hover:text-(--color-border)"
                                    >
                                        {link.label}
                                        <FiExternalLink className="h-3 w-3 shrink-0" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10 max-w-7xl border-t border-white/5 pt-6 text-xs text-(--color-muted)">
                © {new Date().getFullYear()} ThrottleIQ NYC. Built on public NYC Open Data.
            </div>
        </footer>
    )
}
