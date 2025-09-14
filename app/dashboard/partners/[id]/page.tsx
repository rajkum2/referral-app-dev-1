import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building } from 'lucide-react';
import Link from 'next/link';

export default function PartnerDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/partners">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Partners
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Partner Details</h1>
          <p className="text-muted-foreground">ID: {params.id}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Partner Information
          </CardTitle>
          <CardDescription>Detailed partner profile and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">Partner details coming in Phase B</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}