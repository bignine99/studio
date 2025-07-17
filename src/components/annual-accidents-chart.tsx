'use client';

import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip } from 'recharts';
import type { Incident } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface AnnualAccidentsChartProps {
  incidents: Incident[];
}

function excelSerialDateToJSDate(serial: number): Date | null {
  if (typeof serial !== 'number' || isNaN(serial)) {
    return null;
  }
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const fractional_day = serial - Math.floor(serial) + 0.0000001;

  let total_seconds = Math.floor(86400 * fractional_day);

  const seconds = total_seconds % 60;
  total_seconds -= seconds;

  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
}


export default function AnnualAccidentsChart({ incidents }: AnnualAccidentsChartProps) {
  const dataByYear = incidents.reduce((acc, incident) => {
    let date: Date | null = null;
    const dateTimeValue = incident.dateTime;

    if (typeof dateTimeValue === 'number') {
      date = excelSerialDateToJSDate(dateTimeValue);
    } else if (typeof dateTimeValue === 'string' && dateTimeValue.length > 0) {
      try {
        date = new Date(String(dateTimeValue).replace(/\./g, '-').replace(/-$/, ''));
      } catch (e) {
        // Invalid date string format
      }
    }

    if (!date || isNaN(date.getTime())) {
      return acc;
    }

    const year = date.getFullYear().toString();
    if (!acc[year]) {
      acc[year] = { year, '사고 건수': 0 };
    }
    acc[year]['사고 건수']++;
    
    return acc;
  }, {} as Record<string, { year: string; '사고 건수': number }>);
  
  const chartData = Object.values(dataByYear).sort((a, b) => parseInt(a.year) - parseInt(b.year));
  
  const allYears = ['2019', '2020', '2021', '2022', '2023'];
  
  const fullChartData = allYears.map(yearStr => {
      const found = chartData.find(d => d.year === yearStr);
      return { year: yearStr, '사고 건수': found ? found['사고 건수'] : 0 };
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center p-4 pb-2">
        <CardTitle>년도별 사고 발생 현황</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-2 pt-0">
        <ChartContainer config={{ '사고 건수': { label: '사고 건수', color: 'hsl(var(--primary))' } }} className="h-full w-full">
          <RechartsBarChart
            data={fullChartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5, }}
            accessibilityLayer
          >
            <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString()}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                label={{ value: '사고 건수', angle: -90, position: 'insideLeft', offset: 10, fill: 'hsl(var(--muted-foreground))' }}
                allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="사고 건수" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
