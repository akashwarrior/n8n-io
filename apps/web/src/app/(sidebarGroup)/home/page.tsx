import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Plus,
  Activity,
  Users,
  BarChart3
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-0">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
        </div>
        <ThemeToggle />
      </div>

      {/* Hero Section - Console.com style */}
      <div className="px-6 py-12">
        <div className="max-w-4xl">
          <h1 className="hero-text bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Your workflows shouldn't be
          </h1>
          <h1 className="hero-text bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mt-2">
            manual work
          </h1>
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            Automate your processes with powerful workflows. Connect apps, trigger actions, and save time on repetitive tasks.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <Button size="lg" className="h-12 px-8 text-base">
              Create Workflow
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              View Templates
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="console-card p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="size-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Active Workflows</div>
              </div>
            </div>
          </div>
          
          <div className="console-card p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="size-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Executions This Week</div>
              </div>
            </div>
          </div>
          
          <div className="console-card p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Clock className="size-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">2.3s</div>
                <div className="text-sm text-muted-foreground">Avg. Runtime</div>
              </div>
            </div>
          </div>
          
          <div className="console-card p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle className="size-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">98.5%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="console-card p-6 group cursor-pointer hover:border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Plus className="size-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">New Workflow</div>
                <div className="text-sm text-muted-foreground">Start from scratch</div>
              </div>
            </div>
          </div>
          
          <div className="console-card p-6 group cursor-pointer hover:border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Activity className="size-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">View Executions</div>
                <div className="text-sm text-muted-foreground">Monitor activity</div>
              </div>
            </div>
          </div>
          
          <div className="console-card p-6 group cursor-pointer hover:border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="size-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Analytics</div>
                <div className="text-sm text-muted-foreground">View insights</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="console-card">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-2 bg-emerald-500 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium">Telegram FAQ Bot executed successfully</div>
                <div className="text-sm text-muted-foreground">2 minutes ago • 245ms</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium">New workflow "Email Automation" created</div>
                <div className="text-sm text-muted-foreground">1 hour ago</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-2 bg-amber-500 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium">Credential "OpenAI API" updated</div>
                <div className="text-sm text-muted-foreground">3 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
