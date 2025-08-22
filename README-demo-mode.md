# Demo Mode Implementation

This document explains the demo mode system that provides realistic mock data for testing and demonstration purposes.

## How to Enable Demo Mode

Demo mode is controlled by the `NEXT_PUBLIC_DEMO_MODE` environment variable.

### Enable Demo Mode (Default)
```bash
NEXT_PUBLIC_DEMO_MODE=1
```

### Disable Demo Mode  
```bash
NEXT_PUBLIC_DEMO_MODE=0
```

## Architecture

### Centralized Configuration
All environment flags are centralized in `/lib/config.ts` to eliminate client-side `process` usage:

```typescript
// ✅ Safe client-side usage
import { DEMO_MODE, isDemoMode } from './lib/config';

// ❌ Avoid this (causes "process is not defined" errors)
// const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE;
```

### Mock Data Source
All mock data is located in `/lib/mockData.ts` with:
- 50 realistic client profiles  
- ~60 assessments over the last 90 days
- Proper sustainability profile and appetite distributions
- Consistent response shapes matching future Supabase implementation

### API Routes
Demo mode uses App Router API routes that seamlessly switch between mock and live data:

- `/api/analytics/distribution?dim=profile` - Sustainability profile distribution
- `/api/analytics/distribution?dim=appetite` - Sustainability appetite distribution  
- `/api/analytics/kpis` - Key performance indicators
- `/api/health` - System health and configuration status

## Verification Steps

### 1. Manual API Testing
With the dev server running, test these endpoints in your browser:

```
http://localhost:3000/api/health
http://localhost:3000/api/analytics/distribution?dim=profile
http://localhost:3000/api/analytics/distribution?dim=appetite
http://localhost:3000/api/analytics/kpis
```

Expected responses:
- Profile distribution: JSON with A-E buckets and counts
- Appetite distribution: JSON with High/Medium/Low/N/A buckets and counts  
- KPIs: JSON with tests_requested, reports_produced, test_allowance_remaining
- Health: JSON with system status and configuration

### 2. Analytics Page Testing
Navigate to the Analytics page and verify:
- ✅ KPI cards show realistic values (not zeros)
- ✅ Both distribution charts render with data
- ✅ No "Failed to fetch..." errors in console
- ✅ Demo mode indicator appears at top of page
- ✅ Debug panel shows in development mode

### 3. Console Verification
Check browser console for:
```
📊 Mock Data Summary: { totalClients: 50, totalAssessments: ~60, ... }
🎭 Demo mode enabled, returning mock data
✅ API Success: /api/analytics/...
```

## Troubleshooting

### "process is not defined" Error
- Ensure all client components import from `/lib/config.ts`
- Never access `process.env` directly in client code
- Use `CONFIG.IS_DEVELOPMENT` instead of `process.env.NODE_ENV`

### Empty Charts or Zero KPIs
- Verify `NEXT_PUBLIC_DEMO_MODE=1` in environment
- Check browser console for API errors
- Test API endpoints directly (see verification steps)
- Restart dev server after environment changes

### Data Inconsistencies
- All mock data uses consistent field names and types
- Response shapes match future Supabase implementation
- Distribution totals should match assessment counts

## Future Integration

The demo mode system is designed for easy transition to live Supabase data:

```typescript
// Current demo mode logic
if (isDemoMode()) {
  return getMockProfileDistribution();
} else {
  // TODO: Replace with Supabase query
  return await supabase
    .from('assessments')
    .select('sustainability_profile')
    .execute();
}
```

## Environment Variables

Required for demo mode:
- `NEXT_PUBLIC_DEMO_MODE` - Controls demo mode (1=enabled, 0=disabled)

Optional for debugging:
- `NODE_ENV` - Controls development features (development/production)

All environment variables are safely handled through the centralized config system.