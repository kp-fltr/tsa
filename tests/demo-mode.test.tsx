/**
 * Demo Mode Smoke Tests
 * Verifies that demo mode functionality works correctly
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { DEMO_MODE, CONFIG, isDemoMode } from '../lib/config';
import { 
  MOCK_CLIENTS, 
  MOCK_ASSESSMENTS, 
  MOCK_KPIS,
  getMockProfileDistribution,
  getMockAppetiteDistribution,
  MOCK_DATA_SUMMARY
} from '../lib/mockData';

describe('Demo Mode Configuration', () => {
  it('should have demo mode enabled by default', () => {
    expect(DEMO_MODE).toBe(true);
    expect(isDemoMode()).toBe(true);
  });

  it('should have valid configuration object', () => {
    expect(CONFIG).toBeDefined();
    expect(typeof CONFIG.DEMO_MODE).toBe('boolean');
    expect(typeof CONFIG.NODE_ENV).toBe('string');
    expect(typeof CONFIG.IS_DEVELOPMENT).toBe('boolean');
    expect(typeof CONFIG.IS_PRODUCTION).toBe('boolean');
  });
});

describe('Mock Data Integrity', () => {
  it('should have non-empty client dataset', () => {
    expect(MOCK_CLIENTS).toBeDefined();
    expect(MOCK_CLIENTS.length).toBeGreaterThan(0);
    expect(MOCK_CLIENTS.length).toBe(50);
  });

  it('should have valid client data structure', () => {
    const client = MOCK_CLIENTS[0];
    expect(client).toHaveProperty('id');
    expect(client).toHaveProperty('name');
    expect(client).toHaveProperty('email');
    expect(client).toHaveProperty('sustainability_profile');
    expect(client).toHaveProperty('sustainability_appetite_rating');
    
    expect(['A', 'B', 'C', 'D', 'E']).toContain(client.sustainability_profile);
    expect(['High', 'Medium', 'Low', 'N/A']).toContain(client.sustainability_appetite_rating);
  });

  it('should have non-empty assessments dataset', () => {
    expect(MOCK_ASSESSMENTS).toBeDefined();
    expect(MOCK_ASSESSMENTS.length).toBeGreaterThan(0);
  });

  it('should have valid assessment data structure', () => {
    const assessment = MOCK_ASSESSMENTS[0];
    expect(assessment).toHaveProperty('id');
    expect(assessment).toHaveProperty('client_id');
    expect(assessment).toHaveProperty('sustainability_profile');
    expect(assessment).toHaveProperty('sustainability_appetite_rating');
    expect(assessment).toHaveProperty('completed_at');
    expect(assessment).toHaveProperty('generated_at');
  });

  it('should have valid KPIs structure', () => {
    expect(MOCK_KPIS).toBeDefined();
    expect(typeof MOCK_KPIS.tests_requested).toBe('number');
    expect(typeof MOCK_KPIS.reports_produced).toBe('number');
    expect(typeof MOCK_KPIS.test_allowance_remaining).toBe('number');
    
    expect(MOCK_KPIS.tests_requested).toBeGreaterThan(0);
    expect(MOCK_KPIS.reports_produced).toBeGreaterThan(0);
    expect(MOCK_KPIS.test_allowance_remaining).toBeGreaterThanOrEqual(0);
  });
});

describe('Distribution Functions', () => {
  it('should generate profile distribution with all buckets', () => {
    const distribution = getMockProfileDistribution();
    expect(distribution).toBeDefined();
    expect(distribution.length).toBe(5); // A, B, C, D, E
    
    const buckets = distribution.map(d => d.bucket);
    expect(buckets).toContain('A');
    expect(buckets).toContain('B');
    expect(buckets).toContain('C');
    expect(buckets).toContain('D');
    expect(buckets).toContain('E');
    
    distribution.forEach(bucket => {
      expect(typeof bucket.count).toBe('number');
      expect(bucket.count).toBeGreaterThanOrEqual(0);
    });
  });

  it('should generate appetite distribution with all buckets', () => {
    const distribution = getMockAppetiteDistribution();
    expect(distribution).toBeDefined();
    expect(distribution.length).toBe(4); // High, Medium, Low, N/A
    
    const buckets = distribution.map(d => d.bucket);
    expect(buckets).toContain('High');
    expect(buckets).toContain('Medium');
    expect(buckets).toContain('Low');
    expect(buckets).toContain('N/A');
    
    distribution.forEach(bucket => {
      expect(typeof bucket.count).toBe('number');
      expect(bucket.count).toBeGreaterThanOrEqual(0);
    });
  });

  it('should have consistent total counts between distributions and assessments', () => {
    const profileDist = getMockProfileDistribution();
    const appetiteDist = getMockAppetiteDistribution();
    
    const profileTotal = profileDist.reduce((sum, bucket) => sum + bucket.count, 0);
    const appetiteTotal = appetiteDist.reduce((sum, bucket) => sum + bucket.count, 0);
    
    expect(profileTotal).toBe(MOCK_ASSESSMENTS.length);
    expect(appetiteTotal).toBe(MOCK_ASSESSMENTS.length);
  });
});

describe('Data Summary', () => {
  it('should have valid summary structure', () => {
    expect(MOCK_DATA_SUMMARY).toBeDefined();
    expect(MOCK_DATA_SUMMARY.totalClients).toBe(MOCK_CLIENTS.length);
    expect(MOCK_DATA_SUMMARY.totalAssessments).toBe(MOCK_ASSESSMENTS.length);
    expect(MOCK_DATA_SUMMARY.profileDistribution).toBeDefined();
    expect(MOCK_DATA_SUMMARY.appetiteDistribution).toBeDefined();
    expect(MOCK_DATA_SUMMARY.kpis).toEqual(MOCK_KPIS);
  });
});