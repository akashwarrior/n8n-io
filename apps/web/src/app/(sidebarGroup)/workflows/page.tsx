import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  MoreHorizontal, 
  GitBranch, 
  Calendar, 
  Activity,
  Search,
  Filter
} from "lucide-react";

type WorkflowListItem = {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  runs7d: number;
  status: "active" | "inactive";
  tags: string[];
};

const WORKFLOWS: WorkflowListItem[] = [
  { 
    id: "w1", 
    name: "Telegram FAQ Bot", 
    description: "Automated customer support responses via Telegram",
    updatedAt: "1d ago", 
    runs7d: 23, 
    status: "active",
    tags: ["telegram", "ai", "support"]
  },
  { 
    id: "w2", 
    name: "Form → Resend Email", 
    description: "Send welcome emails when users submit contact forms",
    updatedAt: "3d ago", 
    runs7d: 5, 
    status: "inactive",
    tags: ["email", "forms"]
  },
  { 
    id: "w3", 
    name: "Webhook → Gemini → Reply", 
    description: "Process incoming webhooks with AI and send responses",
    updatedAt: "6h ago", 
    runs7d: 42, 
    status: "active",
    tags: ["webhook", "ai", "gemini"]
  },
];

export default function WorkflowsPage() {
  return (
    <div className="flex flex-1 flex-col p-6 space-y-8">
      <PageHeader
        title="Workflows"
        subtitle="Create and manage your automations"
        actions={
          <Button className="h-10">
            <GitBranch className="mr-2 size-4" />
            New Workflow
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search workflows..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 size-4" />
          Filter
        </Button>
      </div>

      {/* Workflows Grid */}
      <div className="grid gap-6">
        {WORKFLOWS.map((workflow) => (
          <div key={workflow.id} className="console-card p-6 group">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`size-3 rounded-full ${workflow.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                  <h3 className="text-lg font-semibold truncate">{workflow.name}</h3>
                  <Badge variant={workflow.status === "active" ? "default" : "secondary"} className="text-xs">
                    {workflow.status}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {workflow.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    Updated {workflow.updatedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="size-4" />
                    {workflow.runs7d} runs last 7d
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {workflow.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm">
                  {workflow.status === "active" ? (
                    <>
                      <Pause className="mr-2 size-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 size-4" />
                      Activate
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  Open
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for when there are no workflows */}
      {WORKFLOWS.length === 0 && (
        <div className="console-card p-12 text-center">
          <GitBranch className="size-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No workflows yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first workflow to automate your processes
          </p>
          <Button>
            <GitBranch className="mr-2 size-4" />
            Create Workflow
          </Button>
        </div>
      )}
    </div>
  );
}


