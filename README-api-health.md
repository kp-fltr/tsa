# TSA Advisor API Health Check & Testing Guide

## Overview

This guide provides testing steps for the TSA Advisor API endpoints and health monitoring system.

## API Endpoints

### Health Check
- **URL**: `/api/health`
- **Method**: GET
- **Auth**: Optional (provides more details when authenticated)
- **Purpose**: Validates database connectivity, authentication status, and client registry access

### Clients API
- **URL**: `/api/clients`
- **Methods**: GET, POST
- **Auth**: Required
- **Purpose**: Manage client registry data with filtering, sorting, and pagination

### KPIs API
- **URL**: `/api/kpis`
- **Method**: GET
- **Auth**: Required
- **Purpose**: Fetch dashboard metrics and key performance indicators

## Test Steps

### 1. Health Check Testing

#### Unauthenticated Health Check
```bash
curl -X GET http://localhost:3000/api/health
```

**Expected Response** (200 OK):
```json
{
  "status": "healthy|degraded|unhealthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "TSA Advisor API",
  "version": "1.0.0",
  "checks": {
    "database": { "status": "healthy" },
    "auth": { "status": "no_session" },
    "clientRegistry": { "status": "unknown" }
  }
}
```

#### Authenticated Health Check
1. Log in through the application UI
2. Check browser cookies for Supabase session
3. Make request:
```bash
curl -X GET http://localhost:3000/api/health \
  -H "Cookie: sb-access-token=...; sb-refresh-token=..."
```

**Expected Response** (200 OK):
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "TSA Advisor API",
  "version": "1.0.0",
  "checks": {
    "database": { "status": "healthy", "totalRecords": 0 },
    "auth": { "status": "authenticated", "userId": "user-uuid" },
    "clientRegistry": { "status": "healthy", "userClients": 5 }
  }
}
```

### 2. Authentication Testing

#### Test Session Persistence
1. Log in through the UI
2. Refresh the page
3. Verify you remain logged in for at least 30 minutes
4. Check that API calls continue to work without re-authentication

#### Test Session Expiry
1. Log in and wait for session to expire (or manually delete session cookies)
2. Make an API call
3. Verify you receive a 401 response
4. Verify automatic redirect to login page

### 3. Clients API Testing

#### Fetch Clients (Authenticated)
```bash
curl -X GET "http://localhost:3000/api/clients?page=1&pageSize=10" \
  -H "Cookie: sb-access-token=...; sb-refresh-token=..."
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### Create Client (Authenticated)
```bash
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=...; sb-refresh-token=..." \
  -d '{
    "name": "Test Client",
    "email": "test@example.com",
    "status": "outstanding"
  }'
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "client-uuid",
    "name": "Test Client",
    "email": "test@example.com",
    "status": "outstanding",
    "advisor_id": "user-uuid",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Unauthenticated Request
```bash
curl -X GET http://localhost:3000/api/clients
```

**Expected Response** (401 Unauthorized):
```json
{
  "error": "Authentication required"
}
```

### 4. KPIs API Testing

#### Fetch KPIs (Authenticated)
```bash
curl -X GET http://localhost:3000/api/kpis \
  -H "Cookie: sb-access-token=...; sb-refresh-token=..."
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "totalClients": 25,
    "updatedCount": 15,
    "outstandingCount": 8,
    "overdueCount": 2,
    "upcoming30d": 5
  }
}
```

### 5. Browser Network Tab Testing

#### What to Check
1. **Open DevTools** → Network tab
2. **Log in** to the application
3. **Navigate** to Dashboard
4. **Verify**:
   - `/api/kpis` returns 200 with data
   - `/api/clients` returns 200 with data
   - No "Failed to fetch" errors in console
   - No 401/403 errors for authenticated requests

#### Success Indicators
- ✅ All API calls show 200 status
- ✅ Response bodies contain expected JSON structure
- ✅ No console errors related to authentication
- ✅ Dashboard displays real data (not demo mode fallback)

### 6. Database Security Testing (RLS)

#### Setup Test Users
1. Create two different user accounts
2. Log in as User A and create some clients
3. Log in as User B

#### Verify Row Level Security
```bash
# As User B, try to access User A's data
curl -X GET "http://localhost:3000/api/clients" \
  -H "Cookie: [User B session cookies]"
```

**Expected**: User B should only see their own clients, not User A's clients.

### 7. Environment Variables Check

#### Required Environment Variables
```bash
# Server-side only (do not expose to browser)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Public (safe to expose)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

#### Verify Security
1. **Check browser sources** → Ensure service role key is NOT visible
2. **Check network requests** → Ensure service role key is NOT sent to browser
3. **Verify API functionality** → Ensure database operations work server-side

## Troubleshooting

### Common Issues

#### "Failed to fetch" errors
- Check network connectivity
- Verify API routes are deployed correctly
- Check for CORS issues
- Verify Supabase configuration

#### 401 Unauthorized errors
- Check if user session is valid
- Verify cookie settings and domain
- Check Supabase auth configuration
- Ensure proper session refresh logic

#### Empty data responses
- Verify database table exists (`client_registry`)
- Check RLS policies are correctly configured
- Ensure test data exists for the authenticated user
- Verify database connection credentials

#### Radix ref warnings
- Check console for "Function components cannot be given refs"
- Verify all components using `asChild` prop properly forward refs
- Replace function components with `forwardRef` components where needed

### Debug Commands

```bash
# Check if database table exists
psql -d "your_supabase_db_url" -c "\dt client_registry"

# Verify user has data
psql -d "your_supabase_db_url" -c "SELECT count(*) FROM client_registry WHERE advisor_id = 'user-uuid';"

# Check RLS policies
psql -d "your_supabase_db_url" -c "\d+ client_registry"
```

## Success Criteria Checklist

- [ ] Health check returns 200 for both authenticated and unauthenticated requests
- [ ] Session persists for at least 30 minutes without manual refresh
- [ ] `/api/clients` and `/api/kpis` return 200 with real data when authenticated
- [ ] Anonymous users receive 401 for protected endpoints
- [ ] No "Failed to fetch" errors in browser console
- [ ] Network tab shows completed requests (not failed)
- [ ] No Radix/Shadcn ref warnings in browser console
- [ ] Service role key is not exposed to browser
- [ ] RLS prevents users from accessing other users' data
- [ ] Auto-refresh works without page reload