'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Phone, Mail } from 'lucide-react';
import FilterPills from '@/components/shared/filter-pills';
import LoadingSkeleton from '@/components/shared/loading-skeleton';
import { useAppStore } from '@/lib/store';
import { dataService } from '@/lib/services';
import Link from 'next/link';

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Array<{id: string, label: string, value: string}>>([]);
  const { selectedStudentId, setSelectedStudentId } = useAppStore();

  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students', filters],
    queryFn: () => {
      const stageFilter = filters.find(f => f.label === 'Stage');
      return dataService.getStudents(stageFilter ? { stage: stageFilter.value } : {});
    }
  });

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  const filteredStudents = students.filter(student => 
    searchTerm === '' || 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Error loading students: {error.message}</p>
      </div>
    );
  }

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
            filteredStudents.map((student) => (
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
                      <p className="text-sm text-muted-foreground">{student.skills.slice(0, 2).join(', ')}</p>
                    </div>
                    <Badge variant={
                      student.stage === 'qualified' ? 'default' :
                      student.stage === 'new' ? 'secondary' : 'outline'
                    }>
                      {student.stage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {student.email_verified && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {typeof student.email_verified === 'string' ? student.email_verified : 'Email verified'}
                      </div>
                    )}
                    {student.phone_verified && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {typeof student.phone_verified === 'string' ? student.phone_verified : 'Phone verified'}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span>{student.city}</span>
                      <span className="text-xs">Score: {student.readiness_score}</span>
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
                  <Link href={`/students/${selectedStudentId}`}>
                    View Full Profile
                  </Link>
                </Button>
              </div>
              {(() => {
                const selectedStudent = filteredStudents.find(s => s.id === selectedStudentId);
                return selectedStudent ? (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{selectedStudent.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div><strong>City:</strong> {selectedStudent.city}</div>
                        <div><strong>Education:</strong> {selectedStudent.education}</div>
                        <div><strong>Experience:</strong> {selectedStudent.exp_years} years</div>
                        <div><strong>Skills:</strong> {selectedStudent.skills.join(', ')}</div>
                        <div><strong>Readiness Score:</strong> {selectedStudent.readiness_score}/100</div>
                        <div><strong>Stage:</strong> {selectedStudent.stage}</div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <p className="text-center text-muted-foreground">
                      Loading student details...
                    </p>
                  </div>
                );
              })()}
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