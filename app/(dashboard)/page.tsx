import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, CheckSquare, Flame, DollarSign, ArrowRight } from 'lucide-react';

const dashboardCards = [
  {
    title: 'My Calls Queue',
    description: '12 students to contact today',
    icon: Phone,
    value: '12',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    title: 'Due Tasks',
    description: '5 tasks due this week',
    icon: CheckSquare,
    value: '5',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
  },
  {
    title: 'Hot Leads',
    description: 'Ready for conversion',
    icon: Flame,
    value: '8',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
  },
  {
    title: 'Pending Payouts',
    description: 'Awaiting commission',
    icon: DollarSign,
    value: '₹45,230',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your referrals today.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className={`rounded-lg p-2 ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
                <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto">
                  View details <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your referral network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: 'New student registered', time: '2 minutes ago', type: 'success' },
              { action: 'Partner approved application', time: '15 minutes ago', type: 'info' },
              { action: 'Commission payout processed', time: '1 hour ago', type: 'success' },
              { action: 'Follow-up call scheduled', time: '2 hours ago', type: 'warning' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className={`h-2 w-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  activity.type === 'warning' ? 'bg-orange-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Make a call
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <CheckSquare className="mr-2 h-4 w-4" />
              Add new student
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Flame className="mr-2 h-4 w-4" />
              Review hot leads
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <DollarSign className="mr-2 h-4 w-4" />
              Check commissions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}