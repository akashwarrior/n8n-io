'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Settings, 
  Share, 
  Save,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import { WorkflowData } from '@/types/workflow';
import { cn } from '@/lib/utils';

interface WorkflowHeaderProps {
  workflow: WorkflowData;
  isExecuting: boolean;
  onExecute: () => void;
  onStop: () => void;
  onSave: () => void;
  onToggleActive: (active: boolean) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function WorkflowHeader({
  workflow,
  isExecuting,
  onExecute,
  onStop,
  onSave,
  onToggleActive,
  activeTab,
  onTabChange
}: WorkflowHeaderProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  const getLastExecutionStatus = () => {
    const lastExecution = workflow.executions[0];
    if (!lastExecution) return null;

    const getStatusIcon = () => {
      switch (lastExecution.status) {
        case 'running':
          return <Clock className="w-3 h-3 animate-spin text-blue-500" />;
        case 'completed':
          return <CheckCircle className="w-3 h-3 text-green-500" />;
        case 'failed':
          return <AlertCircle className="w-3 h-3 text-red-500" />;
        case 'cancelled':
          return <Square className="w-3 h-3 text-gray-500" />;
        default:
          return null;
      }
    };

    const getStatusColor = () => {
      switch (lastExecution.status) {
        case 'running':
          return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'completed':
          return 'bg-green-50 text-green-700 border-green-200';
        case 'failed':
          return 'bg-red-50 text-red-700 border-red-200';
        case 'cancelled':
          return 'bg-gray-50 text-gray-700 border-gray-200';
        default:
          return 'bg-gray-50 text-gray-700 border-gray-200';
      }
    };

    return (
      <Badge variant="outline" className={cn("flex items-center gap-1", getStatusColor())}>
        {getStatusIcon()}
        {lastExecution.status}
        {lastExecution.endTime && (
          <span className="ml-1 text-xs">
            ({Math.round((lastExecution.endTime.getTime() - lastExecution.startTime.getTime()) / 1000)}s)
          </span>
        )}
      </Badge>
    );
  };

  return (
    <div className="bg-background border-b border-border">
      {/* Top bar - Console.com style */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-3 h-3 rounded-full",
              workflow.isActive ? "bg-emerald-500" : "bg-gray-400"
            )} />
            <h1 className="text-xl font-semibold text-foreground">
              {workflow.name}
            </h1>
            <Badge variant="secondary" className="text-xs">
              Personal
            </Badge>
          </div>
          
          {workflow.tags.length > 0 && (
            <div className="flex items-center gap-2">
              {workflow.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">{workflow.isActive ? 'Active' : 'Inactive'}</span>
            <Switch
              checked={workflow.isActive}
              onCheckedChange={onToggleActive}
            />
          </div>
          
          <div className="h-6 w-px bg-border" />
          
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs and execution controls - Console.com style */}
      <div className="px-6 py-3 flex items-center justify-between bg-muted/30">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="bg-background">
            <TabsTrigger value="editor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Editor
            </TabsTrigger>
            <TabsTrigger value="executions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Executions
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          {getLastExecutionStatus()}
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            
            {isExecuting ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={onStop}
              >
                <Square className="w-4 h-4 mr-2" />
                Stop execution
              </Button>
            ) : (
              <Button
                onClick={onExecute}
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Execute workflow
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
