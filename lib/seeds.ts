import { 
  Student, Partner, Contact, Program, Job, Referral, CommissionScheme, 
  CommissionLedger, Invoice, Activity, Task, User 
} from './types';

const cities = ['Mumbai', 'Bangalore', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'];
const skills = ['Full-stack Development', 'Data Science', 'Cloud Computing', 'Salesforce', 'QA Testing', 'UI/UX Design', 'GenAI', 'DevOps', 'Mobile Development', 'Cybersecurity'];
const studentStages = ['new', 'contacted', 'qualified', 'referred', 'in_process', 'placed', 'enrolled'] as const;
const referralStages = ['shared', 'accepted', 'enrolled', 'fee_realized', 'interviewing', 'offered', 'joined', 'retained_30', 'retained_90'] as const;

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomChoices<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function normalDistribution(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return Math.round(mean + stdDev * z0);
}

function generateUsers(): User[] {
  return [
    { id: 'user1', name: 'Admin User', role: 'admin', region: 'National' },
    { id: 'user2', name: 'Recruiter A', role: 'recruiter', region: 'North' },
    { id: 'user3', name: 'Recruiter B', role: 'recruiter', region: 'South' },
    { id: 'user4', name: 'Partner Manager', role: 'partner_manager', region: 'West' },
    { id: 'user5', name: 'Finance Lead', role: 'finance', region: 'National' },
  ];
}

function generateCommissionSchemes(): CommissionScheme[] {
  return [
    {
      id: 'scheme1',
      basis: 'percent',
      rate_or_tiers: 15,
      trigger_event: 'fee_realized',
      clawback_window_days: 30,
      split_rules: {}
    },
    {
      id: 'scheme2',
      basis: 'percent',
      rate_or_tiers: 8,
      trigger_event: 'joined',
      clawback_window_days: 90,
      split_rules: {}
    },
    {
      id: 'scheme3',
      basis: 'flat',
      rate_or_tiers: 25000,
      trigger_event: 'retained_90d',
      clawback_window_days: 60,
      split_rules: {}
    }
  ];
}

function generateStudents(): Student[] {
  const students: Student[] = [];
  const names = [
    'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Singh', 'Vikram Reddy',
    'Anita Gupta', 'Rajesh Verma', 'Kavya Nair', 'Suresh Yadav', 'Meera Joshi',
    'Arjun Mehta', 'Pooja Agarwal', 'Kiran Desai', 'Ravi Tiwari', 'Deepika Rao',
    'Manish Jain', 'Sonia Kapoor', 'Ashish Pandey', 'Neha Srivastava', 'Gaurav Mishra'
  ];

  for (let i = 0; i < 50; i++) {
    const readinessScore = Math.max(0, Math.min(100, normalDistribution(62, 15)));
    const studentSkills = randomChoices(skills, randomBetween(2, 5));
    
    students.push({
      id: `student${i + 1}`,
      name: i < names.length ? names[i] : `Student ${i + 1}`,
      phone_verified: Math.random() > 0.2,
      email_verified: Math.random() > 0.15,
      city: randomChoice(cities),
      education: randomChoice(['B.Tech', 'MCA', 'BCA', 'M.Tech', 'MBA', 'B.Sc']),
      skills: studentSkills,
      interests: randomChoices(['Technology', 'Finance', 'Healthcare', 'Education', 'E-commerce'], randomBetween(1, 3)),
      exp_years: randomBetween(0, 8),
      salary_expectation: randomBetween(300000, 1500000),
      training_budget: randomBetween(20000, 150000),
      documents: Math.random() > 0.4 ? [
        {
          id: generateId(),
          name: 'Resume.pdf',
          type: 'application/pdf',
          url: '/documents/resume.pdf',
          uploaded_at: new Date(Date.now() - randomBetween(1, 30) * 24 * 60 * 60 * 1000).toISOString()
        }
      ] : [],
      consent_flags: {
        profile_share: Math.random() > 0.2,
        whatsapp: Math.random() > 0.3
      },
      source_channel: randomChoice(['Website', 'Referral', 'Social Media', 'Cold Call', 'Event']),
      owner_user_id: randomChoice(['user2', 'user3']),
      stage: randomChoice(studentStages),
      readiness_score: readinessScore,
      created_at: new Date(Date.now() - randomBetween(1, 90) * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return students;
}

function generatePartners(): Partner[] {
  const partners: Partner[] = [];
  
  const instituteNames = [
    'Tech Academy', 'Digital Skills Institute', 'Code Bootcamp', 'Data Science Hub', 'Cloud Training Center',
    'AI Learning Institute', 'Full Stack Academy', 'Cyber Security Institute', 'Mobile Dev School', 'UX Design Academy'
  ];
  
  const employerNames = [
    'TechCorp Solutions', 'Digital Innovations Ltd', 'CloudTech Systems', 'DataFlow Analytics', 'NextGen Software',
    'AI Dynamics', 'CyberGuard Security', 'MobileTech Solutions', 'WebCraft Studios', 'InnovateTech Labs'
  ];

  // Generate Institutes
  for (let i = 0; i < 10; i++) {
    const partnerId = `partner${i + 1}`;
    partners.push({
      id: partnerId,
      type: 'institute',
      name: instituteNames[i],
      gstin: `27ABCDE${String(1234 + i).padStart(4, '0')}F1Z5`,
      website: `https://${instituteNames[i].toLowerCase().replace(/\s+/g, '')}.com`,
      hq_city: randomChoice(cities),
      payout_terms: '30 days',
      reliability_score: randomBetween(55, 92),
      is_active: true,
      contacts: generateContacts(partnerId, randomBetween(2, 4)),
      owner_user_id: 'user4'
    });
  }

  // Generate Employers
  for (let i = 10; i < 20; i++) {
    const partnerId = `partner${i + 1}`;
    partners.push({
      id: partnerId,
      type: 'employer',
      name: employerNames[i - 10],
      gstin: `27ABCDE${String(1234 + i).padStart(4, '0')}F1Z5`,
      website: `https://${employerNames[i - 10].toLowerCase().replace(/\s+/g, '')}.com`,
      hq_city: randomChoice(cities),
      payout_terms: '45 days',
      reliability_score: randomBetween(55, 92),
      is_active: true,
      contacts: generateContacts(partnerId, randomBetween(2, 4)),
      owner_user_id: 'user4'
    });
  }

  return partners;
}

function generateContacts(partnerId: string, count: number): Contact[] {
  const contacts: Contact[] = [];
  const roles = ['HR Manager', 'Recruitment Lead', 'Training Head', 'Operations Manager'];
  const names = ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Gupta', 'Vikram Singh'];

  for (let i = 0; i < count; i++) {
    contacts.push({
      id: generateId(),
      partner_id: partnerId,
      name: randomChoice(names),
      role: randomChoice(roles),
      phone: `+91 ${randomBetween(70000, 99999)} ${randomBetween(10000, 99999)}`,
      email: `contact${i + 1}@partner.com`,
      whatsapp_optin: Math.random() > 0.3,
      preferred_hours: randomChoice(['9-12', '12-15', '15-18', '9-18'])
    });
  }

  return contacts;
}

function generatePrograms(partners: Partner[]): Program[] {
  const programs: Program[] = [];
  const programTitles = [
    'Full Stack Development', 'Data Science Bootcamp', 'Cloud Computing Certification',
    'AI/ML Specialization', 'Cybersecurity Course', 'Mobile App Development',
    'UI/UX Design Program', 'DevOps Engineering', 'Salesforce Administration'
  ];

  partners.filter(p => p.type === 'institute').forEach(partner => {
    for (let i = 0; i < randomBetween(3, 5); i++) {
      const startDates = [];
      for (let j = 0; j < randomBetween(2, 4); j++) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + randomBetween(7, 90));
        startDates.push(futureDate.toISOString().split('T')[0]);
      }

      programs.push({
        id: generateId(),
        partner_id: partner.id,
        title: randomChoice(programTitles),
        mode: randomChoice(['online', 'offline']),
        duration_weeks: randomBetween(8, 24),
        fee: randomBetween(25000, 120000),
        start_dates: startDates,
        eligibility: 'Graduate with basic programming knowledge',
        placement_support: Math.random() > 0.3,
        commission_scheme_id: 'scheme1'
      });
    }
  });

  return programs;
}

function generateJobs(partners: Partner[]): Job[] {
  const jobs: Job[] = [];
  const jobTitles = [
    'Software Developer', 'Data Analyst', 'Cloud Engineer', 'Frontend Developer',
    'Backend Developer', 'DevOps Engineer', 'QA Engineer', 'UI/UX Designer',
    'Product Manager', 'Business Analyst'
  ];

  partners.filter(p => p.type === 'employer').forEach(partner => {
    for (let i = 0; i < randomBetween(3, 5); i++) {
      const minCtc = randomBetween(400000, 800000);
      const maxCtc = minCtc + randomBetween(200000, 600000);

      jobs.push({
        id: generateId(),
        partner_id: partner.id,
        title: randomChoice(jobTitles),
        location: randomChoice(cities),
        work_mode: randomChoice(['Remote', 'Hybrid', 'On-site']),
        ctc_min: minCtc,
        ctc_max: maxCtc,
        must_have_skills: randomChoices(skills, randomBetween(2, 4)),
        min_exp: randomBetween(0, 5),
        openings: randomBetween(1, 10),
        commission_scheme_id: randomChoice(['scheme2', 'scheme3']),
        replacement_clawback_days: randomBetween(60, 90)
      });
    }
  });

  return jobs;
}

function generateReferrals(students: Student[], programs: Program[], jobs: Job[]): Referral[] {
  const referrals: Referral[] = [];
  
  // Training referrals (35 total)
  const trainingStages = {
    'shared': 8,
    'accepted': 10,
    'enrolled': 10,
    'fee_realized': 7
  };

  let referralCount = 0;
  Object.entries(trainingStages).forEach(([stage, count]) => {
    for (let i = 0; i < count; i++) {
      const student = randomChoice(students);
      const program = randomChoice(programs);
      
      referrals.push({
        id: `referral${++referralCount}`,
        student_id: student.id,
        target_type: 'program',
        target_id: program.id,
        pipeline: 'training',
        stage: stage as any,
        owner_user_id: student.owner_user_id,
        negotiated_terms_snapshot: { fee: program.fee },
        timeline: generateTimeline(stage),
        created_at: new Date(Date.now() - randomBetween(1, 60) * 24 * 60 * 60 * 1000).toISOString()
      });
    }
  });

  // Job referrals (25 total)
  const jobStages = {
    'shared': 6,
    'interviewing': 8,
    'offered': 5,
    'joined': 4,
    'retained_30': 1,
    'retained_90': 1
  };

  Object.entries(jobStages).forEach(([stage, count]) => {
    for (let i = 0; i < count; i++) {
      const student = randomChoice(students);
      const job = randomChoice(jobs);
      
      referrals.push({
        id: `referral${++referralCount}`,
        student_id: student.id,
        target_type: 'job',
        target_id: job.id,
        pipeline: 'job',
        stage: stage as any,
        owner_user_id: student.owner_user_id,
        negotiated_terms_snapshot: { ctc: randomBetween(job.ctc_min, job.ctc_max) },
        timeline: generateTimeline(stage),
        created_at: new Date(Date.now() - randomBetween(1, 60) * 24 * 60 * 60 * 1000).toISOString()
      });
    }
  });

  return referrals;
}

function generateTimeline(currentStage: string): any[] {
  const timeline = [];
  const stages = currentStage.includes('fee_realized') || currentStage.includes('enrolled') 
    ? ['shared', 'accepted', 'enrolled', currentStage]
    : ['shared', currentStage];

  stages.forEach((stage, index) => {
    timeline.push({
      date: new Date(Date.now() - (stages.length - index) * 7 * 24 * 60 * 60 * 1000).toISOString(),
      stage,
      notes: `Moved to ${stage} stage`,
      user_id: 'user2'
    });
  });

  return timeline;
}

function generateCommissionLedgers(referrals: Referral[]): CommissionLedger[] {
  const ledgers: CommissionLedger[] = [];
  const triggerStages = ['fee_realized', 'joined', 'retained_90'];
  
  referrals.filter(r => triggerStages.includes(r.stage)).forEach((referral, index) => {
    const amount = referral.pipeline === 'training' 
      ? (referral.negotiated_terms_snapshot.fee * 0.15)
      : randomBetween(25000, 50000);

    ledgers.push({
      id: `ledger${index + 1}`,
      referral_id: referral.id,
      expected_amount: amount,
      currency: 'INR',
      trigger_date: new Date(Date.now() - randomBetween(1, 30) * 24 * 60 * 60 * 1000).toISOString(),
      status: randomChoice(['pending', 'invoiced', 'paid']),
      adjustments: index === 0 ? [{ amount: -5000, reason: 'Early withdrawal penalty', date: new Date().toISOString() }] : []
    });
  });

  return ledgers;
}

function generateInvoices(partners: Partner[]): Invoice[] {
  const invoices: Invoice[] = [];
  
  for (let i = 0; i < 10; i++) {
    const partner = randomChoice(partners);
    const baseAmount = randomBetween(25000, 75000);
    const cgst = baseAmount * 0.09;
    const sgst = baseAmount * 0.09;
    const total = baseAmount + cgst + sgst;

    invoices.push({
      id: `invoice${i + 1}`,
      partner_id: partner.id,
      invoice_no: `INV-2024-${String(i + 1).padStart(3, '0')}`,
      date: new Date(Date.now() - randomBetween(1, 60) * 24 * 60 * 60 * 1000).toISOString(),
      line_items: [
        {
          description: 'Commission for referrals',
          amount: baseAmount,
          quantity: 1
        }
      ],
      gst_fields: {
        gstin: partner.gstin,
        sac: '998314',
        cgst,
        sgst,
        igst: 0
      },
      total,
      status: randomChoice(['sent', 'paid', 'overdue']),
      payment_refs: Math.random() > 0.5 ? [`PAY${generateId()}`] : []
    });
  }

  return invoices;
}

function generateActivitiesAndTasks(students: Student[], referrals: Referral[], partners: Partner[]): { activities: Activity[], tasks: Task[] } {
  const activities: Activity[] = [];
  const tasks: Task[] = [];
  const activityTypes = ['call', 'sms', 'whatsapp', 'email', 'meeting'] as const;
  const outcomes = ['Completed', 'No Response', 'Rescheduled', 'Interested', 'Not Interested'];

  // Generate Activities (150)
  for (let i = 0; i < 150; i++) {
    const entityType = randomChoice(['student', 'referral', 'partner']);
    let entityId: string;
    
    switch (entityType) {
      case 'student':
        entityId = randomChoice(students).id;
        break;
      case 'referral':
        entityId = randomChoice(referrals).id;
        break;
      case 'partner':
        entityId = randomChoice(partners).id;
        break;
      default:
        entityId = randomChoice(students).id;
    }

    activities.push({
      id: `activity${i + 1}`,
      type: randomChoice(activityTypes),
      outcome: randomChoice(outcomes),
      notes: `Activity notes for ${entityType} ${entityId}`,
      next_due_at: Math.random() > 0.7 ? new Date(Date.now() + randomBetween(1, 10) * 24 * 60 * 60 * 1000).toISOString() : null,
      owner_user_id: randomChoice(['user2', 'user3']),
      entity_ref: {
        type: entityType,
        id: entityId
      },
      created_at: new Date(Date.now() - randomBetween(1, 7) * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  // Generate Tasks (100)
  for (let i = 0; i < 100; i++) {
    const entityType = randomChoice(['student', 'referral', 'partner']);
    let entityId: string;
    
    switch (entityType) {
      case 'student':
        entityId = randomChoice(students).id;
        break;
      case 'referral':
        entityId = randomChoice(referrals).id;
        break;
      case 'partner':
        entityId = randomChoice(partners).id;
        break;
      default:
        entityId = randomChoice(students).id;
    }

    const dueDate = new Date();
    const dayOffset = randomBetween(-7, 10); // Past week to next 10 days
    dueDate.setDate(dueDate.getDate() + dayOffset);

    tasks.push({
      id: `task${i + 1}`,
      type: randomChoice(activityTypes),
      outcome: dayOffset < 0 ? randomChoice(outcomes) : 'Pending',
      notes: `Task for ${entityType} ${entityId}`,
      next_due_at: dueDate.toISOString(),
      owner_user_id: randomChoice(['user2', 'user3']),
      entity_ref: {
        type: entityType,
        id: entityId
      },
      created_at: new Date(Date.now() - randomBetween(1, 14) * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return { activities, tasks };
}

export function generateSeeds() {
  const users = generateUsers();
  const commissionSchemes = generateCommissionSchemes();
  const students = generateStudents();
  const partners = generatePartners();
  const programs = generatePrograms(partners);
  const jobs = generateJobs(partners);
  const referrals = generateReferrals(students, programs, jobs);
  const commissionLedgers = generateCommissionLedgers(referrals);
  const invoices = generateInvoices(partners);
  const { activities, tasks } = generateActivitiesAndTasks(students, referrals, partners);

  return {
    users,
    commissionSchemes,
    students,
    partners,
    programs,
    jobs,
    referrals,
    commissionLedgers,
    invoices,
    activities,
    tasks
  };
}