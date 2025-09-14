import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/students">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Details</h1>
          <p className="text-muted-foreground">ID: {params.id}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center h-32 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Student profile details coming in Phase B</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center h-32 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Contact details coming in Phase B</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
          <CardDescription>Track all referrals and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">Referral tracking coming in Phase B</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}