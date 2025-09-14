"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Phone, Mail } from 'lucide-react';
import FilterPills from '@/components/shared/filter-pills';
import LoadingSkeleton from '@/components/shared/loading-skeleton';
import { useAppStore } from '@/lib/store';
import Link from 'next/link';

const mockStudents = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    status: 'qualified',
    course: 'Data Science',
    location: 'Mumbai',
    lastContact: '2 days ago'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    status: 'new',
    course: 'Web Development',
    location: 'Bangalore',
    lastContact: '1 week ago'
  },
  {
    id: '3',
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 76543 21098',
    status: 'contacted',
    course: 'Digital Marketing',
    location: 'Delhi',
    lastContact: '3 days ago'
  }
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Array<{id: string, label: string, value: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedStudentId, setSelectedStudentId } = useAppStore();

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage your student referrals</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
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

      <FilterPills 
        filters={filters} 
        onRemove={removeFilter} 
        onClearAll={clearAllFilters} 
      />

      <div className="lg:grid lg:grid-cols-5 lg:gap-6 lg:h-[600px]">
        {/* Students List */}
        <div className="lg:col-span-2 space-y-4 lg:overflow-y-auto lg:pr-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <LoadingSkeleton key={i} variant="card" />
            ))
          ) : (
            mockStudents.map((student) => (
              <Card 
                key={student.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedStudentId === student.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedStudentId(student.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{student.course}</p>
                    </div>
                    <Badge variant={
                      student.status === 'qualified' ? 'default' :
                      student.status === 'new' ? 'secondary' : 'outline'
                    }>
                      {student.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {student.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {student.phone}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span>{student.location}</span>
                      <span className="text-xs">Last contact: {student.lastContact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Detail Pane (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 lg:border-l lg:pl-6">
          {selectedStudentId ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Student Details</h2>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/students/${selectedStudentId}`}>
                    View Full Profile
                  </Link>
                </Button>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="text-center text-muted-foreground">
                  Student detail view will be implemented in Phase B
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Select a student</h3>
                <p className="text-muted-foreground">
                  Choose a student from the list to view their details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}