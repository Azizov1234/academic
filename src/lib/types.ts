// ============================
// CORE TYPES
// ============================

export type Role = "superadmin" | "admin" | "mentor" | "student";

export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type SkillType = "reading" | "listening" | "writing" | "speaking" | "vocabulary" | "grammar";

export type ContentType = "video" | "audio" | "pdf" | "text" | "exercise";

export type HomeworkStatus = "pending" | "submitted" | "graded" | "late";

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export type PaymentStatus = "paid" | "unpaid" | "partial";

export type ExamType = "unit_test" | "progress_test" | "placement_test";

export type QuestionType =
  | "multiple_choice"
  | "true_false_not_given"
  | "fill_in_the_blank"
  | "matching"
  | "short_answer"
  | "essay";

export type NotificationType =
  | "new_lesson"
  | "new_homework"
  | "deadline_reminder"
  | "grade_posted"
  | "exam_result"
  | "payment_reminder"
  | "message";

// ============================
// USER
// ============================

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Student extends User {
  role: "student";
  groupIds: string[];
  level?: Level;
  streak?: number;
  totalScore?: number;
}

export interface Mentor extends User {
  role: "mentor";
  groupIds: string[];
  specialization?: string[];
}

export interface Admin extends User {
  role: "admin";
  centerId?: string;
}

// ============================
// COURSE & CURRICULUM
// ============================

export interface Course {
  id: string;
  title: string;
  description: string;
  level: Level;
  isPublished: boolean;
  createdBy: string;
  unitCount?: number;
  estimatedHours?: number;
  thumbnail?: string;
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  level: Level;
  isPublished: boolean;
  unlockAfterUnitId?: string;
  skillsIncluded: SkillType[];
  estimatedHours: number;
  isUnlocked?: boolean;
  completionScore?: number;
  lessonCount?: number;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  skillType: SkillType;
  contentType: ContentType;
  contentUrl?: string;
  order: number;
  duration?: number; // minutes
  isCompleted?: boolean;
  watchedSeconds?: number;
}

export interface LessonProgress {
  id: string;
  lessonId: string;
  studentId: string;
  watchedSeconds: number;
  isCompleted: boolean;
}

// ============================
// GROUP
// ============================

export interface Group {
  id: string;
  name: string;
  level: Level;
  mentorId: string;
  mentorName?: string;
  courseId: string;
  courseName?: string;
  maxStudents: number;
  currentStudents?: number;
  schedule: GroupSchedule;
  isActive: boolean;
}

export interface GroupSchedule {
  days: string[];
  startTime: string;
  endTime: string;
  room?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName?: string;
  groupId: string;
  groupName?: string;
  enrolledAt: string;
}

// ============================
// HOMEWORK
// ============================

export interface Homework {
  id: string;
  unitId?: string;
  mentorId: string;
  groupId?: string;
  title: string;
  description: string;
  deadline: string;
  maxScore: number;
  type: "writing" | "speaking" | "quiz" | "file" | "link";
  isPublished: boolean;
  createdAt: string;
  submissionCount?: number;
  totalStudents?: number;
}

export interface Submission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName?: string;
  studentAvatar?: string;
  content?: string;
  fileUrl?: string;
  audioUrl?: string;
  submittedAt: string;
  score?: number;
  feedback?: string;
  status: HomeworkStatus;
}

// ============================
// EXAM
// ============================

export interface Exam {
  id: string;
  unitId?: string;
  title: string;
  type: ExamType;
  timeLimitMin: number;
  passingScore: number;
  attemptsAllowed: number;
  isActive: boolean;
  questionCount?: number;
  sections?: Record<SkillType, number>;
}

export interface Question {
  id: string;
  examId: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  skill: SkillType;
  audioUrl?: string;
  imageUrl?: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName?: string;
  score: number;
  totalPoints: number;
  percentage: number;
  answers: Record<string, string>;
  startedAt: string;
  finishedAt: string;
  attempt: number;
  passed: boolean;
  skillScores?: Record<SkillType, number>;
}

// ============================
// ATTENDANCE
// ============================

export interface Attendance {
  id: string;
  groupId: string;
  studentId: string;
  studentName?: string;
  date: string;
  status: AttendanceStatus;
  markedBy: string;
  note?: string;
}

export interface AttendanceSummary {
  studentId: string;
  studentName: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
}

// ============================
// PAYMENT
// ============================

export interface Payment {
  id: string;
  studentId: string;
  studentName?: string;
  groupName?: string;
  amount: number;
  month: string; // "2025-01"
  status: PaymentStatus;
  paidDate?: string;
  note?: string;
  createdAt: string;
}

// ============================
// VOCABULARY
// ============================

export interface VocabWord {
  id: string;
  word: string;
  translation: string;
  definition: string;
  example: string;
  audioUrl?: string;
  level: Level;
  unitId?: string;
  mastered?: boolean;
  reviewCount?: number;
  nextReview?: string;
}

// ============================
// NOTIFICATION
// ============================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

// ============================
// CERTIFICATE
// ============================

export interface Certificate {
  id: string;
  studentId: string;
  studentName?: string;
  unitId?: string;
  courseName?: string;
  level: Level;
  issuedAt: string;
  pdfUrl?: string;
  verifyCode: string;
}

// ============================
// DASHBOARD STATS
// ============================

export interface AdminStats {
  totalStudents: number;
  activeStudents: number;
  totalMentors: number;
  totalGroups: number;
  pendingPayments: number;
  paidPayments: number;
  totalRevenue: number;
  upcomingExams: number;
  recentSubmissions: Submission[];
  todaySchedule: ScheduleItem[];
  topStudents: TopStudent[];
  paymentByMonth: MonthlyPayment[];
  groupFillRate: GroupFillRate[];
}

export interface ScheduleItem {
  id: string;
  groupName: string;
  level: Level;
  mentorName: string;
  startTime: string;
  endTime: string;
  room?: string;
  day: string;
}

export interface TopStudent {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  level: Level;
  groupName: string;
}

export interface MonthlyPayment {
  month: string;
  paid: number;
  unpaid: number;
  total: number;
}

export interface GroupFillRate {
  groupName: string;
  current: number;
  max: number;
  percentage: number;
}

export interface MentorStats {
  totalGroups: number;
  totalStudents: number;
  pendingGrading: number;
  upcomingExams: number;
  todayLessons: ScheduleItem[];
  recentSubmissions: Submission[];
  groupProgress: GroupProgress[];
}

export interface GroupProgress {
  groupId: string;
  groupName: string;
  averageScore: number;
  completionRate: number;
  studentCount: number;
}

export interface StudentStats {
  currentLevel: Level;
  streak: number;
  totalLessonsCompleted: number;
  pendingHomework: number;
  overallProgress: number;
  skillProgress: Record<SkillType, number>;
  recentGrades: RecentGrade[];
  upcomingExam?: Exam;
  weeklyActivity: WeeklyActivity[];
  certificates: number;
}

export interface RecentGrade {
  subject: string;
  score: number;
  maxScore: number;
  date: string;
  skill: SkillType;
}

export interface WeeklyActivity {
  day: string;
  minutes: number;
  lessonsCompleted: number;
}

export interface SuperAdminStats {
  totalCenters: number;
  totalAdmins: number;
  totalMentors: number;
  totalStudents: number;
  monthlyGrowth: MonthlyGrowth[];
  centerStats: CenterStat[];
  systemHealth: SystemHealth;
}

export interface MonthlyGrowth {
  month: string;
  students: number;
  centers: number;
  revenue: number;
}

export interface CenterStat {
  id: string;
  name: string;
  city: string;
  studentCount: number;
  mentorCount: number;
  isActive: boolean;
}

export interface SystemHealth {
  serverStatus: "healthy" | "degraded" | "down";
  dbStatus: "healthy" | "degraded" | "down";
  storageUsed: number; // GB
  storageTotal: number;
  uptime: number; // percentage
  lastBackup: string;
}
