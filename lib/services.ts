import { config } from './config';
import { MockAPI } from './mock-api';
import { 
  Student, Partner, Program, Job, Referral, CommissionLedger, 
  Invoice, Task, User, ApiResponse, ListResponse 
} from './types';

// Central service layer - switch between mock and Supabase based on config
class DataService {
  private get api() {
    switch (config.DATA_SOURCE) {
      case 'mock':
        return MockAPI;
      case 'supabase':
        // TODO: Implement Supabase API
        throw new Error('Supabase integration not yet implemented');
      default:
        return MockAPI;
    }
  }

  // Auth
  async getCurrentUser(): Promise<User> {
    const response = await this.api.getMe();
    return response.data;
  }

  // Students
  async getStudents(filters: { stage?: string } = {}): Promise<Student[]> {
    const response = await this.api.getStudents(filters);
    return response.data.data;
  }

  async getStudent(id: string): Promise<Student> {
    const response = await this.api.getStudent(id);
    return response.data;
  }

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const response = await this.api.createStudent(studentData);
    return response.data;
  }

  async updateStudent(id: string, updates: Partial<Student>): Promise<Student> {
    const response = await this.api.updateStudent(id, updates);
    return response.data;
  }

  // Partners
  async getPartners(filters: { type?: 'institute' | 'employer' } = {}): Promise<Partner[]> {
    const response = await this.api.getPartners(filters);
    return response.data.data;
  }

  async getPartner(id: string): Promise<Partner> {
    const response = await this.api.getPartner(id);
    return response.data;
  }

  // Programs
  async getPrograms(filters: { partner_id?: string } = {}): Promise<Program[]> {
    const response = await this.api.getPrograms(filters);
    return response.data.data;
  }

  // Jobs
  async getJobs(filters: { partner_id?: string } = {}): Promise<Job[]> {
    const response = await this.api.getJobs(filters);
    return response.data.data;
  }

  // Referrals
  async getReferrals(filters: { 
    pipeline?: 'training' | 'job'; 
    stage?: string;
  } = {}): Promise<Referral[]> {
    const response = await this.api.getReferrals(filters);
    return response.data.data;
  }

  async createReferral(referralData: Partial<Referral>): Promise<Referral> {
    const response = await this.api.createReferral(referralData);
    return response.data;
  }

  async updateReferralStage(id: string, newStage: string): Promise<Referral> {
    const response = await this.api.updateReferralStage(id, newStage);
    return response.data;
  }

  // Tasks
  async getTasks(filters: { due?: 'today' | 'overdue' | 'upcoming' } = {}): Promise<Task[]> {
    const response = await this.api.getTasks(filters);
    return response.data.data;
  }

  // Commission Ledgers
  async getCommissionLedgers(filters: { status?: string } = {}): Promise<CommissionLedger[]> {
    const response = await this.api.getCommissionLedgers(filters);
    return response.data.data;
  }

  // Invoices
  async getInvoices(filters: { status?: string } = {}): Promise<Invoice[]> {
    const response = await this.api.getInvoices(filters);
    return response.data.data;
  }
}

export const dataService = new DataService();

// Templates
export const templates = {
  whatsapp: {
    docRequest: "Hi {name}, we need your updated resume for the {program/job} opportunity. Please share it at your earliest convenience.",
    interviewReminder: "Hi {name}, reminder about your interview for {position} at {company} scheduled for {date} at {time}. Best of luck!",
    enrollmentConfirmation: "Congratulations {name}! Your enrollment for {program} is confirmed. Classes start on {start_date}."
  },
  sms: {
    docRequest: "Hi {name}, please share your updated resume for {program/job} opportunity. Reply with document link.",
    interviewReminder: "Interview reminder: {position} at {company} on {date} at {time}. Good luck!",
    enrollmentConfirmation: "Enrollment confirmed for {program}. Classes start {start_date}."
  },
  email: {
    docRequest: {
      subject: "Document Required - {program/job} Opportunity",
      body: "Dear {name},\n\nWe have an exciting opportunity for you. Please share your updated resume to proceed.\n\nBest regards,\nReferLoop Team"
    },
    interviewReminder: {
      subject: "Interview Reminder - {position}",
      body: "Dear {name},\n\nThis is a reminder about your interview for {position} at {company} scheduled for {date} at {time}.\n\nBest of luck!\n\nReferLoop Team"
    },
    enrollmentConfirmation: {
      subject: "Enrollment Confirmed - {program}",
      body: "Dear {name},\n\nCongratulations! Your enrollment for {program} is confirmed. Classes will start on {start_date}.\n\nWelcome aboard!\n\nReferLoop Team"
    }
  }
};