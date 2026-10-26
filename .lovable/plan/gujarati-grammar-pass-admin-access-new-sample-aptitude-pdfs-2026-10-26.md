# Gujarati grammar pass, admin access, new sample aptitude PDFs

## 1. Admin portal: how to get in
- Address: **hbkcareers.org/auth** to sign in. After signing in, go to **hbkcareers.org/admin**. The new **PDF Reports** page is at /admin/reports.
- There is no shared password. Each admin signs in with their own account. One admin account exists today. I can't see or reset its password for you.
- If you don't know which email that account uses, or you want your own email to be admin: sign up at /auth with that email, tell me the email, and I'll give it admin access.

## 2. Full Gujarati grammar correction
Rewrite all Gujarati text in proper, natural, grammatical Gujarati: correct verb endings (છે/છું), gender and number agreement, spelling (for example મહત્ત્વ, શબ્દકોશ, ટકાઉપણું), and no half-sentences or word-for-word English. Scope, in this order:
1. Aptitude test: all questions, answer options, Likert scale, instructions and test page text.
2. PDF report: every heading, description, narrative, parent tips and glossary.
3. Website text written inside pages: homepage, header and footer, counsellor, LevelUp Lab labels, Vibe Quiz, feature cards, career cards, chatbot.
4. The large auto-translation dictionary (about 17,000 phrases): AI-assisted proofreading with a grammar-focused prompt, then spot-checks. Names of exams, colleges and schemes stay as they are.

## 3. New sample PDFs
Make sample reports for a demo student (one per grade band, all four languages: English, Gujarati, Hindi, Marathi) with realistic answers. Check every page as images for blank or zero sections, cut-off text, broken Gujarati or Devanagari letters, and the new HBK colours. Then save them to your Files so you can download them.

## Technical details
- Gujarati edits in `psychometricData.ts`, `psychometricReportXlate.ts`, `psychometricReportStrings.ts`, `testPageStrings.ts`, `upskillStrings.ts`, `chatbotStrings.ts`, `i18n.ts`, route and component inline `gu:` strings. `public/auto/gu.json` is proofread in batches through the Lovable AI Gateway with a resumable script.
- PDFs generated with a bun script calling `generatePsychometricPDF` + `buildReport` from seeded answers. Rendered to PNG with pdftoppm for QA. Output goes to `/mnt/documents/sample-reports/`.
- Admin grant via a `user_roles` insert once the user gives an email.
