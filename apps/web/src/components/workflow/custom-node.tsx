'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { NodeData } from '@/types/workflow';
import { X, Settings, Play, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomNodeProps extends NodeProps {
  data: NodeData;
  selected?: boolean;
  onDelete?: (nodeId: string) => void;
  onConfigure?: (nodeId: string) => void;
}

const CustomNode = memo(({ data, selected, id, onDelete, onConfigure }: CustomNodeProps) => {
  const getNodeIcon = () => {
    // Modern, clean icons for different node types
    const iconMap: Record<string, JSX.Element> = {
      'webhook': <div className="text-primary font-bold text-xs">API</div>,
      'telegram-send': <div className="text-blue-600 font-bold text-xs">TG</div>,
      'telegram-wait': <div className="text-blue-600 font-bold text-xs">TG</div>, 
      'llm-gemini': <div className="text-purple-600 font-bold text-xs">AI</div>,
      'llm-chatgpt': <div className="text-green-600 font-bold text-xs">AI</div>,
      'llm-anthropic': <div className="text-orange-600 font-bold text-xs">AI</div>,
      'memory': <div className="text-indigo-600 font-bold text-xs">DB</div>,
      'response': <div className="text-primary font-bold text-xs">OUT</div>,
      'resend-email': <div className="text-red-600 font-bold text-xs">@</div>,
      'if-condition': <div className="text-amber-600 font-bold text-xs">IF</div>,
      'form': <div className="text-cyan-600 font-bold text-xs">UI</div>
    };
    return iconMap[data.type] || <div className="text-gray-600 font-bold text-xs">?</div>;
  };

  const getStatusIcon = () => {
    switch (data.status) {
      case 'running':
        return <Clock className="w-3 h-3 text-blue-500 animate-pulse" />;
      case 'success':
        return <CheckCircle className="w-3 h-3 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getNodeStyles = () => {
    const baseStyles = "console-card transition-all duration-200 cursor-pointer hover:shadow-lg";
    
    if (selected) {
      return cn(baseStyles, "ring-2 ring-primary ring-offset-2 shadow-lg");
    }
    
    switch (data.status) {
      case 'running':
        return cn(baseStyles, "ring-2 ring-blue-500/50 shadow-blue-100");
      case 'success':
        return cn(baseStyles, "ring-2 ring-emerald-500/50 shadow-emerald-100");
      case 'error':
        return cn(baseStyles, "ring-2 ring-red-500/50 shadow-red-100");
      default:
        return cn(baseStyles, "hover:ring-1 hover:ring-border");
    }
  };

  return (
    <div className="relative group">
      {/* Console.com-inspired Modern Node */}
      <div 
        className={cn("w-56", getNodeStyles())}
        onClick={() => onConfigure?.(id)}
      >
        {/* Clean Header */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Modern Icon Badge */}
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center border">
                {getNodeIcon()}
              </div>
              
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-foreground truncate">
                  {data.label}
                </h3>
                <div className="text-xs text-muted-foreground">
                  {data.type.replace('-', ' ')}
                </div>
              </div>
            </div>
            
            {/* Status and Actions */}
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              
              {/* Action buttons - Console.com style */}
              <div className={cn(
                "flex items-center gap-1 transition-opacity",
                selected || data.status ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfigure?.(id);
                  }}
                  className="w-6 h-6 rounded-md bg-muted hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <Settings className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(id);
                  }}
                  className="w-6 h-6 rounded-md bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Configuration Preview - Clean and minimal */}
          {data.config && Object.keys(data.config).length > 0 && (
            <div className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2">
              {Object.entries(data.config).slice(0, 2).map(([key, value]) => (
                <div key={key} className="truncate mb-1 last:mb-0">
                  <span className="font-medium">{key}:</span>{' '}
                  <span>{String(value).slice(0, 20)}{String(value).length > 20 ? '...' : ''}</span>
                </div>
              ))}
            </div>
          )}

          {/* Execution Stats */}
          {data.lastExecuted && (
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Play className="w-3 h-3" />
                <span>Last: {data.executionTime}ms</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modern Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !bg-background !border-2 !border-primary !rounded-full !shadow-sm hover:!scale-110 transition-transform"
        style={{ left: -8 }}
      />
      
      {/* Default source handle - hidden for IF nodes */}
      {data.type !== 'if-condition' && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-4 !h-4 !bg-primary !border-2 !border-background !rounded-full !shadow-sm hover:!scale-110 transition-transform"
          style={{ right: -8 }}
        />
      )}

      {/* Special handles for If condition node */}
      {data.type === 'if-condition' && (
        <>
          {/* True output */}
          <Handle
            type="source"
            position={Position.Right}
            id="true"
            className="!w-4 !h-4 !bg-emerald-500 !border-2 !border-background !rounded-full !shadow-sm hover:!scale-110 transition-transform"
            style={{ right: -8, top: '35%' }}
          />
          
          {/* False output */}
          <Handle
            type="source"
            position={Position.Right}
            id="false"
            className="!w-4 !h-4 !bg-red-500 !border-2 !border-background !rounded-full !shadow-sm hover:!scale-110 transition-transform"
            style={{ right: -8, top: '65%' }}
          />

          {/* Modern Labels */}
          <div className="absolute -right-2 top-[30%] text-xs font-medium text-emerald-600 bg-background px-1 rounded">
            true
          </div>
          <div className="absolute -right-2 top-[60%] text-xs font-medium text-red-600 bg-background px-1 rounded">
            false
          </div>
        </>
      )}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
