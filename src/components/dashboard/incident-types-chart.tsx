'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { type: 'Slips/Trips', incidents: 8, fill: 'var(--color-slips)' },
  { type: 'Falls', incidents: 5, fill: 'var(--color-falls)' },
  { type: 'Equipment', incidents: 3, fill: 'var(--color-equipment)' },
  { type: 'Struck-by', incidents: 6, fill: 'var(--color-struck)' },
  { type: 'Other', incidents: 2, fill: 'var(--color-other)' },
];

const chartConfig = {
  incidents: {
    label: 'Incidents',
  },
  slips: {
    label: 'Slips/Trips',
    color: 'hsl(var(--chart-1))',
  },
  falls: {
    label: 'Falls',
    color: 'hsl(var(--chart-2))',
  },
  equipment: {
    label: 'Equipment',
    color: 'hsl(var(--chart-3))',
  },
  struck: {
    label: 'Struck-by',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function IncidentTypesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incidents by Type</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
             <XAxis dataKey="incidents" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="incidents" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
