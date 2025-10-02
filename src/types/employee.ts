import { Database } from './supabase';

type EmployeeRow = Database['public']['Tables']['employees']['Row'];
type OrganikDetailsRow =
  Database['public']['Tables']['employee_organik_details']['Row'];
type MitraDetailsRow =
  Database['public']['Tables']['employee_mitra_details']['Row'];
type WorkHistoryRow =
  Database['public']['Tables']['organik_work_history']['Row'];
type ExperienceRow = Database['public']['Tables']['mitra_experiences']['Row'];
type ExperienceTypeRow =
  Database['public']['Tables']['experience_types']['Row'];

export type OrganikType = EmployeeRow & {
  employee_organik_details: OrganikDetailsRow | null;
  organik_work_history: WorkHistoryRow[];
};

type MitraExperienceWithDetails = ExperienceRow & {
  experience_types: ExperienceTypeRow | null;
};

export type MitraType = EmployeeRow & {
  employee_mitra_details: MitraDetailsRow | null;
  mitra_experiences: MitraExperienceWithDetails[];
};
