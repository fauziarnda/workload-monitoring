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
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      employee_mitra_details: {
        Row: {
          date_of_birth: string | null
          employee_id: string
          last_education: string | null
          sub_district: string | null
          village: string | null
        }
        Insert: {
          date_of_birth?: string | null
          employee_id: string
          last_education?: string | null
          sub_district?: string | null
          village?: string | null
        }
        Update: {
          date_of_birth?: string | null
          employee_id?: string
          last_education?: string | null
          sub_district?: string | null
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_mitra_details_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_organik_details: {
        Row: {
          department: string | null
          employee_id: string
        }
        Insert: {
          department?: string | null
          employee_id: string
        }
        Update: {
          department?: string | null
          employee_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_organik_details_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string | null
          employee_type: Database["public"]["Enums"]["employee_type"]
          id: string
          img_url: string | null
          name: string
          status: Database["public"]["Enums"]["employee_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          employee_type: Database["public"]["Enums"]["employee_type"]
          id?: string
          img_url?: string | null
          name: string
          status?: Database["public"]["Enums"]["employee_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          employee_type?: Database["public"]["Enums"]["employee_type"]
          id?: string
          img_url?: string | null
          name?: string
          status?: Database["public"]["Enums"]["employee_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      experience_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      job_assignments: {
        Row: {
          created_at: string
          employee_id: string
          id: string
          job_id: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          id?: string
          job_id: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          id?: string
          job_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_assignments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          created_at: string
          created_by: string | null
          end_date: string | null
          estimated_honorarium: number | null
          honor_document_basis: number | null
          id: string
          start_date: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          transport_allowance: number | null
          type: Database["public"]["Enums"]["job_type"] | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          estimated_honorarium?: number | null
          honor_document_basis?: number | null
          id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          transport_allowance?: number | null
          type?: Database["public"]["Enums"]["job_type"] | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          estimated_honorarium?: number | null
          honor_document_basis?: number | null
          id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          transport_allowance?: number | null
          type?: Database["public"]["Enums"]["job_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      mitra_experiences: {
        Row: {
          employee_id: string
          experience_type_id: number
          id: number
          year: number | null
        }
        Insert: {
          employee_id: string
          experience_type_id: number
          id?: number
          year?: number | null
        }
        Update: {
          employee_id?: string
          experience_type_id?: number
          id?: number
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mitra_experiences_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mitra_experiences_experience_type_id_fkey"
            columns: ["experience_type_id"]
            isOneToOne: false
            referencedRelation: "experience_types"
            referencedColumns: ["id"]
          },
        ]
      }
      organik_work_history: {
        Row: {
          company: string
          employee_id: string
          end_date: string | null
          id: number
          job_title: string
          start_date: string | null
        }
        Insert: {
          company: string
          employee_id: string
          end_date?: string | null
          id?: number
          job_title: string
          start_date?: string | null
        }
        Update: {
          company?: string
          employee_id?: string
          end_date?: string | null
          id?: number
          job_title?: string
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organik_work_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      employee_status: "Available" | "Unavailable" | "On Project"
      employee_type: "Organik" | "Mitra"
      job_status: "DRAFT" | "FINALIZED" | "ONGOING" | "COMPLETED"
      job_type: "Sensus/Survey" | "Kegiatan Lain"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      employee_status: ["Available", "Unavailable", "On Project"],
      employee_type: ["Organik", "Mitra"],
      job_status: ["DRAFT", "FINALIZED", "ONGOING", "COMPLETED"],
      job_type: ["Sensus/Survey", "Kegiatan Lain"],
    },
  },
} as const
