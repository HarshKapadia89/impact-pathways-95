
-- Colleges directory (public read & write since auth is removed)
CREATE TABLE public.colleges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text,
  district text,
  state text NOT NULL DEFAULT 'Gujarat',
  type text, -- Government / Private / Aided / Autonomous
  affiliation text, -- e.g. Gujarat University, GTU, MSU
  established integer,
  streams text[] DEFAULT '{}', -- science, commerce, humanities, engineering, medical, law, design, management, vocational
  courses text[] DEFAULT '{}', -- e.g. B.Sc, BBA, B.Tech (CS)
  entrance_exams text[] DEFAULT '{}', -- e.g. JEE, NEET, GUJCET, CLAT, CUET
  fees_range text,
  hostel boolean DEFAULT false,
  scholarships boolean DEFAULT false,
  website text,
  contact_phone text,
  contact_email text,
  address text,
  latitude numeric,
  longitude numeric,
  notes text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX colleges_streams_idx ON public.colleges USING GIN (streams);
CREATE INDEX colleges_city_idx ON public.colleges (city);
CREATE INDEX colleges_district_idx ON public.colleges (district);
CREATE INDEX colleges_name_idx ON public.colleges (name);

ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access" ON public.colleges
  FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER update_colleges_updated_at
  BEFORE UPDATE ON public.colleges
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Optional: store completed psychometric test results (anonymous, public read & write)
CREATE TABLE public.psychometric_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text,
  grade text,
  age integer,
  language text DEFAULT 'en',
  riasec jsonb DEFAULT '{}'::jsonb,
  multiple_intelligences jsonb DEFAULT '{}'::jsonb,
  aptitude jsonb DEFAULT '{}'::jsonb,
  recommended_streams text[] DEFAULT '{}',
  recommended_careers text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.psychometric_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access" ON public.psychometric_results
  FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
