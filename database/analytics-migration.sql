-- Analytics Migration SQL
-- Run this after the existing client_registry table setup

-- 1. Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES client_registry(id) ON DELETE CASCADE,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  profile TEXT CHECK (profile IN ('A', 'B', 'C', 'D', 'E')),
  appetite TEXT CHECK (appetite IN ('High', 'Medium', 'Low', 'N/A')),
  status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES client_registry(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  storage_path TEXT NOT NULL,
  format TEXT NOT NULL DEFAULT 'pdf' CHECK (format IN ('pdf', 'docx', 'html')),
  file_size_bytes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create quota_packages table
CREATE TABLE IF NOT EXISTS quota_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  allowance INTEGER NOT NULL DEFAULT 0,
  used INTEGER NOT NULL DEFAULT 0,
  package_type TEXT NOT NULL DEFAULT 'monthly' CHECK (package_type IN ('monthly', 'quarterly', 'annual', 'unlimited')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT quota_packages_period_check CHECK (period_end > period_start),
  CONSTRAINT quota_packages_usage_check CHECK (used <= allowance OR allowance = -1) -- -1 means unlimited
);

-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_assessments_advisor_id ON assessments(advisor_id);
CREATE INDEX IF NOT EXISTS idx_assessments_client_id ON assessments(client_id);
CREATE INDEX IF NOT EXISTS idx_assessments_requested_at ON assessments(requested_at);
CREATE INDEX IF NOT EXISTS idx_assessments_completed_at ON assessments(completed_at);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);

CREATE INDEX IF NOT EXISTS idx_reports_advisor_id ON reports(advisor_id);
CREATE INDEX IF NOT EXISTS idx_reports_client_id ON reports(client_id);
CREATE INDEX IF NOT EXISTS idx_reports_assessment_id ON reports(assessment_id);
CREATE INDEX IF NOT EXISTS idx_reports_generated_at ON reports(generated_at);

CREATE INDEX IF NOT EXISTS idx_quota_packages_advisor_id ON quota_packages(advisor_id);
CREATE INDEX IF NOT EXISTS idx_quota_packages_period ON quota_packages(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_quota_packages_active ON quota_packages(is_active);

-- Text search indexes for client registry (for reports search)
CREATE INDEX IF NOT EXISTS idx_client_registry_name_search ON client_registry USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_client_registry_email_search ON client_registry USING gin(to_tsvector('english', email));

-- 5. Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE quota_packages ENABLE ROW LEVEL SECURITY;

-- Assessments RLS Policies
CREATE POLICY "Users can view own assessments" ON assessments
  FOR SELECT USING (auth.uid() = advisor_id);

CREATE POLICY "Users can insert own assessments" ON assessments
  FOR INSERT WITH CHECK (auth.uid() = advisor_id);

CREATE POLICY "Users can update own assessments" ON assessments
  FOR UPDATE USING (auth.uid() = advisor_id);

CREATE POLICY "Users can delete own assessments" ON assessments
  FOR DELETE USING (auth.uid() = advisor_id);

-- Reports RLS Policies
CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = advisor_id);

CREATE POLICY "Users can insert own reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = advisor_id);

CREATE POLICY "Users can update own reports" ON reports
  FOR UPDATE USING (auth.uid() = advisor_id);

CREATE POLICY "Users can delete own reports" ON reports
  FOR DELETE USING (auth.uid() = advisor_id);

-- Quota Packages RLS Policies
CREATE POLICY "Users can view own quota packages" ON quota_packages
  FOR SELECT USING (auth.uid() = advisor_id);

CREATE POLICY "Users can insert own quota packages" ON quota_packages
  FOR INSERT WITH CHECK (auth.uid() = advisor_id);

CREATE POLICY "Users can update own quota packages" ON quota_packages
  FOR UPDATE USING (auth.uid() = advisor_id);

CREATE POLICY "Users can delete own quota packages" ON quota_packages
  FOR DELETE USING (auth.uid() = advisor_id);

-- 6. Create Analytics Views

-- FA Analytics View - Per-day sums of requested/completed assessments
CREATE OR REPLACE VIEW vw_fa_analytics AS
SELECT 
  advisor_id,
  DATE(requested_at) as assessment_date,
  COUNT(*) as tests_requested,
  COUNT(completed_at) as reports_produced,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_assessments,
  COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_assessments,
  COUNT(CASE WHEN status = 'requested' THEN 1 END) as pending_assessments
FROM assessments
GROUP BY advisor_id, DATE(requested_at)
ORDER BY advisor_id, assessment_date DESC;

-- FA Distribution View - Buckets for profile/appetite by advisor
CREATE OR REPLACE VIEW vw_fa_distribution AS
WITH profile_dist AS (
  SELECT 
    advisor_id,
    'profile' as dimension,
    COALESCE(profile, 'Unknown') as bucket,
    COUNT(*) as count
  FROM assessments 
  WHERE completed_at IS NOT NULL
  GROUP BY advisor_id, profile
),
appetite_dist AS (
  SELECT 
    advisor_id,
    'appetite' as dimension,
    COALESCE(appetite, 'N/A') as bucket,
    COUNT(*) as count
  FROM assessments 
  WHERE completed_at IS NOT NULL
  GROUP BY advisor_id, appetite
)
SELECT * FROM profile_dist
UNION ALL
SELECT * FROM appetite_dist
ORDER BY advisor_id, dimension, bucket;

-- Global Distribution View - Aggregate buckets across all advisors (admin-safe, no PII)
CREATE OR REPLACE VIEW vw_global_distribution AS
WITH profile_dist AS (
  SELECT 
    'profile' as dimension,
    COALESCE(profile, 'Unknown') as bucket,
    COUNT(*) as count
  FROM assessments 
  WHERE completed_at IS NOT NULL
  GROUP BY profile
),
appetite_dist AS (
  SELECT 
    'appetite' as dimension,
    COALESCE(appetite, 'N/A') as bucket,
    COUNT(*) as count
  FROM assessments 
  WHERE completed_at IS NOT NULL
  GROUP BY appetite
)
SELECT * FROM profile_dist
UNION ALL
SELECT * FROM appetite_dist
ORDER BY dimension, bucket;

-- FA Quota View - Remaining allowance for active package
CREATE OR REPLACE VIEW vw_fa_quota AS
SELECT 
  advisor_id,
  allowance,
  used,
  CASE 
    WHEN allowance = -1 THEN -1 -- Unlimited
    ELSE allowance - used 
  END as remaining,
  package_type,
  period_start,
  period_end,
  CASE 
    WHEN allowance = -1 THEN 'Unlimited'
    WHEN (allowance - used) <= 0 THEN 'Exceeded'
    WHEN (allowance - used) <= 5 THEN 'Low'
    ELSE 'Available'
  END as status
FROM quota_packages
WHERE is_active = true 
  AND period_start <= CURRENT_DATE 
  AND period_end >= CURRENT_DATE;

-- 7. Update triggers for maintaining data consistency

-- Update function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quota_packages_updated_at BEFORE UPDATE ON quota_packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-update quota usage when assessments are completed
CREATE OR REPLACE FUNCTION update_quota_usage()
RETURNS TRIGGER AS $$
BEGIN
    -- Only update when assessment is completed (status changes to 'completed')
    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
        UPDATE quota_packages 
        SET used = used + 1,
            updated_at = NOW()
        WHERE advisor_id = NEW.advisor_id 
          AND is_active = true 
          AND period_start <= CURRENT_DATE 
          AND period_end >= CURRENT_DATE;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for quota usage tracking
CREATE TRIGGER update_quota_on_assessment_completion 
    AFTER UPDATE ON assessments
    FOR EACH ROW EXECUTE FUNCTION update_quota_usage();

-- 8. Insert some sample data for testing (remove in production)
-- This will be handled by demo mode service instead

COMMENT ON TABLE assessments IS 'TSA assessment requests and completions';
COMMENT ON TABLE reports IS 'Generated TSA reports with file storage references';
COMMENT ON TABLE quota_packages IS 'Advisor test allowance packages and usage tracking';
COMMENT ON VIEW vw_fa_analytics IS 'Per-advisor daily analytics aggregates';
COMMENT ON VIEW vw_fa_distribution IS 'Per-advisor sustainability profile and appetite distributions';
COMMENT ON VIEW vw_global_distribution IS 'Global sustainability distributions (admin-safe aggregates)';
COMMENT ON VIEW vw_fa_quota IS 'Per-advisor current quota package status and remaining allowance';