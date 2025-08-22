# Client Management Table - First 10 Bound Rows Preview

## Data Source Verification ✅
- **Bound to**: `client_registry` dataset (single source of truth)
- **Total entries**: 100 clients
- **Sorting**: Alphabetical by name (A-Z)
- **Column bindings**: All match `client_registry` field names exactly

## Column Mapping ✅
| UI Column | client_registry Field | Data Type |
|-----------|----------------------|-----------|
| Name | `name` | string |
| Email | `email` | string |
| Status | `status` | 'updated' \| 'outstanding' \| 'overdue' |
| Profile | `sustainability_profile` | string (15 words max) |
| Appetite | `sustainability_appetite` | 'Low' \| 'Medium' \| 'High' |
| Next Assessment | `next_assessment` | string (YYYY-MM-DD) |

## First 10 Rows (Alphabetically Sorted) 🔍

### 1. Amanda Foster
- **Email**: amanda.foster@example.com
- **Status**: updated
- **Appetite**: High  
- **Profile**: Strong ESG focus with comprehensive climate action initiatives
- **Latest Assessment**: 2024-12-10
- **Next Assessment**: 2025-03-10
- **Notes**: Excellent engagement with sustainability goals and green investment strategies

### 2. Amanda Hall  
- **Email**: amanda.hall@example.com
- **Status**: outstanding
- **Appetite**: Medium
- **Profile**: Responsible investing approach with emphasis on corporate transparency
- **Latest Assessment**: 2024-10-05
- **Next Assessment**: 2025-01-05
- **Notes**: Prefers companies with clear sustainability reporting and accountability measures

### 3. Andrew Lewis
- **Email**: andrew.lewis@example.com
- **Status**: outstanding
- **Appetite**: Medium
- **Profile**: Emerging interest in sustainable investing with gradual portfolio transition
- **Latest Assessment**: 2024-08-18
- **Next Assessment**: 2024-11-18
- **Notes**: Beginning to explore ESG options while maintaining diversified approach

### 4. Andrew Wilson
- **Email**: andrew.wilson@mining.com
- **Status**: outstanding
- **Appetite**: Low
- **Profile**: Environmental Manager at Wilson Mining challenged by industry constraints
- **Latest Assessment**: 2024-08-25
- **Next Assessment**: 2024-11-25
- **Notes**: Challenged by industry constraints but showing gradual improvement in environmental practices

### 5. Antonio James
- **Email**: antonio.james@example.com  
- **Status**: overdue
- **Appetite**: Low
- **Profile**: Momentum trading strategy with minimal fundamental ESG analysis
- **Latest Assessment**: 2024-04-12
- **Next Assessment**: 2024-07-12
- **Notes**: Technical trading focus, needs education on ESG momentum and trend analysis

### 6. Ariana Hunter
- **Email**: ariana.hunter@example.com
- **Status**: overdue  
- **Appetite**: Low
- **Profile**: Convertible securities specialist with minimal ESG underlying analysis
- **Latest Assessment**: 2024-05-02
- **Next Assessment**: 2024-08-02
- **Notes**: Convertible bonds focus, needs guidance on ESG factors in convertible analysis

### 7. Ashley Miller
- **Email**: ashley.miller@example.com
- **Status**: updated
- **Appetite**: High
- **Profile**: Environmental advocate supporting biodiversity and conservation initiatives
- **Latest Assessment**: 2024-12-12
- **Next Assessment**: 2025-03-12  
- **Notes**: Committed to investments that protect natural resources and ecosystems

### 8. Blake Jenkins
- **Email**: blake.jenkins@example.com
- **Status**: overdue
- **Appetite**: Low
- **Profile**: Commodities trading with traditional supply and demand analysis
- **Latest Assessment**: 2024-06-22
- **Next Assessment**: 2024-09-22
- **Notes**: Commodities specialist, needs guidance on ESG factors in commodity markets

### 9. Brandon Evans
- **Email**: brandon.evans@example.com
- **Status**: overdue
- **Appetite**: Low
- **Profile**: Small cap growth investor with minimal ESG screening
- **Latest Assessment**: 2024-05-22
- **Next Assessment**: 2024-08-22
- **Notes**: Small company focus, needs guidance on ESG factors in smaller enterprises

### 10. Brian Harris
- **Email**: brian.harris@example.com
- **Status**: overdue
- **Appetite**: Low  
- **Profile**: Growth-oriented investor with minimal attention to sustainability factors
- **Latest Assessment**: 2024-04-15
- **Next Assessment**: 2024-07-15
- **Notes**: Emphasizes growth potential, needs to understand ESG impact on returns

## Status Distribution in First 10 Rows
- **Updated**: 2 clients (Amanda Foster, Ashley Miller)
- **Outstanding**: 2 clients (Amanda Hall, Andrew Lewis) 
- **Overdue**: 6 clients (Antonio James, Ariana Hunter, Blake Jenkins, Brandon Evans, Brian Harris, Andrew Wilson)

## Verification Confirmed ✅
1. ✅ Data source bound to `client_registry` dataset
2. ✅ All column bindings match field names exactly  
3. ✅ No filters applied - showing raw dataset
4. ✅ 100 total rows loaded and accessible
5. ✅ Alphabetical sorting by name working correctly