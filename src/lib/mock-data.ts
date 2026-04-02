import {
  AdminStats,
  Attendance,
  Certificate,
  Course,
  Exam,
  ExamResult,
  Group,
  Homework,
  Level,
  Mentor,
  MentorStats,
  Notification,
  Payment,
  Student,
  StudentStats,
  Submission,
  SuperAdminStats,
  Unit,
  User,
  VocabWord,
} from "./types";

// ============================
// USERS
// ============================

export const mockUsers: User[] = [
  {
    id: "sa1",
    name: "Sardor Rashidov",
    email: "superadmin@academy.uz",
    phone: "+998901234567",
    role: "superadmin",
    avatar: "",
    isActive: true,
    createdAt: "2024-01-01",
  },
  {
    id: "a1",
    name: "Aziz Karimov",
    email: "admin@academy.uz",
    phone: "+998901234568",
    role: "admin",
    avatar: "",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "m1",
    name: "Dilnoza Yusupova",
    email: "mentor1@academy.uz",
    phone: "+998901234569",
    role: "mentor",
    avatar: "",
    isActive: true,
    createdAt: "2024-02-01",
  },
  {
    id: "m2",
    name: "Jasur Toshmatov",
    email: "mentor2@academy.uz",
    phone: "+998901234570",
    role: "mentor",
    avatar: "",
    isActive: true,
    createdAt: "2024-02-10",
  },
  {
    id: "s1",
    name: "Malika Rahimova",
    email: "student1@academy.uz",
    phone: "+998901234571",
    role: "student",
    avatar: "",
    isActive: true,
    createdAt: "2024-03-01",
  },
];

export const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Malika Rahimova",
    email: "malika@student.uz",
    phone: "+998901234571",
    role: "student",
    isActive: true,
    createdAt: "2024-03-01",
    groupIds: ["g1"],
    level: "B2",
    streak: 12,
    totalScore: 847,
  },
  {
    id: "s2",
    name: "Bobur Xoliqov",
    email: "bobur@student.uz",
    phone: "+998901234572",
    role: "student",
    isActive: true,
    createdAt: "2024-03-05",
    groupIds: ["g1"],
    level: "B1",
    streak: 7,
    totalScore: 723,
  },
  {
    id: "s3",
    name: "Nodira Alimova",
    email: "nodira@student.uz",
    phone: "+998901234573",
    role: "student",
    isActive: true,
    createdAt: "2024-03-10",
    groupIds: ["g2"],
    level: "A2",
    streak: 3,
    totalScore: 456,
  },
  {
    id: "s4",
    name: "Sherzod Mirzayev",
    email: "sherzod@student.uz",
    phone: "+998901234574",
    role: "student",
    isActive: true,
    createdAt: "2024-03-12",
    groupIds: ["g2"],
    level: "B2",
    streak: 21,
    totalScore: 912,
  },
  {
    id: "s5",
    name: "Zulfiya Nazarova",
    email: "zulfiya@student.uz",
    phone: "+998901234575",
    role: "student",
    isActive: true,
    createdAt: "2024-03-15",
    groupIds: ["g3"],
    level: "C1",
    streak: 45,
    totalScore: 978,
  },
  {
    id: "s6",
    name: "Akbar Tursunov",
    email: "akbar@student.uz",
    phone: "+998901234576",
    role: "student",
    isActive: true,
    createdAt: "2024-03-20",
    groupIds: ["g3"],
    level: "A1",
    streak: 0,
    totalScore: 234,
  },
  {
    id: "s7",
    name: "Feruza Rashidova",
    email: "feruza@student.uz",
    phone: "+998901234577",
    role: "student",
    isActive: true,
    createdAt: "2024-04-01",
    groupIds: ["g1"],
    level: "B1",
    streak: 15,
    totalScore: 689,
  },
  {
    id: "s8",
    name: "Komil Xasanov",
    email: "komil@student.uz",
    phone: "+998901234578",
    role: "student",
    isActive: false,
    createdAt: "2024-04-05",
    groupIds: ["g2"],
    level: "A2",
    streak: 2,
    totalScore: 312,
  },
];

export const mockMentors: Mentor[] = [
  {
    id: "m1",
    name: "Dilnoza Yusupova",
    email: "dilnoza@mentor.uz",
    phone: "+998901234569",
    role: "mentor",
    isActive: true,
    createdAt: "2024-02-01",
    groupIds: ["g1", "g2"],
    specialization: ["speaking", "writing"],
  },
  {
    id: "m2",
    name: "Jasur Toshmatov",
    email: "jasur@mentor.uz",
    phone: "+998901234570",
    role: "mentor",
    isActive: true,
    createdAt: "2024-02-10",
    groupIds: ["g3"],
    specialization: ["grammar", "vocabulary"],
  },
  {
    id: "m3",
    name: "Gulnora Saidova",
    email: "gulnora@mentor.uz",
    phone: "+998901234580",
    role: "mentor",
    isActive: true,
    createdAt: "2024-02-15",
    groupIds: ["g4"],
    specialization: ["reading", "listening"],
  },
];

// ============================
// COURSES
// ============================

export const mockCourses: Course[] = [
  {
    id: "c1",
    title: "IELTS Academic Preparation",
    description: "IELTS Academic imtihoniga to'liq tayyorgarlik kursi. Band 7+ maqsadi.",
    level: "B2",
    isPublished: true,
    createdBy: "a1",
    unitCount: 12,
    estimatedHours: 120,
  },
  {
    id: "c2",
    title: "General English — Beginner",
    description: "Ingliz tilini noldan o'rganish uchun asosiy kurs. A1-A2 darajasi.",
    level: "A1",
    isPublished: true,
    createdBy: "a1",
    unitCount: 8,
    estimatedHours: 80,
  },
  {
    id: "c3",
    title: "Business English",
    description: "Biznes muhitida professional muloqot ko'nikmalari. B1-B2 darajasi.",
    level: "B1",
    isPublished: true,
    createdBy: "a1",
    unitCount: 10,
    estimatedHours: 100,
  },
  {
    id: "c4",
    title: "Advanced Communication",
    description: "Yuqori darajadagi nutq va yozish ko'nikmalari. C1-C2 darajasi.",
    level: "C1",
    isPublished: false,
    createdBy: "a1",
    unitCount: 6,
    estimatedHours: 60,
  },
];

// ============================
// UNITS
// ============================

export const mockUnits: Unit[] = [
  {
    id: "u1",
    courseId: "c1",
    title: "Reading Foundations",
    description: "Academic reading strategies and comprehension techniques",
    order: 1,
    level: "B2",
    isPublished: true,
    skillsIncluded: ["reading", "vocabulary"],
    estimatedHours: 10,
    isUnlocked: true,
    completionScore: 85,
    lessonCount: 6,
  },
  {
    id: "u2",
    courseId: "c1",
    title: "Listening Mastery",
    description: "Academic listening with note-taking and comprehension",
    order: 2,
    level: "B2",
    isPublished: true,
    unlockAfterUnitId: "u1",
    skillsIncluded: ["listening", "vocabulary"],
    estimatedHours: 10,
    isUnlocked: true,
    completionScore: 72,
    lessonCount: 5,
  },
  {
    id: "u3",
    courseId: "c1",
    title: "Academic Writing Task 1",
    description: "Graphs, charts and data description writing",
    order: 3,
    level: "B2",
    isPublished: true,
    unlockAfterUnitId: "u2",
    skillsIncluded: ["writing", "grammar"],
    estimatedHours: 12,
    isUnlocked: false,
    lessonCount: 7,
  },
  {
    id: "u4",
    courseId: "c1",
    title: "Speaking Fluency",
    description: "IELTS Speaking part 1, 2, 3 practice",
    order: 4,
    level: "B2",
    isPublished: true,
    unlockAfterUnitId: "u3",
    skillsIncluded: ["speaking", "vocabulary"],
    estimatedHours: 8,
    isUnlocked: false,
    lessonCount: 5,
  },
];

// ============================
// GROUPS
// ============================

export const mockGroups: Group[] = [
  {
    id: "g1",
    name: "IELTS Advanced — Guruh A",
    level: "B2",
    mentorId: "m1",
    mentorName: "Dilnoza Yusupova",
    courseId: "c1",
    courseName: "IELTS Academic Preparation",
    maxStudents: 12,
    currentStudents: 8,
    schedule: {
      days: ["Dushanba", "Chorshanba", "Juma"],
      startTime: "09:00",
      endTime: "11:00",
      room: "Xona 101",
    },
    isActive: true,
  },
  {
    id: "g2",
    name: "Beginners — Guruh B",
    level: "A1",
    mentorId: "m1",
    mentorName: "Dilnoza Yusupova",
    courseId: "c2",
    courseName: "General English — Beginner",
    maxStudents: 10,
    currentStudents: 9,
    schedule: {
      days: ["Seshanba", "Payshanba"],
      startTime: "14:00",
      endTime: "16:00",
      room: "Xona 102",
    },
    isActive: true,
  },
  {
    id: "g3",
    name: "Business English — Guruh C",
    level: "B1",
    mentorId: "m2",
    mentorName: "Jasur Toshmatov",
    courseId: "c3",
    courseName: "Business English",
    maxStudents: 15,
    currentStudents: 11,
    schedule: {
      days: ["Dushanba", "Chorshanba"],
      startTime: "17:00",
      endTime: "19:00",
      room: "Xona 201",
    },
    isActive: true,
  },
  {
    id: "g4",
    name: "Advanced Communication — Guruh D",
    level: "C1",
    mentorId: "m3",
    mentorName: "Gulnora Saidova",
    courseId: "c4",
    courseName: "Advanced Communication",
    maxStudents: 8,
    currentStudents: 5,
    schedule: {
      days: ["Seshanba", "Shanba"],
      startTime: "10:00",
      endTime: "12:00",
      room: "Xona 301",
    },
    isActive: true,
  },
];

// ============================
// HOMEWORK
// ============================

export const mockHomework: Homework[] = [
  {
    id: "hw1",
    mentorId: "m1",
    groupId: "g1",
    title: "IELTS Writing Task 2 — Essay",
    description:
      "Write an essay on the topic: 'Technology has made people less creative. To what extent do you agree or disagree?' Minimum 250 words.",
    deadline: "2025-02-10T23:59:00",
    maxScore: 100,
    type: "writing",
    isPublished: true,
    createdAt: "2025-02-05",
    submissionCount: 6,
    totalStudents: 8,
  },
  {
    id: "hw2",
    mentorId: "m1",
    groupId: "g1",
    title: "Speaking Task — Describe a Place",
    description: "Record a 2-minute audio describing your favorite place. Use IELTS Speaking Part 2 format.",
    deadline: "2025-02-12T23:59:00",
    maxScore: 100,
    type: "speaking",
    isPublished: true,
    createdAt: "2025-02-07",
    submissionCount: 4,
    totalStudents: 8,
  },
  {
    id: "hw3",
    mentorId: "m2",
    groupId: "g3",
    title: "Business Email Writing",
    description: "Write a professional email requesting a meeting with a client. Follow formal email structure.",
    deadline: "2025-02-15T23:59:00",
    maxScore: 50,
    type: "writing",
    isPublished: true,
    createdAt: "2025-02-09",
    submissionCount: 8,
    totalStudents: 11,
  },
];

// ============================
// SUBMISSIONS
// ============================

export const mockSubmissions: Submission[] = [
  {
    id: "sub1",
    homeworkId: "hw1",
    studentId: "s1",
    studentName: "Malika Rahimova",
    content:
      "In today's digital world, technology has undeniably transformed the way we live and work. However, the claim that it has made people less creative is a contentious one...",
    submittedAt: "2025-02-09T14:30:00",
    score: 82,
    feedback: "Excellent structure and vocabulary. Work on coherence in paragraph 3.",
    status: "graded",
  },
  {
    id: "sub2",
    homeworkId: "hw1",
    studentId: "s2",
    studentName: "Bobur Xoliqov",
    content: "Technology is everywhere nowadays. Many people think it makes us less creative...",
    submittedAt: "2025-02-10T22:45:00",
    status: "submitted",
  },
  {
    id: "sub3",
    homeworkId: "hw1",
    studentId: "s7",
    studentName: "Feruza Rashidova",
    content: "The relationship between technology and creativity is complex...",
    submittedAt: "2025-02-08T10:00:00",
    score: 91,
    feedback: "Outstanding essay! Very well-argued. Minor grammar issues.",
    status: "graded",
  },
];

// ============================
// EXAMS
// ============================

export const mockExams: Exam[] = [
  {
    id: "e1",
    unitId: "u1",
    title: "Unit 1 — Reading & Vocabulary Test",
    type: "unit_test",
    timeLimitMin: 60,
    passingScore: 70,
    attemptsAllowed: 2,
    isActive: true,
    questionCount: 40,
  },
  {
    id: "e2",
    unitId: "u2",
    title: "Unit 2 — Listening Test",
    type: "unit_test",
    timeLimitMin: 45,
    passingScore: 70,
    attemptsAllowed: 2,
    isActive: true,
    questionCount: 30,
  },
  {
    id: "e3",
    title: "Progress Test — Units 1-4",
    type: "progress_test",
    timeLimitMin: 90,
    passingScore: 65,
    attemptsAllowed: 1,
    isActive: false,
    questionCount: 80,
  },
  {
    id: "e4",
    title: "Placement Test",
    type: "placement_test",
    timeLimitMin: 60,
    passingScore: 0,
    attemptsAllowed: 1,
    isActive: true,
    questionCount: 50,
  },
];

export const mockExamResults: ExamResult[] = [
  {
    id: "er1",
    examId: "e1",
    studentId: "s1",
    studentName: "Malika Rahimova",
    score: 85,
    totalPoints: 100,
    percentage: 85,
    answers: {},
    startedAt: "2025-02-05T09:00:00",
    finishedAt: "2025-02-05T09:55:00",
    attempt: 1,
    passed: true,
    skillScores: { reading: 90, vocabulary: 80, listening: 0, writing: 0, speaking: 0, grammar: 0 },
  },
  {
    id: "er2",
    examId: "e1",
    studentId: "s2",
    studentName: "Bobur Xoliqov",
    score: 64,
    totalPoints: 100,
    percentage: 64,
    answers: {},
    startedAt: "2025-02-05T09:00:00",
    finishedAt: "2025-02-05T10:00:00",
    attempt: 1,
    passed: false,
    skillScores: { reading: 70, vocabulary: 58, listening: 0, writing: 0, speaking: 0, grammar: 0 },
  },
];

// ============================
// ATTENDANCE
// ============================

export const mockAttendance: Attendance[] = [
  { id: "at1", groupId: "g1", studentId: "s1", date: "2025-02-03", status: "present", markedBy: "m1" },
  { id: "at2", groupId: "g1", studentId: "s2", date: "2025-02-03", status: "present", markedBy: "m1" },
  { id: "at3", groupId: "g1", studentId: "s7", date: "2025-02-03", status: "absent", markedBy: "m1" },
  { id: "at4", groupId: "g1", studentId: "s1", date: "2025-02-05", status: "present", markedBy: "m1" },
  { id: "at5", groupId: "g1", studentId: "s2", date: "2025-02-05", status: "late", markedBy: "m1" },
  { id: "at6", groupId: "g1", studentId: "s7", date: "2025-02-05", status: "present", markedBy: "m1" },
  { id: "at7", groupId: "g2", studentId: "s3", date: "2025-02-04", status: "present", markedBy: "m1" },
  { id: "at8", groupId: "g2", studentId: "s4", date: "2025-02-04", status: "excused", markedBy: "m1" },
];

// ============================
// PAYMENTS
// ============================

export const mockPayments: Payment[] = [
  {
    id: "p1",
    studentId: "s1",
    studentName: "Malika Rahimova",
    groupName: "IELTS Advanced — Guruh A",
    amount: 800000,
    month: "2025-02",
    status: "paid",
    paidDate: "2025-02-03",
    createdAt: "2025-02-01",
  },
  {
    id: "p2",
    studentId: "s2",
    studentName: "Bobur Xoliqov",
    groupName: "IELTS Advanced — Guruh A",
    amount: 800000,
    month: "2025-02",
    status: "unpaid",
    createdAt: "2025-02-01",
  },
  {
    id: "p3",
    studentId: "s7",
    studentName: "Feruza Rashidova",
    groupName: "IELTS Advanced — Guruh A",
    amount: 800000,
    month: "2025-02",
    status: "partial",
    note: "400,000 so'm to'landi, qolgan qismi 15-fevralgacha",
    createdAt: "2025-02-01",
  },
  {
    id: "p4",
    studentId: "s3",
    studentName: "Nodira Alimova",
    groupName: "Beginners — Guruh B",
    amount: 600000,
    month: "2025-02",
    status: "paid",
    paidDate: "2025-02-02",
    createdAt: "2025-02-01",
  },
  {
    id: "p5",
    studentId: "s4",
    studentName: "Sherzod Mirzayev",
    groupName: "Beginners — Guruh B",
    amount: 600000,
    month: "2025-02",
    status: "paid",
    paidDate: "2025-02-01",
    createdAt: "2025-02-01",
  },
  {
    id: "p6",
    studentId: "s8",
    studentName: "Komil Xasanov",
    groupName: "Beginners — Guruh B",
    amount: 600000,
    month: "2025-02",
    status: "unpaid",
    createdAt: "2025-02-01",
  },
];

// ============================
// VOCABULARY
// ============================

export const mockVocabulary: VocabWord[] = [
  {
    id: "v1",
    word: "accomplish",
    translation: "amalga oshirmoq",
    definition: "to succeed in doing or completing something",
    example: "She accomplished all her goals this year.",
    level: "B2",
    unitId: "u1",
    mastered: false,
    reviewCount: 3,
  },
  {
    id: "v2",
    word: "consequently",
    translation: "natijada, shuning uchun",
    definition: "as a result; therefore",
    example: "He didn't study, and consequently, he failed the exam.",
    level: "B2",
    unitId: "u1",
    mastered: true,
    reviewCount: 7,
  },
  {
    id: "v3",
    word: "substantial",
    translation: "muhim, sezilarli",
    definition: "of considerable importance, size, or worth",
    example: "There has been substantial improvement in her writing.",
    level: "B2",
    unitId: "u1",
    mastered: false,
    reviewCount: 2,
  },
  {
    id: "v4",
    word: "enhance",
    translation: "yaxshilamoq, oshirmoq",
    definition: "to improve the quality, amount, or value of something",
    example: "Regular practice can enhance your speaking skills.",
    level: "B1",
    mastered: true,
    reviewCount: 5,
  },
  {
    id: "v5",
    word: "advocate",
    translation: "himoya qilmoq, tarafdor",
    definition: "to publicly support or recommend a particular cause or policy",
    example: "Many educators advocate for smaller class sizes.",
    level: "C1",
    mastered: false,
    reviewCount: 1,
  },
  {
    id: "v6",
    word: "perseverance",
    translation: "qat'iyat, bardosh",
    definition: "continued effort to do or achieve something despite difficulty",
    example: "Success often requires perseverance and hard work.",
    level: "B2",
    mastered: false,
    reviewCount: 0,
  },
];

// ============================
// NOTIFICATIONS
// ============================

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    userId: "s1",
    type: "new_homework",
    title: "Yangi vazifa berildi",
    message: "\"IELTS Writing Task 2\" vazifasi berildi. Muddat: 10-fevral.",
    isRead: false,
    createdAt: "2025-02-05T10:00:00",
    link: "/student/homework/hw1",
  },
  {
    id: "n2",
    userId: "s1",
    type: "grade_posted",
    title: "Baho qo'yildi",
    message: "\"Unit 1 Test\" imtihonidan 85 ball oldingiz. Tabriklaymiz!",
    isRead: false,
    createdAt: "2025-02-06T14:30:00",
    link: "/student/exams",
  },
  {
    id: "n3",
    userId: "s1",
    type: "deadline_reminder",
    title: "Deadline yaqinlashmoqda",
    message: "\"Speaking Task\" vazifasining muddati 24 soat qoldi.",
    isRead: true,
    createdAt: "2025-02-11T10:00:00",
    link: "/student/homework/hw2",
  },
  {
    id: "n4",
    userId: "m1",
    type: "new_homework",
    title: "Yangi topshiriq keldi",
    message: "Malika Rahimova \"IELTS Writing Task 2\" vazifasini topshirdi.",
    isRead: false,
    createdAt: "2025-02-09T14:30:00",
    link: "/mentor/homework/hw1/grade",
  },
];

// ============================
// CERTIFICATES
// ============================

export const mockCertificates: Certificate[] = [
  {
    id: "cert1",
    studentId: "s1",
    studentName: "Malika Rahimova",
    unitId: "u1",
    courseName: "IELTS Academic Preparation",
    level: "B2",
    issuedAt: "2025-02-10",
    verifyCode: "CERT-2025-001-ABC",
  },
  {
    id: "cert2",
    studentId: "s5",
    studentName: "Zulfiya Nazarova",
    courseName: "Advanced Communication",
    level: "C1",
    issuedAt: "2025-01-25",
    verifyCode: "CERT-2025-002-XYZ",
  },
];

// ============================
// DASHBOARD STATS
// ============================

export const mockAdminStats: AdminStats = {
  totalStudents: 156,
  activeStudents: 143,
  totalMentors: 8,
  totalGroups: 12,
  pendingPayments: 23,
  paidPayments: 133,
  totalRevenue: 98400000,
  upcomingExams: 4,
  recentSubmissions: mockSubmissions,
  todaySchedule: [
    {
      id: "ts1",
      groupName: "IELTS Advanced — Guruh A",
      level: "B2",
      mentorName: "Dilnoza Yusupova",
      startTime: "09:00",
      endTime: "11:00",
      room: "Xona 101",
      day: "Dushanba",
    },
    {
      id: "ts2",
      groupName: "Business English — Guruh C",
      level: "B1",
      mentorName: "Jasur Toshmatov",
      startTime: "17:00",
      endTime: "19:00",
      room: "Xona 201",
      day: "Dushanba",
    },
    {
      id: "ts3",
      groupName: "IELTS Advanced — Guruh A",
      level: "B2",
      mentorName: "Dilnoza Yusupova",
      startTime: "11:00",
      endTime: "13:00",
      room: "Xona 102",
      day: "Dushanba",
    },
  ],
  topStudents: [
    { id: "s5", name: "Zulfiya Nazarova", score: 978, level: "C1", groupName: "Advanced Com." },
    { id: "s4", name: "Sherzod Mirzayev", score: 912, level: "B2", groupName: "Beginners B" },
    { id: "s1", name: "Malika Rahimova", score: 847, level: "B2", groupName: "IELTS A" },
    { id: "s2", name: "Bobur Xoliqov", score: 723, level: "B1", groupName: "IELTS A" },
    { id: "s7", name: "Feruza Rashidova", score: 689, level: "B1", groupName: "IELTS A" },
  ],
  paymentByMonth: [
    { month: "Sep", paid: 12000000, unpaid: 2400000, total: 14400000 },
    { month: "Okt", paid: 13500000, unpaid: 1800000, total: 15300000 },
    { month: "Nov", paid: 14200000, unpaid: 2100000, total: 16300000 },
    { month: "Dec", paid: 15800000, unpaid: 1500000, total: 17300000 },
    { month: "Jan", paid: 16400000, unpaid: 1200000, total: 17600000 },
    { month: "Feb", paid: 16500000, unpaid: 1400000, total: 17900000 },
  ],
  groupFillRate: [
    { groupName: "IELTS A", current: 8, max: 12, percentage: 67 },
    { groupName: "Beginners B", current: 9, max: 10, percentage: 90 },
    { groupName: "Business C", current: 11, max: 15, percentage: 73 },
    { groupName: "Advanced D", current: 5, max: 8, percentage: 63 },
  ],
};

export const mockMentorStats: MentorStats = {
  totalGroups: 2,
  totalStudents: 17,
  pendingGrading: 5,
  upcomingExams: 2,
  todayLessons: mockAdminStats.todaySchedule.slice(0, 2),
  recentSubmissions: mockSubmissions,
  groupProgress: [
    { groupId: "g1", groupName: "IELTS Advanced A", averageScore: 78, completionRate: 65, studentCount: 8 },
    { groupId: "g2", groupName: "Beginners B", averageScore: 72, completionRate: 45, studentCount: 9 },
  ],
};

export const mockStudentStats: StudentStats = {
  currentLevel: "B2",
  streak: 12,
  totalLessonsCompleted: 24,
  pendingHomework: 2,
  overallProgress: 68,
  skillProgress: {
    reading: 82,
    listening: 75,
    writing: 68,
    speaking: 55,
    vocabulary: 88,
    grammar: 79,
  },
  recentGrades: [
    { subject: "Unit 1 Test", score: 85, maxScore: 100, date: "2025-02-05", skill: "reading" },
    { subject: "Writing Task 2", score: 82, maxScore: 100, date: "2025-02-09", skill: "writing" },
    { subject: "Vocabulary Quiz", score: 90, maxScore: 100, date: "2025-02-03", skill: "vocabulary" },
    { subject: "Grammar Test", score: 76, maxScore: 100, date: "2025-01-28", skill: "grammar" },
  ],
  upcomingExam: mockExams[1],
  weeklyActivity: [
    { day: "Dush", minutes: 45, lessonsCompleted: 2 },
    { day: "Sesh", minutes: 30, lessonsCompleted: 1 },
    { day: "Chor", minutes: 60, lessonsCompleted: 3 },
    { day: "Pay", minutes: 0, lessonsCompleted: 0 },
    { day: "Jum", minutes: 75, lessonsCompleted: 3 },
    { day: "Shah", minutes: 50, lessonsCompleted: 2 },
    { day: "Yak", minutes: 20, lessonsCompleted: 1 },
  ],
  certificates: 1,
};

export const mockSuperAdminStats: SuperAdminStats = {
  totalCenters: 8,
  totalAdmins: 8,
  totalMentors: 42,
  totalStudents: 1247,
  monthlyGrowth: [
    { month: "Sep", students: 980, centers: 6, revenue: 89000000 },
    { month: "Okt", students: 1050, centers: 7, revenue: 95000000 },
    { month: "Nov", students: 1120, centers: 7, revenue: 102000000 },
    { month: "Dec", students: 1180, centers: 8, revenue: 108000000 },
    { month: "Jan", students: 1215, centers: 8, revenue: 112000000 },
    { month: "Feb", students: 1247, centers: 8, revenue: 115000000 },
  ],
  centerStats: [
    { id: "c1", name: "Academy CEFR Toshkent", city: "Toshkent", studentCount: 320, mentorCount: 12, isActive: true },
    { id: "c2", name: "Academy CEFR Samarqand", city: "Samarqand", studentCount: 215, mentorCount: 8, isActive: true },
    { id: "c3", name: "Academy CEFR Buxoro", city: "Buxoro", studentCount: 180, mentorCount: 7, isActive: true },
    { id: "c4", name: "Academy CEFR Namangan", city: "Namangan", studentCount: 198, mentorCount: 6, isActive: true },
    { id: "c5", name: "Academy CEFR Andijon", city: "Andijon", studentCount: 145, mentorCount: 5, isActive: true },
    { id: "c6", name: "Academy CEFR Farg'ona", city: "Farg'ona", studentCount: 112, mentorCount: 4, isActive: false },
    { id: "c7", name: "Academy CEFR Nukus", city: "Nukus", studentCount: 77, mentorCount: 3, isActive: true },
  ],
  systemHealth: {
    serverStatus: "healthy",
    dbStatus: "healthy",
    storageUsed: 145,
    storageTotal: 500,
    uptime: 99.8,
    lastBackup: "2025-02-11T03:00:00",
  },
};

// Current logged-in user (mock auth state)
export const mockCurrentUser = mockUsers[1]; // admin
