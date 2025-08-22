// Database type definitions for TypeScript

export interface Database {
  public: {
    Tables: {
      client_registry: {
        Row: {
          id: string
          advisor_id: string
          name: string
          email: string
          status: 'updated' | 'outstanding' | 'overdue'
          sustainability_appetite?: 'High' | 'Medium' | 'Low' | 'N/A' | null
          sustainability_profile?: 'A' | 'B' | 'C' | 'D' | null
          latest_assessment?: string | null
          next_assessment?: string | null
          notes?: string | null
          tags?: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          advisor_id: string
          name: string
          email: string
          status?: 'updated' | 'outstanding' | 'overdue'
          sustainability_appetite?: 'High' | 'Medium' | 'Low' | 'N/A' | null
          sustainability_profile?: 'A' | 'B' | 'C' | 'D' | null
          latest_assessment?: string | null
          next_assessment?: string | null
          notes?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          advisor_id?: string
          name?: string
          email?: string
          status?: 'updated' | 'outstanding' | 'overdue'
          sustainability_appetite?: 'High' | 'Medium' | 'Low' | 'N/A' | null
          sustainability_profile?: 'A' | 'B' | 'C' | 'D' | null
          latest_assessment?: string | null
          next_assessment?: string | null
          notes?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          advisor_id: string
          client_id: string
          assessment_version_id: string
          channel: 'email' | 'link'
          lang: 'EN' | 'DE' | 'PT'
          status: 'requested' | 'sent' | 'in_progress' | 'completed' | 'expired'
          requested_at: string
          due_date: string
          shareable_link?: string | null
          notes?: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          advisor_id: string
          client_id: string
          assessment_version_id: string
          channel: 'email' | 'link'
          lang: 'EN' | 'DE' | 'PT'
          status?: 'requested' | 'sent' | 'in_progress' | 'completed' | 'expired'
          requested_at?: string
          due_date: string
          shareable_link?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          advisor_id?: string
          client_id?: string
          assessment_version_id?: string
          channel?: 'email' | 'link'
          lang?: 'EN' | 'DE' | 'PT'
          status?: 'requested' | 'sent' | 'in_progress' | 'completed' | 'expired'
          requested_at?: string
          due_date?: string
          shareable_link?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessment_versions: {
        Row: {
          id: string
          name: string
          version: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          version: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          version?: string
          is_active?: boolean
          created_at?: string
        }
      }
      quota_packages: {
        Row: {
          id: string
          advisor_id: string
          package_name: string
          test_allowance_total: number
          test_allowance_used: number
          test_allowance_remaining: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          advisor_id: string
          package_name: string
          test_allowance_total?: number
          test_allowance_used?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          advisor_id?: string
          package_name?: string
          test_allowance_total?: number
          test_allowance_used?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      vw_fa_quota: {
        Row: {
          advisor_id: string
          test_allowance_total: number
          test_allowance_used: number
          test_allowance_remaining: number
        }
      }
    }
    Functions: {
      rpc_launch_test: {
        Args: {
          p_client_id: string
          p_version_id: string
          p_channel: string
          p_due_date: string
          p_lang: string
          p_notes?: string
        }
        Returns: {
          assessment_id: string
          shareable_link?: string
          quota_remaining: number
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type ClientRegistry = Database['public']['Tables']['client_registry']['Row']
export type ClientRegistryInsert = Database['public']['Tables']['client_registry']['Insert']
export type ClientRegistryUpdate = Database['public']['Tables']['client_registry']['Update']

export type Assessment = Database['public']['Tables']['assessments']['Row']
export type AssessmentInsert = Database['public']['Tables']['assessments']['Insert']
export type AssessmentUpdate = Database['public']['Tables']['assessments']['Update']

export type AssessmentVersion = Database['public']['Tables']['assessment_versions']['Row']
export type QuotaPackage = Database['public']['Tables']['quota_packages']['Row']
export type QuotaView = Database['public']['Views']['vw_fa_quota']['Row']

// Client status types
export type ClientStatus = 'updated' | 'outstanding' | 'overdue'
export type SustainabilityAppetite = 'High' | 'Medium' | 'Low' | 'N/A'
export type SustainabilityProfile = 'A' | 'B' | 'C' | 'D'

// Assessment types
export type AssessmentStatus = 'requested' | 'sent' | 'in_progress' | 'completed' | 'expired'
export type AssessmentChannel = 'email' | 'link'
export type AssessmentLanguage = 'EN' | 'DE' | 'PT'