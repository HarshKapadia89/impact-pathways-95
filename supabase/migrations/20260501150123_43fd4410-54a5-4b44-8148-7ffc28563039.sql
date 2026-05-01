ALTER TABLE public.psychometric_submissions
  ADD COLUMN IF NOT EXISTS school_name text,
  ADD COLUMN IF NOT EXISTS mobile text,
  ADD COLUMN IF NOT EXISTS email text;

ALTER TABLE public.psychometric_results
  ADD COLUMN IF NOT EXISTS school_name text,
  ADD COLUMN IF NOT EXISTS mobile text,
  ADD COLUMN IF NOT EXISTS email text;