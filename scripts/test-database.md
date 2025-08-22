# Database Connection Test

## Quick Test Script

To verify that your database is properly set up and the authentication is working, you can run this simple test:

### Method 1: Using the Health Check Endpoint

1. Start your development server:
```bash
npm run dev
```

2. Visit the health check endpoint:
```
http://localhost:3000/api/health
```

3. You should see a response like:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-10T10:30:00.000Z",
  "checks": {
    "database": {
      "status": "healthy",
      "message": "Database connection successful"
    },
    "auth": {
      "status": "anonymous",
      "message": "No authenticated user (this is normal for anonymous requests)"
    },
    "configuration": {
      "status": "healthy",
      "message": "Supabase configuration loaded successfully",
      "project_id": "cvqqvvpukxgoadiuqtvp"
    },
    "database_setup": {
      "status": "healthy",
      "message": "Database schema is properly set up"
    }
  }
}
```

### Method 2: Test the Initialize Endpoint

If the health check shows database setup issues, try the initialize endpoint:

```bash
curl http://localhost:3000/functions/v1/make-server-28a049d0/init
```

This should return:
```json
{
  "success": true,
  "message": "Client registry table exists and is ready"
}
```

### Method 3: Manual Database Verification

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/cvqqvvpukxgoadiuqtvp
2. Navigate to the SQL Editor
3. Run this query:

```sql
-- Check if table exists
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_name = 'client_registry';

-- Check table structure
\d client_registry;

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'client_registry';

-- Check if initialization function exists
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'create_client_registry_table';
```

## Expected Results

### Healthy System
- Health check returns status "healthy"
- All checks pass
- Database setup check shows "healthy"
- No errors in console

### Common Issues and Solutions

#### Issue: "client_registry table does not exist"
**Solution**: Run the database setup script
1. Copy contents of `/database-setup.sql`
2. Paste and execute in Supabase SQL Editor

#### Issue: "Multiple GoTrueClient instances detected"
**Solution**: This should be fixed now with the consolidated client
- Clear browser cache and localStorage
- Restart development server

#### Issue: "function create_client_registry_table does not exist"
**Solution**: 
- Run the complete database setup script
- The function is defined in `/database-setup.sql` lines 106-113

#### Issue: Authentication errors
**Solution**:
- Ensure SUPABASE_SERVICE_ROLE_KEY is set in environment
- Check that the service role key is correct
- Verify user is properly signed in

## Testing Authentication Flow

1. Sign up for a new account in the app
2. Check that you can access the dashboard
3. Verify that the health check shows "authenticated" status when signed in
4. Test creating a client to ensure RLS is working

## Debugging Steps

If issues persist:

1. Check browser console for errors
2. Check server logs for authentication errors
3. Verify Supabase project settings
4. Ensure environment variables are correct
5. Test with a fresh incognito browser session

The health check endpoint at `/api/health` is the best way to diagnose issues as it tests all components of the system.