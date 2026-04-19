-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'teacher', 'school');
CREATE TYPE public.session_status AS ENUM ('scheduled', 'completed', 'missed', 'cancelled');

-- ============================================================
-- TIMESTAMP TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- USER ROLES (separate table — security best practice)
-- ============================================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer to check roles without RLS recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

-- ============================================================
-- SCHOOLS
-- ============================================================
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  village TEXT,
  cluster TEXT,
  district TEXT DEFAULT 'Dharampur',
  state TEXT DEFAULT 'Gujarat',
  num_students INTEGER NOT NULL DEFAULT 0,
  contact_person TEXT,
  contact_phone TEXT,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  notes TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- optional school login
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_schools_updated_at BEFORE UPDATE ON public.schools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_schools_village ON public.schools(village);
CREATE INDEX idx_schools_district ON public.schools(district);

-- ============================================================
-- TEACHERS
-- ============================================================
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  employee_code TEXT UNIQUE,
  date_joined DATE,
  base_village TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_teachers_updated_at BEFORE UPDATE ON public.teachers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- PROGRAMS
-- ============================================================
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_programs_updated_at BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- PROGRAM MODULES
-- ============================================================
CREATE TABLE public.program_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sequence INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER DEFAULT 60,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.program_modules ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_program_modules_updated_at BEFORE UPDATE ON public.program_modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_program_modules_program ON public.program_modules(program_id);

-- ============================================================
-- LEARNING OUTCOMES
-- ============================================================
CREATE TABLE public.learning_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.program_modules(id) ON DELETE CASCADE,
  outcome TEXT NOT NULL,
  sequence INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.learning_outcomes ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_outcomes_module ON public.learning_outcomes(module_id);

-- ============================================================
-- TEACHER ASSIGNMENTS  (which teacher serves which school for which program)
-- ============================================================
CREATE TABLE public.teacher_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  start_date DATE,
  end_date DATE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (teacher_id, school_id, program_id)
);
ALTER TABLE public.teacher_assignments ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_assignments_teacher ON public.teacher_assignments(teacher_id);
CREATE INDEX idx_assignments_school ON public.teacher_assignments(school_id);

-- ============================================================
-- STUDENTS
-- ============================================================
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  gender TEXT,
  age INTEGER,
  grade TEXT,
  guardian_name TEXT,
  guardian_phone TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_students_updated_at BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_students_school ON public.students(school_id);

-- ============================================================
-- SESSIONS
-- ============================================================
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  module_id UUID REFERENCES public.program_modules(id) ON DELETE SET NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  status public.session_status NOT NULL DEFAULT 'scheduled',
  students_present INTEGER DEFAULT 0,
  duration_minutes INTEGER,
  check_in_at TIMESTAMPTZ,
  check_in_lat NUMERIC(10, 7),
  check_in_lng NUMERIC(10, 7),
  photo_url TEXT,
  summary TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_sessions_updated_at BEFORE UPDATE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_sessions_school ON public.sessions(school_id);
CREATE INDEX idx_sessions_teacher ON public.sessions(teacher_id);
CREATE INDEX idx_sessions_date ON public.sessions(scheduled_date);
CREATE INDEX idx_sessions_program ON public.sessions(program_id);

-- ============================================================
-- ATTENDANCE
-- ============================================================
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  present BOOLEAN NOT NULL DEFAULT true,
  skill_rating INTEGER CHECK (skill_rating BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id, student_id)
);
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_attendance_session ON public.attendance(session_id);
CREATE INDEX idx_attendance_student ON public.attendance(student_id);

-- ============================================================
-- HELPER: is admin or manager
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin_or_manager(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'manager')
  );
$$;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- profiles: users see their own; admins see all
CREATE POLICY "Users view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins manage all profiles" ON public.profiles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- user_roles: only admins can view/manage; users can see their own roles
CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- schools: any authenticated user can read; admins/managers manage
CREATE POLICY "Authenticated read schools" ON public.schools
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage schools" ON public.schools
  FOR ALL USING (public.is_admin_or_manager(auth.uid()));

-- teachers: any authenticated read; admins/managers manage
CREATE POLICY "Authenticated read teachers" ON public.teachers
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage teachers" ON public.teachers
  FOR ALL USING (public.is_admin_or_manager(auth.uid()));

-- programs: anyone authenticated reads; admins manage
CREATE POLICY "Authenticated read programs" ON public.programs
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage programs" ON public.programs
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- modules / outcomes: same as programs
CREATE POLICY "Authenticated read modules" ON public.program_modules
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage modules" ON public.program_modules
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated read outcomes" ON public.learning_outcomes
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage outcomes" ON public.learning_outcomes
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- teacher_assignments
CREATE POLICY "Authenticated read assignments" ON public.teacher_assignments
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage assignments" ON public.teacher_assignments
  FOR ALL USING (public.is_admin_or_manager(auth.uid()));

-- students
CREATE POLICY "Authenticated read students" ON public.students
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage students" ON public.students
  FOR ALL USING (public.is_admin_or_manager(auth.uid()));

-- sessions
CREATE POLICY "Authenticated read sessions" ON public.sessions
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage sessions" ON public.sessions
  FOR ALL USING (public.is_admin_or_manager(auth.uid()));
CREATE POLICY "Teachers create their sessions" ON public.sessions
  FOR INSERT TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'teacher')
    AND EXISTS (SELECT 1 FROM public.teachers t WHERE t.id = teacher_id AND t.user_id = auth.uid())
  );
CREATE POLICY "Teachers update their sessions" ON public.sessions
  FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), 'teacher')
    AND EXISTS (SELECT 1 FROM public.teachers t WHERE t.id = sessions.teacher_id AND t.user_id = auth.uid())
  );

-- attendance
CREATE POLICY "Authenticated read attendance" ON public.attendance
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage attendance" ON public.attendance
  FOR ALL USING (public.is_admin_or_manager(auth.uid()));
CREATE POLICY "Teachers manage their attendance" ON public.attendance
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.sessions s
      JOIN public.teachers t ON t.id = s.teacher_id
      WHERE s.id = attendance.session_id AND t.user_id = auth.uid()
    )
  );

-- ============================================================
-- AUTO-CREATE PROFILE + FIRST USER = ADMIN
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );

  -- Promote first user to admin
  SELECT COUNT(*) INTO user_count FROM auth.users;
  IF user_count = 1 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('session-photos', 'session-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read session photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'session-photos');
CREATE POLICY "Authenticated upload session photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'session-photos');
CREATE POLICY "Authenticated update own session photos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'session-photos' AND auth.uid()::text = (storage.foldername(name))[1]);