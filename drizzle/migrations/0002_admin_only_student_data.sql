DROP POLICY IF EXISTS "Public can read submissions" ON public.psychometric_submissions;
CREATE POLICY "Admins read submissions" ON public.psychometric_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update submissions" ON public.psychometric_submissions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete submissions" ON public.psychometric_submissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public full access" ON public.psychometric_results;
CREATE POLICY "Anyone can insert results" ON public.psychometric_results FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins manage results" ON public.psychometric_results FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Anon can read order by id" ON public.payment_orders;
CREATE POLICY "Admins read orders" ON public.payment_orders FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public full access" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public full access" ON public.profiles;
CREATE POLICY "Users manage own profile" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins read profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT, UPDATE, DELETE ON public.psychometric_submissions TO authenticated;
GRANT INSERT ON public.psychometric_submissions TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.psychometric_results TO authenticated;
GRANT INSERT ON public.psychometric_results TO anon;
GRANT SELECT ON public.payment_orders TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles, public.profiles TO authenticated;
GRANT ALL ON public.psychometric_submissions, public.psychometric_results, public.payment_orders, public.user_roles, public.profiles TO service_role;

CREATE POLICY "Admins delete report pdfs" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'report-pdfs' AND public.has_role(auth.uid(), 'admin'));