@@ .. @@
+import { useQuery } from '@tanstack/react-query';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Phone, CheckSquare, Flame, DollarSign, ArrowRight } from 'lucide-react';
+import { dataService } from '@/lib/services';
+import LoadingSkeleton from '@/components/shared/loading-skeleton';
 
-const dashboardCards = [
-  {
-    title: 'My Calls Queue',
-    description: '12 students to contact today',
-    icon: Phone,
-    value: '12',
-    color: 'text-blue-600',
-    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
-  },
-  {
-    title: 'Due Tasks',
-    description: '5 tasks due this week',
-    icon: CheckSquare,
-    value: '5',
-    color: 'text-orange-600',
-    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
-  },
-  {
-    title: 'Hot Leads',
-    description: 'Ready for conversion',
-    icon: Flame,
-    value: '8',
-    color: 'text-red-600',
-    bgColor: 'bg-red-50 dark:bg-red-950/20',
-  },
-  {
-    title: 'Pending Payouts',
-    description: 'Awaiting commission',
-    icon: DollarSign,
-    value: '₹45,230',
-    color: 'text-green-600',
-    bgColor: 'bg-green-50 dark:bg-green-950/20',
-  },
-];
-
 export default function HomePage() {
+  const { data: todayTasks = [], isLoading: loadingTasks } = useQuery({
+    queryKey: ['tasks', 'today'],
+    queryFn: () => dataService.getTasks({ due: 'today' })
+  });
+
+  const { data: overdueTasks = [] } = useQuery({
+    queryKey: ['tasks', 'overdue'],
+    queryFn: () => dataService.getTasks({ due: 'overdue' })
+  });
+
+  const { data: hotLeads = [] } = useQuery({
+    queryKey: ['students', 'qualified'],
+    queryFn: () => dataService.getStudents({ stage: 'qualified' })
+  });
+
+  const { data: pendingCommissions = [] } = useQuery({
+    queryKey: ['commissions', 'pending'],
+    queryFn: () => dataService.getCommissionLedgers({ status: 'pending' })
+  });
+
+  const pendingAmount = pendingCommissions.reduce((sum, c) => sum + c.expected_amount, 0);
+
+  const dashboardCards = [
+    {
+      title: 'My Calls Queue',
+      description: `${todayTasks.filter(t => t.type === 'call').length} calls scheduled today`,
+      icon: Phone,
+      value: todayTasks.filter(t => t.type === 'call').length.toString(),
+      color: 'text-blue-600',
+      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
+    },
+    {
+      title: 'Due Tasks',
+      description: `${overdueTasks.length} tasks overdue`,
+      icon: CheckSquare,
+      value: (todayTasks.length + overdueTasks.length).toString(),
+      color: 'text-orange-600',
+      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
+    },
+    {
+      title: 'Hot Leads',
+      description: 'Ready for conversion',
+      icon: Flame,
+      value: hotLeads.length.toString(),
+      color: 'text-red-600',
+      bgColor: 'bg-red-50 dark:bg-red-950/20',
+    },
+    {
+      title: 'Pending Payouts',
+      description: 'Awaiting commission',
+      icon: DollarSign,
+      value: `₹${pendingAmount.toLocaleString()}`,
+      color: 'text-green-600',
+      bgColor: 'bg-green-50 dark:bg-green-950/20',
+    },
+  ];
+
   return (
     <div className="space-y-6">
@@ .. @@
       </div>
 
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
-        {dashboardCards.map((card) => {
-          const Icon = card.icon;
-          return (
-            <Card key={card.title} className="relative overflow-hidden">
-              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
-                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
-                <div className={`rounded-lg p-2 ${card.bgColor}`}>
-                  <Icon className={`h-4 w-4 ${card.color}`} />
-                </div>
-              </CardHeader>
-              <CardContent>
-                <div className="text-2xl font-bold">{card.value}</div>
-                <p className="text-xs text-muted-foreground">{card.description}</p>
-                <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto">
-                  View details <ArrowRight className="ml-1 h-3 w-3" />
-                </Button>
-              </CardContent>
-            </Card>
-          );
-        })}
+        {loadingTasks ? (
+          Array(4).fill(0).map((_, i) => (
+            <LoadingSkeleton key={i} variant="card" />
+          ))
+        ) : (
+          dashboardCards.map((card) => {
+            const Icon = card.icon;
+            return (
+              <Card key={card.title} className="relative overflow-hidden">
+                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
+                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
+                  <div className={`rounded-lg p-2 ${card.bgColor}`}>
+                    <Icon className={`h-4 w-4 ${card.color}`} />
+                  </div>
+                </CardHeader>
+                <CardContent>
+                  <div className="text-2xl font-bold">{card.value}</div>
+                  <p className="text-xs text-muted-foreground">{card.description}</p>
+                  <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto">
+                    View details <ArrowRight className="ml-1 h-3 w-3" />
+                  </Button>
+                </CardContent>
+              </Card>
+            );
+          })
+        )}
       </div>
 
       <div className="grid gap-6 md:grid-cols-2">