// const BASE_URL = "http://127.0.0.1:8000";

// export async function getTasks() {
//     const response = await fetch(`${BASE_URL}/tasks/`);
//     return response.json();
// }

// export async function createTask(taskData) {
//     const response = await fetch(`${BASE_URL}/tasks/`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(taskData),
//     });
//     return response.json();
// }


// export async function updateTask(task_id, taskData) {
//     const response = await fetch(`${BASE_URL}/tasks/${task_id}`, {
//         method: "PUT",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(taskData),
//     });

//     if(!response.ok) {
//         throw new Error(`Failed to update task: ${response.status}`)
//     }

//     return response.json();
// }


// export async function deleteTask(task_id) {
//     await fetch(`${BASE_URL}/tasks/${task_id}`, { method: "DELETE" });
// }



// Mock Data Stores and Initial Application State

export const INITIAL_BACKLOG = [
  {
    id: 'BACK-101',
    title: 'Implement OAuth2 PKCE Refresh Token Rotation',
    complexity: 'M',
    status: 'in_progress',
    epic: 'Auth & Identity V2',
    acceptanceCriteria: [
      'Token rotation on every refresh request',
      'Revoke token family on reuse detection',
      'Redis store TTL aligned with refresh expiration'
    ]
  },
  {
    id: 'BACK-102',
    title: 'PostgreSQL pgvector Embedding Indexing Pipeline',
    complexity: 'L',
    status: 'planning',
    epic: 'Vector Search & Semantic Backlog',
    acceptanceCriteria: [
      'Create IVFFlat index on embedding column',
      'Batch process historical spec embeddings in background worker',
      'Fallback to HNSW for latency critical queries'
    ]
  },
  {
    id: 'BACK-103',
    title: 'Stripe Webhook Exponential Backoff Retry Handling',
    complexity: 'S',
    status: 'done',
    epic: 'Billing & Usage-based Metering',
    acceptanceCriteria: [
      'Idempotency key validation on event receipt',
      'Queue failed webhooks into SQS dead-letter queue',
      'Alerting trigger after 5 consecutive retries'
    ]
  },
  {
    id: 'BACK-104',
    title: 'Real-time Server-Sent Events (SSE) Comment Stream',
    complexity: 'XL',
    status: 'in_progress',
    epic: 'Real-time Collaboration Engine',
    acceptanceCriteria: [
      'Establish SSE connection on spec page mount',
      'Optimistic rendering for local user comments',
      'Reconnection handler with last-event-id header'
    ]
  },
  {
    id: 'BACK-105',
    title: 'RBAC Middleware for Tenant Level Spec Permissions',
    complexity: 'M',
    status: 'planning',
    epic: 'Enterprise Audit Logging',
    acceptanceCriteria: [
      'Verify JWT claims against endpoint permission matrix',
      'Cache user permissions in Redis for 5 minutes',
      'Deny request with 403 and write to security log'
    ]
  },
  {
    id: 'BACK-106',
    title: 'Linear Issue Webhook Two-Way Sync Handler',
    complexity: 'L',
    status: 'done',
    epic: 'GitHub & Linear Sync Pipelines',
    acceptanceCriteria: [
      'Map SpecFlow backlog state to Linear workflow states',
      'Hmac signature verification for incoming webhooks',
      'Debounce updates to avoid update loops'
    ]
  }
];

export const INITIAL_EPICS = [
  { id: 'epic-1', name: 'Auth & Identity V2', itemCount: 8, progress: 85, targetDate: 'Q3 2026', status: 'Active' },
  { id: 'epic-2', name: 'Real-time Collaboration Engine', itemCount: 14, progress: 42, targetDate: 'Q4 2026', status: 'Active' },
  { id: 'epic-3', name: 'Vector Search & Semantic Backlog', itemCount: 11, progress: 100, targetDate: 'Completed', status: 'Done' },
  { id: 'epic-4', name: 'Billing & Usage-based Metering', itemCount: 6, progress: 15, targetDate: 'Q4 2026', status: 'Active' },
  { id: 'epic-5', name: 'GitHub & Linear Sync Pipelines', itemCount: 9, progress: 60, targetDate: 'Q3 2026', status: 'Active' },
  { id: 'epic-6', name: 'Enterprise Audit Logging', itemCount: 5, progress: 0, targetDate: 'Q1 2027', status: 'Planning' }
];

export const INITIAL_SPECS = [
  {
    id: 'spec-1',
    title: 'PRD-2026-08: Automatic Linear Sync on Spec Approval',
    updatedAt: '2 hours ago',
    snippet: 'When a technical spec passes team review, automatically map generated tasks to Linear backlog with assigned estimates, story labels, and technical AC...'
  },
  {
    id: 'spec-2',
    title: 'PRD-2026-07: Context-Aware Story Point Estimation Engine',
    updatedAt: 'Yesterday',
    snippet: 'Analyze historical velocity data across past sprints to auto-assign story point complexity (S/M/L/XL) to new technical acceptance criteria...'
  },
  {
    id: 'spec-3',
    title: 'PRD-2026-06: Fine-Tuned Model for Technical AC Generation',
    updatedAt: '3 days ago',
    snippet: 'System prompt specifications and schema validations for producing strict RFC-style acceptance criteria with endpoint definitions and edge cases...'
  },
  {
    id: 'spec-4',
    title: 'PRD-2026-05: Multi-Tenant Team Workspaces & RBAC',
    updatedAt: '5 days ago',
    snippet: 'Architecture requirement for isolating spec repositories per tenant organization with role hierarchies (Admin, Tech Lead, Engineer, Viewer)...'
  },
  {
    id: 'spec-5',
    title: 'PRD-2026-04: Automated Figma Layout Parsing for UI Specs',
    updatedAt: '1 week ago',
    snippet: 'Ingest Figma file tokens and autolayout properties to automatically propose component breakdown tasks with Tailwind utility requirements...'
  }
];