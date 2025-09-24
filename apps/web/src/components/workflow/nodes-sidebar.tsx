'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, Plus, ChevronRight, ChevronDown, Zap, Bot, Globe, Database, GitBranch, Users } from 'lucide-react';
import { NODE_TEMPLATES, NODE_CATEGORIES } from '@/data/node-templates';
import { NodeTemplate } from '@/types/workflow';
import { cn } from '@/lib/utils';

interface NodesSidebarProps {
  onNodeSelect: (template: NodeTemplate) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const categoryIcons: Record<string, any> = {
  'core': Zap,
  'ai': Bot,
  'action-in-an-app': Globe,
  'data-transformation': Database,
  'flow': GitBranch,
  'human-in-the-loop': Users,
};

export function NodesSidebar({ onNodeSelect, isOpen, onToggle }: NodesSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['core', 'ai', 'action-in-an-app'])
  );

  const filteredTemplates = NODE_TEMPLATES.filter(template => {
    const matchesSearch = template.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const groupedTemplates = NODE_CATEGORIES.reduce((acc, category) => {
    const categoryKey = category.id;
    acc[categoryKey] = filteredTemplates.filter(
      template => template.category.toLowerCase().replace(/\s+/g, '-') === categoryKey
    );
    return acc;
  }, {} as Record<string, NodeTemplate[]>);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  if (!isOpen) {
    return (
      <div className="w-12 bg-background border-r border-border flex flex-col">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="m-3 p-2 h-8 w-8 hover:bg-accent"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-background border-r border-border flex flex-col">
      {/* Header - Console.com style */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Add nodes</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose what happens next</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2 h-8 w-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          {NODE_CATEGORIES.map((category) => {
            const templates = groupedTemplates[category.id] || [];
            const isExpanded = expandedCategories.has(category.id);
            const IconComponent = categoryIcons[category.id] || Zap;
            
            if (templates.length === 0 && searchQuery) return null;

            return (
              <Collapsible
                key={category.id}
                open={isExpanded}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-3 h-auto mb-1 hover:bg-accent rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-sm">{category.label}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {templates.length} node{templates.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-1 ml-3 mb-2">
                  {templates.map((template) => (
                    <Button
                      key={template.id}
                      variant="ghost"
                      onClick={() => onNodeSelect(template)}
                      className={cn(
                        "w-full p-3 h-auto text-left justify-start",
                        "hover:bg-accent rounded-lg border border-transparent hover:border-border console-card"
                      )}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="flex-shrink-0 w-8 h-8 bg-background border border-border rounded-lg flex items-center justify-center">
                          <span className="text-sm">{template.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="font-medium text-sm mb-1">
                            {template.label}
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-2">
                            {template.description}
                          </div>
                          {template.requiredCredentials.length > 0 && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
                                Requires auth
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
          
          {filteredTemplates.length === 0 && searchQuery && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
              <p className="text-sm">No nodes found</p>
              <p className="text-xs mt-1">Try adjusting your search</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
