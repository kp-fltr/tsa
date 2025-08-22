import { toast } from 'sonner@2.0.3'
import { api } from '../lib/apiClient'
import { demoModeService, shouldUseDemoMode } from './demoModeService'

// Types for test launch flow
export interface AssessmentVersion {
  id: string
  name: string
  version: string
  is_active: boolean
}

export interface LaunchTestParams {
  client_id: string
  assessment_version_id: string
  channel: 'email' | 'link'
  due_date: string
  lang: 'EN' | 'DE' | 'PT'
  notes?: string
}

export interface LaunchTestResult {
  assessment_id: string
  shareable_link?: string
  quota_remaining: number
}

export interface QuotaInfo {
  test_allowance_total: number
  test_allowance_used: number
  test_allowance_remaining: number
}

export interface Assessment {
  id: string
  advisor_id: string
  client_id: string
  assessment_version_id: string
  channel: 'email' | 'link'
  lang: 'EN' | 'DE' | 'PT'
  status: 'requested' | 'sent' | 'in_progress' | 'completed' | 'expired'
  requested_at: string
  due_date: string
  shareable_link?: string
  notes?: string
  created_at: string
  updated_at: string
}

// Validation functions
export function validateLaunchParams(params: LaunchTestParams): string[] {
  const errors: string[] = []
  
  if (!params.client_id) {
    errors.push('Client selection is required')
  }
  
  if (!params.assessment_version_id) {
    errors.push('Assessment version is required')
  }
  
  if (!params.channel || !['email', 'link'].includes(params.channel)) {
    errors.push('Valid channel (email or link) is required')
  }
  
  if (!params.due_date) {
    errors.push('Due date is required')
  } else {
    const dueDate = new Date(params.due_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (dueDate <= today) {
      errors.push('Due date must be in the future')
    }
  }
  
  if (!params.lang || !['EN', 'DE', 'PT'].includes(params.lang)) {
    errors.push('Valid language (EN, DE, or PT) is required')
  }
  
  return errors
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// API functions
export async function fetchAssessmentVersions(): Promise<AssessmentVersion[]> {
  if (shouldUseDemoMode()) {
    return [
      { id: '1', name: 'Standard Assessment', version: '1.3', is_active: true },
      { id: '2', name: 'Short Assessment', version: '2.0', is_active: true },
      { id: '3', name: 'Comprehensive ESG', version: '1.1', is_active: true },
      { id: '4', name: 'Quick Check', version: '1.0', is_active: true }
    ]
  }

  try {
    const response = await api.get<{
      success: boolean
      data: AssessmentVersion[]
    }>('/test-launch/versions')
    
    if (!response.success) {
      throw new Error('Failed to fetch assessment versions')
    }
    
    return response.data
  } catch (error) {
    console.error('Error fetching assessment versions:', error)
    toast.error('Failed to load assessment versions')
    return []
  }
}

export async function fetchQuotaInfo(): Promise<QuotaInfo | null> {
  if (shouldUseDemoMode()) {
    return {
      test_allowance_total: 100,
      test_allowance_used: 15,
      test_allowance_remaining: 85
    }
  }

  try {
    const response = await api.get<{
      success: boolean
      data: QuotaInfo
    }>('/test-launch/quota')
    
    if (!response.success) {
      throw new Error('Failed to fetch quota info')
    }
    
    return response.data
  } catch (error) {
    console.error('Error fetching quota info:', error)
    toast.error('Failed to load quota information')
    return null
  }
}

export async function launchTest(params: LaunchTestParams): Promise<LaunchTestResult | null> {
  // Validate parameters
  const validationErrors = validateLaunchParams(params)
  if (validationErrors.length > 0) {
    toast.error(`Validation failed: ${validationErrors.join(', ')}`)
    return null
  }

  if (shouldUseDemoMode()) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const mockResult: LaunchTestResult = {
      assessment_id: `demo-${Date.now()}`,
      shareable_link: params.channel === 'link' 
        ? `https://app.tsaanalytics.com/assessment/demo-${Date.now()}?token=demo`
        : undefined,
      quota_remaining: 84
    }
    
    toast.success('✅ Test launched successfully!')
    return mockResult
  }

  try {
    const response = await api.post<{
      success: boolean
      data: LaunchTestResult
    }>('/test-launch', params)
    
    if (!response.success) {
      throw new Error('Failed to launch test')
    }
    
    toast.success('✅ Test launched successfully!')
    return response.data
  } catch (error) {
    console.error('Error launching test:', error)
    
    let message = 'Failed to launch test'
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        message = 'Insufficient test quota remaining'
      } else if (error.message.includes('client')) {
        message = 'Invalid client selection'
      } else {
        message = error.message
      }
    }
    
    toast.error(message)
    return null
  }
}

export async function fetchAssessments(): Promise<Assessment[]> {
  if (shouldUseDemoMode()) {
    return []
  }

  try {
    const response = await api.get<{
      success: boolean
      data: Assessment[]
    }>('/test-launch/assessments')
    
    if (!response.success) {
      throw new Error('Failed to fetch assessments')
    }
    
    return response.data
  } catch (error) {
    console.error('Error fetching assessments:', error)
    return []
  }
}

// Default export with all functions
export default {
  fetchAssessmentVersions,
  fetchQuotaInfo,
  launchTest,
  fetchAssessments,
  validateLaunchParams,
  validateEmail
}