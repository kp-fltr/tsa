# Database Initialization Instructions

## Overview
The TSA Advisor application requires a properly configured Supabase database with the `client_registry` table and related functions.

## Steps to Initialize

### 1. Access Supabase SQL Editor
1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/cvqqvvpukxgoadiuqtvp
2. Navigate to the SQL Editor (icon looks like `</>`)
3. Create a new query

### 2. Run the Database Setup Script
Copy and paste the entire contents of `/database-setup.sql` into the SQL editor and execute it.

This script will:
- Create the `client_registry` table with proper constraints
- Set up Row Level Security (RLS) policies
- Create indexes for performance
- Add helper functions
- Set up activity logging (optional)

### 3. Verify Setup
After running the script, you can verify the setup by running:

```sql
-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'client_registry';

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'client_registry';

-- Check if the initialization function exists
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name = 'create_client_registry_table';

-- Test a simple query (should return 0 rows initially)
SELECT COUNT(*) FROM client_registry;
```

### 4. Test Authentication
After setup, test that authentication is working:

1. Sign up/Sign in through the application
2. Visit `/api/health` to check system status
3. The health check should show all systems as "healthy"

## Troubleshooting

### Error: "relation 'client_registry' does not exist"
- **Cause**: Database setup script hasn't been run
- **Solution**: Execute the `/database-setup.sql` script in Supabase SQL editor

### Error: "function 'create_client_registry_table' does not exist"
- **Cause**: Database setup script hasn't been run completely
- **Solution**: Re-run the complete `/database-setup.sql` script

### Error: "Multiple GoTrueClient instances detected"
- **Cause**: Multiple Supabase client instances in the application
- **Solution**: This has been fixed by consolidating to a single client instance

## Environment Variables

Only one server-side environment variable is required:

```bash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

You can find this key in:
1. Supabase Dashboard → Settings → API
2. Copy the "service_role" key (⚠️ Keep this secret!)
3. Add it to your deployment environment variables

## Verification Commands

Test the health endpoint to verify everything is working:

```bash
# Local development
curl http://localhost:3000/api/health

# Production
curl https://your-app-domain.com/api/health
```

The response should show all checks as "healthy".