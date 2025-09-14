import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Users, Building } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">R</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">ReferLoop</h1>
          </div>
          
          <h2 className="text-5xl font-bold tracking-tight lg:text-6xl">
            Student Referrals
            <span className="text-primary"> Made Simple</span>
          </h2>
          
          <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
            A mobile-first CRM designed for managing student referrals, partner relationships, and commission tracking. Built for efficiency and growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/dashboard/students">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid gap-6 mt-16 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Student Management</h3>
            <p className="text-muted-foreground">
              Track student progress, manage referrals, and monitor conversion rates with detailed analytics.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-950/20 flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Partner Network</h3>
            <p className="text-muted-foreground">
              Manage relationships with training institutes and companies. Track performance and optimize partnerships.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card">
            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-950/20 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
            <p className="text-muted-foreground">
              Smart algorithms match students to the right programs and job opportunities for higher success rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}