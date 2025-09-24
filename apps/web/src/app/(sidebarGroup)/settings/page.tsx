"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save
} from "lucide-react";

export default function SettingsPage() {
  const [telemetry, setTelemetry] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  return (
    <div className="flex flex-1 flex-col p-6 space-y-8">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your workspace preferences and configuration"
        actions={
          <Button className="h-10">
            <Save className="mr-2 size-4" />
            Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="console-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Settings className="size-5 text-primary" />
            <div>
              <h3 className="font-semibold">General</h3>
              <p className="text-sm text-muted-foreground">Basic workspace preferences</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="telemetry" className="font-medium">Anonymous telemetry</Label>
                <p className="text-xs text-muted-foreground">Help us improve by sharing usage data</p>
              </div>
              <Switch id="telemetry" checked={telemetry} onCheckedChange={setTelemetry} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="confirm" className="font-medium">Confirm destructive actions</Label>
                <p className="text-xs text-muted-foreground">Show confirmation dialogs for dangerous operations</p>
              </div>
              <Switch id="confirm" checked={confirmDelete} onCheckedChange={setConfirmDelete} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-save" className="font-medium">Auto-save workflows</Label>
                <p className="text-xs text-muted-foreground">Automatically save changes while editing</p>
              </div>
              <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="console-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <User className="size-5 text-primary" />
            <div>
              <h3 className="font-semibold">Profile</h3>
              <p className="text-sm text-muted-foreground">Your personal information</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="display-name" className="font-medium">Display Name</Label>
              <Input id="display-name" placeholder="John Doe" className="mt-1" />
            </div>
            
            <div>
              <Label htmlFor="email" className="font-medium">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
            </div>
            
            <div>
              <Label htmlFor="bio" className="font-medium">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." className="mt-1" rows={3} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="console-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Bell className="size-5 text-primary" />
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage how you receive updates</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="font-medium">Email notifications</Label>
                <p className="text-xs text-muted-foreground">Receive workflow execution updates via email</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="console-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="size-5 text-primary" />
            <div>
              <h3 className="font-semibold">Security</h3>
              <p className="text-sm text-muted-foreground">Protect your account and data</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Enable Two-Factor Authentication
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Download Account Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


