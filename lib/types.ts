export interface Student {
  id: string;
  name: string;
  phone_verified: boolean;
  email_verified: boolean;
  city: string;
  education: string;
  skills: string[];
  interests: string[];
  exp_years: number;
  salary_expectation: number;
  training_budget: number;
  documents: Document[];
  consent_flags: {
    profile_share: boolean;
    whatsapp: boolean;
  };
  source_channel: string;
  owner_user_id: string;
  stage: StudentStage;
  readiness_score: number;
  created_at: string;
}

export interface Partner {
  id: string;
  type: 'institute' | 'employer';
  name: string;
  gstin: string;
  website: string;
  hq_city: string;
  payout_terms: string;
  reliability_score: number;
  is_active: boolean;
  contacts: Contact[];
  owner_user_id: string;
}

export interface Contact {
  id: string;
  partner_id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  whatsapp_optin: boolean;
  preferred_hours: string;
}

export interface Program {
  id: string;
  partner_id: string;
  title: string;
  mode: 'online' | 'offline';
  duration_weeks: number;
  fee: number;
  start_dates: string[];
  eligibility: string;
  placement_support: boolean;
  commission_scheme_id: string;
}

export interface Job {
  id: string;
  partner_id: string;
  title: string;
  location: string;
  work_mode: string;
  ctc_min: number;
  ctc_max: number;
  must_have_skills: string[];
  min_exp: number;
  openings: number;
  commission_scheme_id: string;
  replacement_clawback_days: number;
}

export interface Referral {
  id: string;
  student_id: string;
  target_type: 'program' | 'job';
  target_id: string;
  pipeline: 'training' | 'job';
  stage: ReferralStage;
  owner_user_id: string;
  negotiated_terms_snapshot: any;
  timeline: TimelineEntry[];
  created_at: string;
}

export interface CommissionScheme {
  id: string;
  basis: 'flat' | 'percent' | 'slab';
  rate_or_tiers: number | CommissionTier[];
  trigger_event: 'fee_realized' | 'joined' | 'retained_90d';
  clawback_window_days: number;
  split_rules: any;
}

export interface CommissionTier {
  min: number;
  max: number;
  rate: number;
}

export interface CommissionLedger {
  id: string;
  referral_id: string;
  expected_amount: number;
  currency: string;
  trigger_date: string;
  status: 'pending' | 'invoiced' | 'paid' | 'clawback';
  adjustments: Adjustment[];
}

export interface Invoice {
  id: string;
  partner_id: string;
  invoice_no: string;
  date: string;
  line_items: LineItem[];
  gst_fields: {
    gstin: string;
    sac: string;
    cgst: number;
    sgst: number;
    igst: number;
  };
  total: number;
  status: 'sent' | 'paid' | 'overdue';
  payment_refs: string[];
}

export interface Activity {
  id: string;
  type: 'call' | 'sms' | 'whatsapp' | 'email' | 'meeting';
  outcome: string;
  notes: string;
  next_due_at: string | null;
  owner_user_id: string;
  entity_ref: {
    type: string;
    id: string;
  };
  created_at: string;
}

export interface Task {
  id: string;
  type: 'call' | 'sms' | 'whatsapp' | 'email' | 'meeting';
  outcome: string;
  notes: string;
  next_due_at: string | null;
  owner_user_id: string;
  entity_ref: {
    type: string;
    id: string;
  };
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'recruiter' | 'partner_manager' | 'finance';
  region: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploaded_at: string;
}

export interface TimelineEntry {
  date: string;
  stage: string;
  notes: string;
  user_id: string;
}

export interface Adjustment {
  amount: number;
  reason: string;
  date: string;
}

export interface LineItem {
  description: string;
  amount: number;
  quantity: number;
}

export type StudentStage = 'new' | 'contacted' | 'qualified' | 'referred' | 'in_process' | 'placed' | 'enrolled';
export type ReferralStage = 'shared' | 'accepted' | 'enrolled' | 'fee_realized' | 'interviewing' | 'offered' | 'joined' | 'retained_30' | 'retained_90';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}