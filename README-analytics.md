# TSA Advisor Analytics Implementation

## Overview

This document details the comprehensive Analytics implementation for the TSA Advisor application, featuring responsive design, Ant Design Charts, and complete backend integration.

## Architecture

### Database Design

#### New Tables
1. **assessments** - TSA assessment requests and completions
2. **reports** - Generated TSA reports with file storage references  
3. **quota_packages** - Advisor test allowance packages and usage tracking

#### Views for Analytics
- `vw_fa_analytics` - Per-advisor daily analytics aggregates
- `vw_fa_distribution` - Per-advisor sustainability profile and appetite distributions
- `vw_global_distribution` - Global sustainability distributions (admin-safe aggregates)
- `vw_fa_quota` - Per-advisor current quota package status and remaining allowance

#### Security & RLS
- Row Level Security (RLS) enforced on all tables
- Users can only access their own data (`auth.uid() = advisor_id`)
- Global distribution uses service role for aggregated data only (no PII)
- Proper indexes for performance on advisor_id, dates, and status

### API Endpoints

#### Analytics Summary
- **GET** `/api/analytics/summary?from&to`
- Returns: `{ testsRequested, reportsProduced, testAllowanceRemaining }`
- Filtered by date range and current user

#### Distribution Data
- **GET** `/api/analytics/distribution/fa?dim=profile|appetite&from&to`
- FA-specific distribution data from user's assessments
- **GET** `/api/analytics/distribution/global?dim=profile|appetite&from&to` 
- Global aggregated distribution (service role access, no PII)

#### Recent Reports
- **GET** `/api/analytics/reports/recent?limit=5&query=...`
- Returns list with `{ clientName, profile, appetite, generated_at, signedUrl }`
- Includes signed URLs for secure downloads (10-minute expiry)
- Supports search by client name/email with debounce

### Frontend Implementation

#### Components Structure
```
Analytics.tsx              // Main analytics container
├── AnalyticsCharts.tsx    // Ant Design Charts wrapper
├── hooks/useAnalytics.ts  // Data fetching hooks
└── services/analyticsApiDemo.ts // Demo mode implementation
```

#### Responsive Design (Mobile-First)

**Breakpoints:**
- **xs** (<576px): Stacked cards, full-width charts, single-column reports
- **sm/md** (≥576/768): Two columns, charts side-by-side if space allows
- **lg+** (≥992): 12-column grid: KPIs (3×4 cols), charts (2×6 cols), reports (12 cols)

**Mobile Optimizations:**
- Cards: 16/24px padding, ≥44px tap targets
- Charts: Responsive container, legends collapse to dropdown
- Tables/Lists: Horizontal scroll, ellipsis for long text
- Filters: Wrap on mobile, debounced inputs, sticky positioning

#### Data Visualization

**Charts Library:** `@ant-design/plots` (Column charts)

**Chart Configuration:**
```typescript
const chartConfig = {
  data: sortedData,
  xField: 'bucket',
  yField: 'count',
  seriesField: 'bucket',
  autoFit: true,
  height: isMobile ? 300 : 400,
  color: ({ bucket }) => getColor(bucket),
  // Responsive legend, tooltips, interactions...
}
```

**Profile Distribution:**
- Categories: A, B, C, D, E, Unknown
- Colors: Green (A) → Red (D) → Purple (E)

**Appetite Distribution:**
- Categories: High, Medium, Low, N/A
- Colors: Green (High) → Amber (Medium) → Red (Low) → Gray (N/A)

## Key Features

### Time Filtering
- **Last 30 Days** (default)
- **Last 90 Days**
- **Year to Date**
- **All Time**

### KPIs (Renamed as requested)
1. **Total Number of TSA Tests Requested** - Count of assessment requests
2. **Total Number of TSA Reports Produced** - Count of completed reports  
3. **Test Allowance Remaining** - From quota package (supports unlimited)

### Distribution Scopes
1. **FA Clients Only** - User's own assessment data
2. **Overall TSA Population** - Aggregated data across all advisors (admin-safe)

### Reports Management
- **Last 5 PDFs** with download links
- **Search by client name or date** (debounced)
- **Signed URLs** for secure downloads (10-minute expiry)
- **File size and format** display

## Data Hooks

### useAnalyticsSummary
```typescript
const summaryQuery = useAnalyticsSummary(timeFilter)
// Returns: { data, loading, error, refetch }
```

### useDistribution  
```typescript
const profileQuery = useDistribution('fa', 'profile', timeFilter)
const globalQuery = useDistribution('global', 'appetite', timeFilter)
// Returns: { data, loading, error, totalAssessments, refetch }
```

### useRecentReports
```typescript
const reportsQuery = useRecentReports(5, searchQuery)
// Returns: { data, loading, error, hasMore, refetch }
// Includes 300ms debounce for search
```

## Demo Mode Integration

### Mock Data
- **7 sample assessments** with varied profiles and appetites
- **5 sample reports** with realistic file sizes and dates
- **Quota package** with 50 allowance, 7 used
- **Global distribution** with aggregated numbers

### Fallback Strategy
1. Check if demo mode is enabled
2. Try API call first
3. Fall back to demo mode on network errors
4. Maintain consistent user experience

## Installation & Setup

### 1. Database Migration
```sql
-- Run the analytics migration
\i database/analytics-migration.sql
```

### 2. Install Dependencies
```bash
npm install @ant-design/plots
```

### 3. Environment Variables
```bash
# Required for signed URLs
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Storage Bucket Setup
Create a `reports` bucket in Supabase Storage for file storage.

## Testing

### API Testing
```bash
# Test summary endpoint
curl -X GET "http://localhost:3000/api/analytics/summary?from=2024-01-01&to=2024-02-01" \
  -H "Cookie: sb-access-token=..."

# Test distribution endpoint  
curl -X GET "http://localhost:3000/api/analytics/distribution/fa?dim=profile" \
  -H "Cookie: sb-access-token=..."

# Test reports endpoint
curl -X GET "http://localhost:3000/api/analytics/reports/recent?limit=5" \
  -H "Cookie: sb-access-token=..."
```

### Health Check
```bash
curl -X GET http://localhost:3000/api/health
```

### Demo Mode Testing
1. Enable demo mode: `localStorage.setItem('demo-mode', 'true')`
2. Refresh application
3. Navigate to Analytics
4. Verify charts render with mock data

## Performance Considerations

### Indexes
- `idx_assessments_advisor_id` - Fast advisor filtering
- `idx_assessments_requested_at` - Date range queries
- `idx_assessments_status` - Status filtering
- `idx_reports_generated_at` - Recent reports sorting

### Caching Strategy
- Client-side data caching in hooks
- Debounced search queries (300ms)
- Efficient re-rendering with useMemo/useCallback

### Mobile Performance
- Lazy loading for charts
- Optimized chart height (300px mobile, 400px desktop)
- Efficient responsive breakpoint handling

## Security

### RLS Policies
```sql
-- Example policy for assessments
CREATE POLICY "Users can view own assessments" ON assessments
  FOR SELECT USING (auth.uid() = advisor_id);
```

### Data Privacy
- **FA scope**: Only user's own data
- **Global scope**: Aggregated counts only, no PII
- **Service role**: Used only for global aggregations
- **Signed URLs**: 10-minute expiry for downloads

## Accessibility

### WCAG Compliance
- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Touch targets**: ≥44px on mobile, ≥40px on desktop
- **Screen readers**: Proper ARIA labels and semantic markup
- **Keyboard navigation**: Full keyboard accessibility

### Mobile Accessibility
- **Font sizes**: Minimum 16px for inputs on mobile
- **Touch targets**: Proper spacing and sizing
- **Responsive design**: Content reflows properly
- **Safe areas**: Proper handling of device safe areas

## Future Enhancements

### Potential Additions
1. **Advanced filtering** - Date ranges, client segments
2. **Export functionality** - CSV/Excel export of analytics data
3. **Real-time updates** - WebSocket integration for live data
4. **Comparative analytics** - Period-over-period comparisons
5. **Custom reporting** - User-defined report templates

### Performance Optimizations
1. **React Query integration** - Advanced caching and invalidation
2. **Virtual scrolling** - For large report lists
3. **Chart lazy loading** - Load charts as they come into view
4. **Data pagination** - Server-side pagination for large datasets

## Troubleshooting

### Common Issues

#### Charts not rendering
- Verify `@ant-design/plots` is installed
- Check console for chart configuration errors
- Ensure container has proper dimensions

#### Empty data in charts
- Verify assessment data exists with `completed_at` dates
- Check RLS policies are correctly configured
- Confirm date filtering is working properly

#### Signed URL failures
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- Check storage bucket exists and is accessible
- Confirm file paths are correct in reports table

#### Demo mode not working
- Verify `localStorage.getItem('demo-mode')` returns 'true'
- Check demo service is properly imported
- Look for console errors in demo functions

### Debug Commands
```sql
-- Check assessment data
SELECT count(*) FROM assessments WHERE advisor_id = 'user-id';

-- Verify RLS policies
SELECT * FROM pg_policies WHERE tablename = 'assessments';

-- Check quota packages
SELECT * FROM vw_fa_quota WHERE advisor_id = 'user-id';
```

This implementation provides a robust, secure, and performant analytics system that scales from mobile to desktop while maintaining excellent user experience and data security.