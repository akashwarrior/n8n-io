'use client';

import { memo } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';
import { X } from 'lucide-react';

const CustomEdge = memo(({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  sourcePosition, 
  targetPosition,
  data,
  selected
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (evt: React.MouseEvent, edgeId: string) => {
    evt.stopPropagation();
    // Handle edge deletion
    const reactFlowInstance = (window as any).reactFlowInstance;
    if (reactFlowInstance) {
      reactFlowInstance.deleteElements({ edges: [{ id: edgeId }] });
    }
  };

  return (
    <>
      {/* Modern Console.com-style edge */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={selected ? 3 : 2}
        stroke={selected ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
        fill="none"
        strokeDasharray={selected ? "0" : "0"}
        style={{
          transition: 'all 0.2s ease',
          filter: selected ? 'drop-shadow(0 0 4px hsl(var(--primary) / 0.3))' : 'none'
        }}
      />
      
      {/* Animated flow indicator */}
      <path
        d={edgePath}
        strokeWidth={1}
        stroke="hsl(var(--primary))"
        fill="none"
        strokeDasharray="4 8"
        opacity={0.6}
        style={{
          animation: selected ? 'flow 2s linear infinite' : 'none'
        }}
      />
      
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="group"
        >
          {/* Modern delete button */}
          <button
            className="w-6 h-6 bg-background border border-border rounded-full shadow-sm opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 flex items-center justify-center console-card"
            onClick={(event) => onEdgeClick(event, id)}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </EdgeLabelRenderer>
      
      <style jsx>{`
        @keyframes flow {
          0% {
            stroke-dashoffset: 12;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </>
  );
});

CustomEdge.displayName = 'CustomEdge';

export default CustomEdge;
