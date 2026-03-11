-- Create entity_type enum
CREATE TYPE entity_type AS ENUM ('pfa', 'srl');

-- Create fiscal_profiles table
CREATE TABLE fiscal_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type entity_type NOT NULL,
  regime TEXT NOT NULL CHECK (regime IN ('norma_venit', 'sistem_real', 'micro_1', 'micro_3')),
  tva_status BOOLEAN NOT NULL DEFAULT FALSE,
  caen_code TEXT NOT NULL,
  caen_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE fiscal_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can select own profile"
  ON fiscal_profiles
  FOR SELECT
  USING (id = auth.uid());

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON fiscal_profiles
  FOR INSERT
  WITH CHECK (id = auth.uid());

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON fiscal_profiles
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- No DELETE policy: profiles are never deleted by users

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_fiscal_profiles_updated_at
  BEFORE UPDATE ON fiscal_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
