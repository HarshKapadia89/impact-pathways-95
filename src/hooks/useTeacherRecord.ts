import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { isPreviewMode, previewTeacher } from "@/lib/teacherPreview";

export interface TeacherRecord {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  base_village: string | null;
  employee_code: string | null;
}

export function useTeacherRecord() {
  const { user } = useAuth();
  const [teacher, setTeacher] = useState<TeacherRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPreviewMode()) {
      setTeacher(previewTeacher);
      setLoading(false);
      return;
    }
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("teachers")
        .select("id, full_name, phone, email, base_village, employee_code")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!cancelled) {
        setTeacher(data ?? null);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { teacher, loading };
}
