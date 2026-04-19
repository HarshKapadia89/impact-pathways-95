-- Drop overly permissive policies
DROP POLICY IF EXISTS "Public read session photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload session photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update own session photos" ON storage.objects;

-- Make bucket private; we'll use signed URLs for viewing
UPDATE storage.buckets SET public = false WHERE id = 'session-photos';

-- Authenticated users can read photos in their own folder; admins/managers can read all
CREATE POLICY "Read own session photos"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'session-photos'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR public.is_admin_or_manager(auth.uid())
    )
  );

-- Upload to your own folder
CREATE POLICY "Upload own session photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'session-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Update your own folder
CREATE POLICY "Update own session photos"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'session-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Delete your own
CREATE POLICY "Delete own session photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'session-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );