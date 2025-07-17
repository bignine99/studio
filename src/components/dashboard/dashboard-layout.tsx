import {
  Building,
  ClipboardList,
  Home,
  Settings,
  Shield,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Header from '@/components/dashboard/header';
import StatsCard from '@/components/dashboard/stats-card';
import SafetyScoreChart from '@/components/dashboard/safety-score-chart';
import IncidentTypesChart from '@/components/dashboard/incident-types-chart';
import RecentAlerts from '@/components/dashboard/recent-alerts';
import HazardIdentifier from '@/components/dashboard/hazard-identifier';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <div className="flex h-8 items-center gap-2 p-2">
            <Shield className="size-6 text-primary" />
            <span className="text-lg font-semibold">CSD</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard" isActive>
                <Home />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Inspections">
                <ClipboardList />
                Inspections
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Team">
                <Users />
                Team
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Sites">
                <Building />
                Sites
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Safety Score"
              value="92"
              change="+2.5%"
              icon={<Shield className="text-green-500" />}
            />
            <StatsCard
              title="Active Alerts"
              value="3"
              change="+1"
              icon={<Shield className="text-accent" />}
            />
            <StatsCard
              title="Inspections Due"
              value="5"
              change="This week"
              icon={<ClipboardList className="text-blue-500" />}
            />
            <StatsCard
              title="Days Since Last Incident"
              value="128"
              change="All time high"
              icon={<Home className="text-gray-500" />}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <HazardIdentifier />
            </div>
            <div className="space-y-6">
              <SafetyScoreChart />
              <IncidentTypesChart />
              <RecentAlerts />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
