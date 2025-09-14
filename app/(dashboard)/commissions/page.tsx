import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, FileText, TrendingUp, Calendar } from 'lucide-react';

const commissions = [
  { id: '1', student: 'Rahul Sharma', amount: '₹15,000', status: 'paid', date: '2024-01-15', type: 'Training' },
  { id: '2', student: 'Priya Patel', amount: '₹25,000', status: 'pending', date: '2024-01-20', type: 'Job' },
  { id: '3', student: 'Amit Kumar', amount: '₹12,000', status: 'processing', date: '2024-01-22', type: 'Training' },
];

const invoices = [
  { id: 'INV-001', partner: 'Tech Academy', amount: '₹45,000', status: 'paid', dueDate: '2024-01-15' },
  { id: 'INV-002', partner: 'TechCorp Solutions', amount: '₹32,000', status: 'pending', dueDate: '2024-01-25' },
];

export default function CommissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Commissions & Invoices</h1>
          <p className="text-muted-foreground">Track earnings and manage invoicing</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Invoice
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,000</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹52,000</div>
            <p className="text-xs text-muted-foreground">5 referrals pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹89,000</div>
            <p className="text-xs text-muted-foreground">12 successful referrals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,500</div>
            <p className="text-xs text-muted-foreground">Per successful referral</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="commissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission History</CardTitle>
              <CardDescription>Track your referral commissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissions.map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{commission.student}</div>
                      <div className="text-sm text-muted-foreground">{commission.type} Referral</div>
                      <div className="text-xs text-muted-foreground">{commission.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        commission.status === 'paid' ? 'default' :
                        commission.status === 'pending' ? 'secondary' : 'outline'
                      }>
                        {commission.status}
                      </Badge>
                      <div className="text-right">
                        <div className="font-medium">{commission.amount}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>Manage partner invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{invoice.id}</div>
                      <div className="text-sm text-muted-foreground">{invoice.partner}</div>
                      <div className="text-xs text-muted-foreground">Due: {invoice.dueDate}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        invoice.status === 'paid' ? 'default' : 'secondary'
                      }>
                        {invoice.status}
                      </Badge>
                      <div className="text-right">
                        <div className="font-medium">{invoice.amount}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}