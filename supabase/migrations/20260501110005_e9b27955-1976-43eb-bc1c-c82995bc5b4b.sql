-- Offline-friendly submissions table that students' devices sync to when back online.
-- Uses a client-generated UUID as the primary key for idempotent upsert.
CREATE TABLE IF NOT EXISTS public.psychometric_submissions (
  id uuid PRIMARY KEY,
  student_name text,
  grade text,
  age integer,
  language text DEFAULT 'en',
  riasec jsonb DEFAULT '{}'::jsonb,
  riasec_top text[] DEFAULT '{}',
  multiple_intelligences jsonb DEFAULT '{}'::jsonb,
  mi_top text[] DEFAULT '{}',
  aptitude jsonb DEFAULT '{}'::jsonb,
  aptitude_top text[] DEFAULT '{}',
  recommended_streams text[] DEFAULT '{}',
  recommended_careers text[] DEFAULT '{}',
  taken_at timestamptz NOT NULL DEFAULT now(),
  device_id text,
  app_version text,
  synced_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.psychometric_submissions ENABLE ROW LEVEL SECURITY;

-- Public insert/select to support anonymous student devices syncing offline tests.
-- Matches the existing psychometric_results policy pattern in this project.
CREATE POLICY "Public can insert submissions"
  ON public.psychometric_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can read submissions"
  ON public.psychometric_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS psychometric_submissions_taken_at_idx
  ON public.psychometric_submissions (taken_at DESC);
