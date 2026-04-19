// Lightweight preview-mode helpers for the Teacher Field App.
// Activates when URL has ?preview=1 (persisted to sessionStorage for the tab).
// Lets reviewers browse the mobile UI with realistic mock data — no login required.

const KEY = "teacher_preview_mode";

export function isPreviewMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get("preview") === "1") {
      sessionStorage.setItem(KEY, "1");
      return true;
    }
    if (url.searchParams.get("preview") === "0") {
      sessionStorage.removeItem(KEY);
      return false;
    }
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function exitPreviewMode() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}

export const previewTeacher = {
  id: "preview-teacher",
  full_name: "Priya Patel",
  phone: "+91 98765 43210",
  email: "priya@example.org",
  base_village: "Anand",
  employee_code: "TCH-001",
};

export const previewSchools = [
  {
    id: "p-school-1",
    name: "Saraswati Primary School",
    village: "Anand",
    cluster: "Anand North",
    num_students: 42,
    contact_person: "Ramesh Shah",
    contact_phone: "+91 99887 76655",
    programs: ["Pre-Vocational", "Magic Touch"],
  },
  {
    id: "p-school-2",
    name: "Gandhi Vidyalaya",
    village: "Borsad",
    cluster: "Borsad Central",
    num_students: 58,
    contact_person: "Meena Joshi",
    contact_phone: "+91 90909 12345",
    programs: ["Vocational", "Udhyam"],
  },
  {
    id: "p-school-3",
    name: "Navjeevan Upper Primary",
    village: "Petlad",
    cluster: "Petlad West",
    num_students: 36,
    contact_person: "Anil Desai",
    contact_phone: "+91 88776 55443",
    programs: ["Unnati"],
  },
];

const today = new Date();
const iso = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const previewSessions = [
  {
    id: "p-sess-1",
    scheduled_date: iso(0),
    scheduled_time: "10:30",
    status: "scheduled" as const,
    students_present: null,
    schools: { id: "p-school-1", name: "Saraswati Primary School", village: "Anand" },
    programs: { name: "Pre-Vocational", color: "#6366F1" },
  },
  {
    id: "p-sess-2",
    scheduled_date: iso(0),
    scheduled_time: "14:00",
    status: "scheduled" as const,
    students_present: null,
    schools: { id: "p-school-2", name: "Gandhi Vidyalaya", village: "Borsad" },
    programs: { name: "Vocational", color: "#F59E0B" },
  },
  {
    id: "p-sess-3",
    scheduled_date: iso(2),
    scheduled_time: "09:00",
    status: "scheduled" as const,
    students_present: null,
    schools: { id: "p-school-3", name: "Navjeevan Upper Primary", village: "Petlad" },
    programs: { name: "Unnati", color: "#10B981" },
  },
  {
    id: "p-sess-4",
    scheduled_date: iso(-2),
    scheduled_time: "11:00",
    status: "completed" as const,
    students_present: 28,
    schools: { id: "p-school-1", name: "Saraswati Primary School", village: "Anand" },
    programs: { name: "Magic Touch", color: "#EC4899" },
  },
  {
    id: "p-sess-5",
    scheduled_date: iso(-5),
    scheduled_time: "10:00",
    status: "completed" as const,
    students_present: 31,
    schools: { id: "p-school-2", name: "Gandhi Vidyalaya", village: "Borsad" },
    programs: { name: "Udhyam", color: "#8B5CF6" },
  },
];

export const previewStudents = [
  { id: "p-stu-1", full_name: "Aarav Patel", grade: "5" },
  { id: "p-stu-2", full_name: "Diya Shah", grade: "5" },
  { id: "p-stu-3", full_name: "Krishna Mehta", grade: "6" },
  { id: "p-stu-4", full_name: "Aanya Joshi", grade: "5" },
  { id: "p-stu-5", full_name: "Vivaan Desai", grade: "6" },
  { id: "p-stu-6", full_name: "Saanvi Trivedi", grade: "6" },
  { id: "p-stu-7", full_name: "Reyansh Modi", grade: "5" },
  { id: "p-stu-8", full_name: "Ishaani Bhatt", grade: "5" },
];

export function findPreviewSession(id: string) {
  return previewSessions.find((s) => s.id === id) ?? previewSessions[0];
}

export function findPreviewSchool(id: string) {
  return previewSchools.find((s) => s.id === id) ?? previewSchools[0];
}
