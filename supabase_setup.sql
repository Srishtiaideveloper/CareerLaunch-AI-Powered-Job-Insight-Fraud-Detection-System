-- ============================================
-- CareerIQ Supabase Database Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- Table: Resume Analyses
CREATE TABLE analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  total_skills INTEGER DEFAULT 0,
  best_role TEXT,
  best_score INTEGER DEFAULT 0,
  faang_score INTEGER DEFAULT 0,
  resume_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: User Activities
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  activity_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Allow public read/write (safe because anon key is used)
CREATE POLICY "Allow all read" ON analyses FOR SELECT USING (true);
CREATE POLICY "Allow all insert" ON analyses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all read" ON activities FOR SELECT USING (true);
CREATE POLICY "Allow all insert" ON activities FOR INSERT WITH CHECK (true);
