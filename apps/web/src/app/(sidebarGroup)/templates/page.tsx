import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { NODE_TEMPLATES } from "@/data/node-templates";
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  LayoutGrid,
  Sparkles
} from "lucide-react";

// Template categories with colors
const CATEGORY_COLORS: Record<string, string> = {
  "Core": "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  "AI": "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
  "Action in an app": "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
  "Data transformation": "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
  "Flow": "bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300",
  "Human in the loop": "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300"
};

export default function TemplatesPage() {
  return (
    <div className="flex flex-1 flex-col p-6 space-y-8">
      <PageHeader
        title="Templates"
        subtitle="Start from pre-built building blocks and accelerate your workflow creation"
        actions={
          <Button variant="outline" className="h-10">
            <Sparkles className="mr-2 size-4" />
            Submit Template
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 size-4" />
          Filter
        </Button>
      </div>

      {/* Featured Templates */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="size-5 text-amber-500" />
          <h2 className="text-xl font-semibold">Featured Templates</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {NODE_TEMPLATES.slice(0, 6).map((template) => (
            <div key={template.id} className="console-card p-6 group hover:border-primary/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl leading-none">{template.icon}</div>
                    <div>
                      <h3 className="font-semibold truncate">{template.label}</h3>
                      <Badge 
                        className={`text-xs mt-1 ${CATEGORY_COLORS[template.category] || "bg-gray-100 text-gray-700"}`}
                        variant="secondary"
                      >
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Download className="size-3" />
                      <span>1.2k uses</span>
                    </div>
                    
                    <Button size="sm" className="h-8">
                      Use Template
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="size-5 text-primary" />
          <h2 className="text-xl font-semibold">All Templates</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {NODE_TEMPLATES.map((template) => (
            <div key={template.id} className="console-card p-4 group hover:border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl leading-none">{template.icon}</div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate text-sm">{template.label}</h3>
                  <Badge 
                    className={`text-xs mt-1 ${CATEGORY_COLORS[template.category] || "bg-gray-100 text-gray-700"}`}
                    variant="secondary"
                  >
                    {template.category}
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {template.description}
              </p>
              
              <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                Use
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {NODE_TEMPLATES.length === 0 && (
        <div className="console-card p-12 text-center">
          <LayoutGrid className="size-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No templates available</h3>
          <p className="text-muted-foreground mb-6">
            Templates will appear here as they become available
          </p>
          <Button variant="outline">
            <Sparkles className="mr-2 size-4" />
            Submit Template
          </Button>
        </div>
      )}
    </div>
  );
}


