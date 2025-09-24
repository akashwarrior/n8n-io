import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MetricCard({ title, subtitle, metrics }: {
    title: string,
    subtitle: string,
    metrics: string
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium truncate">
                    {title}
                </CardTitle>
                <div className="text-xs">{subtitle}</div>
            </CardHeader>

            <CardContent>
                <div className="text-2xl font-bold">{metrics}</div>
            </CardContent>
        </Card>
    )
}