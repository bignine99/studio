import { TriangleAlert, Info } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Unsecured ladder reported',
    site: 'Site A, Section 2',
    time: '25m ago',
  },
  {
    id: 2,
    type: 'info',
    title: 'Safety inspection completed',
    site: 'Site B, Main Hall',
    time: '1h ago',
  },
  {
    id: 3,
    type: 'warning',
    title: 'Improper PPE usage detected',
    site: 'Site A, Scaffolding',
    time: '3h ago',
  },
];

export default function RecentAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Alerts</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3">
              {alert.type === 'warning' ? (
                <div className="rounded-full bg-accent/10 p-2">
                  <TriangleAlert className="h-5 w-5 text-accent" />
                </div>
              ) : (
                <div className="rounded-full bg-primary/10 p-2">
                  <Info className="h-5 w-5 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm text-muted-foreground">
                  {alert.site} - {alert.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
