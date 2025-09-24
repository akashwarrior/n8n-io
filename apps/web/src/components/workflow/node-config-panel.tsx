'use client';

import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { X, Eye, EyeOff, Save, Play } from 'lucide-react';
import { NodeData, NodeInput } from '@/types/workflow';
import { NODE_TEMPLATES } from '@/data/node-templates';
import { cn } from '@/lib/utils';

interface NodeConfigPanelProps {
  nodeData: NodeData | null;
  nodeId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (nodeId: string, data: Partial<NodeData>) => void;
  onTest: (nodeId: string) => void;
}

export function NodeConfigPanel({
  nodeData,
  nodeId,
  isOpen,
  onClose,
  onSave,
  onTest
}: NodeConfigPanelProps) {
  const [config, setConfig] = useState<Record<string, any>>({});
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [showCredentials, setShowCredentials] = useState<Record<string, boolean>>({});

  const template = nodeData ? NODE_TEMPLATES.find(t => t.type === nodeData.type) : null;

  useEffect(() => {
    if (nodeData) {
      setConfig(nodeData.config || {});
      setCredentials(nodeData.credentials || {});
    }
  }, [nodeData]);

  if (!isOpen || !nodeData || !nodeId || !template) {
    return null;
  }

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleCredentialChange = (key: string, value: string) => {
    setCredentials(prev => ({ ...prev, [key]: value }));
  };

  const toggleCredentialVisibility = (key: string) => {
    setShowCredentials(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onSave(nodeId, {
      config,
      credentials
    });
  };

  const handleTest = () => {
    handleSave();
    onTest(nodeId);
  };

  const renderInput = (input: NodeInput) => {
    const value = config[input.key] ?? input.defaultValue ?? '';

    switch (input.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleConfigChange(input.key, e.target.value)}
            placeholder={input.placeholder}
            className="min-h-[100px] resize-none"
          />
        );
      
      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(val) => handleConfigChange(input.key, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={input.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {input.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleConfigChange(input.key, parseFloat(e.target.value) || 0)}
            placeholder={input.placeholder}
          />
        );
      
      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleConfigChange(input.key, e.target.value)}
            placeholder={input.placeholder}
          />
        );
    }
  };

  return (
    <div className="w-96 bg-background border-l border-border flex flex-col console-card !rounded-none !border-r-0 !border-t-0 !border-b-0">
      {/* Modern Header - Console.com style */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg border border-border flex items-center justify-center text-lg">
              {template.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1">{template.label}</h2>
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                  {template.category}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Configuration Section */}
          {template.inputs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Configuration
              </h3>
              {template.inputs.map((input) => (
                <div key={input.key} className="space-y-2">
                  <Label htmlFor={input.key} className="text-sm font-medium">
                    {input.label}
                    {input.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {renderInput(input)}
                  {input.placeholder && (
                    <p className="text-xs text-muted-foreground">{input.placeholder}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Credentials Section */}
          {template.requiredCredentials.length > 0 && (
            <>
              <Separator className="my-6" />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                  Credentials
                </h3>
                {template.requiredCredentials.map((credKey) => (
                  <div key={credKey} className="space-y-2">
                    <Label htmlFor={credKey} className="text-sm font-medium text-neutral-700">
                      {credKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id={credKey}
                        type={showCredentials[credKey] ? 'text' : 'password'}
                        value={credentials[credKey] || ''}
                        onChange={(e) => handleCredentialChange(credKey, e.target.value)}
                        placeholder={`Enter your ${credKey.replace(/_/g, ' ')}`}
                        className="pr-10 border-neutral-200 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 bg-neutral-50"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-neutral-400"
                        onClick={() => toggleCredentialVisibility(credKey)}
                      >
                        {showCredentials[credKey] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Output Schema Section */}
          {template.outputs.length > 0 && (
            <>
              <Separator className="my-6" />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                  Output Schema
                </h3>
                <div className="space-y-2">
                  {template.outputs.map((output) => (
                    <div key={output.key} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{output.label}</p>
                        <p className="text-xs text-neutral-500 font-mono">{output.key}</p>
                      </div>
                      <span className="text-xs text-neutral-600 bg-white px-2 py-1 rounded border border-neutral-200">
                        {output.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      {/* Modern Footer */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex gap-3 mb-4">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save changes
          </Button>
          <Button variant="outline" onClick={handleTest} className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            Test
          </Button>
        </div>
        
        {nodeData.status && (
          <div className={cn(
            "p-3 rounded-lg text-sm text-center border console-card",
            nodeData.status === 'success' && "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-800",
            nodeData.status === 'error' && "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-800",
            nodeData.status === 'running' && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-800"
          )}>
            {nodeData.status === 'success' && "✓ Node executed successfully"}
            {nodeData.status === 'error' && "✗ Node execution failed"}
            {nodeData.status === 'running' && "⏳ Node is running..."}
          </div>
        )}
      </div>
    </div>
  );
}
