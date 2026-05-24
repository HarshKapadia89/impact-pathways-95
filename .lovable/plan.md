## HBK Careers — Edumilestones-parity Build Plan (Items 1, 2, 4–9)

Scope: everything except the Counsellor Marketplace, Study Abroad lane, and Counsellor Certification course. Built in 4 phases so you see something shippable after each.

---

### Phase 1 — Quick visible wins (no backend)

**A. Grade-banded test entry (item 2)**
- On `/test`, replace the single CTA with three tiles: **Class 6–8**, **Class 9–10**, **Class 11–12**.
- Each tile pre-selects the right grade band so aptitude items match. Same underlying test engine.
- Add a copy block explaining what each band measures.

**B. Trust-signal layer on landing (item 4)**
- Live counters strip: tests taken, reports generated, schools onboarded, streams covered. Pulled via a server function aggregating from existing tables; cached 1 hr.
- Testimonials carousel (static JSON for now, 6–8 entries).
- Press / awards / "as featured in" strip (placeholder logos until you supply real ones).
- **Sample report** download button (re-uses `sampleReport.ts` → PDF).

### Phase 2 — Student Dashboard MVP (item 1)

New route `/_authenticated/dashboard` with tabs:
- **My Report** — link to latest PDF + AI summary + retake button.
- **Shortlisted Careers** — bookmark from any handbook/career page.
- **Shortlisted Colleges** — bookmark from `/find-college`.
- **My Roadmap** — auto-generated from top-fit stream (Class → exam → course → first role); editable.
- **Checklist** — "next 90 days" actions from AI interpretation, with check-off state.

Auth: existing Supabase auth. Add "Save to dashboard" star icons across handbook, career, find-college, and report pages.

### Phase 3 — Content + AI features

**C. Career Roadmap visualisation (item 5)**
- Vertical stepper on every `/career/$stream/$path` profession page: *Class 10 → Stream → Entrance Exam → UG → PG/Cert → Entry Role → Mid Career → Senior Role* with typical salary bands and timeline years.
- Data lives alongside existing profession entries in `careerData.ts`.

**D. AI Career Chat grounded in report (item 7)**
- Floating chat button on dashboard + `/career` pages.
- Re-uses existing `chat-career` edge function; system prompt now receives the student's latest deterministic scores + AI interpretation as grounding context.
- Uses `google/gemini-2.5-pro` via Lovable AI Gateway. Free, rate-limited per user.

### Phase 4 — New content pages

**E. Scholarships & Entrance-Exam tracker (item 6)**
- New routes `/scholarships` and `/exams`.
- Filterable list (level, stream, deadline, eligibility, state — Gujarat first).
- Seed data in a `scholarships` and `entrance_exams` table. Admin can add via existing `/admin` route.
- Each row: title, summary, eligibility, deadline (date), apply link, tags.

**F. Resume / Profile Builder (item 8)**
- Route `/_authenticated/profile-builder`.
- Form sections: personal, academics, extracurriculars, projects, awards, skills, certificates.
- "Generate PDF" exports a clean one-page student profile (jsPDF, same stack as the report).
- Saved per user; can be reopened and re-exported.

**G. "For Schools" B2B landing page (item 9)**
- Public route `/for-schools`.
- Sections: value prop, bulk test admin demo, pricing tiers (3 cards), case-study slot, "Book a demo" form → writes to `school_leads` table, also emails admin via existing transactional email path.
- Internal staff sees leads under `/admin/school-leads`.

---

### Build order (recommended)

```text
Phase 1  →  Phase 2  →  Phase 3  →  Phase 4
~1 short turn   ~2 turns      ~2 turns       ~2 turns
```

Each phase is independently shippable; you can stop or re-order between phases.

---

### Technical / data summary

**New tables (Phase 2 onward):**
- `shortlisted_careers` (user_id, stream, path, career_id, created_at)
- `shortlisted_colleges` (user_id, college_id, created_at)
- `roadmap_items` (user_id, step_order, label, status, due_date)
- `checklist_items` (user_id, label, done, source = 'ai' | 'manual')
- `student_profiles` (user_id, JSON payload, updated_at)
- `scholarships`, `entrance_exams` (admin-managed, public read)
- `school_leads` (name, school, role, email, phone, message, status)

All user tables get RLS: owner can CRUD their rows; admin role can read leads. Public tables (`scholarships`, `entrance_exams`) get public SELECT, admin-only write.

**No new external API keys needed.** Uses existing Supabase, Razorpay (no new charges), Lovable AI Gateway.

**Reuses existing code:** Razorpay flow, sampleReport PDF generator, AIInterpretationPanel, chat-career function, admin shell.

---

### Open questions (answer in chat, not required to start Phase 1)

1. For trust counters in Phase 1 — okay to **start with real DB counts + a "Joined by 50+ schools" line that's editable later**, or do you want hardcoded placeholder numbers for launch?
2. For Phase 4 scholarships/exams — should I **seed 30–50 Gujarat-relevant entries** myself from public sources, or wait for you to supply the list?
3. For Phase 4 "For Schools" — do you want **public pricing** displayed or **"Contact for pricing"**?

Confirm and I'll start with Phase 1.
