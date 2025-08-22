-- Initialize the client_registry table with proper structure, constraints, and RLS

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

-- Create function for the server to call for table initialization
CREATE OR REPLACE FUNCTION create_client_registry_table()
RETURNS text AS $$
BEGIN
  -- This function can be called by the server to ensure table exists
  -- All the table creation logic is already above, so just return success
  RETURN 'Client registry table is ready';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON client_registry TO authenticated;
GRANT EXECUTE ON FUNCTION create_client_registry_table() TO service_role;

-- Insert some sample data for testing (optional - remove in production)
-- INSERT INTO client_registry (advisor_id, name, email, status, sustainability_appetite, sustainability_profile, latest_assessment, next_assessment, notes)
-- VALUES 
--   (auth.uid(), 'John Smith', 'john.smith@example.com', 'updated', 'High', 'A', '2024-01-15', '2024-07-15', 'ESG leader, very engaged'),
--   (auth.uid(), 'Sarah Johnson', 'sarah.j@example.com', 'outstanding', 'Medium', 'B', '2023-11-20', '2024-05-20', 'Interested in sustainable investing'),
--   (auth.uid(), 'Mike Chen', 'mike.chen@example.com', 'overdue', 'Low', 'C', '2023-08-10', '2024-02-10', 'Traditional investor, needs education');

COMMENT ON TABLE client_registry IS 'Single source of truth for all client data used by advisors';
COMMENT ON COLUMN client_registry.advisor_id IS 'Foreign key to auth.users - which advisor owns this client';
COMMENT ON COLUMN client_registry.status IS 'Assessment status: updated, outstanding, or overdue';
COMMENT ON COLUMN client_registry.sustainability_appetite IS 'Client sustainability interest level';
COMMENT ON COLUMN client_registry.sustainability_profile IS 'Sustainability profile category A-D';
COMMENT ON COLUMN client_registry.latest_assessment IS 'Date of most recent assessment completion';
COMMENT ON COLUMN client_registry.next_assessment IS 'Scheduled date for next assessment';
COMMENT ON COLUMN client_registry.tags IS 'Array of custom tags for categorization';