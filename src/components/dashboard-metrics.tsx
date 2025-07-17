import type { Incident } from '@/lib/types';
import KpiCard from './kpi-card';
import {
  AlertTriangle,
  HeartCrack,
  Users,
  Banknote,
  TrendingUp,
} from 'lucide-react';

interface DashboardMetricsProps {
  incidents: Incident[];
}

export default function DashboardMetrics({ incidents }: DashboardMetricsProps) {
  const totalAccidents = incidents.length;
  const totalFatalities = incidents.reduce((acc, i) => acc + i.fatalities, 0);
  const totalInjuries = incidents.reduce((acc, i) => acc + i.injuries, 0);
  const totalCostDamage = incidents.reduce((acc, i) => acc + i.costDamage, 0);

  const averageCostDamage =
    totalAccidents > 0 ? totalCostDamage / totalAccidents : 0;

  const averageRiskIndex =
    totalAccidents > 0
      ? ((incidents.reduce((acc, i) => acc + i.riskIndex, 0) / totalAccidents) * 10).toFixed(1)
      : 'N/A';

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
      <KpiCard
        title="총 사고 건수"
        value={totalAccidents.toLocaleString()}
        description="2019년 7월 ~ 2024년 6월"
        icon={AlertTriangle}
      />
      <KpiCard
        title="총 사망자 수"
        value={totalFatalities.toLocaleString()}
        description="전체 기간"
        icon={HeartCrack}
        iconClassName="text-destructive"
      />
      <KpiCard
        title="총 부상자 수"
        value={totalInjuries.toLocaleString()}
        description="전체 기간"
        icon={Users}
      />
      <KpiCard
        title="평균 피해 금액"
        value={`${Math.round(averageCostDamage * 100).toLocaleString()}만원`}
        description="총 피해 금액 / 사고건수"
        icon={Banknote}
      />
      <KpiCard
        title="사망자/부상자 비율"
        value={`${totalFatalities.toLocaleString()} / ${totalInjuries.toLocaleString()}`}
        description="전체 기간"
        icon={Users}
      />
      <KpiCard
        title="평균 사고위험지수"
        value={averageRiskIndex === 'N/A' ? 'N/A' : `${averageRiskIndex}/10`}
        description="최고 10"
        icon={TrendingUp}
      />
    </div>
  );
}
