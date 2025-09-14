'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Filter, Building, GraduationCap } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import LoadingSkeleton from '@/components/shared/loading-skeleton';

const mockInstitutes = [
  { id: '1', name: 'Tech Academy', type: 'Institute', courses: 12, students: 245, status: 'active' },
  { id: '2', name: 'Digital Skills Institute', type: 'Institute', courses: 8, students: 156, status: 'active' },
];

const mockCompanies = [
  { id: '3', name: 'TechCorp Solutions', type: 'Company', openings: 5, hired: 23, status: 'active' },
  { id: '4', name: 'Digital Innovations Ltd', type: 'Company', openings: 8, hired: 15, status: 'active' },
];

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('institutes');
  const [isLoading, setIsLoading] = useState(false);
  const { selectedPartnerId, setSelectedPartnerId } = useAppStore();

  const partners = activeTab === 'institutes' ? mockInstitutes : mockCompanies;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Partners</h1>
          <p className="text-muted-foreground">Manage institutes and company partnerships</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Partner
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-6 lg:h-[600px]">
        {/* Partners List */}
        <div className="lg:col-span-1 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="institutes">
                <GraduationCap className="mr-2 h-4 w-4" />
                Institutes
              </TabsTrigger>
              <TabsTrigger value="companies">
                <Building className="mr-2 h-4 w-4" />
                Companies
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4 space-y-4 lg:overflow-y-auto lg:max-h-[500px] lg:pr-4">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <LoadingSkeleton key={i} variant="card" />
                ))
              ) : (
                partners.map((partner) => (
                  <Card 
                    key={partner.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPartnerId === partner.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedPartnerId(partner.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{partner.type}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-sm text-muted-foreground">
                        {activeTab === 'institutes' ? (
                          <div className="flex justify-between">
                            <span>{partner.courses} courses</span>
                            <span>{partner.students} students</span>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span>{partner.openings} openings</span>
                            <span>{partner.hired} hired</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Detail Pane (Desktop) */}
        <div className="hidden lg:block lg:col-span-2 lg:border-l lg:pl-6">
          {selectedPartnerId ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Partner Details</h2>
                <Button variant="outline">
                  View Full Profile
                </Button>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="text-center text-muted-foreground">
                  Partner detail view will be implemented in Phase B
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Select a partner</h3>
                <p className="text-muted-foreground">
                  Choose a partner from the list to view their details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}