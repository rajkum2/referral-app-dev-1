import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Zap, TrendingUp } from 'lucide-react';
import EmptyState from '@/components/shared/empty-state';

export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Matches</h1>
          <p className="text-muted-foreground">AI-powered program and job matching</p>
        </div>
        <Button>
          <Zap className="mr-2 h-4 w-4" />
          Run Matching
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-blue-500" />
              Program Matches
            </CardTitle>
            <CardDescription>Students matched to training programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-2xl font-bold mb-2">24</div>
              <p className="text-sm text-muted-foreground">New matches this week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-green-500" />
              Job Matches
            </CardTitle>
            <CardDescription>Students matched to job opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-2xl font-bold mb-2">18</div>
              <p className="text-sm text-muted-foreground">New matches this week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              Success Rate
            </CardTitle>
            <CardDescription>Match to conversion ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-2xl font-bold mb-2">78%</div>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Matches</CardTitle>
          <CardDescription>Latest AI-powered student matches</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Target}
            title="No recent matches"
            description="Run the matching algorithm to see AI-powered recommendations for your students."
            action={{
              label: "Run Matching",
              onClick: () => console.log("Run matching algorithm")
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}