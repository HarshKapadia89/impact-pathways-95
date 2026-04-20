
-- ============================================================
-- FULLY OPEN ACCESS — anonymous + authenticated can do anything
-- ============================================================

-- Helper to drop every existing policy on a table cleanly
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'schools','teachers','students','sessions','attendance',
        'programs','program_modules','learning_outcomes',
        'teacher_assignments','profiles','user_roles'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- Re-create one fully-open policy per table for both anon and authenticated roles
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'schools','teachers','students','sessions','attendance',
    'programs','program_modules','learning_outcomes',
    'teacher_assignments','profiles','user_roles'
  ]
  LOOP
    EXECUTE format(
      'CREATE POLICY "Public full access" ON public.%I FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)',
      t
    );
  END LOOP;
END $$;

-- ============================================================
-- Storage: session-photos bucket open to everyone
-- ============================================================
UPDATE storage.buckets SET public = true WHERE id = 'session-photos';

-- Drop existing storage policies on session-photos (if any)
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
  LOOP
    -- Only drop if it references session-photos to avoid wiping unrelated buckets
    IF EXISTS (
      SELECT 1 FROM pg_policies p
      WHERE p.schemaname = 'storage' AND p.tablename = 'objects'
        AND p.policyname = r.policyname
        AND (p.qual ILIKE '%session-photos%' OR p.with_check ILIKE '%session-photos%')
    ) THEN
      EXECUTE format('DROP POLICY %I ON storage.objects', r.policyname);
    END IF;
  END LOOP;
END $$;

CREATE POLICY "session-photos public read"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'session-photos');

CREATE POLICY "session-photos public write"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'session-photos');

CREATE POLICY "session-photos public update"
ON storage.objects FOR UPDATE TO anon, authenticated
USING (bucket_id = 'session-photos');

CREATE POLICY "session-photos public delete"
ON storage.objects FOR DELETE TO anon, authenticated
USING (bucket_id = 'session-photos');
