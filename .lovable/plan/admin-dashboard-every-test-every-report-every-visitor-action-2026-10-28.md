# Admin dashboard: every test, every report, every visitor action

## Important first fix: lock the admin area
Right now the admin pages are open to anyone who knows the address, because sign-in checks were switched off earlier. Before showing student data there, the admin area will require sign-in with an admin account again. Only people you give admin access can open it.

## What the admin dashboard will show

1. **Overview**: total tests taken, paid tests, revenue, reports generated, counsellor bookings, school enquiries. Shows today, this week, this month and all time.
2. **All test takers**: one row per student with name, grade, school, mobile, email, language, date, payment status and amount, coupon used, and top results. Includes search, filters (date, grade, language, paid or unpaid) and an Excel download.
3. **Student detail page**: full scores (interest types, Multiple Intelligences, aptitude), recommended streams and careers, payment details, counsellor note, and any counsellor booking for that student.
4. **PDF reports**:
   - "Download saved PDF" when a saved copy exists.
   - "Regenerate PDF" for any older test, in any of the 4 languages. This builds the report again from the stored scores, so reports made before saving started can still be downloaded.
   - "Open share link" for the student's online report.
5. **Payments**: all orders (created, paid, failed) with Razorpay IDs, amount and coupon.
6. **Bookings and school enquiries**: the existing pages, now behind admin sign-in.
7. **Admin rights**: admins can edit student details and counsellor notes, delete records, change booking status, and give or remove admin access for other emails from a "Team" page.

## Who "accessed" the site
Tests, payments and bookings are recorded per person. Visitors who only browse without entering details can't be named. The dashboard will show visit counts from site analytics, not names.

## Technical details
- Re-enable real auth: `useAuth` with Supabase session plus `has_role` admin check, and `RequireAdmin` redirects to `/auth`. Admin routes stay client-gated, and all sensitive reads go through `requireSupabaseAuth` server functions that check the `has_role` admin role.
- Tighten RLS: `psychometric_submissions`, `psychometric_results`, `profiles`, `user_roles` currently allow public read/full access. Change to admin-only SELECT/UPDATE/DELETE, keep the anonymous INSERT the test needs, and keep `/r/$token` working through a token-scoped server function. Make `payment_orders` admin-only read, with a server function for the order-by-id lookup used at checkout. Do the same for the outreach tables (schools, sessions, etc.).
- New routes: `/admin/students`, `/admin/students/$id`, `/admin/payments`, `/admin/team`. Extend the `/admin` overview. Regenerate PDFs in the browser through `generatePsychometricPDF` after `preloadReportFonts`.
- Excel export through the existing `xlsx` package. All new UI uses HBK design-system components. All labels in the 4 languages.
- Test: a non-admin signed-in user gets an empty or denied result for submissions.
