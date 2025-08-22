// Database schema types for TSA Advisor

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'advisor' | 'admin';
  created_at: string;
  updated_at?: string;
}

export interface Client {
  id: string;
  user_id: string;
  name: string;
  email: string;
  company?: string;
  industry?: string;
  status: 'active' | 'inactive' | 'pending';
  total_investments?: number;
  esg_score?: number;
  assessment_status: 'updated' | 'outstanding' | 'overdue';
  sustainability_appetite: 'high' | 'medium' | 'low' | 'n/a';
  sustainability_profile: 'A' | 'B' | 'C' | 'D' | 'E';
  latest_assessment?: string;
  next_assessment?: string;
  created_at: string;
  updated_at?: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  client_ids: string[];
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  schedule_type: 'immediate' | 'scheduled';
  scheduled_date?: string;
  scheduled_time?: string;
  email_template?: EmailTemplate;
  created_at: string;
  updated_at?: string;
}

export interface EmailTemplate {
  subject: string;
  greeting: string;
  body: string;
  brand_color: string;
  footer_text: string;
}

export interface ChatHistory {
  user_id: string;
  messages: ChatMessage[];
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Analytics {
  user_id: string;
  active_tests: number;
  completion_rate: number;
  avg_esg_score: number;
  total_clients: number;
  recent_activity: ActivityItem[];
  calculated_at: string;
}

export interface ActivityItem {
  type: 'assessment_completed' | 'client_added' | 'report_generated' | 'campaign_created';
  client?: string;
  description?: string;
  date: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}