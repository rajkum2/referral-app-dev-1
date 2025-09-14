import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRightLeft, GraduationCap, Briefcase, Plus } from 'lucide-react';
import StageBadge from '@/components/shared/stage-badge';

const trainingReferrals = [
  { id: '1', student: 'Rahul Sharma', program: 'Data Science Bootcamp', institute: 'Tech Academy', stage: 'qualified', value: '₹15,000' },
  { id: '2', student: 'Priya Patel', program: 'Web Development', institute: 'Digital Skills', stage: 'proposal', value: '₹12,000' },
];

const jobReferrals = [
  { id: '3', student: 'Amit Kumar', position: 'Frontend Developer', company: 'TechCorp', stage: 'contacted', value: '₹25,000' },
  { id: '4', student: 'Sarah Wilson', position: 'Data Analyst', company: 'Analytics Pro', stage: 'closed', value: '₹30,000' },
];

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Referrals</h1>
          <p className="text-muted-foreground">Track training and job referral pipelines</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Referral
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2.4L</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="training" className="space-y-4">
        <TabsList>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Training Pipeline
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Job Pipeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Referrals</CardTitle>
              <CardDescription>Student referrals to training programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{referral.student}</div>
                      <div className="text-sm text-muted-foreground">{referral.program}</div>
                      <div className="text-xs text-muted-foreground">{referral.institute}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StageBadge stage={referral.stage} />
                      <div className="text-right">
                        <div className="font-medium">{referral.value}</div>
                        <div className="text-xs text-muted-foreground">Commission</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Referrals</CardTitle>
              <CardDescription>Student referrals to job opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{referral.student}</div>
                      <div className="text-sm text-muted-foreground">{referral.position}</div>
                      <div className="text-xs text-muted-foreground">{referral.company}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StageBadge stage={referral.stage} />
                      <div className="text-right">
                        <div className="font-medium">{referral.value}</div>
                        <div className="text-xs text-muted-foreground">Commission</div>
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