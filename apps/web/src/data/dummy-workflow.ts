import { Node, Edge } from '@xyflow/react';
import { NodeData, WorkflowData, WorkflowExecution } from '@/types/workflow';

export const DUMMY_NODES: Node<NodeData>[] = [
  {
    id: 'webhook-1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: {
      label: 'Webhook',
      type: 'webhook',
      config: {
        method: 'POST',
        path: '/webhook'
      },
      status: 'idle'
    }
  },
  {
    id: 'telegram-send-1',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      label: 'Send Message',
      type: 'telegram-send',
      config: {
        chatId: '@mychannel',
        message: 'Hello from n8n!',
        parseMode: 'HTML'
      },
      credentials: {
        telegram_bot_token: '••••••••••••••••'
      },
      lastExecuted: new Date(Date.now() - 300000),
      executionTime: 245
    }
  },
  {
    id: 'if-1',
    type: 'custom',
    position: { x: 700, y: 100 },
    data: {
      label: 'If',
      type: 'if-condition',
      config: {
        value1: '{{$json.message}}',
        operator: 'contains',
        value2: 'help'
      },
      status: 'idle'
    }
  },
  {
    id: 'llm-gemini-1',
    type: 'custom',
    position: { x: 1000, y: 50 },
    data: {
      label: 'Gemini',
      type: 'llm-gemini',
      config: {
        prompt: 'Help the user with: {{$json.message}}',
        model: 'gemini-pro',
        temperature: 0.7
      },
      credentials: {
        google_api_key: '••••••••••••••••'
      },
      status: 'idle'
    }
  },
  {
    id: 'llm-chatgpt-1',
    type: 'custom',
    position: { x: 1000, y: 200 },
    data: {
      label: 'ChatGPT',
      type: 'llm-chatgpt',
      config: {
        prompt: 'Generate a creative response for: {{$json.message}}',
        model: 'gpt-4',
        temperature: 0.9
      },
      credentials: {
        openai_api_key: '••••••••••••••••'
      },
      status: 'idle'
    }
  },
  {
    id: 'telegram-send-2',
    type: 'custom',
    position: { x: 1300, y: 125 },
    data: {
      label: 'Send Response',
      type: 'telegram-send',
      config: {
        chatId: '{{$node["Webhook"].json.message.chat.id}}',
        message: '{{$node["Gemini"].json.response}}',
        parseMode: 'HTML'
      },
      credentials: {
        telegram_bot_token: '••••••••••••••••'
      },
      status: 'idle'
    }
  },
  {
    id: 'form-1',
    type: 'custom',
    position: { x: 400, y: 350 },
    data: {
      label: 'Form',
      type: 'form',
      config: {
        title: 'Feedback Form',
        description: 'Please provide your feedback'
      },
      status: 'idle'
    }
  },
  {
    id: 'resend-1',
    type: 'custom',
    position: { x: 700, y: 350 },
    data: {
      label: 'Send Email',
      type: 'resend-email',
      config: {
        from: 'noreply@example.com',
        to: '{{$json.email}}',
        subject: 'Thank you for your feedback',
        html: '<h1>Thank you!</h1><p>We received your feedback: {{$json.message}}</p>'
      },
      credentials: {
        resend_api_key: '••••••••••••••••'
      },
      status: 'idle'
    }
  }
];

export const DUMMY_EDGES: Edge[] = [
  { id: 'e1', source: 'webhook-1', target: 'telegram-send-1' },
  { id: 'e2', source: 'telegram-send-1', target: 'if-1' },
  { id: 'e3', source: 'if-1', target: 'llm-gemini-1', sourceHandle: 'true' },
  { id: 'e4', source: 'if-1', target: 'llm-chatgpt-1', sourceHandle: 'false' },
  { id: 'e5', source: 'llm-gemini-1', target: 'telegram-send-2' },
  { id: 'e6', source: 'llm-chatgpt-1', target: 'telegram-send-2' },
  { id: 'e7', source: 'webhook-1', target: 'form-1' },
  { id: 'e8', source: 'form-1', target: 'resend-1' }
];

export const DUMMY_WORKFLOW: WorkflowData = {
  id: 'workflow-1',
  name: 'My workflow',
  description: 'A sample workflow demonstrating various integrations',
  isActive: false,
  tags: ['telegram', 'ai', 'automation'],
  createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
  updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
  executions: [
    {
      id: 'exec-1',
      status: 'completed',
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(Date.now() - 3595000),
      nodeExecutions: [
        {
          nodeId: 'webhook-1',
          status: 'completed',
          startTime: new Date(Date.now() - 3600000),
          endTime: new Date(Date.now() - 3599500),
          input: { method: 'POST', body: { message: 'Hello' } },
          output: { message: 'Hello', timestamp: new Date().toISOString() }
        },
        {
          nodeId: 'telegram-send-1',
          status: 'completed',
          startTime: new Date(Date.now() - 3599000),
          endTime: new Date(Date.now() - 3598000),
          input: { chatId: '@mychannel', message: 'Hello from n8n!' },
          output: { messageId: 123, success: true }
        }
      ]
    },
    {
      id: 'exec-2',
      status: 'failed',
      startTime: new Date(Date.now() - 7200000),
      endTime: new Date(Date.now() - 7195000),
      nodeExecutions: [
        {
          nodeId: 'webhook-1',
          status: 'completed',
          startTime: new Date(Date.now() - 7200000),
          endTime: new Date(Date.now() - 7199500),
          input: { method: 'POST', body: { message: 'Test' } },
          output: { message: 'Test', timestamp: new Date().toISOString() }
        },
        {
          nodeId: 'telegram-send-1',
          status: 'failed',
          startTime: new Date(Date.now() - 7199000),
          endTime: new Date(Date.now() - 7195000),
          input: { chatId: '@mychannel', message: 'Test message' },
          error: 'Invalid bot token'
        }
      ]
    }
  ]
};
