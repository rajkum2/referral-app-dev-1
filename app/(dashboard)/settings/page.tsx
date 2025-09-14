import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Users, FileText, Upload, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage application configuration</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="consent">
            <Shield className="mr-2 h-4 w-4" />
            Consent
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" defaultValue="ReferLoop CRM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-email">Contact Email</Label>
                <Input id="org-email" type="email" defaultValue="contact@referloop.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-phone">Contact Phone</Label>
                <Input id="org-phone" defaultValue="+91 98765 43210" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Users & Roles</CardTitle>
              <CardDescription>Manage user access and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">User management coming in Phase B</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consent Management</CardTitle>
              <CardDescription>Configure consent text and privacy policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacy-policy">Privacy Policy</Label>
                <Textarea 
                  id="privacy-policy" 
                  rows={6}
                  defaultValue="Your privacy is important to us. This policy explains how we collect, use, and protect your personal information..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms-conditions">Terms & Conditions</Label>
                <Textarea 
                  id="terms-conditions" 
                  rows={6}
                  defaultValue="By using our services, you agree to these terms and conditions..."
                />
              </div>
              <Button>Update Consent Text</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Templates</CardTitle>
              <CardDescription>Manage data import templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Student Import</CardTitle>
                    <CardDescription>Template for bulk student data import</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Partner Import</CardTitle>
                    <CardDescription>Template for bulk partner data import</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}