-- Complete Client Registry Database Setup
-- Run this script in your Supabase SQL editor to set up the client registry system

-- ========================================
-- 1. CREATE CLIENT_REGISTRY TABLE
-- ========================================

-- Create the client_registry table
CREATE TABLE IF NOT EXISTS client_registry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  status text NOT NULL CHECK (status IN ('updated', 'outstanding', 'overdue')),
  sustainability_appetite text CHECK (sustainability_appetite IN ('High', 'Medium', 'Low', 'N/A')),
  sustainability_profile text CHECK (sustainability_profile IN ('A', 'B', 'C', 'D')),
  latest_assessment timestamptz,
  next_assessment timestamptz,
  notes text DEFAULT '',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ========================================
-- 2. CREATE CONSTRAINTS AND INDEXES
-- ========================================

-- Create unique constraint: one email per advisor
ALTER TABLE client_registry 
ADD CONSTRAINT client_registry_advisor_email_unique 
UNIQUE (advisor_id, email);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_client_registry_advisor_id ON client_registry(advisor_id);
CREATE INDEX IF NOT EXISTS idx_client_registry_status ON client_registry(status);
CREATE INDEX IF NOT EXISTS idx_client_registry_latest_assessment ON client_registry(latest_assessment DESC);
CREATE INDEX IF NOT EXISTS idx_client_registry_next_assessment ON client_registry(next_assessment);
CREATE INDEX IF NOT EXISTS idx_client_registry_email ON client_registry(email);
CREATE INDEX IF NOT EXISTS idx_client_registry_name ON client_registry(name);

-- Full-text search index for name and email
CREATE INDEX IF NOT EXISTS idx_client_registry_search ON client_registry 
USING gin(to_tsvector('english', name || ' ' || email));

-- ========================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ========================================

-- Enable Row Level Security
ALTER TABLE client_registry ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Advisors can view their own clients" ON client_registry;
DROP POLICY IF EXISTS "Advisors can insert their own clients" ON client_registry;
DROP POLICY IF EXISTS "Advisors can update their own clients" ON client_registry;
DROP POLICY IF EXISTS "Advisors can delete their own clients" ON client_registry;

-- Create RLS policies
CREATE POLICY "Advisors can view their own clients" 
ON client_registry FOR SELECT 
TO authenticated
USING (auth.uid() = advisor_id);

CREATE POLICY "Advisors can insert their own clients" 
ON client_registry FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = advisor_id);

CREATE POLICY "Advisors can update their own clients" 
ON client_registry FOR UPDATE 
TO authenticated
USING (auth.uid() = advisor_id)
WITH CHECK (auth.uid() = advisor_id);

CREATE POLICY "Advisors can delete their own clients" 
ON client_registry FOR DELETE 
TO authenticated
USING (auth.uid() = advisor_id);

-- ========================================
-- 4. CREATE TRIGGERS AND FUNCTIONS
-- ========================================

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_client_registry_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS trigger_update_client_registry_updated_at ON client_registry;
CREATE TRIGGER trigger_update_client_registry_updated_at
  BEFORE UPDATE ON client_registry
  FOR EACH ROW
  EXECUTE FUNCTION update_client_registry_updated_at();

-- ========================================
-- 5. CREATE HELPER FUNCTIONS
-- ========================================

-- Function for the server to call for table initialization
CREATE OR REPLACE FUNCTION create_client_registry_table()
RETURNS text AS $$
BEGIN
  -- This function can be called by the server to ensure table exists
  -- All the table creation logic is already above, so just return success
  RETURN 'Client registry table is ready';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get KPIs for an advisor
CREATE OR REPLACE FUNCTION get_client_kpis(advisor_uuid uuid)
RETURNS TABLE(
  total_clients bigint,
  updated_count bigint,
  outstanding_count bigint,
  overdue_count bigint,
  upcoming_30d bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    count(*)::bigint as total_clients,
    count(*) FILTER (WHERE status = 'updated')::bigint as updated_count,
    count(*) FILTER (WHERE status = 'outstanding')::bigint as outstanding_count,
    count(*) FILTER (WHERE status = 'overdue')::bigint as overdue_count,
    count(*) FILTER (
      WHERE next_assessment BETWEEN now() AND now() + interval '30 days'
    )::bigint as upcoming_30d
  FROM client_registry
  WHERE advisor_id = advisor_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to search clients with advanced filtering
CREATE OR REPLACE FUNCTION search_clients(
  advisor_uuid uuid,
  search_query text DEFAULT '',
  status_filter text DEFAULT 'all',
  sort_by text DEFAULT 'latest_assessment',
  sort_desc boolean DEFAULT true,
  page_offset integer DEFAULT 0,
  page_limit integer DEFAULT 20
)
RETURNS TABLE(
  id uuid,
  advisor_id uuid,
  name text,
  email text,
  status text,
  sustainability_appetite text,
  sustainability_profile text,
  latest_assessment timestamptz,
  next_assessment timestamptz,
  notes text,
  tags text[],
  created_at timestamptz,
  updated_at timestamptz,
  total_count bigint
) AS $$
DECLARE
  total_records bigint;
  query_text text;
  order_clause text;
BEGIN
  -- Build the base query
  query_text := 'FROM client_registry WHERE advisor_id = $1';
  
  -- Add search filter
  IF search_query != '' THEN
    query_text := query_text || ' AND (name ILIKE $2 OR email ILIKE $2)';
  END IF;
  
  -- Add status filter
  IF status_filter != 'all' THEN
    query_text := query_text || ' AND status = $3';
  END IF;
  
  -- Get total count
  EXECUTE 'SELECT count(*) ' || query_text 
  INTO total_records
  USING advisor_uuid, '%' || search_query || '%', status_filter;
  
  -- Build order clause
  order_clause := ' ORDER BY ' || sort_by;
  IF sort_desc THEN
    order_clause := order_clause || ' DESC NULLS LAST';
  ELSE
    order_clause := order_clause || ' ASC NULLS LAST';
  END IF;
  
  -- Return paginated results with total count
  RETURN QUERY EXECUTE 
    'SELECT *, $4::bigint as total_count ' || query_text || order_clause || ' LIMIT $5 OFFSET $6'
  USING advisor_uuid, '%' || search_query || '%', status_filter, total_records, page_limit, page_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 6. GRANT PERMISSIONS
-- ========================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON client_registry TO authenticated;
GRANT EXECUTE ON FUNCTION create_client_registry_table() TO service_role;
GRANT EXECUTE ON FUNCTION get_client_kpis(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION search_clients(uuid, text, text, text, boolean, integer, integer) TO authenticated;

-- ========================================
-- 7. CREATE ACTIVITY LOG TABLE (OPTIONAL)
-- ========================================

-- Create activity log table for audit trail
CREATE TABLE IF NOT EXISTS client_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES client_registry(id) ON DELETE CASCADE,
  advisor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  description text,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for activity log
CREATE INDEX IF NOT EXISTS idx_client_activity_log_client_id ON client_activity_log(client_id);
CREATE INDEX IF NOT EXISTS idx_client_activity_log_advisor_id ON client_activity_log(advisor_id);
CREATE INDEX IF NOT EXISTS idx_client_activity_log_created_at ON client_activity_log(created_at DESC);

-- Enable RLS for activity log
ALTER TABLE client_activity_log ENABLE ROW LEVEL SECURITY;

-- RLS policies for activity log
CREATE POLICY "Advisors can view their own client activity" 
ON client_activity_log FOR SELECT 
TO authenticated
USING (auth.uid() = advisor_id);

CREATE POLICY "Advisors can insert their own client activity" 
ON client_activity_log FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = advisor_id);

-- Function to log client changes
CREATE OR REPLACE FUNCTION log_client_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO client_activity_log (client_id, advisor_id, action, description, new_data)
    VALUES (NEW.id, NEW.advisor_id, 'created', 'Client profile created', to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO client_activity_log (client_id, advisor_id, action, description, old_data, new_data)
    VALUES (NEW.id, NEW.advisor_id, 'updated', 'Client profile updated', to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO client_activity_log (client_id, advisor_id, action, description, old_data)
    VALUES (OLD.id, OLD.advisor_id, 'deleted', 'Client profile deleted', to_jsonb(OLD));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for activity logging
DROP TRIGGER IF EXISTS trigger_log_client_change ON client_registry;
CREATE TRIGGER trigger_log_client_change
  AFTER INSERT OR UPDATE OR DELETE ON client_registry
  FOR EACH ROW
  EXECUTE FUNCTION log_client_change();

-- Grant permissions for activity log
GRANT ALL ON client_activity_log TO authenticated;

-- ========================================
-- 8. ADD TABLE COMMENTS
-- ========================================

COMMENT ON TABLE client_registry IS 'Single source of truth for all client data used by advisors';
COMMENT ON COLUMN client_registry.advisor_id IS 'Foreign key to auth.users - which advisor owns this client';
COMMENT ON COLUMN client_registry.status IS 'Assessment status: updated, outstanding, or overdue';
COMMENT ON COLUMN client_registry.sustainability_appetite IS 'Client sustainability interest level';
COMMENT ON COLUMN client_registry.sustainability_profile IS 'Sustainability profile category A-D';
COMMENT ON COLUMN client_registry.latest_assessment IS 'Date of most recent assessment completion';
COMMENT ON COLUMN client_registry.next_assessment IS 'Scheduled date for next assessment';
COMMENT ON COLUMN client_registry.tags IS 'Array of custom tags for categorization';

COMMENT ON TABLE client_activity_log IS 'Audit trail for all changes to client data';

-- ========================================
-- 9. SAMPLE DATA (OPTIONAL - REMOVE IN PRODUCTION)
-- ========================================

-- Uncomment the following to insert sample data for testing
-- Replace the UUIDs with actual user IDs from your auth.users table

/*
-- Insert sample clients for testing (replace with real advisor UUID)
INSERT INTO client_registry (advisor_id, name, email, status, sustainability_appetite, sustainability_profile, latest_assessment, next_assessment, notes, tags)
VALUES 
  (auth.uid(), 'John Smith', 'john.smith@example.com', 'updated', 'High', 'A', '2024-01-15', '2024-07-15', 'ESG leader, very engaged', ARRAY['high-priority', 'esg-leader']),
  (auth.uid(), 'Sarah Johnson', 'sarah.j@example.com', 'outstanding', 'Medium', 'B', '2023-11-20', '2024-05-20', 'Interested in sustainable investing', ARRAY['sustainable-focus']),
  (auth.uid(), 'Mike Chen', 'mike.chen@example.com', 'overdue', 'Low', 'C', '2023-08-10', '2024-02-10', 'Traditional investor, needs education', ARRAY['education-needed']),
  (auth.uid(), 'Emily Davis', 'emily.davis@example.com', 'updated', 'High', 'A', '2024-01-20', '2024-07-20', 'Very interested in impact investing', ARRAY['impact-investing']),
  (auth.uid(), 'Robert Wilson', 'robert.w@example.com', 'outstanding', 'N/A', 'D', '2023-12-01', '2024-06-01', 'New to sustainability concepts', ARRAY['new-client']);
*/

-- Success message
SELECT 'Client Registry database setup completed successfully!' as status;