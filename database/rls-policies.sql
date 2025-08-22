-- Row Level Security (RLS) Policies for client_registry table
-- Run this script in your Supabase SQL editor

-- First, ensure RLS is enabled on the client_registry table
ALTER TABLE client_registry ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for updates)
DROP POLICY IF EXISTS "Users can view their own clients" ON client_registry;
DROP POLICY IF EXISTS "Users can insert their own clients" ON client_registry;
DROP POLICY IF EXISTS "Users can update their own clients" ON client_registry;
DROP POLICY IF EXISTS "Users can delete their own clients" ON client_registry;

-- 1. SELECT Policy: Users can only view their own clients
CREATE POLICY "Users can view their own clients" 
ON client_registry FOR SELECT 
TO authenticated
USING (auth.uid() = advisor_id);

-- 2. INSERT Policy: Users can only insert clients for themselves
CREATE POLICY "Users can insert their own clients" 
ON client_registry FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = advisor_id);

-- 3. UPDATE Policy: Users can only update their own clients
CREATE POLICY "Users can update their own clients" 
ON client_registry FOR UPDATE 
TO authenticated
USING (auth.uid() = advisor_id)
WITH CHECK (auth.uid() = advisor_id);

-- 4. DELETE Policy: Users can only delete their own clients
CREATE POLICY "Users can delete their own clients" 
ON client_registry FOR DELETE 
TO authenticated
USING (auth.uid() = advisor_id);

-- Test policies by creating some sample data and testing access
-- Replace 'YOUR_USER_ID_HERE' with an actual user ID from auth.users

/*
-- Sample test data (uncomment to use)
INSERT INTO client_registry (advisor_id, name, email, status, sustainability_appetite, sustainability_profile, latest_assessment, next_assessment, notes)
VALUES 
  ('YOUR_USER_ID_HERE', 'Test Client 1', 'test1@example.com', 'updated', 'High', 'A', '2024-01-15', '2024-07-15', 'Test client for RLS'),
  ('YOUR_USER_ID_HERE', 'Test Client 2', 'test2@example.com', 'outstanding', 'Medium', 'B', '2023-11-20', '2024-05-20', 'Another test client');

-- Test queries to verify RLS is working:
-- 1. This should return only the user's own clients:
SELECT * FROM client_registry WHERE advisor_id = auth.uid();

-- 2. This should return the same results as above (RLS enforces the filter):
SELECT * FROM client_registry;

-- 3. This should return 0 rows (trying to access another user's data):
SELECT * FROM client_registry WHERE advisor_id != auth.uid();
*/

-- Additional security: Ensure anonymous users cannot access the table
-- (This should already be covered by the authenticated requirement, but being explicit)
DROP POLICY IF EXISTS "Deny anonymous access" ON client_registry;
CREATE POLICY "Deny anonymous access" 
ON client_registry FOR ALL 
TO anon
USING (false);

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON client_registry TO authenticated;

-- Ensure the table owner has full access (for admin operations)
GRANT ALL ON client_registry TO postgres;

-- Add indexes for performance (if not already created)
CREATE INDEX IF NOT EXISTS idx_client_registry_advisor_id ON client_registry(advisor_id);
CREATE INDEX IF NOT EXISTS idx_client_registry_status ON client_registry(status);
CREATE INDEX IF NOT EXISTS idx_client_registry_latest_assessment ON client_registry(latest_assessment DESC);
CREATE INDEX IF NOT EXISTS idx_client_registry_next_assessment ON client_registry(next_assessment);
CREATE INDEX IF NOT EXISTS idx_client_registry_email ON client_registry(email);

-- Verify RLS is working with this query (run as a test user):
-- This should only return data for the authenticated user
SELECT 
  COUNT(*) as total_accessible_clients,
  advisor_id,
  (advisor_id = auth.uid()) as is_own_data
FROM client_registry 
GROUP BY advisor_id;

COMMENT ON POLICY "Users can view their own clients" ON client_registry IS 'Allows authenticated users to view only their own client records';
COMMENT ON POLICY "Users can insert their own clients" ON client_registry IS 'Allows authenticated users to create new client records for themselves';
COMMENT ON POLICY "Users can update their own clients" ON client_registry IS 'Allows authenticated users to update only their own client records';
COMMENT ON POLICY "Users can delete their own clients" ON client_registry IS 'Allows authenticated users to delete only their own client records';
COMMENT ON POLICY "Deny anonymous access" ON client_registry IS 'Explicitly denies all access to anonymous users';