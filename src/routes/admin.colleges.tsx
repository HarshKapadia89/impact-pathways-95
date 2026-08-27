import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { SEED_COLLEGES } from "@/lib/seedColleges";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { Upload, Sparkles, Trash2, Download } from "lucide-react";

export const Route = createFileRoute("/admin/colleges")({
  component: () => (
    <AdminLayout>
      <CollegesAdmin />
    </AdminLayout>
  ),
});

function CollegesAdmin() {
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);

  const refresh = async () => {
    const { count: c } = await supabase
      .from("colleges")
      .select("id", { count: "exact", head: true });
    setCount(c ?? 0);
  };
  useEffect(() => {
    refresh();
  }, []);

  const seed = async () => {
    setBusy(true);
    const { error } = await supabase.from("colleges").insert(SEED_COLLEGES);
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success(`Inserted ${SEED_COLLEGES.length} colleges.`);
      refresh();
    }
  };

  const handleFile = async (file: File) => {
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(ws);
    const mapped = rows.map((r) => ({
      name: String(r.name || r.Name || r["College Name"] || "").trim(),
      city: r.city || r.City || null,
      district: r.district || r.District || null,
      state: r.state || r.State || "Gujarat",
      type: r.type || r.Type || null,
      affiliation: r.affiliation || r.Affiliation || null,
      established: r.established ? Number(r.established) : null,
      streams: typeof r.streams === "string"
        ? r.streams.split(",").map((s: string) => s.trim().toLowerCase())
        : [],
      courses: typeof r.courses === "string" ? r.courses.split(",").map((s: string) => s.trim()) : [],
      entrance_exams: typeof r.entrance_exams === "string"
        ? r.entrance_exams.split(",").map((s: string) => s.trim())
        : [],
      fees_range: r.fees_range || r.fees || null,
      hostel: !!(r.hostel === true || r.hostel === "yes" || r.hostel === "Yes" || r.hostel === 1),
      scholarships: !!(r.scholarships === true || r.scholarships === "yes" || r.scholarships === "Yes"),
      website: r.website || null,
      contact_phone: r.contact_phone || r.phone || null,
      contact_email: r.contact_email || r.email || null,
      address: r.address || null,
      notes: r.notes || null,
    })).filter((r) => r.name);
    setPreview(mapped);
  };

  const importPreview = async () => {
    if (preview.length === 0) return;
    setBusy(true);
    const { error } = await supabase.from("colleges").insert(preview as any);
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success(`Imported ${preview.length} colleges.`);
      setPreview([]);
      refresh();
    }
  };

  const deleteAll = async () => {
    if (!confirm("Delete ALL colleges? This cannot be undone.")) return;
    setBusy(true);
    const { error } = await supabase.from("colleges").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("All colleges removed.");
      refresh();
    }
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        name: "Example College",
        city: "Ahmedabad",
        district: "Ahmedabad",
        state: "Gujarat",
        type: "Government",
        affiliation: "Gujarat University",
        established: 1980,
        streams: "engineering, science",
        courses: "B.Tech CSE, B.Sc IT",
        entrance_exams: "JEE Main, GUJCET",
        fees_range: "₹50k / yr",
        hostel: "yes",
        scholarships: "yes",
        website: "example.edu",
        contact_phone: "079-12345678",
        contact_email: "info@example.edu",
        address: "Address line",
        notes: "Optional notes",
      },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Colleges");
    XLSX.writeFile(wb, "colleges-template.xlsx");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header>
        <h1 className="font-serif text-3xl md:text-4xl">Colleges Directory (Admin)</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage the public Gujarat colleges directory. Currently <strong>{count}</strong> entries.
        </p>
        <Link to="/colleges" className="text-xs text-primary mt-1 inline-block hover:underline">
          → View public directory
        </Link>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="font-serif text-lg flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" /> Seed sample colleges
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Insert the curated list of {SEED_COLLEGES.length} top Gujarat colleges (IIT-GN, IIM-A, NID, GNLU, MSU, SVNIT, etc.).
          </p>
          <button
            onClick={seed}
            disabled={busy}
            className="mt-4 bg-primary text-primary-foreground px-4 py-2 text-sm rounded-md hover:opacity-90 disabled:opacity-60"
          >
            Insert {SEED_COLLEGES.length} colleges
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="font-serif text-lg flex items-center gap-2">
            <Upload className="h-4 w-4 text-primary" /> Import Excel
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Upload an .xlsx with columns matching the template. Lists like <code>streams</code> can be comma-separated.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <label className="bg-secondary px-4 py-2 text-sm rounded-md cursor-pointer hover:bg-muted">
              Choose file
              <input
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </label>
            <button
              onClick={downloadTemplate}
              className="text-sm border border-border bg-background px-3 py-2 rounded-md inline-flex items-center gap-1 hover:bg-muted"
            >
              <Download className="h-3.5 w-3.5" />
              Template
            </button>
          </div>

          {preview.length > 0 && (
            <div className="mt-4 border-t border-border pt-3">
              <div className="text-sm font-medium">Preview: {preview.length} rows</div>
              <ul className="mt-1 max-h-40 overflow-auto text-xs space-y-0.5">
                {preview.slice(0, 8).map((p, i) => (
                  <li key={i} className="text-muted-foreground">• {p.name}</li>
                ))}
                {preview.length > 8 && <li className="text-muted-foreground">…and {preview.length - 8} more</li>}
              </ul>
              <button
                onClick={importPreview}
                disabled={busy}
                className="mt-3 bg-primary text-primary-foreground px-4 py-2 text-sm rounded-md hover:opacity-90 disabled:opacity-60"
              >
                Import {preview.length} colleges
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
        <div className="font-serif text-lg flex items-center gap-2 text-destructive">
          <Trash2 className="h-4 w-4" /> Danger zone
        </div>
        <p className="text-sm text-muted-foreground mt-1">Remove all college records.</p>
        <button
          onClick={deleteAll}
          disabled={busy}
          className="mt-3 bg-destructive text-destructive-foreground px-4 py-2 text-sm rounded-md hover:opacity-90 disabled:opacity-60"
        >
          Delete all
        </button>
      </div>
    </div>
  );
}
