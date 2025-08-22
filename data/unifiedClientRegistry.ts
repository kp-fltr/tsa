// Unified Client Registry - Single Source of Truth for All Client Data
// This dataset serves all client tables across the application with consistent field formatting

export interface UnifiedClientRecord {
  // Core identification
  id: number;
  name: string;
  email: string;
  
  // Sustainability assessment fields with standardized enum values
  sustainability_assessment_status: 'Updated' | 'Outstanding' | 'Overdue';
  sustainability_appetite_rating: 'High' | 'Medium' | 'Low' | 'N/A';
  sustainability_profile: 'A' | 'B' | 'C' | 'D' | 'E';
  
  // Date fields - stored as ISO strings but formatted as DD/MM/YYYY for display
  latest_assessment_date: string; // ISO date string
  next_assessment_date: string; // ISO date string - editable by FA
  
  // Additional metadata for comprehensive client management
  created_date: string; // ISO date string
  updated_date: string; // ISO date string
  
  // Client details for enhanced functionality
  phone?: string;
  company?: string;
  industry?: string;
  portfolio_value?: number;
  
  // Internal tracking
  financial_advisor_id?: string;
  assessment_count?: number;
  last_contact_date?: string;
}

// Standardized dropdown options for consistent field values
export const SUSTAINABILITY_STATUS_OPTIONS = [
  'Updated',
  'Outstanding', 
  'Overdue'
] as const;

export const SUSTAINABILITY_APPETITE_OPTIONS = [
  'High',
  'Medium', 
  'Low',
  'N/A'
] as const;

export const SUSTAINABILITY_PROFILE_OPTIONS = [
  'A',
  'B',
  'C', 
  'D',
  'E'
] as const;

export const INDUSTRY_OPTIONS = [
  'Technology',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Energy',
  'Real Estate',
  'Retail',
  'Consulting',
  'Education',
  'Agriculture'
] as const;

// Date formatting utility for consistent DD/MM/YYYY display
export const formatDateForDisplay = (isoDateString: string): string => {
  if (!isoDateString) return '';
  
  try {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.warn('Invalid date format:', isoDateString);
    return '';
  }
};

// Parse DD/MM/YYYY format back to ISO string
export const parseDateFromDisplay = (displayDate: string): string => {
  if (!displayDate || !displayDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) return '';
  
  try {
    const [day, month, year] = displayDate.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toISOString();
  } catch (error) {
    console.warn('Invalid display date format:', displayDate);
    return '';
  }
};

// Generate comprehensive test dataset with 100 clients
const generateTestClients = (): UnifiedClientRecord[] => {
  const clients: UnifiedClientRecord[] = [];
  
  // Realistic first and last names for variety
  const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna',
    'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle',
    'Kenneth', 'Laura', 'Kevin', 'Sarah', 'Brian', 'Kimberly', 'George', 'Deborah',
    'Edward', 'Dorothy', 'Ronald', 'Amy', 'Timothy', 'Angela', 'Jason', 'Ashley',
    'Jeffrey', 'Emma', 'Ryan', 'Olivia', 'Jacob', 'Sophia', 'Gary', 'Chloe',
    'Nicholas', 'Isabella', 'Eric', 'Madison', 'Jonathan', 'Mia', 'Stephen', 'Charlotte',
    'Larry', 'Abigail', 'Justin', 'Emily', 'Scott', 'Harper', 'Brandon', 'Evelyn'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
    'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
    'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker',
    'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy',
    'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
    'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson'
  ];
  
  const companies = [
    'Global Investments Ltd', 'Future Finance Corp', 'Sustainable Capital Partners', 'Green Growth Holdings',
    'Premier Wealth Management', 'Eco-Friendly Ventures', 'Strategic Investment Group', 'Climate-Conscious Capital',
    'Innovative Finance Solutions', 'Renewable Resources Inc', 'NextGen Investment Trust', 'Sustainable Futures Fund',
    'Clean Energy Capital', 'ESG Investment Partners', 'Blue Ocean Investments', 'Carbon Neutral Holdings',
    'Green Technology Ventures', 'Sustainable Development Corp', 'Climate Action Investments', 'Renewable Capital Group',
    'Eco Innovation Partners', 'Future Sustainability Fund', 'Green Finance Solutions', 'Environmental Capital Trust',
    'Sustainable Growth Partners', 'Clean Tech Investments', 'Climate Forward Capital', 'Green Economy Fund'
  ];
  
  // Helper function to get random element from array
  const getRandom = <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
  
  // Helper function to get random date within a range
  const getRandomDate = (startDaysAgo: number, endDaysAgo: number): string => {
    const now = new Date();
    const startDate = new Date(now.getTime() - (startDaysAgo * 24 * 60 * 60 * 1000));
    const endDate = new Date(now.getTime() - (endDaysAgo * 24 * 60 * 60 * 1000));
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime).toISOString();
  };
  
  // Helper function to get future date
  const getFutureDate = (daysFromNow: number): string => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + (daysFromNow * 24 * 60 * 60 * 1000));
    return futureDate.toISOString();
  };
  
  // Generate 100 clients with realistic variety
  for (let i = 1; i <= 100; i++) {
    const firstName = getRandom(firstNames);
    const lastName = getRandom(lastNames);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    
    // Create realistic status distribution
    let status: 'Updated' | 'Outstanding' | 'Overdue';
    let latestAssessmentDaysAgo: number;
    let nextAssessmentDaysFromNow: number;
    
    const statusRand = Math.random();
    if (statusRand < 0.5) {
      // 50% Updated - recent assessments
      status = 'Updated';
      latestAssessmentDaysAgo = Math.floor(Math.random() * 30) + 1; // 1-30 days ago
      nextAssessmentDaysFromNow = Math.floor(Math.random() * 60) + 30; // 30-90 days from now
    } else if (statusRand < 0.8) {
      // 30% Outstanding - due soon or recently due
      status = 'Outstanding';
      latestAssessmentDaysAgo = Math.floor(Math.random() * 60) + 30; // 30-90 days ago
      nextAssessmentDaysFromNow = Math.floor(Math.random() * 20) - 5; // -5 to +15 days (some overdue)
    } else {
      // 20% Overdue - past due date
      status = 'Overdue';
      latestAssessmentDaysAgo = Math.floor(Math.random() * 90) + 60; // 60-150 days ago
      nextAssessmentDaysFromNow = -(Math.floor(Math.random() * 30) + 1); // 1-30 days overdue
    }
    
    const client: UnifiedClientRecord = {
      id: i,
      name,
      email,
      sustainability_assessment_status: status,
      sustainability_appetite_rating: getRandom(SUSTAINABILITY_APPETITE_OPTIONS),
      sustainability_profile: getRandom(SUSTAINABILITY_PROFILE_OPTIONS),
      latest_assessment_date: getRandomDate(latestAssessmentDaysAgo, latestAssessmentDaysAgo),
      next_assessment_date: getFutureDate(nextAssessmentDaysFromNow),
      created_date: getRandomDate(365, 180), // Created 6-12 months ago
      updated_date: getRandomDate(7, 1), // Updated 1-7 days ago
      
      // Optional additional fields
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      company: getRandom(companies),
      industry: getRandom(INDUSTRY_OPTIONS),
      portfolio_value: Math.floor(Math.random() * 5000000) + 100000, // $100k - $5M
      financial_advisor_id: 'fa_001', // Single FA for prototype
      assessment_count: Math.floor(Math.random() * 10) + 1,
      last_contact_date: getRandomDate(14, 1) // 1-14 days ago
    };
    
    clients.push(client);
  }
  
  return clients;
};

// Main unified client registry - single source of truth
export const UNIFIED_CLIENT_REGISTRY: UnifiedClientRecord[] = generateTestClients();

// Export helper functions for table implementations

// Get all clients sorted by name (default sort)
export const getAllClientsSorted = (): UnifiedClientRecord[] => {
  return [...UNIFIED_CLIENT_REGISTRY].sort((a, b) => a.name.localeCompare(b.name));
};

// Get clients requiring action (Outstanding or Overdue status)
export const getClientsRequiringAction = (): UnifiedClientRecord[] => {
  return UNIFIED_CLIENT_REGISTRY
    .filter(client => 
      client.sustainability_assessment_status === 'Outstanding' || 
      client.sustainability_assessment_status === 'Overdue'
    )
    .sort((a, b) => {
      // Sort by urgency: Overdue first, then by next assessment date
      if (a.sustainability_assessment_status === 'Overdue' && b.sustainability_assessment_status !== 'Overdue') {
        return -1;
      }
      if (b.sustainability_assessment_status === 'Overdue' && a.sustainability_assessment_status !== 'Overdue') {
        return 1;
      }
      return new Date(a.next_assessment_date).getTime() - new Date(b.next_assessment_date).getTime();
    });
};

// Get client by ID
export const getClientById = (id: number): UnifiedClientRecord | undefined => {
  return UNIFIED_CLIENT_REGISTRY.find(client => client.id === id);
};

// Update client record (for prototype - in production this would sync with backend)
export const updateClientRecord = (id: number, updates: Partial<UnifiedClientRecord>): boolean => {
  const clientIndex = UNIFIED_CLIENT_REGISTRY.findIndex(client => client.id === id);
  if (clientIndex === -1) return false;
  
  // Update the record
  UNIFIED_CLIENT_REGISTRY[clientIndex] = {
    ...UNIFIED_CLIENT_REGISTRY[clientIndex],
    ...updates,
    updated_date: new Date().toISOString()
  };
  
  return true;
};

// Calculate KPIs from unified dataset
export const calculateKPIs = () => {
  const total = UNIFIED_CLIENT_REGISTRY.length;
  const updated = UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_assessment_status === 'Updated').length;
  const outstanding = UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_assessment_status === 'Outstanding').length;
  const overdue = UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_assessment_status === 'Overdue').length;
  
  const completionRate = Math.round((updated / total) * 100);
  const pendingActions = outstanding + overdue;
  
  // Calculate overdue urgency
  const criticallyOverdue = UNIFIED_CLIENT_REGISTRY.filter(c => {
    if (c.sustainability_assessment_status !== 'Overdue') return false;
    const nextAssessment = new Date(c.next_assessment_date);
    const now = new Date();
    const daysOverdue = Math.floor((now.getTime() - nextAssessment.getTime()) / (1000 * 60 * 60 * 24));
    return daysOverdue > 30; // More than 30 days overdue
  }).length;
  
  return {
    totalClients: total,
    completionRate,
    pendingActions,
    criticallyOverdue,
    statusDistribution: {
      updated,
      outstanding,
      overdue
    },
    ratingDistribution: {
      high: UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_appetite_rating === 'High').length,
      medium: UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_appetite_rating === 'Medium').length,
      low: UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_appetite_rating === 'Low').length,
      na: UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_appetite_rating === 'N/A').length,
    },
    profileDistribution: {
      a: UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_profile === 'A').length,
      b: UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_profile === 'B').length,
      c: UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_profile === 'C').length,
      d: UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_profile === 'D').length,
      e: UNIFIED_CLIENT_REGISTRY.filter(c => c.sustainability_profile === 'E').length,
    }
  };
};

// Pagination utility for tables showing more than 20 records
export const paginateClients = (
  clients: UnifiedClientRecord[], 
  page: number = 1, 
  pageSize: number = 20
): {
  data: UnifiedClientRecord[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} => {
  const total = clients.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const data = clients.slice(startIndex, endIndex);
  
  return {
    data,
    total,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

// Export type for components
export type { UnifiedClientRecord };

// Version info for tracking dataset changes
export const DATASET_VERSION = '3.0.0';
export const LAST_UPDATED = '2024-12-19';

console.log(`Unified Client Registry initialized - Version ${DATASET_VERSION} - ${UNIFIED_CLIENT_REGISTRY.length} clients loaded`);