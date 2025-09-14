import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, FileText, TrendingUp, Calendar } from 'lucide-react';
import { dataService } from '@/lib/services';
import LoadingSkeleton from '@/components/shared/loading-skeleton';

export default function CommissionsPage() {
  const { data: commissionLedgers = [], isLoading: loadingLedgers } = useQuery({
    queryKey: ['commissionLedgers'],
    queryFn: () => dataService.getCommissionLedgers()
  });

  const { data: invoices = [], isLoading: loadingInvoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => dataService.getInvoices()
  });

  const { data: referrals = [] } = useQuery({
    queryKey: ['referrals'],
    queryFn: () => dataService.getReferrals()
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: () => dataService.getStudents()
  });

  const { data: partners = [] } = useQuery({
    queryKey: ['partners'],
    queryFn: () => dataService.getPartners()
  });

  const getStudentName = (referralId: string) => {
    const referral = referrals.find(r => r.id === referralId);
    const student = students.find(s => s.id === referral?.student_id);
    return student?.name || 'Unknown Student';
  };

  const getPartnerName = (partnerId: string) => {
    const partner = partners.find(p => p.id === partnerId);
    return partner?.name || 'Unknown Partner';
  };

  const totalEarned = commissionLedgers
    .filter(l => l.status === 'paid')
    .reduce((sum, l) => sum + l.expected_amount, 0);

  const pendingAmount = commissionLedgers
    .filter(l => l.status === 'pending')
    .reduce((sum, l) => sum + l.expected_amount, 0);

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
            <div className="text-2xl font-bold">₹{totalEarned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{commissionLedgers.filter(l => l.status === 'pending').length} referrals pending</p>
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
                {loadingLedgers ? (
                  Array(3).fill(0).map((_, i) => (
                    <LoadingSkeleton key={i} variant="card" />
                  ))
                ) : commissionLedgers.length > 0 ? (
                  commissionLedgers.map((ledger) => (
                    <div key={ledger.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{getStudentName(ledger.referral_id)}</div>
                        <div className="text-sm text-muted-foreground">Commission</div>
                        <div className="text-xs text-muted-foreground">{new Date(ledger.trigger_date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          ledger.status === 'paid' ? 'default' :
                          ledger.status === 'pending' ? 'secondary' : 'outline'
                        }>
                          {ledger.status}
                        </Badge>
                        <div className="text-right">
                          <div className="font-medium">₹{ledger.expected_amount.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No commission records found
                  </div>
                )}
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
                {loadingInvoices ? (
                  Array(3).fill(0).map((_, i) => (
                    <LoadingSkeleton key={i} variant="card" />
                  ))
                ) : invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{invoice.invoice_no}</div>
                        <div className="text-sm text-muted-foreground">{getPartnerName(invoice.partner_id)}</div>
                        <div className="text-xs text-muted-foreground">{new Date(invoice.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          invoice.status === 'paid' ? 'default' : 
                          invoice.status === 'overdue' ? 'destructive' : 'secondary'
                        }>
                          {invoice.status}
                        </Badge>
                        <div className="text-right">
                          <div className="font-medium">₹{invoice.total.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No invoices found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}