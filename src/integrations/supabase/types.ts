export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          present: boolean
          session_id: string
          skill_rating: number | null
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          present?: boolean
          session_id: string
          skill_rating?: number | null
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          present?: boolean
          session_id?: string
          skill_rating?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      colleges: {
        Row: {
          active: boolean
          address: string | null
          affiliation: string | null
          city: string | null
          contact_email: string | null
          contact_phone: string | null
          courses: string[] | null
          created_at: string
          district: string | null
          entrance_exams: string[] | null
          established: number | null
          fees_range: string | null
          hostel: boolean | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          notes: string | null
          scholarships: boolean | null
          state: string
          streams: string[] | null
          type: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          active?: boolean
          address?: string | null
          affiliation?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          courses?: string[] | null
          created_at?: string
          district?: string | null
          entrance_exams?: string[] | null
          established?: number | null
          fees_range?: string | null
          hostel?: boolean | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          notes?: string | null
          scholarships?: boolean | null
          state?: string
          streams?: string[] | null
          type?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          active?: boolean
          address?: string | null
          affiliation?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          courses?: string[] | null
          created_at?: string
          district?: string | null
          entrance_exams?: string[] | null
          established?: number | null
          fees_range?: string | null
          hostel?: boolean | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          notes?: string | null
          scholarships?: boolean | null
          state?: string
          streams?: string[] | null
          type?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      learning_outcomes: {
        Row: {
          created_at: string
          id: string
          module_id: string
          outcome: string
          sequence: number
        }
        Insert: {
          created_at?: string
          id?: string
          module_id: string
          outcome: string
          sequence?: number
        }
        Update: {
          created_at?: string
          id?: string
          module_id?: string
          outcome?: string
          sequence?: number
        }
        Relationships: [
          {
            foreignKeyName: "learning_outcomes_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "program_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          language: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          language?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          language?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      program_modules: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          program_id: string
          sequence: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          program_id: string
          sequence?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          program_id?: string
          sequence?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          active: boolean
          code: string
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          code: string
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          code?: string
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      psychometric_results: {
        Row: {
          age: number | null
          aptitude: Json | null
          created_at: string
          email: string | null
          grade: string | null
          grade_band: string | null
          id: string
          language: string | null
          mobile: string | null
          multiple_intelligences: Json | null
          paid_at: string | null
          payment_amount: number | null
          payment_coupon: string | null
          payment_utr: string | null
          recommended_careers: string[] | null
          recommended_streams: string[] | null
          riasec: Json | null
          school_name: string | null
          student_name: string | null
        }
        Insert: {
          age?: number | null
          aptitude?: Json | null
          created_at?: string
          email?: string | null
          grade?: string | null
          grade_band?: string | null
          id?: string
          language?: string | null
          mobile?: string | null
          multiple_intelligences?: Json | null
          paid_at?: string | null
          payment_amount?: number | null
          payment_coupon?: string | null
          payment_utr?: string | null
          recommended_careers?: string[] | null
          recommended_streams?: string[] | null
          riasec?: Json | null
          school_name?: string | null
          student_name?: string | null
        }
        Update: {
          age?: number | null
          aptitude?: Json | null
          created_at?: string
          email?: string | null
          grade?: string | null
          grade_band?: string | null
          id?: string
          language?: string | null
          mobile?: string | null
          multiple_intelligences?: Json | null
          paid_at?: string | null
          payment_amount?: number | null
          payment_coupon?: string | null
          payment_utr?: string | null
          recommended_careers?: string[] | null
          recommended_streams?: string[] | null
          riasec?: Json | null
          school_name?: string | null
          student_name?: string | null
        }
        Relationships: []
      }
      psychometric_submissions: {
        Row: {
          age: number | null
          app_version: string | null
          aptitude: Json | null
          aptitude_top: string[] | null
          created_at: string
          device_id: string | null
          email: string | null
          grade: string | null
          grade_band: string | null
          id: string
          language: string | null
          mi_top: string[] | null
          mobile: string | null
          multiple_intelligences: Json | null
          paid_at: string | null
          payment_amount: number | null
          payment_coupon: string | null
          payment_utr: string | null
          recommended_careers: string[] | null
          recommended_streams: string[] | null
          riasec: Json | null
          riasec_top: string[] | null
          school_name: string | null
          student_name: string | null
          synced_at: string
          taken_at: string
        }
        Insert: {
          age?: number | null
          app_version?: string | null
          aptitude?: Json | null
          aptitude_top?: string[] | null
          created_at?: string
          device_id?: string | null
          email?: string | null
          grade?: string | null
          grade_band?: string | null
          id: string
          language?: string | null
          mi_top?: string[] | null
          mobile?: string | null
          multiple_intelligences?: Json | null
          paid_at?: string | null
          payment_amount?: number | null
          payment_coupon?: string | null
          payment_utr?: string | null
          recommended_careers?: string[] | null
          recommended_streams?: string[] | null
          riasec?: Json | null
          riasec_top?: string[] | null
          school_name?: string | null
          student_name?: string | null
          synced_at?: string
          taken_at?: string
        }
        Update: {
          age?: number | null
          app_version?: string | null
          aptitude?: Json | null
          aptitude_top?: string[] | null
          created_at?: string
          device_id?: string | null
          email?: string | null
          grade?: string | null
          grade_band?: string | null
          id?: string
          language?: string | null
          mi_top?: string[] | null
          mobile?: string | null
          multiple_intelligences?: Json | null
          paid_at?: string | null
          payment_amount?: number | null
          payment_coupon?: string | null
          payment_utr?: string | null
          recommended_careers?: string[] | null
          recommended_streams?: string[] | null
          riasec?: Json | null
          riasec_top?: string[] | null
          school_name?: string | null
          student_name?: string | null
          synced_at?: string
          taken_at?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          active: boolean
          cluster: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string
          district: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          notes: string | null
          num_students: number
          state: string | null
          updated_at: string
          user_id: string | null
          village: string | null
        }
        Insert: {
          active?: boolean
          cluster?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          district?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          notes?: string | null
          num_students?: number
          state?: string | null
          updated_at?: string
          user_id?: string | null
          village?: string | null
        }
        Update: {
          active?: boolean
          cluster?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          district?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          notes?: string | null
          num_students?: number
          state?: string | null
          updated_at?: string
          user_id?: string | null
          village?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          check_in_at: string | null
          check_in_lat: number | null
          check_in_lng: number | null
          created_at: string
          created_by: string | null
          duration_minutes: number | null
          id: string
          module_id: string | null
          photo_url: string | null
          program_id: string | null
          scheduled_date: string
          scheduled_time: string | null
          school_id: string
          status: Database["public"]["Enums"]["session_status"]
          students_present: number | null
          summary: string | null
          teacher_id: string | null
          updated_at: string
        }
        Insert: {
          check_in_at?: string | null
          check_in_lat?: number | null
          check_in_lng?: number | null
          created_at?: string
          created_by?: string | null
          duration_minutes?: number | null
          id?: string
          module_id?: string | null
          photo_url?: string | null
          program_id?: string | null
          scheduled_date: string
          scheduled_time?: string | null
          school_id: string
          status?: Database["public"]["Enums"]["session_status"]
          students_present?: number | null
          summary?: string | null
          teacher_id?: string | null
          updated_at?: string
        }
        Update: {
          check_in_at?: string | null
          check_in_lat?: number | null
          check_in_lng?: number | null
          created_at?: string
          created_by?: string | null
          duration_minutes?: number | null
          id?: string
          module_id?: string | null
          photo_url?: string | null
          program_id?: string | null
          scheduled_date?: string
          scheduled_time?: string | null
          school_id?: string
          status?: Database["public"]["Enums"]["session_status"]
          students_present?: number | null
          summary?: string | null
          teacher_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "program_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          active: boolean
          age: number | null
          created_at: string
          full_name: string
          gender: string | null
          grade: string | null
          guardian_name: string | null
          guardian_phone: string | null
          id: string
          school_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          age?: number | null
          created_at?: string
          full_name: string
          gender?: string | null
          grade?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          school_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          age?: number | null
          created_at?: string
          full_name?: string
          gender?: string | null
          grade?: string | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          school_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_assignments: {
        Row: {
          active: boolean
          created_at: string
          end_date: string | null
          id: string
          program_id: string | null
          school_id: string
          start_date: string | null
          teacher_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          end_date?: string | null
          id?: string
          program_id?: string | null
          school_id: string
          start_date?: string | null
          teacher_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          end_date?: string | null
          id?: string
          program_id?: string | null
          school_id?: string
          start_date?: string | null
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_assignments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_assignments_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          active: boolean
          base_village: string | null
          created_at: string
          date_joined: string | null
          email: string | null
          employee_code: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          active?: boolean
          base_village?: string | null
          created_at?: string
          date_joined?: string | null
          email?: string | null
          employee_code?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          active?: boolean
          base_village?: string | null
          created_at?: string
          date_joined?: string | null
          email?: string | null
          employee_code?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_manager: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "manager" | "teacher" | "school"
      session_status: "scheduled" | "completed" | "missed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "teacher", "school"],
      session_status: ["scheduled", "completed", "missed", "cancelled"],
    },
  },
} as const
