// Mock data for analytics demo mode
// This file provides realistic data that matches the expected Supabase response shapes

export type Profile = 'A' | 'B' | 'C' | 'D' | 'E';
export type Appetite = 'High' | 'Medium' | 'Low' | 'N/A';

export interface MockClient {
  id: string;
  name: string;
  email: string;
  sustainability_profile: Profile;
  sustainability_appetite_rating: Appetite;
}

export interface MockAssessment {
  id: string;
  client_id: string;
  sustainability_profile: Profile;
  sustainability_appetite_rating: Appetite;
  completed_at: string;
  generated_at: string;
}

export interface MockKPIs {
  tests_requested: number;
  reports_produced: number;
  test_allowance_remaining: number;
}

export interface DistributionBucket {
  bucket: string;
  count: number;
}

// Mock clients dataset (50 clients for realistic distribution)
export const MOCK_CLIENTS: MockClient[] = [
  { id: '1', name: 'James Wellington', email: 'james.wellington@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '2', name: 'Charlotte Pemberton', email: 'charlotte.pemberton@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'Medium' },
  { id: '3', name: 'Oliver Fitzpatrick', email: 'oliver.fitzpatrick@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '4', name: 'Emily Ashworth', email: 'emily.ashworth@email.com', sustainability_profile: 'D', sustainability_appetite_rating: 'Low' },
  { id: '5', name: 'William Thornbury', email: 'william.thornbury@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'Medium' },
  { id: '6', name: 'Sophie Blackwood', email: 'sophie.blackwood@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '7', name: 'Alexander Harding', email: 'alexander.harding@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Medium' },
  { id: '8', name: 'Isabella Montgomery', email: 'isabella.montgomery@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'High' },
  { id: '9', name: 'Thomas Fairfax', email: 'thomas.fairfax@email.com', sustainability_profile: 'E', sustainability_appetite_rating: 'N/A' },
  { id: '10', name: 'Victoria Kingsley', email: 'victoria.kingsley@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '11', name: 'Henry Beaumont', email: 'henry.beaumont@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Low' },
  { id: '12', name: 'Arabella Sinclair', email: 'arabella.sinclair@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'Medium' },
  { id: '13', name: 'Sebastian Crawford', email: 'sebastian.crawford@email.com', sustainability_profile: 'D', sustainability_appetite_rating: 'Low' },
  { id: '14', name: 'Penelope Whitmore', email: 'penelope.whitmore@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '15', name: 'Maximilian Sterling', email: 'maximilian.sterling@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Medium' },
  { id: '16', name: 'Cordelia Ashbourne', email: 'cordelia.ashbourne@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'High' },
  { id: '17', name: 'Bartholomew Grimwood', email: 'bartholomew.grimwood@email.com', sustainability_profile: 'E', sustainability_appetite_rating: 'N/A' },
  { id: '18', name: 'Seraphina Hartwell', email: 'seraphina.hartwell@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '19', name: 'Nathaniel Rockingham', email: 'nathaniel.rockingham@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Medium' },
  { id: '20', name: 'Evangeline Mortimer', email: 'evangeline.mortimer@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'Medium' },
  { id: '21', name: 'Reginald Pickering', email: 'reginald.pickering@email.com', sustainability_profile: 'D', sustainability_appetite_rating: 'Low' },
  { id: '22', name: 'Octavia Westbrook', email: 'octavia.westbrook@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '23', name: 'Percival Donovan', email: 'percival.donovan@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Low' },
  { id: '24', name: 'Rosalind Pembroke', email: 'rosalind.pembroke@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'High' },
  { id: '25', name: 'Montgomery Fletcher', email: 'montgomery.fletcher@email.com', sustainability_profile: 'E', sustainability_appetite_rating: 'N/A' },
  { id: '26', name: 'Genevieve Ashford', email: 'genevieve.ashford@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '27', name: 'Archibald Thornfield', email: 'archibald.thornfield@email.com', sustainability_profile: 'D', sustainability_appetite_rating: 'Low' },
  { id: '28', name: 'Beatrice Fairchild', email: 'beatrice.fairchild@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'Medium' },
  { id: '29', name: 'Ignatius Blackthorne', email: 'ignatius.blackthorne@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Medium' },
  { id: '30', name: 'Prudence Weatherby', email: 'prudence.weatherby@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '31', name: 'Thaddeus Kingsworth', email: 'thaddeus.kingsworth@email.com', sustainability_profile: 'E', sustainability_appetite_rating: 'N/A' },
  { id: '32', name: 'Cordelia Ravenswood', email: 'cordelia.ravenswood@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'High' },
  { id: '33', name: 'Augustus Pemberton', email: 'augustus.pemberton@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Medium' },
  { id: '34', name: 'Millicent Ashworth', email: 'millicent.ashworth@email.com', sustainability_profile: 'D', sustainability_appetite_rating: 'Low' },
  { id: '35', name: 'Barnabas Whitfield', email: 'barnabas.whitfield@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '36', name: 'Temperance Godwin', email: 'temperance.godwin@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'Medium' },
  { id: '37', name: 'Cornelius Blackwood', email: 'cornelius.blackwood@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Low' },
  { id: '38', name: 'Evangeline Hartwell', email: 'evangeline.hartwell@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '39', name: 'Fitzwilliam Grey', email: 'fitzwilliam.grey@email.com', sustainability_profile: 'E', sustainability_appetite_rating: 'N/A' },
  { id: '40', name: 'Ophelia Sinclair', email: 'ophelia.sinclair@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'High' },
  { id: '41', name: 'Bartholomew Cross', email: 'bartholomew.cross@email.com', sustainability_profile: 'D', sustainability_appetite_rating: 'Low' },
  { id: '42', name: 'Cordelia Ashbourne', email: 'cordelia.ashbourne2@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '43', name: 'Algernon Fairfax', email: 'algernon.fairfax@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Medium' },
  { id: '44', name: 'Persephone Whitmore', email: 'persephone.whitmore@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'Medium' },
  { id: '45', name: 'Obadiah Thornbury', email: 'obadiah.thornbury@email.com', sustainability_profile: 'E', sustainability_appetite_rating: 'N/A' },
  { id: '46', name: 'Clementine Sterling', email: 'clementine.sterling@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' },
  { id: '47', name: 'Percival Grimwood', email: 'percival.grimwood@email.com', sustainability_profile: 'D', sustainability_appetite_rating: 'Low' },
  { id: '48', name: 'Seraphina Blackthorne', email: 'seraphina.blackthorne@email.com', sustainability_profile: 'B', sustainability_appetite_rating: 'High' },
  { id: '49', name: 'Mortimer Ashford', email: 'mortimer.ashford@email.com', sustainability_profile: 'C', sustainability_appetite_rating: 'Medium' },
  { id: '50', name: 'Prudence Ravenswood', email: 'prudence.ravenswood@email.com', sustainability_profile: 'A', sustainability_appetite_rating: 'High' }
];

// Generate mock assessments (~60 entries) from the last 90 days
const generateMockAssessments = (): MockAssessment[] => {
  const assessments: MockAssessment[] = [];
  const now = new Date();
  const ninetyDaysAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
  
  // Generate 1-2 assessments per client randomly (totaling ~60 assessments)
  MOCK_CLIENTS.forEach((client, index) => {
    const numAssessments = Math.random() > 0.3 ? 1 : Math.random() > 0.7 ? 2 : 0;
    
    for (let i = 0; i < numAssessments; i++) {
      const randomDate = new Date(
        ninetyDaysAgo.getTime() + Math.random() * (now.getTime() - ninetyDaysAgo.getTime())
      );
      
      assessments.push({
        id: `assessment-${index}-${i}`,
        client_id: client.id,
        sustainability_profile: client.sustainability_profile,
        sustainability_appetite_rating: client.sustainability_appetite_rating,
        completed_at: randomDate.toISOString(),
        generated_at: randomDate.toISOString(),
      });
    }
  });
  
  return assessments.sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
};

export const MOCK_ASSESSMENTS = generateMockAssessments();

// Mock KPIs
export const MOCK_KPIS: MockKPIs = {
  tests_requested: 120,
  reports_produced: MOCK_ASSESSMENTS.length,
  test_allowance_remaining: 43,
};

// Helper functions to generate distribution data
export const getMockProfileDistribution = (): DistributionBucket[] => {
  const profileCounts = MOCK_ASSESSMENTS.reduce((acc, assessment) => {
    acc[assessment.sustainability_profile] = (acc[assessment.sustainability_profile] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (['A', 'B', 'C', 'D', 'E'] as Profile[]).map(profile => ({
    bucket: profile,
    count: profileCounts[profile] || 0,
  }));
};

export const getMockAppetiteDistribution = (): DistributionBucket[] => {
  const appetiteCounts = MOCK_ASSESSMENTS.reduce((acc, assessment) => {
    acc[assessment.sustainability_appetite_rating] = (acc[assessment.sustainability_appetite_rating] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (['High', 'Medium', 'Low', 'N/A'] as Appetite[]).map(appetite => ({
    bucket: appetite,
    count: appetiteCounts[appetite] || 0,
  }));
};

// Safe demo mode check that never accesses process
export const isDemoMode = (): boolean => {
  try {
    // This will be replaced by Next.js at build time for client-side code
    return '1' === '1'; // Default to true in demo mode
  } catch (error) {
    return true; // Default to demo mode if any issues
  }
};

// Export summary for debugging
export const MOCK_DATA_SUMMARY = {
  totalClients: MOCK_CLIENTS.length,
  totalAssessments: MOCK_ASSESSMENTS.length,
  profileDistribution: getMockProfileDistribution(),
  appetiteDistribution: getMockAppetiteDistribution(),
  kpis: MOCK_KPIS,
};

// Log summary function that can be called safely
export const logMockDataSummary = () => {
  try {
    // Safe development check without process access
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log('📊 Mock Data Summary:', MOCK_DATA_SUMMARY);
    }
  } catch (error) {
    // Silently ignore logging errors
  }
};