import { useEffect, useState } from "react"
import { FiAlertTriangle, FiMapPin, FiClock, FiCalendar, FiPieChart } from "react-icons/fi"
import {
    getSeverityBreakdownVyMotorcycleInvolved,
    loadMotorcycleAccidentsPerHour,
    loadMotoAccidentPerBorough,
    loadMotorcycleFatalitiesPerHour,
    loadMotorcycleAccidentsPerMonth,
    loadMotorcycleFatalitiesPerMonth,
    loadMotorcycleAccidentFactor,
    loadMotorcycleFatalityFactor,
} from '../services/crashStatsAPI'
import { LoadSpinner } from "../components/UIComponents/LoadSpinner"
import { ErrorMessage } from "../components/UIComponents/ErrorMessage"
import { ChartCard } from "../components/UIComponents/ChartCard"
import { StatTile } from "../components/UIComponents/StatTile"
import type { CrashSeverityBreakDown, MotoAccidentByMonth, MotoCrashByHour, SeverityChartData, MotoAccidentByBoroughStats, CrashFactor } from "../interface/crashStatInterface"
import { SeverityBarChart } from "../components/charts/SeverityBarChart";
import { HourlyAccidentChart } from "../components/charts/HourlyAccidentChart"
import { MonthlyAccidentChart } from "../components/charts/MonthlyAccidentChart";
import { AccidentsPerBorough } from "../components/charts/AccidentsPerBorough";
import { AccidentFactorPieChart } from "../components/charts/AccidentFactorPieChart";
import DataTransparencyCard from "../components/UIComponents/DataTransparencyCard"

function toSeverityChartData(breakdown: CrashSeverityBreakDown): SeverityChartData[] {
    return [
        {
            severity: "Fatal",
            motorcyclePct: breakdown.motorcycle.fatal.percentage,
            motorcycleCount: breakdown.motorcycle.fatal.count,
            nonMotorcyclePct: breakdown.non_motorcycle.fatal.percentage,
            nonMotorcycleCount: breakdown.non_motorcycle.fatal.count,
        },
        {
            severity: "Injury",
            motorcyclePct: breakdown.motorcycle.injury.percentage,
            motorcycleCount: breakdown.motorcycle.injury.count,
            nonMotorcyclePct: breakdown.non_motorcycle.injury.percentage,
            nonMotorcycleCount: breakdown.non_motorcycle.injury.count,
        },
        {
            severity: "Property Damage",
            motorcyclePct: breakdown.motorcycle.property_damage.percentage,
            motorcycleCount: breakdown.motorcycle.property_damage.count,
            nonMotorcyclePct: breakdown.non_motorcycle.property_damage.percentage,
            nonMotorcycleCount: breakdown.non_motorcycle.property_damage.count,
        },
    ]
}

function topByPercentage<T extends { percentage: number }>(rows: T[]): T | null {
    if (rows.length === 0) return null
    return rows.reduce((best, row) => (row.percentage > best.percentage ? row : best), rows[0])
}

export const CrashStatsPage = () => {
    const [loading, setLoading] = useState(false)
    const [crashSeverityBreakdown, setCrashSeverityBreakdown] = useState<CrashSeverityBreakDown | null>(null)
    const [hourlyFatalitiesData, setHourlyFatalitiesData] = useState<MotoCrashByHour[]>([])
    const [hourlyAccidentsData, setHourlyAccidentsData] = useState<MotoCrashByHour[]>([])
    const [monthlyFatalitiesData, setMonthlyFatalitiesData] = useState<MotoAccidentByMonth[]>([])
    const [monthlyAccidentData, setMonthlyAccidentData] = useState<MotoAccidentByMonth[]>([])
    const [motoAccidentPerBorough, setMotoAccidentPerBorough] = useState<MotoAccidentByBoroughStats[]>([])
    const [motoAccidentFactor, setMotoAccidentFactor] = useState<CrashFactor[]>([])
    const [motoFatalityFactor, setMotoFatalityFactor] = useState<CrashFactor[]>([])
    const [error, setError] = useState("")

    //get beginning of month
    const getBeginningOfMonth = () => {
        const now = new Date()
        const beginningOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
        return beginningOfMonth
    }

    const [beginningOfMonth, setBeginningOfMonth] = useState(getBeginningOfMonth)

    useEffect(() => {
        const interval = setInterval(() => {
            const newStart = getBeginningOfMonth();

            setBeginningOfMonth((current) => {
                //only update if the month has changed
                return current.getTime() !== newStart.getTime() ? newStart : current
            })
        }, 60 * 10000)

        return clearInterval(interval)
    }, [])

    useEffect(() => {
        const loadChartData = async () => {
            setLoading(true)
            try {
                const [severityData, hourlyFatalityData, hourlyAccidentData, monthAccidentData, monthFatalData, borughAccidentData, motoAccidentFactorData, motoFatalityFactorData] = await Promise.all([
                    getSeverityBreakdownVyMotorcycleInvolved(),
                    loadMotorcycleFatalitiesPerHour(),
                    loadMotorcycleAccidentsPerHour(),
                    loadMotorcycleAccidentsPerMonth(),
                    loadMotorcycleFatalitiesPerMonth(),
                    loadMotoAccidentPerBorough(),
                    loadMotorcycleAccidentFactor(),
                    loadMotorcycleFatalityFactor(),
                ])
                setCrashSeverityBreakdown(severityData)
                setHourlyFatalitiesData(hourlyFatalityData)
                setHourlyAccidentsData(hourlyAccidentData)
                setMonthlyAccidentData(monthAccidentData)
                setMonthlyFatalitiesData(monthFatalData)
                setMotoAccidentPerBorough(borughAccidentData)
                setMotoAccidentFactor(motoAccidentFactorData)
                setMotoFatalityFactor(motoFatalityFactorData)
            } catch (err) {
                setError(`Failed to load crash statistics: ${err}`)
            } finally {
                setLoading(false)
            }
        }
        loadChartData()
    }, [])



    const totalMotorcycleCrashes = crashSeverityBreakdown
        ? crashSeverityBreakdown.motorcycle.fatal.count +
        crashSeverityBreakdown.motorcycle.injury.count +
        crashSeverityBreakdown.motorcycle.property_damage.count
        : null
    const fatalPct = crashSeverityBreakdown?.motorcycle.fatal.percentage ?? null
    const topBorough = topByPercentage(motoAccidentPerBorough)
    const topFactor = topByPercentage(motoAccidentFactor)

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 lg:h-full lg:flex-row lg:gap-6 lg:overflow-hidden lg:px-10 lg:py-3">
            <DataTransparencyCard
                className="w-full shrink-0 lg:h-full lg:w-72"
                sections={[
                    {
                        label: "Data Source",
                        content:
                            "NYC Open Data — Motor Vehicle Collisions (Crashes), covering the most recent 3 years of reported incidents. Updated and checked at the beginning of each month",
                    },
                    {
                        label: "Coverage",
                        content:
                            "New York City only. Includes crashes with valid location data; records missing coordinates are excluded.",
                    },
                    {
                        label: "Limitations",
                        content:
                            `This dataset represents a significant subset of NYC motor vehicle collisions, however ThrottleIQNYC cannot pull every single reported incident due to our own application infrastructure.. Approximately 40,000–80,000 reported crashes are included annually, with some limitations due to reporting practices and historical data storage constraints.

For consistency and accuracy. ThrottleIQNYC analyzes based  on percentages across the full three-year dataset. Values such as "20% of fatalities occurred in August" represent the share of all collected data over the 3 year collection period`,
                    },
                ]}
                sourceUrl="https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95"
                lastUpdated={`Last updated: ${beginningOfMonth.toLocaleDateString()}`}
            />
            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col lg:h-full lg:overflow-hidden">
                <header className="mb-2 flex shrink-0 items-baseline justify-between gap-4">
                    <h1 className="text-lg font-bold text-(--color-text) sm:text-xl">Motorcycle Crash Statistics</h1>
                    <p className="hidden truncate text-xs text-(--color-muted) sm:block">
                        NYC collision trends across time, geography, severity, and contributing factors.
                    </p>
                </header>

                {loading && (
                    <div className="flex items-center justify-center py-16 lg:flex-1 lg:py-0">
                        <LoadSpinner />
                    </div>
                )}
                {!loading && error && <ErrorMessage message={error} />}

                {!loading && !error && (
                    <div className="flex flex-col gap-3 lg:min-h-0 lg:flex-1 lg:gap-2">
                        {totalMotorcycleCrashes !== null && fatalPct !== null && topBorough && topFactor && (
                            <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row">
                                <StatTile
                                    label="Fatal Rate"
                                    value={`${fatalPct.toFixed(1)}%`}
                                    hint="Share of crashes ending in a fatality"
                                    icon={<FiAlertTriangle className="h-4 w-4" />}
                                />
                                <StatTile
                                    label="Highest-Risk Borough"
                                    value={topBorough.borough}
                                    hint={`${topBorough.percentage.toFixed(1)}% of citywide crashes`}
                                    icon={<FiMapPin className="h-4 w-4" />}
                                />
                                <StatTile
                                    label="Leading Factor"
                                    value={topFactor.factor}
                                    hint={`${topFactor.percentage.toFixed(1)}% of crashes`}
                                    icon={<FiPieChart className="h-4 w-4" />}
                                />
                            </div>
                        )}

                        <section className="flex flex-col gap-3 lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-12">
                            {crashSeverityBreakdown && (
                                <ChartCard
                                    size="lg"
                                    className="h-72 lg:col-span-7 lg:h-full"
                                    title="Crash Severity"
                                    subtitle="Motorcycle vs. non-motorcycle outcomes"
                                    icon={<FiAlertTriangle className="h-4 w-4" />}
                                >
                                    <SeverityBarChart data={toSeverityChartData(crashSeverityBreakdown)} />
                                </ChartCard>
                            )}

                            {motoAccidentPerBorough.length > 0 && (
                                <ChartCard
                                    size="md"
                                    className="h-72 lg:col-span-5 lg:h-full"
                                    title="Accidents by Borough"
                                    subtitle="Share of citywide motorcycle crashes"
                                    icon={<FiMapPin className="h-4 w-4" />}
                                >
                                    <AccidentsPerBorough data={motoAccidentPerBorough} />
                                </ChartCard>
                            )}
                        </section>

                        <section className="flex flex-col gap-3 lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-12">
                            {hourlyFatalitiesData.length > 0 && hourlyAccidentsData.length > 0 && (
                                <ChartCard
                                    size="md"
                                    className="h-72 lg:col-span-7 lg:h-full"
                                    title="Accidents by Hour"
                                    subtitle="Time-of-day distribution"
                                    icon={<FiClock className="h-4 w-4" />}
                                >
                                    <HourlyAccidentChart accidentData={hourlyAccidentsData} fatalityData={hourlyFatalitiesData} />
                                </ChartCard>
                            )}

                            {monthlyFatalitiesData.length > 0 && monthlyAccidentData.length > 0 && (
                                <ChartCard
                                    size="md"
                                    className="h-72 lg:col-span-5 lg:h-full"
                                    title="Accidents by Month"
                                    subtitle="Seasonal distribution"
                                    icon={<FiCalendar className="h-4 w-4" />}
                                >
                                    <MonthlyAccidentChart accidentData={monthlyAccidentData} fatalityData={monthlyFatalitiesData} />
                                </ChartCard>
                            )}
                        </section>

                        <section className="flex flex-col gap-3 lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-12">
                            {motoAccidentFactor.length > 0 && (
                                <ChartCard
                                    size="sm"
                                    className="h-72 lg:col-span-6 lg:h-full"
                                    title="Top Accident Factors"
                                    subtitle="Leading contributing factors"
                                    icon={<FiPieChart className="h-4 w-4" />}
                                >
                                    <AccidentFactorPieChart data={motoAccidentFactor} />
                                </ChartCard>
                            )}

                            {motoFatalityFactor.length > 0 && (
                                <ChartCard
                                    size="sm"
                                    className="h-72 lg:col-span-6 lg:h-full"
                                    title="Top Fatality Factors"
                                    subtitle="Leading factors in fatal crashes"
                                    icon={<FiPieChart className="h-4 w-4" />}
                                >
                                    <AccidentFactorPieChart data={motoFatalityFactor} />
                                </ChartCard>
                            )}
                        </section>
                    </div>
                )}
            </div>
        </div>
    )
}
