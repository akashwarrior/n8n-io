'use client';

import { useState, useCallback } from 'react';
import { Node, Edge, addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { NodeChange, EdgeChange, Connection } from '@xyflow/react';
import { NodeData, NodeTemplate, WorkflowData } from '@/types/workflow';
import { DUMMY_NODES, DUMMY_EDGES, DUMMY_WORKFLOW } from '@/data/dummy-workflow';

export function useWorkflow() {
  const [nodes, setNodes] = useState<Node<NodeData>[]>(DUMMY_NODES);
  const [edges, setEdges] = useState<Edge[]>(DUMMY_EDGES);
  const [workflow, setWorkflow] = useState<WorkflowData>(DUMMY_WORKFLOW);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds) as Node<NodeData>[]);
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    []
  );

  const addNode = useCallback((template: NodeTemplate, position: { x: number; y: number }) => {
    const newNode: Node<NodeData> = {
      id: `${template.type}-${Date.now()}`,
      type: 'custom',
      position,
      data: {
        label: template.label,
        type: template.type,
        config: { ...template.defaultConfig },
        credentials: {},
      }
    };

    setNodes((nds) => [...nds, newNode]);
    return newNode.id;
  }, []);

  const updateNode = useCallback((nodeId: string, data: Partial<NodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? {
            ...node,
            data: {
              ...node.data,
              ...data
            }
          }
          : node
      )
    );
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, []);

  const executeWorkflow = useCallback(async () => {
    setIsExecuting(true);

    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));

    setIsExecuting(false);
  }, [nodes]);

  const stopExecution = useCallback(() => {
    setIsExecuting(false);
  }, [nodes, updateNode]);

  const testNode = useCallback(async (nodeId: string) => {
    updateNode(nodeId, {});

    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));

    const executionTime = Math.round(Math.random() * 800 + 100);

    updateNode(nodeId, {
      lastExecuted: new Date(),
      executionTime
    });
  }, [updateNode]);

  const saveWorkflow = useCallback(async () => {
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 500));

    setWorkflow(prev => ({
      ...prev,
      updatedAt: new Date()
    }));
  }, []);

  const toggleWorkflowActive = useCallback((active: boolean) => {
    setWorkflow(prev => ({
      ...prev,
      isActive: active
    }));
  }, []);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const getSelectedNode = useCallback(() => {
    if (!selectedNodeId) return null;
    return nodes.find(node => node.id === selectedNodeId) || null;
  }, [selectedNodeId, nodes]);

  return {
    nodes,
    edges,
    workflow,
    isExecuting,
    selectedNodeId,
    selectedNode: getSelectedNode(),
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    addNode,
    updateNode,
    deleteNode,
    executeWorkflow,
    stopExecution,
    testNode,
    saveWorkflow,
    toggleWorkflowActive,
    setSelectedNodeId
  };
}
