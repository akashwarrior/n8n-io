import { NodeTemplate } from '@/types/workflow';

export const NODE_TEMPLATES: NodeTemplate[] = [
  {
    id: 'webhook',
    type: 'webhook',
    label: 'Webhook',
    description: 'Receive HTTP requests to trigger workflows',
    icon: '🔗',
    category: 'Core',
    defaultConfig: {
      method: 'POST',
      path: '/webhook',
      authentication: 'none'
    },
    requiredCredentials: [],
    inputs: [
      {
        key: 'method',
        label: 'HTTP Method',
        type: 'select',
        required: true,
        options: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
          { label: 'DELETE', value: 'DELETE' }
        ],
        defaultValue: 'POST'
      },
      {
        key: 'path',
        label: 'Webhook Path',
        type: 'string',
        required: true,
        placeholder: '/my-webhook',
        defaultValue: '/webhook'
      }
    ],
    outputs: [
      { key: 'body', label: 'Request Body', type: 'object' },
      { key: 'headers', label: 'Request Headers', type: 'object' },
      { key: 'query', label: 'Query Parameters', type: 'object' }
    ]
  },
  {
    id: 'telegram-send',
    type: 'telegram-send',
    label: 'Send Message',
    description: 'Send a message via Telegram',
    icon: '📱',
    category: 'Action in an app',
    defaultConfig: {
      message: '',
      parseMode: 'HTML'
    },
    requiredCredentials: ['telegram_bot_token'],
    inputs: [
      {
        key: 'chatId',
        label: 'Chat ID',
        type: 'string',
        required: true,
        placeholder: '@channel or chat_id'
      },
      {
        key: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
        placeholder: 'Enter your message here...'
      },
      {
        key: 'parseMode',
        label: 'Parse Mode',
        type: 'select',
        options: [
          { label: 'HTML', value: 'HTML' },
          { label: 'Markdown', value: 'Markdown' },
          { label: 'None', value: 'none' }
        ],
        defaultValue: 'HTML'
      }
    ],
    outputs: [
      { key: 'messageId', label: 'Message ID', type: 'number' },
      { key: 'success', label: 'Success', type: 'boolean' }
    ]
  },
  {
    id: 'telegram-wait',
    type: 'telegram-wait',
    label: 'Wait for Response',
    description: 'Wait for a response from Telegram user',
    icon: '⏳',
    category: 'Human in the loop',
    defaultConfig: {
      timeout: 300,
      expectedType: 'text'
    },
    requiredCredentials: ['telegram_bot_token'],
    inputs: [
      {
        key: 'chatId',
        label: 'Chat ID',
        type: 'string',
        required: true,
        placeholder: '@channel or chat_id'
      },
      {
        key: 'timeout',
        label: 'Timeout (seconds)',
        type: 'number',
        defaultValue: 300
      },
      {
        key: 'expectedType',
        label: 'Expected Response Type',
        type: 'select',
        options: [
          { label: 'Text', value: 'text' },
          { label: 'Photo', value: 'photo' },
          { label: 'Document', value: 'document' },
          { label: 'Any', value: 'any' }
        ],
        defaultValue: 'text'
      }
    ],
    outputs: [
      { key: 'response', label: 'User Response', type: 'string' },
      { key: 'messageType', label: 'Message Type', type: 'string' },
      { key: 'timestamp', label: 'Response Time', type: 'date' }
    ]
  },
  {
    id: 'llm-gemini',
    type: 'llm-gemini',
    label: 'Gemini',
    description: 'Generate content using Google Gemini',
    icon: '🤖',
    category: 'AI',
    defaultConfig: {
      model: 'gemini-pro',
      temperature: 0.7,
      maxTokens: 1000
    },
    requiredCredentials: ['google_api_key'],
    inputs: [
      {
        key: 'prompt',
        label: 'Prompt',
        type: 'textarea',
        required: true,
        placeholder: 'Enter your prompt here...'
      },
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        options: [
          { label: 'Gemini Pro', value: 'gemini-pro' },
          { label: 'Gemini Pro Vision', value: 'gemini-pro-vision' }
        ],
        defaultValue: 'gemini-pro'
      },
      {
        key: 'temperature',
        label: 'Temperature',
        type: 'number',
        defaultValue: 0.7
      }
    ],
    outputs: [
      { key: 'response', label: 'Generated Text', type: 'string' },
      { key: 'tokensUsed', label: 'Tokens Used', type: 'number' }
    ]
  },
  {
    id: 'llm-chatgpt',
    type: 'llm-chatgpt',
    label: 'ChatGPT',
    description: 'Generate content using OpenAI ChatGPT',
    icon: '🧠',
    category: 'AI',
    defaultConfig: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1000
    },
    requiredCredentials: ['openai_api_key'],
    inputs: [
      {
        key: 'prompt',
        label: 'Prompt',
        type: 'textarea',
        required: true,
        placeholder: 'Enter your prompt here...'
      },
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        options: [
          { label: 'GPT-4', value: 'gpt-4' },
          { label: 'GPT-4 Turbo', value: 'gpt-4-turbo' },
          { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' }
        ],
        defaultValue: 'gpt-4'
      },
      {
        key: 'temperature',
        label: 'Temperature',
        type: 'number',
        defaultValue: 0.7
      }
    ],
    outputs: [
      { key: 'response', label: 'Generated Text', type: 'string' },
      { key: 'tokensUsed', label: 'Tokens Used', type: 'number' }
    ]
  },
  {
    id: 'llm-anthropic',
    type: 'llm-anthropic',
    label: 'Claude',
    description: 'Generate content using Anthropic Claude',
    icon: '🎭',
    category: 'AI',
    defaultConfig: {
      model: 'claude-3-sonnet',
      temperature: 0.7,
      maxTokens: 1000
    },
    requiredCredentials: ['anthropic_api_key'],
    inputs: [
      {
        key: 'prompt',
        label: 'Prompt',
        type: 'textarea',
        required: true,
        placeholder: 'Enter your prompt here...'
      },
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        options: [
          { label: 'Claude 3 Opus', value: 'claude-3-opus' },
          { label: 'Claude 3 Sonnet', value: 'claude-3-sonnet' },
          { label: 'Claude 3 Haiku', value: 'claude-3-haiku' }
        ],
        defaultValue: 'claude-3-sonnet'
      },
      {
        key: 'temperature',
        label: 'Temperature',
        type: 'number',
        defaultValue: 0.7
      }
    ],
    outputs: [
      { key: 'response', label: 'Generated Text', type: 'string' },
      { key: 'tokensUsed', label: 'Tokens Used', type: 'number' }
    ]
  },
  {
    id: 'memory',
    type: 'memory',
    label: 'Memory',
    description: 'Store and retrieve data across workflow executions',
    icon: '🧠',
    category: 'Data transformation',
    defaultConfig: {
      action: 'store',
      key: ''
    },
    requiredCredentials: [],
    inputs: [
      {
        key: 'action',
        label: 'Action',
        type: 'select',
        required: true,
        options: [
          { label: 'Store', value: 'store' },
          { label: 'Retrieve', value: 'retrieve' },
          { label: 'Delete', value: 'delete' }
        ],
        defaultValue: 'store'
      },
      {
        key: 'key',
        label: 'Memory Key',
        type: 'string',
        required: true,
        placeholder: 'user_preferences'
      },
      {
        key: 'value',
        label: 'Value to Store',
        type: 'textarea',
        placeholder: 'Data to store in memory'
      }
    ],
    outputs: [
      { key: 'value', label: 'Retrieved Value', type: 'string' },
      { key: 'success', label: 'Success', type: 'boolean' }
    ]
  },
  {
    id: 'response',
    type: 'response',
    label: 'Response',
    description: 'Send a response back to the webhook caller',
    icon: '↩️',
    category: 'Core',
    defaultConfig: {
      statusCode: 200,
      contentType: 'application/json'
    },
    requiredCredentials: [],
    inputs: [
      {
        key: 'statusCode',
        label: 'Status Code',
        type: 'number',
        defaultValue: 200
      },
      {
        key: 'body',
        label: 'Response Body',
        type: 'textarea',
        placeholder: 'Response content'
      },
      {
        key: 'headers',
        label: 'Headers',
        type: 'textarea',
        placeholder: '{"Content-Type": "application/json"}'
      }
    ],
    outputs: [
      { key: 'sent', label: 'Response Sent', type: 'boolean' }
    ]
  },
  {
    id: 'resend-email',
    type: 'resend-email',
    label: 'Send Email',
    description: 'Send emails using Resend',
    icon: '📧',
    category: 'Action in an app',
    defaultConfig: {
      from: '',
      subject: '',
      html: ''
    },
    requiredCredentials: ['resend_api_key'],
    inputs: [
      {
        key: 'from',
        label: 'From Email',
        type: 'string',
        required: true,
        placeholder: 'noreply@yourdomain.com'
      },
      {
        key: 'to',
        label: 'To Email',
        type: 'string',
        required: true,
        placeholder: 'user@example.com'
      },
      {
        key: 'subject',
        label: 'Subject',
        type: 'string',
        required: true,
        placeholder: 'Email subject'
      },
      {
        key: 'html',
        label: 'HTML Content',
        type: 'textarea',
        required: true,
        placeholder: '<h1>Hello World</h1>'
      }
    ],
    outputs: [
      { key: 'messageId', label: 'Message ID', type: 'string' },
      { key: 'success', label: 'Success', type: 'boolean' }
    ]
  },
  {
    id: 'if-condition',
    type: 'if-condition',
    label: 'If',
    description: 'Branch workflow based on conditions',
    icon: '🔀',
    category: 'Flow',
    defaultConfig: {
      condition: '',
      operator: 'equals'
    },
    requiredCredentials: [],
    inputs: [
      {
        key: 'value1',
        label: 'First Value',
        type: 'string',
        required: true,
        placeholder: 'Value to compare'
      },
      {
        key: 'operator',
        label: 'Operator',
        type: 'select',
        required: true,
        options: [
          { label: 'Equals', value: 'equals' },
          { label: 'Not Equals', value: 'not_equals' },
          { label: 'Greater Than', value: 'greater_than' },
          { label: 'Less Than', value: 'less_than' },
          { label: 'Contains', value: 'contains' }
        ],
        defaultValue: 'equals'
      },
      {
        key: 'value2',
        label: 'Second Value',
        type: 'string',
        required: true,
        placeholder: 'Value to compare against'
      }
    ],
    outputs: [
      { key: 'true', label: 'True', type: 'boolean' },
      { key: 'false', label: 'False', type: 'boolean' }
    ]
  },
  {
    id: 'form',
    type: 'form',
    label: 'Form',
    description: 'Collect data through web forms',
    icon: '📝',
    category: 'Human in the loop',
    defaultConfig: {
      title: 'Data Collection Form',
      description: 'Please fill out this form'
    },
    requiredCredentials: [],
    inputs: [
      {
        key: 'title',
        label: 'Form Title',
        type: 'string',
        required: true,
        defaultValue: 'Data Collection Form'
      },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Form description'
      },
      {
        key: 'fields',
        label: 'Form Fields',
        type: 'textarea',
        placeholder: 'JSON array of field definitions'
      }
    ],
    outputs: [
      { key: 'formData', label: 'Form Data', type: 'object' },
      { key: 'submittedAt', label: 'Submission Time', type: 'date' }
    ]
  }
];

export const NODE_CATEGORIES = [
  { id: 'core', label: 'Core', icon: '⚡' },
  { id: 'ai', label: 'AI', icon: '🤖' },
  { id: 'action-in-an-app', label: 'Action in an app', icon: '🌐' },
  { id: 'data-transformation', label: 'Data transformation', icon: '🔄' },
  { id: 'flow', label: 'Flow', icon: '🔀' },
  { id: 'human-in-the-loop', label: 'Human in the loop', icon: '👤' }
];
