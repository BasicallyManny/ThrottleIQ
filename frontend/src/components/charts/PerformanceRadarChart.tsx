import { ResponsiveContainer, RadarChart,PolarGrid,PolarAngleAxis, PolarRadiusAxis ,Radar   } from 'recharts'

type RadarChartData = {
    metric:string,
    value:number | null
};

type PerformanceRadarChartProps = {
    radarCharData:RadarChartData[];
}

export const PerformanceRadarChart = ({radarCharData}:PerformanceRadarChartProps) => {

    return (
        <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarCharData}>
                <PolarGrid/>
                <PolarAngleAxis dataKey="metric"/>
                <PolarRadiusAxis domain={[0, 100]}/>
                <Radar dataKey="value" stroke="#F78E69" fill="#F78E69" fillOpacity={0.15} />
            </RadarChart>
        </ResponsiveContainer>
    )
}