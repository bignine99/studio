'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
  { date: 'Jan', score: 82 },
  { date: 'Feb', score: 85 },
  { date: 'Mar', score: 88 },
  { date: 'Apr', score: 86 },
  { date: 'May', score: 90 },
  { date: 'Jun', score: 92 },
];

const chartConfig = {
  score: {
    label: 'Safety Score',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function SafetyScoreChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Safety Score Trend</CardTitle>
        <CardDescription>Monthly safety score over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 10,
              top: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[75, 100]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-score)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-score)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="score"
              type="natural"
              fill="url(#fillScore)"
              fillOpacity={0.4}
              stroke="var(--color-score)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
