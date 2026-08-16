import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";
import { RequireAdmin } from "@/components/RequireAdmin";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Upload, Trash2 } from "lucide-react";

export const Route = createFileRoute("/schools")({
  head: () => ({
    meta: [{ title: "Schools — Outreach Mission Control" }],
  }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Schools />
      </AdminLayout>
    </RequireAdmin>
  ),
});

interface SchoolRow {
  id: string;
  name: string;
  village: string | null;
  district: string | null;
  num_students: number;
}

interface ImportRow {
  name: string;
  village: string;
  num_students: number;
  district: string;
}

function Schools() {
  const { t } = useTranslation();
  const [rows, setRows] = useState<SchoolRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", village: "", district: "Dharampur", num_students: 0 });
  const [saving, setSaving] = useState(false);

  const [importOpen, setImportOpen] = useState(false);
  const [importRows, setImportRows] = useState<ImportRow[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("schools")
      .select("id, name, village, district, num_students")
      .order("name");
    if (error) toast.error(error.message);
    setRows((data ?? []) as SchoolRow[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.village ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const addSchool = async () => {
    if (!form.name.trim()) return toast.error("Name is required");
    setSaving(true);
    const { error } = await supabase.from("schools").insert({
      name: form.name.trim(),
      village: form.village.trim() || null,
      district: form.district.trim() || null,
      num_students: form.num_students || 0,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("School added");
    setAddOpen(false);
    setForm({ name: "", village: "", district: "Dharampur", num_students: 0 });
    load();
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

    const norm = (k: string) => k.toLowerCase().replace(/[^a-z]/g, "");
    const parsed: ImportRow[] = json
      .map((r) => {
        const out: any = {};
        for (const [k, v] of Object.entries(r)) out[norm(k)] = v;
        return {
          name: String(out.schoolname || out.name || "").trim(),
          village: String(out.village || out.location || "").trim(),
          num_students: Number(out.students || out.numberofstudents || out.numstudents || 0) || 0,
          district: String(out.district || "Dharampur").trim() || "Dharampur",
        };
      })
      .filter((r) => r.name);

    if (parsed.length === 0) {
      toast.error("No rows with a 'School Name' column were found.");
      return;
    }
    setImportRows(parsed);
  };

  const confirmImport = async () => {
    if (importRows.length === 0) return;
    const { error } = await supabase.from("schools").insert(importRows);
    if (error) return toast.error(error.message);
    toast.success(t("schools.imported", { count: importRows.length }));
    setImportOpen(false);
    setImportRows([]);
    if (fileRef.current) fileRef.current.value = "";
    load();
  };

  const deleteSchool = async (id: string) => {
    if (!confirm("Delete this school? This cannot be undone.")) return;
    const { error } = await supabase.from("schools").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">{t("schools.title")}</h1>
          <p className="mt-1 text-muted-foreground text-sm">{t("schools.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setImportOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            {t("schools.import")}
          </Button>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t("schools.add")}
          </Button>
        </div>
      </header>

      <Input
        placeholder={t("common.search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-medium">{t("schools.name")}</th>
                <th className="text-left px-4 py-3 font-medium">{t("schools.village")}</th>
                <th className="text-left px-4 py-3 font-medium">{t("schools.district")}</th>
                <th className="text-right px-4 py-3 font-medium">{t("schools.students")}</th>
                <th className="text-right px-4 py-3 font-medium">{t("schools.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    {t("common.loading")}
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    {t("schools.empty")}
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-t-2 border-border hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.village || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.district || "—"}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{r.num_students}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSchool(r.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add school */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("schools.add")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>{t("schools.name")}</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>{t("schools.village")}</Label>
                <Input
                  value={form.village}
                  onChange={(e) => setForm({ ...form, village: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>{t("schools.district")}</Label>
                <Input
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>{t("schools.students")}</Label>
              <Input
                type="number"
                min={0}
                value={form.num_students}
                onChange={(e) => setForm({ ...form, num_students: Number(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={addSchool} disabled={saving}>
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import */}
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("schools.importTitle")}</DialogTitle>
            <DialogDescription>{t("schools.importHint")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={onFile}
              className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-primary-foreground hover:file:bg-primary/90"
            />

            {importRows.length > 0 && (
              <div className="border-2 border-border rounded-lg max-h-72 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-muted-foreground sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium">{t("schools.name")}</th>
                      <th className="text-left px-3 py-2 font-medium">{t("schools.village")}</th>
                      <th className="text-right px-3 py-2 font-medium">{t("schools.students")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importRows.map((r, i) => (
                      <tr key={i} className="border-t-2 border-border">
                        <td className="px-3 py-2">{r.name}</td>
                        <td className="px-3 py-2 text-muted-foreground">{r.village || "—"}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{r.num_students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setImportOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={confirmImport} disabled={importRows.length === 0}>
              {t("schools.confirmImport", { count: importRows.length })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
