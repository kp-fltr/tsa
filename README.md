# TSA Advisor - Sustainability Assessment Dashboard

A lightweight prototype for financial advisors to manage client sustainability assessments.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   Create `.env.local` with required variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Environment Variables

### Required
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Optional  
- `TEST_EMAIL` - Test user email for smoke tests
- `TEST_PASSWORD` - Test user password for smoke tests

## Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier

# Testing
npm run test         # Run smoke tests
npm run test:ui      # Run tests with UI
```

## Testing

### Smoke Tests (2 tests only)

1. **Authentication & Client Fetch**
   ```bash
   npm run test -- --grep "can sign in and fetch clients"
   ```
   Tests: Login → Load clients → No error toasts

2. **Launch New Test (Happy Path)**  
   ```bash
   npm run test -- --grep "can launch new test"
   ```
   Tests: Launch flow → Success toast appears

### Running All Tests
```bash
npm run test
```

Set `TEST_EMAIL` and `TEST_PASSWORD` env vars for authenticated tests.

## Health Check

Check service status:
```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "ok": true,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": {
    "connected": true,
    "clientCount": 42
  }
}
```

## Architecture

```
/lib/           # Core utilities (env, supabase clients)
/services/      # Data access (clients.ts, kpis.ts)  
/components/    # UI components
/app/api/       # API routes
/types/         # TypeScript definitions
```

### Key Services
- `services/clients.ts` - Client CRUD operations
- `services/kpis.ts` - Dashboard metrics with caching
- `lib/supabase.ts` - Database client setup

## Features

- ✅ Client management with filtering/search
- ✅ KPI dashboard with caching
- ✅ AI-powered test launch flow
- ✅ Mobile-responsive design (44px+ touch targets)
- ✅ Loading states & error handling
- ✅ Demo mode for offline development

## Database

Uses Supabase with Row Level Security. Main tables:
- `client_registry` - Client information
- `assessments` - Test instances  
- `quota_packages` - Usage tracking

Health check verifies database connectivity via client count query.

## Deployment

1. Set environment variables in your hosting platform
2. Run `npm run build` 
3. Deploy the `.next` output

The app includes a health check endpoint for monitoring.

---

**Development Philosophy**: Keep it simple. This is a prototype focused on core functionality with minimal configuration overhead.