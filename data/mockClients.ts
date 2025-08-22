import { ClientRegistryData } from '../services/clientRegistryApi';

// Generate realistic mock clients for testing
export const mockClients: ClientRegistryData[] = [
  {
    id: 'client-001',
    advisor_id: 'demo-user-id',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@greentech.com',
    status: 'updated',
    sustainability_appetite: 'High',
    sustainability_profile: 'A',
    latest_assessment: '2024-12-15',
    next_assessment: '2025-03-15',
    notes: 'CEO of GreenTech Solutions. Very passionate about ESG initiatives and carbon neutrality goals.',
    tags: ['Tech', 'CEO', 'Green Energy'],
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-12-15T14:22:00Z'
  },
  {
    id: 'client-002',
    advisor_id: 'demo-user-id',
    name: 'Michael Chen',
    email: 'michael.chen@retailcorp.com',
    status: 'outstanding',
    sustainability_appetite: 'Medium',
    sustainability_profile: 'B',
    latest_assessment: '2024-09-20',
    next_assessment: '2024-12-20',
    notes: 'CFO at RetailCorp. Interested in sustainable supply chain initiatives. Needs follow-up on waste reduction metrics.',
    tags: ['Retail', 'CFO', 'Supply Chain'],
    created_at: '2024-02-10T09:15:00Z',
    updated_at: '2024-09-20T11:45:00Z'
  },
  {
    id: 'client-003',
    advisor_id: 'demo-user-id',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@oceanview.com',
    status: 'overdue',
    sustainability_appetite: 'High',
    sustainability_profile: 'A',
    latest_assessment: '2024-06-10',
    next_assessment: '2024-09-10',
    notes: 'Head of Sustainability at Ocean View Resorts. Overdue for quarterly assessment. Focus on water conservation and renewable energy.',
    tags: ['Hospitality', 'Sustainability Lead', 'Renewable Energy'],
    created_at: '2024-01-05T14:20:00Z',
    updated_at: '2024-06-10T16:30:00Z'
  },
  {
    id: 'client-004',
    advisor_id: 'demo-user-id',
    name: 'David Thompson',
    email: 'david.thompson@autoparts.com',
    status: 'updated',
    sustainability_appetite: 'Low',
    sustainability_profile: 'C',
    latest_assessment: '2024-11-28',
    next_assessment: '2025-02-28',
    notes: 'Operations Manager at AutoParts Inc. Recently completed assessment with focus on manufacturing efficiency improvements.',
    tags: ['Manufacturing', 'Operations', 'Automotive'],
    created_at: '2024-03-12T08:45:00Z',
    updated_at: '2024-11-28T10:15:00Z'
  },
  {
    id: 'client-005',
    advisor_id: 'demo-user-id',
    name: 'Lisa Park',
    email: 'lisa.park@foodsafe.org',
    status: 'outstanding',
    sustainability_appetite: 'High',
    sustainability_profile: 'B',
    latest_assessment: '2024-10-05',
    next_assessment: '2025-01-05',
    notes: 'Director at FoodSafe Foundation. Passionate about sustainable agriculture and food waste reduction programs.',
    tags: ['Non-Profit', 'Food Safety', 'Agriculture'],
    created_at: '2024-01-20T13:30:00Z',
    updated_at: '2024-10-05T15:20:00Z'
  },
  {
    id: 'client-006',
    advisor_id: 'demo-user-id',
    name: 'James Mitchell',
    email: 'james.mitchell@construction.com',
    status: 'updated',
    sustainability_appetite: 'Medium',
    sustainability_profile: 'B',
    latest_assessment: '2024-12-08',
    next_assessment: '2025-03-08',
    notes: 'Project Manager at MitchellCorp Construction. Working on LEED certification for upcoming projects.',
    tags: ['Construction', 'LEED', 'Project Management'],
    created_at: '2024-02-28T11:10:00Z',
    updated_at: '2024-12-08T09:45:00Z'
  },
  {
    id: 'client-007',
    advisor_id: 'demo-user-id',
    name: 'Amanda Foster',
    email: 'amanda.foster@pharmainc.com',
    status: 'overdue',
    sustainability_appetite: 'Medium',
    sustainability_profile: 'C',
    latest_assessment: '2024-07-15',
    next_assessment: '2024-10-15',
    notes: 'Compliance Officer at Pharma Inc. Overdue assessment - needs urgent follow-up on pharmaceutical waste management protocols.',
    tags: ['Pharmaceutical', 'Compliance', 'Waste Management'],
    created_at: '2024-01-08T12:00:00Z',
    updated_at: '2024-07-15T14:10:00Z'
  },
  {
    id: 'client-008',
    advisor_id: 'demo-user-id',
    name: 'Robert Kim',
    email: 'robert.kim@logistics.com',
    status: 'updated',
    sustainability_appetite: 'Low',
    sustainability_profile: 'D',
    latest_assessment: '2024-12-01',
    next_assessment: '2025-06-01',
    notes: 'Fleet Manager at Global Logistics. Recently assessed carbon footprint of delivery operations. Limited sustainability budget.',
    tags: ['Logistics', 'Transportation', 'Fleet Management'],
    created_at: '2024-04-05T15:25:00Z',
    updated_at: '2024-12-01T17:30:00Z'
  },
  {
    id: 'client-009',
    advisor_id: 'demo-user-id',
    name: 'Jennifer Walsh',
    email: 'jennifer.walsh@bankingsec.com',
    status: 'outstanding',
    sustainability_appetite: 'High',
    sustainability_profile: 'A',
    latest_assessment: '2024-09-30',
    next_assessment: '2024-12-30',
    notes: 'ESG Investment Director at Banking Securities. Leading sustainable investment portfolio development.',
    tags: ['Finance', 'ESG', 'Investment'],
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-09-30T12:15:00Z'
  },
  {
    id: 'client-010',
    advisor_id: 'demo-user-id',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@renewable.com',
    status: 'updated',
    sustainability_appetite: 'High',
    sustainability_profile: 'A',
    latest_assessment: '2024-12-10',
    next_assessment: '2025-03-10',
    notes: 'Founder of Renewable Energy Solutions. Pioneer in solar technology implementation. Excellent sustainability track record.',
    tags: ['Renewable Energy', 'Solar', 'Founder'],
    created_at: '2024-01-03T09:30:00Z',
    updated_at: '2024-12-10T11:20:00Z'
  },
  {
    id: 'client-011',
    advisor_id: 'demo-user-id',
    name: 'Rachel Green',
    email: 'rachel.green@textiles.com',
    status: 'overdue',
    sustainability_appetite: 'Medium',
    sustainability_profile: 'C',
    latest_assessment: '2024-05-22',
    next_assessment: '2024-08-22',
    notes: 'Sustainability Coordinator at Green Textiles. Overdue for assessment. Working on sustainable fabric sourcing initiatives.',
    tags: ['Textiles', 'Fashion', 'Sourcing'],
    created_at: '2024-02-14T14:45:00Z',
    updated_at: '2024-05-22T16:50:00Z'
  },
  {
    id: 'client-012',
    advisor_id: 'demo-user-id',
    name: 'Thomas Anderson',
    email: 'thomas.anderson@datacenters.com',
    status: 'updated',
    sustainability_appetite: 'Medium',
    sustainability_profile: 'B',
    latest_assessment: '2024-11-20',
    next_assessment: '2025-02-20',
    notes: 'IT Director at DataCenters Inc. Recently upgraded to energy-efficient cooling systems. Good progress on carbon reduction.',
    tags: ['Technology', 'Data Centers', 'Energy Efficiency'],
    created_at: '2024-03-08T08:20:00Z',
    updated_at: '2024-11-20T10:40:00Z'
  },
  {
    id: 'client-013',
    advisor_id: 'demo-user-id',
    name: 'Maria Gonzalez',
    email: 'maria.gonzalez@foodservice.com',
    status: 'outstanding',
    sustainability_appetite: 'High',
    sustainability_profile: 'B',
    latest_assessment: '2024-10-12',
    next_assessment: '2025-01-12',
    notes: 'Operations Director at Sustainable FoodService. Implementing comprehensive waste reduction and local sourcing programs.',
    tags: ['Food Service', 'Waste Reduction', 'Local Sourcing'],
    created_at: '2024-02-22T13:15:00Z',
    updated_at: '2024-10-12T15:25:00Z'
  },
  {
    id: 'client-014',
    advisor_id: 'demo-user-id',
    name: 'Kevin Liu',
    email: 'kevin.liu@packaging.com',
    status: 'updated',
    sustainability_appetite: 'Low',
    sustainability_profile: 'D',
    latest_assessment: '2024-12-05',
    next_assessment: '2025-09-05',
    notes: 'Production Manager at Packaging Solutions. Limited engagement with sustainability initiatives. Focus on cost reduction.',
    tags: ['Packaging', 'Production', 'Cost Optimization'],
    created_at: '2024-04-18T11:30:00Z',
    updated_at: '2024-12-05T13:45:00Z'
  },
  {
    id: 'client-015',
    advisor_id: 'demo-user-id',
    name: 'Hannah Davis',
    email: 'hannah.davis@consulting.com',
    status: 'outstanding',
    sustainability_appetite: 'High',
    sustainability_profile: 'A',
    latest_assessment: '2024-09-18',
    next_assessment: '2024-12-18',
    notes: 'Senior Consultant at EcoStrategy Consulting. Advises other companies on sustainability. Excellent knowledge of best practices.',
    tags: ['Consulting', 'Strategy', 'Best Practices'],
    created_at: '2024-01-25T16:00:00Z',
    updated_at: '2024-09-18T18:30:00Z'
  },
  {
    id: 'client-016',
    advisor_id: 'demo-user-id',
    name: 'Peter Brooks',
    email: 'peter.brooks@chemicals.com',
    status: 'overdue',
    sustainability_appetite: 'Low',
    sustainability_profile: 'D',
    latest_assessment: '2024-04-30',
    next_assessment: '2024-07-30',
    notes: 'Safety Manager at Chemical Processing Corp. Significantly overdue. Regulatory compliance concerns regarding environmental standards.',
    tags: ['Chemicals', 'Safety', 'Compliance'],
    created_at: '2024-01-30T07:45:00Z',
    updated_at: '2024-04-30T09:20:00Z'
  },
  {
    id: 'client-017',
    advisor_id: 'demo-user-id',
    name: 'Nicole Turner',
    email: 'nicole.turner@ecommerce.com',
    status: 'updated',
    sustainability_appetite: 'Medium',
    sustainability_profile: 'B',
    latest_assessment: '2024-11-15',
    next_assessment: '2025-02-15',
    notes: 'Supply Chain Director at E-Commerce Plus. Recently implemented sustainable packaging solutions and carbon-neutral shipping options.',
    tags: ['E-commerce', 'Supply Chain', 'Carbon Neutral'],
    created_at: '2024-03-20T12:10:00Z',
    updated_at: '2024-11-15T14:55:00Z'
  },
  {
    id: 'client-018',
    advisor_id: 'demo-user-id',
    name: 'Andrew Wilson',
    email: 'andrew.wilson@mining.com',
    status: 'outstanding',
    sustainability_appetite: 'Low',
    sustainability_profile: 'C',
    latest_assessment: '2024-08-25',
    next_assessment: '2024-11-25',
    notes: 'Environmental Manager at Wilson Mining. Challenged by industry constraints but showing gradual improvement in environmental practices.',
    tags: ['Mining', 'Environmental', 'Heavy Industry'],
    created_at: '2024-02-05T10:20:00Z',
    updated_at: '2024-08-25T12:40:00Z'
  },
  {
    id: 'client-019',
    advisor_id: 'demo-user-id',
    name: 'Stephanie Lee',
    email: 'stephanie.lee@healthcare.com',
    status: 'updated',
    sustainability_appetite: 'High',
    sustainability_profile: 'A',
    latest_assessment: '2024-12-12',
    next_assessment: '2025-03-12',
    notes: 'Chief Sustainability Officer at HealthCare Network. Leading healthcare sustainability transformation with focus on waste reduction and energy efficiency.',
    tags: ['Healthcare', 'CSO', 'Waste Reduction'],
    created_at: '2024-01-18T15:30:00Z',
    updated_at: '2024-12-12T17:45:00Z'
  },
  {
    id: 'client-020',
    advisor_id: 'demo-user-id',
    name: 'Daniel Scott',
    email: 'daniel.scott@agriculture.com',
    status: 'outstanding',
    sustainability_appetite: 'Medium',
    sustainability_profile: 'B',
    latest_assessment: '2024-10-08',
    next_assessment: '2025-01-08',
    notes: 'Farm Operations Manager at Scott Agriculture. Implementing precision farming techniques and exploring regenerative agriculture practices.',
    tags: ['Agriculture', 'Precision Farming', 'Regenerative'],
    created_at: '2024-02-12T09:00:00Z',
    updated_at: '2024-10-08T11:30:00Z'
  }
];

// Helper function to get clients by status
export const getClientsByStatus = (status: 'updated' | 'outstanding' | 'overdue') => {
  return mockClients.filter(client => client.status === status);
};

// Helper function to get upcoming assessments (next 30 days)
export const getUpcomingAssessments = () => {
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  return mockClients.filter(client => {
    if (!client.next_assessment) return false;
    const nextAssessment = new Date(client.next_assessment);
    return nextAssessment >= today && nextAssessment <= thirtyDaysFromNow;
  });
};

// Helper function to calculate KPIs from mock data
export const calculateMockKPIs = () => {
  const totalClients = mockClients.length;
  const updatedCount = getClientsByStatus('updated').length;
  const outstandingCount = getClientsByStatus('outstanding').length;
  const overdueCount = getClientsByStatus('overdue').length;
  const upcoming30d = getUpcomingAssessments().length;

  return {
    totalClients,
    updatedCount,
    outstandingCount,
    overdueCount,
    upcoming30d
  };
};

// Export individual arrays for specific testing scenarios
export const updatedClients = getClientsByStatus('updated');
export const outstandingClients = getClientsByStatus('outstanding');
export const overdueClients = getClientsByStatus('overdue');
export const upcomingAssessments = getUpcomingAssessments();
export const mockKPIs = calculateMockKPIs();