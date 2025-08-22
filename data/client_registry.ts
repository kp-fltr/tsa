// Client Registry Dataset - Single Source of Truth
// Exactly 100 realistic mock clients with required field structure

export interface ClientRegistryEntry {
  id: number;
  name: string;
  email: string;
  sustainability_assessment_status: 'Updated' | 'Outstanding' | 'Overdue';
  sustainability_appetite_rating: 'High' | 'Medium' | 'Low' | 'N/A';
  sustainability_profile: 'A' | 'B' | 'C' | 'D' | 'E';
  latest_assessment_date: string; // YYYY-MM-DD format
  next_assessment_date: string; // YYYY-MM-DD format
}

export const client_registry: ClientRegistryEntry[] = [
  {
    id: 1,
    name: "Adam Bailey",
    email: "adam.bailey@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-04-25",
    next_assessment_date: "2024-07-25"
  },
  {
    id: 2,
    name: "Alexis Mitchell",
    email: "alexis.mitchell@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-09-28",
    next_assessment_date: "2024-12-28"
  },
  {
    id: 3,
    name: "Allison Morgan",
    email: "allison.morgan@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-05-18",
    next_assessment_date: "2024-08-18"
  },
  {
    id: 4,
    name: "Amanda Foster",
    email: "amanda.foster@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-10",
    next_assessment_date: "2025-03-10"
  },
  {
    id: 5,
    name: "Amanda Hall",
    email: "amanda.hall@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-10-05",
    next_assessment_date: "2025-01-05"
  },
  {
    id: 6,
    name: "Andrew Lewis",
    email: "andrew.lewis@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-08-18",
    next_assessment_date: "2024-11-18"
  },
  {
    id: 7,
    name: "Andrew Wilson",
    email: "andrew.wilson@mining.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-08-25",
    next_assessment_date: "2024-11-25"
  },
  {
    id: 8,
    name: "Antonio James",
    email: "antonio.james@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-04-12",
    next_assessment_date: "2024-07-12"
  },
  {
    id: 9,
    name: "Ariana Hunter",
    email: "ariana.hunter@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-05-02",
    next_assessment_date: "2024-08-02"
  },
  {
    id: 10,
    name: "Ashley Miller",
    email: "ashley.miller@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-12",
    next_assessment_date: "2025-03-12"
  },
  {
    id: 11,
    name: "Blake Jenkins",
    email: "blake.jenkins@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-06-22",
    next_assessment_date: "2024-09-22"
  },
  {
    id: 12,
    name: "Brandon Evans",
    email: "brandon.evans@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-05-22",
    next_assessment_date: "2024-08-22"
  },
  {
    id: 13,
    name: "Brian Harris",
    email: "brian.harris@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-04-15",
    next_assessment_date: "2024-07-15"
  },
  {
    id: 14,
    name: "Catherine Williams",
    email: "catherine.williams@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-28",
    next_assessment_date: "2025-02-28"
  },
  {
    id: 15,
    name: "Christopher Davis",
    email: "christopher.davis@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-09-15",
    next_assessment_date: "2024-12-15"
  },
  {
    id: 16,
    name: "Claire Thompson",
    email: "claire.thompson@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-05",
    next_assessment_date: "2025-03-05"
  },
  {
    id: 17,
    name: "Daniel Johnson",
    email: "daniel.johnson@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-10-12",
    next_assessment_date: "2025-01-12"
  },
  {
    id: 18,
    name: "David Smith",
    email: "david.smith@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-04-08",
    next_assessment_date: "2024-07-08"
  },
  {
    id: 19,
    name: "Derek Perez",
    email: "derek.perez@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-04-18",
    next_assessment_date: "2024-07-18"
  },
  {
    id: 20,
    name: "Emily Chen",
    email: "emily.chen@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-22",
    next_assessment_date: "2025-02-22"
  },
  {
    id: 21,
    name: "Emma Rodriguez",
    email: "emma.rodriguez@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-09-08",
    next_assessment_date: "2024-12-08"
  },
  {
    id: 22,
    name: "Eric Turner",
    email: "eric.turner@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-05-30",
    next_assessment_date: "2024-08-30"
  },
  {
    id: 23,
    name: "Gabriel Martinez",
    email: "gabriel.martinez@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-08-28",
    next_assessment_date: "2024-11-28"
  },
  {
    id: 24,
    name: "Grace Anderson",
    email: "grace.anderson@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-01",
    next_assessment_date: "2025-03-01"
  },
  {
    id: 25,
    name: "Hannah White",
    email: "hannah.white@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-10-18",
    next_assessment_date: "2025-01-18"
  },
  {
    id: 26,
    name: "James Wilson",
    email: "james.wilson@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-06-05",
    next_assessment_date: "2024-09-05"
  },
  {
    id: 27,
    name: "Jennifer Wilson",
    email: "jennifer.wilson@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-04-25",
    next_assessment_date: "2024-07-25"
  },
  {
    id: 28,
    name: "Jessica Brown",
    email: "jessica.brown@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-09-20",
    next_assessment_date: "2024-12-20"
  },
  {
    id: 29,
    name: "John Miller",
    email: "john.miller@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-15",
    next_assessment_date: "2025-02-15"
  },
  {
    id: 30,
    name: "Jordan Garcia",
    email: "jordan.garcia@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-10-25",
    next_assessment_date: "2025-01-25"
  },
  {
    id: 31,
    name: "Joseph Clark",
    email: "joseph.clark@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-05-12",
    next_assessment_date: "2024-08-12"
  },
  {
    id: 32,
    name: "Joshua Lewis",
    email: "joshua.lewis@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-08-15",
    next_assessment_date: "2024-11-15"
  },
  {
    id: 33,
    name: "Julia Robinson",
    email: "julia.robinson@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-08",
    next_assessment_date: "2025-03-08"
  },
  {
    id: 34,
    name: "Karen Taylor",
    email: "karen.taylor@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-09-25",
    next_assessment_date: "2024-12-25"
  },
  {
    id: 35,
    name: "Kevin Rodriguez",
    email: "kevin.rodriguez@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-06-12",
    next_assessment_date: "2024-09-12"
  },
  {
    id: 36,
    name: "Laura Martinez",
    email: "laura.martinez@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-30",
    next_assessment_date: "2025-02-28"
  },
  {
    id: 37,
    name: "Lisa Johnson",
    email: "lisa.johnson@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-10-08",
    next_assessment_date: "2025-01-08"
  },
  {
    id: 38,
    name: "Marcus Thompson",
    email: "marcus.thompson@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-04-22",
    next_assessment_date: "2024-07-22"
  },
  {
    id: 39,
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-15",
    next_assessment_date: "2025-03-15"
  },
  {
    id: 40,
    name: "Mark Davis",
    email: "mark.davis@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-09-12",
    next_assessment_date: "2024-12-12"
  },
  {
    id: 41,
    name: "Matthew Anderson",
    email: "matthew.anderson@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-05-25",
    next_assessment_date: "2024-08-25"
  },
  {
    id: 42,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-08-30",
    next_assessment_date: "2024-11-30"
  },
  {
    id: 43,
    name: "Michelle Garcia",
    email: "michelle.garcia@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-18",
    next_assessment_date: "2025-02-18"
  },
  {
    id: 44,
    name: "Nathan Wilson",
    email: "nathan.wilson@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-10-15",
    next_assessment_date: "2025-01-15"
  },
  {
    id: 45,
    name: "Nicole Taylor",
    email: "nicole.taylor@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-06-18",
    next_assessment_date: "2024-09-18"
  },
  {
    id: 46,
    name: "Olivia Johnson",
    email: "olivia.johnson@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-20",
    next_assessment_date: "2025-03-20"
  },
  {
    id: 47,
    name: "Patricia Williams",
    email: "patricia.williams@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-09-05",
    next_assessment_date: "2024-12-05"
  },
  {
    id: 48,
    name: "Peter Brooks",
    email: "peter.brooks@chemicals.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-04-30",
    next_assessment_date: "2024-07-30"
  },
  {
    id: 49,
    name: "Rachel Green",
    email: "rachel.green@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-25",
    next_assessment_date: "2025-02-25"
  },
  {
    id: 50,
    name: "Rebecca Smith",
    email: "rebecca.smith@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-10-20",
    next_assessment_date: "2025-01-20"
  },
  {
    id: 51,
    name: "Robert Jones",
    email: "robert.jones@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-05-08",
    next_assessment_date: "2024-08-08"
  },
  {
    id: 52,
    name: "Ryan Miller",
    email: "ryan.miller@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-08-22",
    next_assessment_date: "2024-11-22"
  },
  {
    id: 53,
    name: "Samantha Davis",
    email: "samantha.davis@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-18",
    next_assessment_date: "2025-03-18"
  },
  {
    id: 54,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-09-30",
    next_assessment_date: "2024-12-30"
  },
  {
    id: 55,
    name: "Scott Anderson",
    email: "scott.anderson@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-06-25",
    next_assessment_date: "2024-09-25"
  },
  {
    id: 56,
    name: "Stephanie Brown",
    email: "stephanie.brown@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-12",
    next_assessment_date: "2025-02-12"
  },
  {
    id: 57,
    name: "Steven Garcia",
    email: "steven.garcia@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-10-02",
    next_assessment_date: "2025-01-02"
  },
  {
    id: 58,
    name: "Susan Martinez",
    email: "susan.martinez@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-04-28",
    next_assessment_date: "2024-07-28"
  },
  {
    id: 59,
    name: "Taylor Johnson",
    email: "taylor.johnson@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-22",
    next_assessment_date: "2025-03-22"
  },
  {
    id: 60,
    name: "Thomas Wilson",
    email: "thomas.wilson@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-09-18",
    next_assessment_date: "2024-12-18"
  },
  {
    id: 61,
    name: "Timothy Rodriguez",
    email: "timothy.rodriguez@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-05-15",
    next_assessment_date: "2024-08-15"
  },
  {
    id: 62,
    name: "Victoria Lee",
    email: "victoria.lee@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-08",
    next_assessment_date: "2025-02-08"
  },
  {
    id: 63,
    name: "William Taylor",
    email: "william.taylor@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-08-12",
    next_assessment_date: "2024-11-12"
  },
  {
    id: 64,
    name: "Zachary Davis",
    email: "zachary.davis@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-06-08",
    next_assessment_date: "2024-09-08"
  },
  {
    id: 65,
    name: "Alexandra Moore",
    email: "alexandra.moore@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-25",
    next_assessment_date: "2025-03-25"
  },
  {
    id: 66,
    name: "Benjamin Clark",
    email: "benjamin.clark@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-10-10",
    next_assessment_date: "2025-01-10"
  },
  {
    id: 67,
    name: "Caroline Adams",
    email: "caroline.adams@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-05-05",
    next_assessment_date: "2024-08-05"
  },
  {
    id: 68,
    name: "Dominic Harris",
    email: "dominic.harris@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-20",
    next_assessment_date: "2025-02-20"
  },
  {
    id: 69,
    name: "Elizabeth Turner",
    email: "elizabeth.turner@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-09-22",
    next_assessment_date: "2024-12-22"
  },
  {
    id: 70,
    name: "Felix Rodriguez",
    email: "felix.rodriguez@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-04-20",
    next_assessment_date: "2024-07-20"
  },
  {
    id: 71,
    name: "Gabriella Martinez",
    email: "gabriella.martinez@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-28",
    next_assessment_date: "2025-03-28"
  },
  {
    id: 72,
    name: "Harrison Lee",
    email: "harrison.lee@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-10-28",
    next_assessment_date: "2025-01-28"
  },
  {
    id: 73,
    name: "Isabella Garcia",
    email: "isabella.garcia@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-06-15",
    next_assessment_date: "2024-09-15"
  },
  {
    id: 74,
    name: "Jackson Thompson",
    email: "jackson.thompson@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-05",
    next_assessment_date: "2025-02-05"
  },
  {
    id: 75,
    name: "Katherine Wilson",
    email: "katherine.wilson@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-08-08",
    next_assessment_date: "2024-11-08"
  },
  {
    id: 76,
    name: "Leonardo Perez",
    email: "leonardo.perez@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-05-28",
    next_assessment_date: "2024-08-28"
  },
  {
    id: 77,
    name: "Madison Brown",
    email: "madison.brown@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-30",
    next_assessment_date: "2025-03-30"
  },
  {
    id: 78,
    name: "Nicholas Davis",
    email: "nicholas.davis@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-09-15",
    next_assessment_date: "2024-12-15"
  },
  {
    id: 79,
    name: "Penelope Johnson",
    email: "penelope.johnson@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-04-05",
    next_assessment_date: "2024-07-05"
  },
  {
    id: 80,
    name: "Quincy Miller",
    email: "quincy.miller@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-28",
    next_assessment_date: "2025-02-28"
  },
  {
    id: 81,
    name: "Ricardo Martinez",
    email: "ricardo.martinez@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-10-22",
    next_assessment_date: "2025-01-22"
  },
  {
    id: 82,
    name: "Sophia Anderson",
    email: "sophia.anderson@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-06-02",
    next_assessment_date: "2024-09-02"
  },
  {
    id: 83,
    name: "Theodore Wilson",
    email: "theodore.wilson@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-02",
    next_assessment_date: "2025-03-02"
  },
  {
    id: 84,
    name: "Ursula Garcia",
    email: "ursula.garcia@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-08-25",
    next_assessment_date: "2024-11-25"
  },
  {
    id: 85,
    name: "Valerie Taylor",
    email: "valerie.taylor@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-05-20",
    next_assessment_date: "2024-08-20"
  },
  {
    id: 86,
    name: "Wesley Johnson",
    email: "wesley.johnson@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-15",
    next_assessment_date: "2025-02-15"
  },
  {
    id: 87,
    name: "Ximena Rodriguez",
    email: "ximena.rodriguez@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-10-05",
    next_assessment_date: "2025-01-05"
  },
  {
    id: 88,
    name: "Yolanda Martinez",
    email: "yolanda.martinez@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-04-18",
    next_assessment_date: "2024-07-18"
  },
  {
    id: 89,
    name: "Zoe Thompson",
    email: "zoe.thompson@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-08",
    next_assessment_date: "2025-03-08"
  },
  {
    id: 90,
    name: "Adrian Wilson",
    email: "adrian.wilson@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-09-10",
    next_assessment_date: "2024-12-10"
  },
  {
    id: 91,
    name: "Beatrice Davis",
    email: "beatrice.davis@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-06-20",
    next_assessment_date: "2024-09-20"
  },
  {
    id: 92,
    name: "Caleb Garcia",
    email: "caleb.garcia@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-22",
    next_assessment_date: "2025-02-22"
  },
  {
    id: 93,
    name: "Delilah Johnson",
    email: "delilah.johnson@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-08-18",
    next_assessment_date: "2024-11-18"
  },
  {
    id: 94,
    name: "Ethan Martinez",
    email: "ethan.martinez@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-05-10",
    next_assessment_date: "2024-08-10"
  },
  {
    id: 95,
    name: "Fiona Rodriguez",
    email: "fiona.rodriguez@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-12-12",
    next_assessment_date: "2025-03-12"
  },
  {
    id: 96,
    name: "Gregory Thompson",
    email: "gregory.thompson@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "B",
    latest_assessment_date: "2024-10-30",
    next_assessment_date: "2025-01-30"
  },
  {
    id: 97,
    name: "Helena Wilson",
    email: "helena.wilson@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "E",
    latest_assessment_date: "2024-04-25",
    next_assessment_date: "2024-07-25"
  },
  {
    id: 98,
    name: "Ivan Davis",
    email: "ivan.davis@example.com",
    sustainability_assessment_status: "Updated",
    sustainability_appetite_rating: "High",
    sustainability_profile: "A",
    latest_assessment_date: "2024-11-10",
    next_assessment_date: "2025-02-10"
  },
  {
    id: 99,
    name: "Jasmine Garcia",
    email: "jasmine.garcia@example.com",
    sustainability_assessment_status: "Outstanding",
    sustainability_appetite_rating: "Medium",
    sustainability_profile: "C",
    latest_assessment_date: "2024-08-05",
    next_assessment_date: "2024-11-05"
  },
  {
    id: 100,
    name: "Kyle Martinez",
    email: "kyle.martinez@example.com",
    sustainability_assessment_status: "Overdue",
    sustainability_appetite_rating: "Low",
    sustainability_profile: "D",
    latest_assessment_date: "2024-06-28",
    next_assessment_date: "2024-09-28"
  }
];

// Helper functions for filtering and sorting
export function getAllClientsSortedByName(): ClientRegistryEntry[] {
  return [...client_registry].sort((a, b) => a.name.localeCompare(b.name));
}

export function getClientsRequiringAction(): ClientRegistryEntry[] {
  return client_registry
    .filter(client => 
      client.sustainability_assessment_status === 'Outstanding' || 
      client.sustainability_assessment_status === 'Overdue'
    )
    .sort((a, b) => new Date(a.latest_assessment_date).getTime() - new Date(b.latest_assessment_date).getTime());
}

export function getClientById(id: number): ClientRegistryEntry | undefined {
  return client_registry.find(client => client.id === id);
}

export function getTotalClientsCount(): number {
  return client_registry.length;
}

export function getStatusCounts() {
  const counts = {
    Updated: 0,
    Outstanding: 0,
    Overdue: 0
  };
  
  client_registry.forEach(client => {
    counts[client.sustainability_assessment_status]++;
  });
  
  return counts;
}