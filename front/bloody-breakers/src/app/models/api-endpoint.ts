// models/api-endpoint.model.ts
export interface ApiEndpoint {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    description: string;
    params?: { name: string; type: string; required: boolean; description?: string }[];
    body?: { field: string; type: string; description?: string }[];
    response?: { status: number; body: any; description?: string };
    exampleCurl?: string;
  }
  