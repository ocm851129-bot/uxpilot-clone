export type UserRole = "admin" | "user";
export type UserStatus = "active" | "suspended" | "pending";
export type UserPlan = "free" | "pro" | "enterprise";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  plan: UserPlan;
  credits: number;
  totalGenerations: number;
  createdAt: Date;
  lastActive: Date;
  country: string;
  avatarColor: string;
}

export interface Generation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  prompt: string;
  style: string;
  createdAt: Date;
  status: "success" | "failed";
  tokensUsed: number;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  userName: string;
  type: "signup" | "purchase" | "used" | "admin_grant" | "refund";
  amount: number;
  description: string;
  createdAt: Date;
}

const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-green-500 to-emerald-600",
  "from-pink-500 to-rose-600",
  "from-orange-500 to-amber-600",
  "from-red-500 to-rose-600",
  "from-indigo-500 to-violet-600",
  "from-teal-500 to-cyan-600",
];

const now = new Date();
function daysAgo(d: number) { return new Date(now.getTime() - d * 86400000); }
function hoursAgo(h: number) { return new Date(now.getTime() - h * 3600000); }

export const MOCK_USERS: AdminUser[] = [
  { id: "u001", name: "김지현", email: "jihyun.kim@gmail.com", role: "admin", status: "active", plan: "enterprise", credits: 9999, totalGenerations: 287, createdAt: daysAgo(180), lastActive: hoursAgo(1), country: "KR", avatarColor: avatarColors[0] },
  { id: "u002", name: "박민준", email: "minjun.park@naver.com", role: "user", status: "active", plan: "pro", credits: 142, totalGenerations: 89, createdAt: daysAgo(90), lastActive: hoursAgo(3), country: "KR", avatarColor: avatarColors[1] },
  { id: "u003", name: "이수진", email: "sujin.lee@kakao.com", role: "user", status: "active", plan: "pro", credits: 78, totalGenerations: 54, createdAt: daysAgo(65), lastActive: hoursAgo(12), country: "KR", avatarColor: avatarColors[2] },
  { id: "u004", name: "최동현", email: "donghyun.choi@gmail.com", role: "user", status: "active", plan: "free", credits: 23, totalGenerations: 22, createdAt: daysAgo(14), lastActive: hoursAgo(2), country: "KR", avatarColor: avatarColors[3] },
  { id: "u005", name: "정유나", email: "yuna.jung@outlook.com", role: "user", status: "suspended", plan: "free", credits: 0, totalGenerations: 45, createdAt: daysAgo(45), lastActive: daysAgo(10), country: "KR", avatarColor: avatarColors[4] },
  { id: "u006", name: "한승우", email: "seungwoo.han@gmail.com", role: "user", status: "active", plan: "pro", credits: 210, totalGenerations: 167, createdAt: daysAgo(120), lastActive: hoursAgo(5), country: "KR", avatarColor: avatarColors[5] },
  { id: "u007", name: "오채린", email: "chaerin.oh@naver.com", role: "user", status: "active", plan: "free", credits: 38, totalGenerations: 7, createdAt: daysAgo(7), lastActive: hoursAgo(8), country: "KR", avatarColor: avatarColors[6] },
  { id: "u008", name: "강태양", email: "taeyang.kang@gmail.com", role: "user", status: "active", plan: "enterprise", credits: 500, totalGenerations: 312, createdAt: daysAgo(200), lastActive: hoursAgo(0.5), country: "KR", avatarColor: avatarColors[7] },
  { id: "u009", name: "임소현", email: "sohyun.lim@gmail.com", role: "user", status: "pending", plan: "free", credits: 45, totalGenerations: 0, createdAt: daysAgo(1), lastActive: daysAgo(1), country: "KR", avatarColor: avatarColors[0] },
  { id: "u010", name: "신재호", email: "jaeho.shin@kakao.com", role: "user", status: "active", plan: "free", credits: 12, totalGenerations: 33, createdAt: daysAgo(30), lastActive: hoursAgo(24), country: "KR", avatarColor: avatarColors[1] },
  { id: "u011", name: "윤서연", email: "seoyeon.yoon@gmail.com", role: "user", status: "active", plan: "pro", credits: 95, totalGenerations: 71, createdAt: daysAgo(55), lastActive: hoursAgo(6), country: "KR", avatarColor: avatarColors[2] },
  { id: "u012", name: "장현수", email: "hyunsu.jang@naver.com", role: "user", status: "active", plan: "free", credits: 5, totalGenerations: 40, createdAt: daysAgo(40), lastActive: daysAgo(3), country: "KR", avatarColor: avatarColors[3] },
  { id: "u013", name: "권나리", email: "nari.kwon@gmail.com", role: "user", status: "active", plan: "pro", credits: 188, totalGenerations: 103, createdAt: daysAgo(75), lastActive: hoursAgo(2), country: "KR", avatarColor: avatarColors[4] },
  { id: "u014", name: "송민호", email: "minho.song@outlook.com", role: "user", status: "suspended", plan: "free", credits: 0, totalGenerations: 18, createdAt: daysAgo(20), lastActive: daysAgo(8), country: "KR", avatarColor: avatarColors[5] },
  { id: "u015", name: "백지훈", email: "jihoon.baek@gmail.com", role: "user", status: "active", plan: "enterprise", credits: 750, totalGenerations: 445, createdAt: daysAgo(365), lastActive: hoursAgo(1), country: "KR", avatarColor: avatarColors[6] },
  { id: "u016", name: "전미래", email: "mirae.jeon@naver.com", role: "user", status: "active", plan: "free", credits: 31, totalGenerations: 14, createdAt: daysAgo(22), lastActive: daysAgo(1), country: "KR", avatarColor: avatarColors[7] },
  { id: "u017", name: "류성준", email: "sungjun.ryu@gmail.com", role: "user", status: "active", plan: "pro", credits: 67, totalGenerations: 58, createdAt: daysAgo(50), lastActive: hoursAgo(10), country: "KR", avatarColor: avatarColors[0] },
  { id: "u018", name: "남지우", email: "jiwoo.nam@kakao.com", role: "user", status: "active", plan: "free", credits: 44, totalGenerations: 1, createdAt: daysAgo(2), lastActive: hoursAgo(30), country: "KR", avatarColor: avatarColors[1] },
  { id: "u019", name: "홍서준", email: "seojun.hong@gmail.com", role: "user", status: "active", plan: "pro", credits: 120, totalGenerations: 92, createdAt: daysAgo(80), lastActive: hoursAgo(4), country: "KR", avatarColor: avatarColors[2] },
  { id: "u020", name: "문하늘", email: "haneul.moon@naver.com", role: "user", status: "active", plan: "free", credits: 9, totalGenerations: 36, createdAt: daysAgo(60), lastActive: daysAgo(2), country: "KR", avatarColor: avatarColors[3] },
];

const styles = ["모던 다크", "미니멀 라이트", "글래스모피즘", "브루탈리스트"];
const prompts = [
  "SaaS 대시보드 — 통계 카드, 차트, 다크 테마",
  "이커머스 상품 목록 페이지",
  "모바일 로그인 화면",
  "포트폴리오 랜딩 페이지",
  "AI 챗봇 인터페이스",
  "팀 협업 도구 보드",
  "금융 앱 트랜잭션 내역",
  "음악 스트리밍 플레이어",
  "뉴스 피드 레이아웃",
  "관리자 설정 페이지",
  "사용자 프로필 화면",
  "데이터 시각화 대시보드",
  "온보딩 웰컴 화면",
  "예약 시스템 캘린더",
  "소셜 미디어 피드",
];

export const MOCK_GENERATIONS: Generation[] = Array.from({ length: 80 }, (_, i) => {
  const user = MOCK_USERS[i % MOCK_USERS.length];
  return {
    id: `g${String(i + 1).padStart(3, "0")}`,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    prompt: prompts[i % prompts.length],
    style: styles[i % styles.length],
    createdAt: new Date(now.getTime() - i * 3600000 * 2.5),
    status: i % 12 === 0 ? "failed" : "success",
    tokensUsed: Math.floor(Math.random() * 3000) + 500,
  };
});

export const MOCK_CREDIT_TRANSACTIONS: CreditTransaction[] = [
  { id: "ct001", userId: "u001", userName: "김지현", type: "signup", amount: 45, description: "회원가입 보너스", createdAt: daysAgo(180) },
  { id: "ct002", userId: "u002", userName: "박민준", type: "purchase", amount: 200, description: "Pro 플랜 구매", createdAt: daysAgo(85) },
  { id: "ct003", userId: "u002", userName: "박민준", type: "used", amount: -3, description: "UI 생성 — SaaS 대시보드", createdAt: daysAgo(80) },
  { id: "ct004", userId: "u003", userName: "이수진", type: "purchase", amount: 200, description: "Pro 플랜 구매", createdAt: daysAgo(60) },
  { id: "ct005", userId: "u004", userName: "최동현", type: "signup", amount: 45, description: "회원가입 보너스", createdAt: daysAgo(14) },
  { id: "ct006", userId: "u008", userName: "강태양", type: "admin_grant", amount: 500, description: "관리자 지급 — Enterprise", createdAt: daysAgo(5) },
  { id: "ct007", userId: "u015", userName: "백지훈", type: "purchase", amount: 1000, description: "Enterprise 연간 플랜", createdAt: daysAgo(10) },
  { id: "ct008", userId: "u013", userName: "권나리", type: "refund", amount: 50, description: "결제 오류 환불", createdAt: daysAgo(3) },
  { id: "ct009", userId: "u006", userName: "한승우", type: "used", amount: -2, description: "UI 생성 — 포트폴리오", createdAt: daysAgo(1) },
  { id: "ct010", userId: "u019", userName: "홍서준", type: "purchase", amount: 200, description: "Pro 플랜 구매", createdAt: daysAgo(75) },
  { id: "ct011", userId: "u011", userName: "윤서연", type: "signup", amount: 45, description: "회원가입 보너스", createdAt: daysAgo(55) },
  { id: "ct012", userId: "u017", userName: "류성준", type: "used", amount: -1, description: "UI 생성 — 모바일 앱", createdAt: hoursAgo(6) },
];

// 일별 통계 (최근 14일)
export const DAILY_STATS = Array.from({ length: 14 }, (_, i) => ({
  date: new Date(now.getTime() - (13 - i) * 86400000).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" }),
  users: Math.floor(Math.random() * 30) + 10,
  generations: Math.floor(Math.random() * 150) + 40,
  credits: Math.floor(Math.random() * 500) + 100,
}));

export const MONTHLY_REVENUE = [
  { month: "1월", revenue: 1200000 },
  { month: "2월", revenue: 1850000 },
  { month: "3월", revenue: 2100000 },
  { month: "4월", revenue: 1950000 },
  { month: "5월", revenue: 3200000 },
  { month: "6월", revenue: 4100000 },
];

export const SUMMARY_STATS = {
  totalUsers: MOCK_USERS.length,
  activeUsers: MOCK_USERS.filter(u => u.status === "active").length,
  suspendedUsers: MOCK_USERS.filter(u => u.status === "suspended").length,
  pendingUsers: MOCK_USERS.filter(u => u.status === "pending").length,
  totalGenerations: MOCK_GENERATIONS.length,
  successGenerations: MOCK_GENERATIONS.filter(g => g.status === "success").length,
  proUsers: MOCK_USERS.filter(u => u.plan === "pro").length,
  enterpriseUsers: MOCK_USERS.filter(u => u.plan === "enterprise").length,
  freeUsers: MOCK_USERS.filter(u => u.plan === "free").length,
  totalCreditsGranted: MOCK_CREDIT_TRANSACTIONS.filter(t => t.amount > 0).reduce((a, c) => a + c.amount, 0),
  totalCreditsUsed: Math.abs(MOCK_CREDIT_TRANSACTIONS.filter(t => t.amount < 0).reduce((a, c) => a + c.amount, 0)),
  newUsersToday: 3,
  newUsersThisWeek: 12,
};
