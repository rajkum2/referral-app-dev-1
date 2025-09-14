import { storage } from './storage';
import { config } from './config';
import { 
  Student, Partner, Program, Job, Referral, CommissionLedger, 
  Invoice, Activity, Task, User, ApiResponse, ListResponse 
} from './types';

// Simulate network delay and random errors
async function simulateNetwork<T>(data: T): Promise<T> {
  const delay = Math.random() * (config.API_BASE_DELAY.max - config.API_BASE_DELAY.min) + config.API_BASE_DELAY.min;
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  if (Math.random() < config.ERROR_RATE) {
    throw new Error('Network error occurred');
  }
  
  return data;
}

// Business Rules
class BusinessRules {
  static canTransitionStage(currentStage: string, newStage: string, isManager: boolean = false): boolean {
    const studentStageOrder = ['new', 'contacted', 'qualified', 'referred', 'in_process', 'placed', 'enrolled'];
    const referralTrainingOrder = ['shared', 'accepted', 'enrolled', 'fee_realized'];
    const referralJobOrder = ['shared', 'interviewing', 'offered', 'joined', 'retained_30', 'retained_90'];
    
    let stageOrder: string[] = [];
    
    if (studentStageOrder.includes(currentStage)) {
      stageOrder = studentStageOrder;
    } else if (referralTrainingOrder.includes(currentStage)) {
      stageOrder = referralTrainingOrder;
    } else if (referralJobOrder.includes(currentStage)) {
      stageOrder = referralJobOrder;
    }
    
    if (isManager) return true; // Managers can override
    
    const currentIndex = stageOrder.indexOf(currentStage);
    const newIndex = stageOrder.indexOf(newStage);
    
    return newIndex > currentIndex; // Only forward transitions
  }

  static checkConsentForReferral(student: Student): { canRefer: boolean; message?: string } {
    if (!student.consent_flags.profile_share) {
      return {
        canRefer: false,
        message: 'Student has not consented to profile sharing. Please update consent settings.'
      };
    }
    return { canRefer: true };
  }

  static checkDuplicateStudent(students: Student[], phone: string, email: string, excludeId?: string): Student | null {
    return students.find(s => 
      s.id !== excludeId && 
      (s.phone_verified && phone && s.phone_verified === phone || 
       s.email_verified && email && s.email_verified === email)
    ) || null;
  }

  static shouldCreateCommissionLedger(referral: Referral, schemes: any[]): boolean {
    const scheme = schemes.find(s => s.id === referral.target_id);
    if (!scheme) return false;

    const triggerStages = ['fee_realized', 'joined', 'retained_90'];
    return triggerStages.includes(referral.stage);
  }
}

// Mock API Implementation
export class MockAPI {
  // Auth
  static async getMe(): Promise<ApiResponse<User>> {
    const users = storage.get<User[]>('users') || [];
    const currentUser = users[0]; // Default to first user
    
    return simulateNetwork({
      data: currentUser,
      success: true
    });
  }

  // Students
  static async getStudents(filters: { stage?: string } = {}): Promise<ApiResponse<ListResponse<Student>>> {
    let students = storage.get<Student[]>('students') || [];
    
    if (filters.stage) {
      students = students.filter(s => s.stage === filters.stage);
    }
    
    return simulateNetwork({
      data: {
        data: students,
        total: students.length,
        page: 1,
        limit: 50
      },
      success: true
    });
  }

  static async getStudent(id: string): Promise<ApiResponse<Student>> {
    const students = storage.get<Student[]>('students') || [];
    const student = students.find(s => s.id === id);
    
    if (!student) {
      throw new Error('Student not found');
    }
    
    return simulateNetwork({
      data: student,
      success: true
    });
  }

  static async createStudent(studentData: Partial<Student>): Promise<ApiResponse<Student>> {
    const students = storage.get<Student[]>('students') || [];
    
    // Check for duplicates
    if (studentData.phone_verified || studentData.email_verified) {
      const duplicate = BusinessRules.checkDuplicateStudent(
        students, 
        studentData.phone_verified as any, 
        studentData.email_verified as any
      );
      
      if (duplicate) {
        throw new Error(`Duplicate student found: ${duplicate.name}. Please merge or update existing record.`);
      }
    }
    
    const newStudent: Student = {
      id: `student${Date.now()}`,
      name: studentData.name || '',
      phone_verified: studentData.phone_verified || false,
      email_verified: studentData.email_verified || false,
      city: studentData.city || '',
      education: studentData.education || '',
      skills: studentData.skills || [],
      interests: studentData.interests || [],
      exp_years: studentData.exp_years || 0,
      salary_expectation: studentData.salary_expectation || 0,
      training_budget: studentData.training_budget || 0,
      documents: studentData.documents || [],
      consent_flags: studentData.consent_flags || { profile_share: false, whatsapp: false },
      source_channel: studentData.source_channel || 'Direct',
      owner_user_id: studentData.owner_user_id || 'user2',
      stage: 'new',
      readiness_score: studentData.readiness_score || 50,
      created_at: new Date().toISOString()
    };
    
    students.push(newStudent);
    storage.set('students', students);
    
    return simulateNetwork({
      data: newStudent,
      success: true
    });
  }

  static async updateStudent(id: string, updates: Partial<Student>): Promise<ApiResponse<Student>> {
    const students = storage.get<Student[]>('students') || [];
    const index = students.findIndex(s => s.id === id);
    
    if (index === -1) {
      throw new Error('Student not found');
    }
    
    // Stage transition validation
    if (updates.stage && updates.stage !== students[index].stage) {
      if (!BusinessRules.canTransitionStage(students[index].stage, updates.stage)) {
        throw new Error('Invalid stage transition. Stages can only move forward.');
      }
    }
    
    students[index] = { ...students[index], ...updates };
    storage.set('students', students);
    
    return simulateNetwork({
      data: students[index],
      success: true
    });
  }

  // Partners
  static async getPartners(filters: { type?: 'institute' | 'employer' } = {}): Promise<ApiResponse<ListResponse<Partner>>> {
    let partners = storage.get<Partner[]>('partners') || [];
    
    if (filters.type) {
      partners = partners.filter(p => p.type === filters.type);
    }
    
    return simulateNetwork({
      data: {
        data: partners,
        total: partners.length,
        page: 1,
        limit: 50
      },
      success: true
    });
  }

  static async getPartner(id: string): Promise<ApiResponse<Partner>> {
    const partners = storage.get<Partner[]>('partners') || [];
    const partner = partners.find(p => p.id === id);
    
    if (!partner) {
      throw new Error('Partner not found');
    }
    
    return simulateNetwork({
      data: partner,
      success: true
    });
  }

  // Programs
  static async getPrograms(filters: { partner_id?: string } = {}): Promise<ApiResponse<ListResponse<Program>>> {
    let programs = storage.get<Program[]>('programs') || [];
    
    if (filters.partner_id) {
      programs = programs.filter(p => p.partner_id === filters.partner_id);
    }
    
    return simulateNetwork({
      data: {
        data: programs,
        total: programs.length,
        page: 1,
        limit: 50
      },
      success: true
    });
  }

  // Jobs
  static async getJobs(filters: { partner_id?: string } = {}): Promise<ApiResponse<ListResponse<Job>>> {
    let jobs = storage.get<Job[]>('jobs') || [];
    
    if (filters.partner_id) {
      jobs = jobs.filter(j => j.partner_id === filters.partner_id);
    }
    
    return simulateNetwork({
      data: {
        data: jobs,
        total: jobs.length,
        page: 1,
        limit: 50
      },
      success: true
    });
  }

  // Referrals
  static async getReferrals(filters: { 
    pipeline?: 'training' | 'job'; 
    stage?: string;
  } = {}): Promise<ApiResponse<ListResponse<Referral>>> {
    let referrals = storage.get<Referral[]>('referrals') || [];
    
    if (filters.pipeline) {
      referrals = referrals.filter(r => r.pipeline === filters.pipeline);
    }
    
    if (filters.stage) {
      const stages = filters.stage.split(',');
      referrals = referrals.filter(r => stages.includes(r.stage));
    }
    
    return simulateNetwork({
      data: {
        data: referrals,
        total: referrals.length,
        page: 1,
        limit: 50
      },
      success: true
    });
  }

  static async createReferral(referralData: Partial<Referral>): Promise<ApiResponse<Referral>> {
    const students = storage.get<Student[]>('students') || [];
    const student = students.find(s => s.id === referralData.student_id);
    
    if (!student) {
      throw new Error('Student not found');
    }
    
    // Check consent
    const consentCheck = BusinessRules.checkConsentForReferral(student);
    if (!consentCheck.canRefer) {
      throw new Error(consentCheck.message!);
    }
    
    const referrals = storage.get<Referral[]>('referrals') || [];
    const newReferral: Referral = {
      id: `referral${Date.now()}`,
      student_id: referralData.student_id!,
      target_type: referralData.target_type!,
      target_id: referralData.target_id!,
      pipeline: referralData.pipeline!,
      stage: 'shared',
      owner_user_id: referralData.owner_user_id || 'user2',
      negotiated_terms_snapshot: referralData.negotiated_terms_snapshot || {},
      timeline: [{
        date: new Date().toISOString(),
        stage: 'shared',
        notes: 'Referral created',
        user_id: referralData.owner_user_id || 'user2'
      }],
      created_at: new Date().toISOString()
    };
    
    referrals.push(newReferral);
    storage.set('referrals', referrals);
    
    return simulateNetwork({
      data: newReferral,
      success: true
    });
  }

  static async updateReferralStage(id: string, newStage: string): Promise<ApiResponse<Referral>> {
    const referrals = storage.get<Referral[]>('referrals') || [];
    const index = referrals.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Referral not found');
    }
    
    const referral = referrals[index];
    
    // Validate stage transition
    if (!BusinessRules.canTransitionStage(referral.stage, newStage)) {
      throw new Error('Invalid stage transition');
    }
    
    // Update referral
    referral.stage = newStage as any;
    referral.timeline.push({
      date: new Date().toISOString(),
      stage: newStage,
      notes: `Stage updated to ${newStage}`,
      user_id: 'user2'
    });
    
    // Auto-create commission ledger if needed
    const schemes = storage.get('commissionSchemes') || [];
    if (BusinessRules.shouldCreateCommissionLedger(referral, schemes)) {
      // This would create a commission ledger entry
      console.log('Commission ledger should be created for referral:', id);
    }
    
    storage.set('referrals', referrals);
    
    return simulateNetwork({
      data: referral,
      success: true
    });
  }

  // Tasks
  static async getTasks(filters: { due?: 'today' | 'overdue' | 'upcoming' } = {}): Promise<ApiResponse<ListResponse<Task>>> {
    let tasks = storage.get<Task[]>('tasks') || [];
    
    if (filters.due) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      tasks = tasks.filter(task => {
        if (!task.next_due_at) return false;
        const dueDate = new Date(task.next_due_at);
        
        switch (filters.due) {
          case 'today':
            return dueDate >= today && dueDate < tomorrow;
          case 'overdue':
            return dueDate < today;
          case 'upcoming':
            return dueDate >= tomorrow;
          default:
            return true;
        }
      });
    }
    
    return simulateNetwork({
      data: {
        data: tasks,
        total: tasks.length,
        page: 1,
        limit: 50
      },
      success: true
    });
  }

  // Commission Ledgers
  static async getCommissionLedgers(filters: { status?: string } = {}): Promise<ApiResponse<ListResponse<CommissionLedger>>> {
    let ledgers = storage.get<CommissionLedger[]>('commissionLedgers') || [];
    
    if (filters.status) {
      ledgers = ledgers.filter(l => l.status === filters.status);
    }
    
    return simulateNetwork({
      data: {
        data: ledgers,
        total: ledgers.length,
        page: 1,
        limit: 50
      },
      success: true
    });
  }

  // Invoices
  static async getInvoices(filters: { status?: string } = {}): Promise<ApiResponse<ListResponse<Invoice>>> {
    let invoices = storage.get<Invoice[]>('invoices') || [];
    
    if (filters.status) {
      invoices = invoices.filter(i => i.status === filters.status);
    }
    
    return simulateNetwork({
      data: {
        data: invoices,
        total: invoices.length,
        page: 1,
        limit: 50
      },
      success: true
    });
  }
}