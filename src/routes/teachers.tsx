import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { RequireAdmin } from "@/components/RequireAdmin";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/teachers")({
  head: () => ({ meta: [{ title: "Teachers — Outreach Mission Control" }] }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Teachers />
      </AdminLayout>
    </RequireAdmin>
  ),
});

interface T {
  id: string;
  full_name: string;
  phone: string | null;
  employee_code: string | null;
  base_village: string | null;
  active: boolean;
}

function Teachers() {
  const { t } = useTranslation();
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    employee_code: "",
    base_village: "",
  });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("teachers")
      .select("id, full_name, phone, employee_code, base_village, active")
      .order("full_name");
    if (error) toast.error(error.message);
    setRows((data ?? []) as T[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!form.full_name.trim()) return toast.error("Name is required");
    setSaving(true);
    const { error } = await supabase.from("teachers").insert({
      full_name: form.full_name.trim(),
      phone: form.phone.trim() || null,
      employee_code: form.employee_code.trim() || null,
      base_village: form.base_village.trim() || null,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Teacher added");
    setOpen(false);
    setForm({ full_name: "", phone: "", employee_code: "", base_village: "" });
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this teacher?")) return;
    const { error } = await supabase.from("teachers").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">{t("teachers.title")}</h1>
          <p className="mt-1 text-muted-foreground text-sm">{t("teachers.subtitle")}</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t("teachers.add")}
        </Button>
      </header>

      <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">{t("teachers.name")}</th>
              <th className="text-left px-4 py-3 font-medium">{t("teachers.phone")}</th>
              <th className="text-left px-4 py-3 font-medium">{t("teachers.code")}</th>
              <th className="text-left px-4 py-3 font-medium">{t("teachers.baseVillage")}</th>
              <th className="text-right px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  {t("common.loading")}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  {t("teachers.empty")}
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t-2 border-border hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{r.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.phone || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.employee_code || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.base_village || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => del(r.id)}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("teachers.add")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>{t("teachers.name")}</Label>
              <Input
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>{t("teachers.phone")}</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>{t("teachers.code")}</Label>
                <Input
                  value={form.employee_code}
                  onChange={(e) => setForm({ ...form, employee_code: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>{t("teachers.baseVillage")}</Label>
              <Input
                value={form.base_village}
                onChange={(e) => setForm({ ...form, base_village: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={add} disabled={saving}>
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
