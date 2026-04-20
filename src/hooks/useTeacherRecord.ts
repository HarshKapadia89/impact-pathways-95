import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isPreviewMode, previewTeacher } from "@/lib/teacherPreview";

export interface TeacherRecord {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  base_village: string | null;
  employee_code: string | null;
}

// With auth removed, the teacher app uses the first active teacher record
// from the database as the "default" teacher. If no teacher exists, one is
// auto-created so session writes still work.
export function useTeacherRecord() {
  const [teacher, setTeacher] = useState<TeacherRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPreviewMode()) {
      setTeacher(previewTeacher);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      // Try to find an existing active teacher
      const { data: existing } = await supabase
        .from("teachers")
        .select("id, full_name, phone, email, base_village, employee_code")
        .eq("active", true)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (existing) {
        if (!cancelled) {
          setTeacher(existing);
          setLoading(false);
        }
        return;
      }

      // None found — create a default one
      const { data: created } = await supabase
        .from("teachers")
        .insert({ full_name: "Field Teacher", base_village: "Dharampur", active: true })
        .select("id, full_name, phone, email, base_village, employee_code")
        .single();

      if (!cancelled) {
        setTeacher(created ?? null);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { teacher, loading };
}
