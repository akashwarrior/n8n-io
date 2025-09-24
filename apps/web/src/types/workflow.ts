export interface NodeData extends Record<string, unknown> {
  label: string;
  type: NodeType;
  config?: Record<string, any>;
  credentials?: Record<string, string>;
  lastExecuted?: Date;
  executionTime?: number;
}

export type NodeType =
  | 'webhook'
  | 'telegram-send'
  | 'telegram-wait'
  | 'llm-gemini'
  | 'llm-chatgpt'
  | 'llm-anthropic'
  | 'memory'
  | 'response'
  | 'resend-email'
  | 'if-condition'
  | 'form';

export interface NodeTemplate {
  id: string;
  type: NodeType;
  label: string;
  description: string;
  icon: string;
  category: string;
  defaultConfig: Record<string, any>;
  requiredCredentials: string[];
  inputs: NodeInput[];
  outputs: NodeOutput[];
}

export interface NodeInput {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'textarea' | 'credential';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: any;
}

export interface NodeOutput {
  key: string;
  label: string;
  type: string;
}

export interface WorkflowExecution {
  id: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  nodeExecutions: NodeExecution[];
}

export interface NodeExecution {
  nodeId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  startTime?: Date;
  endTime?: Date;
  input?: any;
  output?: any;
  error?: string;
}

export interface WorkflowData {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  executions: WorkflowExecution[];
}
