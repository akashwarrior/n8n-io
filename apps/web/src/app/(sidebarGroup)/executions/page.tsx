import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  Activity
} from "lucide-react";

type ExecItem = {
  id: string;
  workflow: string;
  status: "completed" | "failed" | "running";
  durationMs: number;
  start: string;
  nodes: number;
};

const EXECS: ExecItem[] = [
  { id: "e1", workflow: "Telegram FAQ Bot", status: "completed", durationMs: 245, start: "1h ago", nodes: 4 },
  { id: "e2", workflow: "Form → Resend Email", status: "failed", durationMs: 531, start: "3h ago", nodes: 3 },
  { id: "e3", workflow: "Webhook → Gemini → Reply", status: "completed", durationMs: 312, start: "yesterday", nodes: 5 },
  { id: "e4", workflow: "Data Sync Pipeline", status: "running", durationMs: 1200, start: "2m ago", nodes: 7 },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="size-4 text-emerald-600" />;
    case "failed":
      return <AlertCircle className="size-4 text-red-600" />;
    case "running":
      return <Play className="size-4 text-blue-600" />;
    default:
      return <Clock className="size-4 text-gray-600" />;
  }
};

const getStatusBadge = (status: string) => {
  const variants = {
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    failed: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    running: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
  };
  return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-700";
};

export default function ExecutionsPage() {
  return (
    <div className="flex flex-1 flex-col p-6 space-y-8">
      <PageHeader
        title="Executions"
        subtitle="Monitor and debug workflow runs"
        actions={
          <Button variant="outline" className="h-10">
            <Activity className="mr-2 size-4" />
            View Analytics
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search executions..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 size-4" />
          Filter
        </Button>
      </div>

      {/* Executions List */}
      <div className="grid gap-4">
        {EXECS.map((execution) => (
          <div key={execution.id} className="console-card p-6 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {getStatusIcon(execution.status)}
                  <Badge className={`text-xs ${getStatusBadge(execution.status)}`} variant="secondary">
                    {execution.status}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{execution.workflow}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{execution.start}</span>
                    <span>•</span>
                    <span>{execution.durationMs}ms</span>
                    <span>•</span>
                    <span>{execution.nodes} nodes</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {execution.status === "failed" && (
                  <Button variant="outline" size="sm">
                    Retry
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {EXECS.length === 0 && (
        <div className="console-card p-12 text-center">
          <Activity className="size-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No executions yet</h3>
          <p className="text-muted-foreground mb-6">
            Workflow executions will appear here when you run your automations
          </p>
          <Button>
            <Play className="mr-2 size-4" />
            Run Workflow
          </Button>
        </div>
      )}
    </div>
  );
}


