'use client';

import { useState, useMemo, useEffect } from 'react';
import { ReactFlow, Background, Controls, ConnectionMode, BackgroundVariant } from '@xyflow/react';
import { WorkflowHeader } from '@/components/workflow/workflow-header';
import { NodesSidebar } from '@/components/workflow/nodes-sidebar';
import { NodeConfigPanel } from '@/components/workflow/node-config-panel';
import { KeyboardShortcutsHelp } from '@/components/workflow/keyboard-shortcuts-help';
import CustomNode from '@/components/workflow/custom-node';
import CustomEdge from '@/components/workflow/custom-edge';
import { useWorkflow } from '@/hooks/use-workflow';
import { NodeTemplate } from '@/types/workflow';
import '@xyflow/react/dist/style.css';

export default function WorkflowPage() {
    const [activeTab, setActiveTab] = useState('editor');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);

    const {
        nodes,
        edges,
        workflow,
        isExecuting,
        selectedNode,
        selectedNodeId,
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
    } = useWorkflow();

    const nodeTypes = useMemo(() => ({
        custom: (props: any) => (
            <CustomNode
                {...props}
                onDelete={deleteNode}
                onConfigure={(nodeId: string) => {
                    setSelectedNodeId(nodeId);
                    setIsConfigPanelOpen(true);
                }}
            />
        )
    }), [deleteNode]);

    const edgeTypes = useMemo(() => ({
        default: CustomEdge,
        smoothstep: CustomEdge,
    }), []);

    const handleNodeSelect = (template: NodeTemplate) => {
        // Add node at center of viewport with some randomness
        const position = {
            x: Math.random() * 400 + 200,
            y: Math.random() * 300 + 150
        };
        const nodeId = addNode(template, position);
        setSelectedNodeId(nodeId);
        setIsConfigPanelOpen(true);
    };

    const handleNodeDoubleClick = (_event: React.MouseEvent, node: any) => {
        setSelectedNodeId(node.id);
        setIsConfigPanelOpen(true);
    };

    const handleConfigSave = (nodeId: string, data: any) => {
        updateNode(nodeId, data);
    };

    const handleConfigClose = () => {
        setIsConfigPanelOpen(false);
        setSelectedNodeId(null);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Delete selected node with Delete or Backspace
            if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodeId && !isConfigPanelOpen) {
                event.preventDefault();
                deleteNode(selectedNodeId);
                setSelectedNodeId(null);
            }
            // Close config panel with Escape
            if (event.key === 'Escape' && isConfigPanelOpen) {
                handleConfigClose();
            }
            // Toggle sidebar with Ctrl/Cmd + B
            if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
                event.preventDefault();
                setIsSidebarOpen(!isSidebarOpen);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedNodeId, isConfigPanelOpen, deleteNode, isSidebarOpen]);

    return (
        <div className="flex flex-col h-screen bg-background">
            <WorkflowHeader
                workflow={workflow}
                isExecuting={isExecuting}
                onExecute={executeWorkflow}
                onStop={stopExecution}
                onSave={saveWorkflow}
                onToggleActive={toggleWorkflowActive}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="flex flex-1 overflow-hidden">
                <NodesSidebar
                    onNodeSelect={handleNodeSelect}
                    isOpen={isSidebarOpen}
                    onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="flex-1 relative bg-muted/30">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        onNodeDoubleClick={handleNodeDoubleClick}
                        onPaneClick={onPaneClick}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        connectionMode={ConnectionMode.Loose}
                        fitView
                        fitViewOptions={{
                            padding: 0.2,
                            includeHiddenNodes: false,
                        }}
                        defaultEdgeOptions={{
                            type: 'smoothstep',
                            animated: false,
                            style: {
                                strokeWidth: 2,
                                stroke: 'hsl(var(--primary))'
                            }
                        }}
                        connectionLineStyle={{
                            strokeWidth: 2,
                            stroke: 'hsl(var(--primary))',
                            strokeDasharray: '5,5'
                        }}
                        deleteKeyCode={['Delete', 'Backspace']}
                        multiSelectionKeyCode={['Meta', 'Control']}
                        selectionKeyCode={null}
                        className="bg-background"
                    >
                        <Background
                            color="hsl(var(--border))"
                            gap={24}
                            size={1}
                            variant={BackgroundVariant.Dots}
                        />
                        <Controls
                            className="console-card !shadow-lg !border-border"
                            showInteractive={false}
                        />
                    </ReactFlow>

                    {/* Execution status overlay - Console.com style */}
                    {isExecuting && (
                        <div className="absolute top-6 right-6 console-card p-4 backdrop-blur-sm">
                            <div className="flex items-center gap-3 text-foreground">
                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm font-medium">Executing workflow...</span>
                            </div>
                        </div>
                    )}

                    {/* Empty state when no nodes */}
                    {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center max-w-md">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Start building your workflow</h3>
                                <p className="text-muted-foreground mb-6">
                                    Drag nodes from the sidebar or click the + button to add your first node
                                </p>
                                <div className="text-sm text-muted-foreground">
                                    <div className="flex items-center justify-center gap-4 mb-2">
                                        <kbd className="px-2 py-1 bg-muted rounded text-xs">Cmd/Ctrl + B</kbd>
                                        <span>Toggle sidebar</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-4">
                                        <kbd className="px-2 py-1 bg-muted rounded text-xs">Delete</kbd>
                                        <span>Delete selected node</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {isConfigPanelOpen && (
                    <NodeConfigPanel
                        nodeData={selectedNode?.data || null}
                        nodeId={selectedNodeId}
                        isOpen={isConfigPanelOpen}
                        onClose={handleConfigClose}
                        onSave={handleConfigSave}
                        onTest={testNode}
                    />
                )}
            </div>

            <KeyboardShortcutsHelp />
        </div>
    );
}