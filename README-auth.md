# TSA Advisor Authentication System

## Overview

This document describes the authentication system for the TSA Advisor application, including setup, configuration, and testing procedures.

## Architecture

The authentication system uses Supabase Auth with the following components:

- **Browser Client** (`/lib/supabaseClient.ts`) - Handles client-side authentication with session persistence
- **Server Client** (`/lib/supabaseServer.ts`) - Handles server-side authentication with cookie management
- **API Client** (`/lib/apiClient.ts`) - Handles authenticated API requests with automatic token refresh
- **Auth Context** (`/contexts/AuthContext.tsx`) - React context for managing authentication state
- **API Routes** (`/api/*`) - Server-side endpoints with authentication validation
- **RLS Policies** - Database-level security policies

## Configuration

### Supabase Configuration

The application uses Supabase configuration values from `/utils/supabase/info.tsx`. These values are pre-configured for the project:

- **Project ID**: `cvqqvvpukxgoadiuqtvp`
- **Supabase URL**: `https://cvqqvvpukxgoadiuqtvp.supabase.co`
- **Public Anon Key**: Pre-configured in the info file

### Environment Variables (Server-Only)

For server-side operations, you only need one environment variable:

```bash
# Supabase Service Role Key (Private - server-only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to find the Service Role Key:**
1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/cvqqvvpukxgoadiuqtvp
2. Navigate to Settings > API
3. Copy the **service_role key** (⚠️ Keep this secret - never expose in browser!)

## Database Setup

### 1. Create the client_registry table

Run the SQL from `/database-setup.sql` in your Supabase SQL editor to create the table with proper structure and constraints.

### 2. Set up RLS policies

Run the SQL from `/database/rls-policies.sql` in your Supabase SQL editor to enable Row Level Security.

### 3. Verify the setup

```sql
-- Check if the table exists and has the correct structure
\d client_registry;

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'client_registry';

-- List RLS policies
SELECT * FROM pg_policies WHERE tablename = 'client_registry';
```

## Authentication Flow

### 1. Sign Up Process
```typescript
const { signUp } = useAuth();
await signUp('user@example.com', 'password123', 'User Name');
```

### 2. Sign In Process
```typescript
const { signIn } = useAuth();
await signIn('user@example.com', 'password123');
```

### 3. Session Management
- Sessions are automatically persisted in localStorage
- Tokens are automatically refreshed when expired
- Auth state is managed through React Context

### 4. API Requests
```typescript
import { api } from '../lib/apiClient';

// GET request with automatic auth headers
const kpis = await api.get('/kpis');

// POST request with automatic auth headers
const newClient = await api.post('/clients', clientData);
```

## API Endpoints

### Authentication Required Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/kpis` | GET | Fetch dashboard KPIs |
| `/api/clients` | GET | Fetch clients with pagination/filtering |
| `/api/clients` | POST | Create a new client |
| `/api/clients/[id]` | GET | Fetch a specific client |
| `/api/clients/[id]` | PUT | Update a specific client |
| `/api/clients/[id]` | DELETE | Delete a specific client |
| `/api/health` | GET | Health check (optional auth) |

### Response Format

All API endpoints return responses in this format:

```typescript
// Success Response
{
  success: true,
  data: { /* response data */ },
  pagination?: { /* pagination info */ }
}

// Error Response
{
  error: "Error message",
  code?: "ERROR_CODE"
}
```

## Testing

### 1. Local Development

```bash
# Install dependencies
npm install

# Set up server environment variable (if using admin features)
# Create .env.local and add:
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Start the development server
npm run dev
```

### 2. Health Check

Visit `http://localhost:3000/api/health` to verify:
- Database connection
- Authentication status
- RLS policies
- Environment variables

### 3. Authentication Testing

```bash
# Test sign up
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Test sign in (using Supabase auth directly)
# This should be done through the UI for proper session handling
```

### 4. API Endpoint Testing

```bash
# Test KPIs endpoint (requires authentication)
curl -X GET http://localhost:3000/api/kpis \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Test clients endpoint
curl -X GET http://localhost:3000/api/clients \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 5. RLS Policy Testing

Run these queries in your Supabase SQL editor as different users:

```sql
-- As User A: Insert test data
INSERT INTO client_registry (advisor_id, name, email, status) 
VALUES (auth.uid(), 'Test Client A', 'testa@example.com', 'updated');

-- As User B: Try to access User A's data (should return no results)
SELECT * FROM client_registry WHERE advisor_id != auth.uid();

-- As User A: Should only see own data
SELECT * FROM client_registry;
```

## Security Features

### 1. Row Level Security (RLS)
- Users can only access their own client data
- Database-level enforcement
- No way to bypass without admin privileges

### 2. JWT Token Validation
- All API routes validate JWT tokens
- Automatic token refresh on expiration
- Secure token storage in httpOnly cookies (server routes)

### 3. Environment Variable Security
- Service role key is server-only
- Public keys are safe for browser exposure
- Proper separation of concerns

### 4. CORS and Headers
- Proper CORS configuration
- Security headers included
- Content type validation

## Troubleshooting

### Common Issues

#### 1. "Invalid or expired token"
**Cause**: Token has expired or is malformed
**Solution**: 
- Check if user is signed in: `const { user } = useAuth()`
- Try signing out and back in
- Check browser console for auth errors

#### 2. "Authentication required"
**Cause**: No valid session found
**Solution**:
- Ensure user is signed in before making API calls
- Check if session cookies are being sent
- Verify environment variables are correct

#### 3. "Failed to fetch clients" (Empty results)
**Cause**: RLS policies blocking access
**Solution**:
- Verify RLS policies are correctly set up
- Check that `advisor_id` matches `auth.uid()`
- Test with Supabase SQL editor

#### 4. "Database connection failed"
**Cause**: Environment variables or network issues
**Solution**:
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check Supabase project status
- Test connection with health endpoint

### Debug Mode

Enable debug logging by adding to your `.env.local`:

```bash
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true
```

This will enable detailed logging in:
- Browser console (auth state changes)
- Server logs (API requests)
- Network tab (request/response details)

## Production Deployment

### 1. Environment Variables
Ensure all environment variables are set in your production environment:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Build & Deploy > Environment
- AWS/GCP: Use secrets manager

### 2. Security Considerations
- Never log sensitive tokens in production
- Use HTTPS only (automatically handled by Supabase)
- Regularly rotate service role keys
- Monitor authentication logs

### 3. Performance Optimization
- Enable caching for KPIs (5-minute TTL implemented)
- Use connection pooling in production
- Monitor database query performance

## Monitoring

### Key Metrics to Monitor
1. Authentication success/failure rates
2. Token refresh frequency
3. API endpoint response times
4. Database connection health
5. RLS policy violations (should be 0)

### Health Check Endpoint
Use `/api/health` for monitoring:
- Returns 200 for healthy system
- Returns 503 for unhealthy system
- Includes detailed status of all components

## Support

### Getting Help
1. Check the health endpoint first: `/api/health`
2. Review browser console for client-side errors
3. Check server logs for API errors
4. Verify environment variables are correct
5. Test RLS policies in Supabase SQL editor

### Common Commands
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL

# Test database connection
curl http://localhost:3000/api/health

# Clear browser storage (if session issues)
localStorage.clear();
```