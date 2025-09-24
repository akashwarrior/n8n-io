import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { 
  Key, 
  Search, 
  Filter, 
  Shield, 
  MoreHorizontal,
  Plus,
  Calendar
} from "lucide-react";

type CredentialItem = {
  id: string;
  provider: string;
  name: string;
  createdAt: string;
  status: "active" | "expired" | "inactive";
  usedBy: number;
};

const CREDS: CredentialItem[] = [
  { id: "c1", provider: "Telegram", name: "Bot Token", createdAt: "Aug 03", status: "active", usedBy: 3 },
  { id: "c2", provider: "OpenAI", name: "Production", createdAt: "Sep 12", status: "active", usedBy: 8 },
  { id: "c3", provider: "Resend", name: "Marketing", createdAt: "Jul 19", status: "inactive", usedBy: 1 },
  { id: "c4", provider: "Google", name: "Gemini API", createdAt: "Oct 15", status: "expired", usedBy: 2 },
];

const getStatusBadge = (status: string) => {
  const variants = {
    active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    expired: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    inactive: "bg-gray-100 text-gray-700 dark:bg-gray-950/40 dark:text-gray-300"
  };
  return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-700";
};

const getProviderIcon = (provider: string) => {
  // In a real app, you'd have actual provider icons
  return <Shield className="size-5 text-primary" />;
};

export default function CredentialsPage() {
  return (
    <div className="flex flex-1 flex-col p-6 space-y-8">
      <PageHeader
        title="Credentials"
        subtitle="Securely store and manage API keys and tokens"
        actions={
          <Button className="h-10">
            <Plus className="mr-2 size-4" />
            New Credential
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search credentials..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 size-4" />
          Filter
        </Button>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {CREDS.map((credential) => (
          <div key={credential.id} className="console-card p-6 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getProviderIcon(credential.provider)}
                <div>
                  <div className="text-sm text-muted-foreground">{credential.provider}</div>
                  <h3 className="font-semibold">{credential.name}</h3>
                </div>
              </div>
              
              <Badge className={`text-xs ${getStatusBadge(credential.status)}`} variant="secondary">
                {credential.status}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                <span>Created {credential.createdAt}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Key className="size-4" />
                <span>Used by {credential.usedBy} workflow{credential.usedBy !== 1 ? 's' : ''}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {CREDS.length === 0 && (
        <div className="console-card p-12 text-center">
          <Key className="size-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No credentials stored</h3>
          <p className="text-muted-foreground mb-6">
            Add your API keys and tokens to connect with external services
          </p>
          <Button>
            <Plus className="mr-2 size-4" />
            Add Credential
          </Button>
        </div>
      )}
    </div>
  );
}


