import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRightLeft, GraduationCap, Briefcase, Plus } from 'lucide-react';
import StageBadge from '@/components/shared/stage-badge';
import { dataService } from '@/lib/services';
import LoadingSkeleton from '@/components/shared/loading-skeleton';

export default function ReferralsPage() {
  const { data: trainingReferrals = [], isLoading: loadingTraining } = useQuery({
    queryKey: ['referrals', 'training'],
    queryFn: () => dataService.getReferrals({ pipeline: 'training' })
  });

  const { data: jobReferrals = [], isLoading: loadingJobs } = useQuery({
    queryKey: ['referrals', 'job'],
    queryFn: () => dataService.getReferrals({ pipeline: 'job' })
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: () => dataService.getStudents()
  });

  const { data: partners = [] } = useQuery({
    queryKey: ['partners'],
    queryFn: () => dataService.getPartners()
  });

  const { data: programs = [] } = useQuery({
    queryKey: ['programs'],
    queryFn: () => dataService.getPrograms()
  });

  const { data: jobs = [] } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => dataService.getJobs()
  });

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student?.name || 'Unknown Student';
  };

  const getTargetDetails = (referral: any) => {
    if (referral.target_type === 'program') {
      const program = programs.find(p => p.id === referral.target_id);
      const partner = partners.find(p => p.id === program?.partner_id);
      return {
        title: program?.title || 'Unknown Program',
        partner: partner?.name || 'Unknown Institute'
      };
    } else {
      const job = jobs.find(j => j.id === referral.target_id);
      const partner = partners.find(p => p.id === job?.partner_id);
      return {
        title: job?.title || 'Unknown Job',
        partner: partner?.name || 'Unknown Company'
      };
    }
  };

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
            <div className="text-2xl font-bold">{trainingReferrals.length + jobReferrals.length}</div>
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
                {loadingTraining ? (
                  Array(3).fill(0).map((_, i) => (
                    <LoadingSkeleton key={i} variant="card" />
                  ))
                ) : trainingReferrals.length > 0 ? (
                  trainingReferrals.map((referral) => {
                    const targetDetails = getTargetDetails(referral);
                    return (
                      <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">{getStudentName(referral.student_id)}</div>
                          <div className="text-sm text-muted-foreground">{targetDetails.title}</div>
                          <div className="text-xs text-muted-foreground">{targetDetails.partner}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StageBadge stage={referral.stage} />
                          <div className="text-right">
                            <div className="font-medium">₹{referral.negotiated_terms_snapshot?.fee || 'TBD'}</div>
                            <div className="text-xs text-muted-foreground">Program Fee</div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No training referrals found
                  </div>
                )}
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
                {loadingJobs ? (
                  Array(3).fill(0).map((_, i) => (
                    <LoadingSkeleton key={i} variant="card" />
                  ))
                ) : jobReferrals.length > 0 ? (
                  jobReferrals.map((referral) => {
                    const targetDetails = getTargetDetails(referral);
                    return (
                      <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">{getStudentName(referral.student_id)}</div>
                          <div className="text-sm text-muted-foreground">{targetDetails.title}</div>
                          <div className="text-xs text-muted-foreground">{targetDetails.partner}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StageBadge stage={referral.stage} />
                          <div className="text-right">
                            <div className="font-medium">₹{referral.negotiated_terms_snapshot?.ctc || 'TBD'}</div>
                            <div className="text-xs text-muted-foreground">Expected CTC</div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No job referrals found
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