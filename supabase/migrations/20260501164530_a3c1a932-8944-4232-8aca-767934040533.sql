
ALTER TABLE public.psychometric_results
  ADD COLUMN IF NOT EXISTS report_token TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS parent_email TEXT,
  ADD COLUMN IF NOT EXISTS counsellor_note TEXT,
  ADD COLUMN IF NOT EXISTS emailed_at TIMESTAMPTZ;

ALTER TABLE public.psychometric_submissions
  ADD COLUMN IF NOT EXISTS report_token TEXT,
  ADD COLUMN IF NOT EXISTS parent_email TEXT;

CREATE INDEX IF NOT EXISTS idx_psychometric_results_report_token
  ON public.psychometric_results(report_token);
CREATE INDEX IF NOT EXISTS idx_psychometric_submissions_report_token
  ON public.psychometric_submissions(report_token);
