# Extend the HBK student-led brand across the website

## Visual direction

Use the attached references as the visual standard throughout the public website:

- Authentic Indian students across middle school, secondary school, senior secondary and early college
- Bold purple brand fields with student photography integrated into large up-right arrow compositions
- Orange for primary actions, lime for highlights and key statements, and the official lilac, amber, green, mint, indigo and magenta supporting colours
- The supplied HBK Careers logo and official `ArrowIcon` only; no invented logo, mascot or competing motif
- Noto Serif display type and the existing HBK body type, spacing, radii, shadows and focus states

The uploaded screenshots are references, not images to place directly on the site. A cohesive set of original student photographs will be generated for the website.

## 1. Create a cohesive student image set

Generate a small reusable collection of authentic Indian student images covering:

- Grades 6–8: discovery and confidence
- Grades 9–10: streams, exams and decision-making
- Grades 11–12: college and career planning
- Early college: skills, employability and counselling
- Mixed student groups for schools, parents and success stories

Images will be bright, clear and subject-led, with space for headings and arrow framing. They will avoid generic stock-photo styling, dark faces, artificial uniforms and distracting backgrounds.

## 2. Establish the shared visual treatment

Create app-level compositions from the attached HBK system without modifying the attached library:

- Photo-led purple and paper hero layouts
- Large cropped up-right arrow framing for photography
- Purple/lime/orange section bands and directional dividers
- Consistent image aspect ratios and mobile crops
- Accessible foreground contrast on every saturated colour field
- Reduced-motion-safe reveals using the existing motion language

Use official design-system `Hero`, `Section`, `Card`, `Button`, `Badge`, `Stat`, `Logotype` and `ArrowIcon` components wherever they fit. Replace duplicated local controls and card treatments rather than re-skinning library components.

## 3. Apply imagery to key pages

Use substantial student photography on the main visitor destinations:

- Homepage
- Aptitude Test introduction
- Career Library and Gujarat guidance hubs
- Colleges and college search
- Scholarships and entrance exams
- LevelUp Lab
- Counsellor booking
- About, Parents, Schools and Success Stories
- Resume/Profile Builder and student Dashboard entry surfaces

Detailed career pages, lessons, quizzes and reports will stay content-focused. They will use smaller editorial images only where useful, plus colour bands, badges and arrow icons instead of forcing a large photo onto every screen.

## 4. Refresh repeated page patterns

- Replace plain gradient-only openings with the approved photo-and-arrow compositions.
- Replace generic repeated icons with relevant existing icons, using the HBK arrow as the consistent direction/progress cue.
- Convert manually styled primary actions, badges, statistics and repeated cards to the attached HBK components.
- Keep dense lists searchable and readable; imagery will introduce sections, not compete with results.
- Preserve the globally aligned eight-statistics band and existing readability safeguards.

## 5. Preserve every working feature

The refresh will not change:

- English, Gujarati, Hindi and Marathi behaviour
- Aptitude questions, scoring, reports, PDF generation or payment flow
- Career, college, exam and scholarship data or corrected links
- LevelUp lessons, quizzes, progress and certificates
- Booking, dashboard, bookmarks, profile and resume data
- Admin and teacher workflows

Admin, teacher, payment and live test-taking screens will receive only shared brand polish where safe; their functional layouts will not be structurally redesigned in this wave.

## Technical approach

- Generate and import the new image set through the project asset flow.
- Keep all colour, type, spacing, radius and shadow values sourced from the attached HBK design system.
- Add reusable app-level photo/arrow compositions outside the managed design-system directory.
- Replace the remaining local Career-page statistic duplicate with the official `Stat` component.
- Replace manual homepage and dashboard actions with official `Button` variants.
- Keep each route’s existing unique metadata and translation logic intact.

## Quality checks

- Review key pages at desktop, tablet and mobile sizes, including image crops and long translated headings.
- Verify all four languages on every refreshed page.
- Check text contrast, focus visibility, keyboard navigation, alt text and one-H1 structure.
- Test all main links and actions, aptitude entry, scholarship links, LevelUp navigation and counsellor booking.
- Confirm no image causes layout shifts, no controls overlap, and no browser errors appear.
