"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import BarChart from "@/components/admin/BarChart";
import MiniLineChart from "@/components/admin/MiniLineChart";
import {
  SUMMARY_STATS, DAILY_STATS, MONTHLY_REVENUE,
  MOCK_USERS, MOCK_GENERATIONS,
} from "@/lib/admin/mock-data";
import {
  Users, Sparkles, CreditCard, TrendingUp,
  UserCheck, UserX, Crown, Zap, ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const userSparkline = DAILY_STATS.map((d) => d.users);
const genSparkline = DAILY_STATS.map((d) => d.generations);
const creditSparkline = DAILY_STATS.map((d) => d.credits);

export default function AdminOverviewPage() {
  const recentUsers = [...MOCK_USERS].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);
  const recentGens = [...MOCK_GENERATIONS].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 6);

  const planDistribution = [
    { label: "무료", value: SUMMARY_STATS.freeUsers },
    { label: "Pro", value: SUMMARY_STATS.proUsers },
    { label: "Enterprise", value: SUMMARY_STATS.enterpriseUsers },
  ];

  return (
    <>
      <AdminHeader
        title="대시보드"
        subtitle={`마지막 업데이트: ${new Date().toLocaleString("ko-KR")}`}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "전체 사용자",
              value: SUMMARY_STATS.totalUsers,
              sub: `+${SUMMARY_STATS.newUsersToday}명 오늘`,
              icon: Users,
              color: "text-violet-400",
              bg: "from-violet-600/15 to-violet-600/5",
              border: "border-violet-500/20",
              spark: userSparkline,
              sparkColor: "#a855f7",
            },
            {
              label: "총 생성 횟수",
              value: SUMMARY_STATS.totalGenerations,
              sub: `성공률 ${Math.round((SUMMARY_STATS.successGenerations / SUMMARY_STATS.totalGenerations) * 100)}%`,
              icon: Sparkles,
              color: "text-blue-400",
              bg: "from-blue-600/15 to-blue-600/5",
              border: "border-blue-500/20",
              spark: genSparkline,
              sparkColor: "#3b82f6",
            },
            {
              label: "지급 크레딧",
              value: SUMMARY_STATS.totalCreditsGranted.toLocaleString(),
              sub: `사용 ${SUMMARY_STATS.totalCreditsUsed} 크레딧`,
              icon: CreditCard,
              color: "text-green-400",
              bg: "from-green-600/15 to-green-600/5",
              border: "border-green-500/20",
              spark: creditSparkline,
              sparkColor: "#22c55e",
            },
            {
              label: "활성 사용자",
              value: SUMMARY_STATS.activeUsers,
              sub: `정지 ${SUMMARY_STATS.suspendedUsers}명 · 대기 ${SUMMARY_STATS.pendingUsers}명`,
              icon: UserCheck,
              color: "text-orange-400",
              bg: "from-orange-600/15 to-orange-600/5",
              border: "border-orange-500/20",
              spark: userSparkline.map((v) => Math.round(v * 0.9)),
              sparkColor: "#f97316",
            },
          ].map((card) => (
            <div
              key={card.label}
              className={`bg-gradient-to-br ${card.bg} border ${card.border} rounded-2xl p-5`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-400 font-medium">{card.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
                </div>
                <card.icon className={`w-5 h-5 ${card.color} shrink-0`} />
              </div>
              <MiniLineChart data={card.spark} color={card.sparkColor} />
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Monthly Revenue */}
          <div className="lg:col-span-2 bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">월별 수익</h3>
                <p className="text-xs text-gray-500 mt-0.5">최근 6개월</p>
              </div>
              <div className="flex items-center gap-1 text-green-400 text-xs font-medium bg-green-500/10 px-2.5 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3" />
                +28.4%
              </div>
            </div>
            <BarChart
              data={MONTHLY_REVENUE.map((m) => ({ label: m.month, value: m.revenue }))}
              color="#7c3aed"
              height={160}
              formatValue={(v) => `₩${(v / 10000).toFixed(0)}만`}
            />
          </div>

          {/* Plan Distribution */}
          <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-5">플랜 분포</h3>
            <div className="space-y-3">
              {[
                { label: "무료", count: SUMMARY_STATS.freeUsers, color: "#6b7280", icon: Zap },
                { label: "Pro", count: SUMMARY_STATS.proUsers, color: "#a855f7", icon: Crown },
                { label: "Enterprise", count: SUMMARY_STATS.enterpriseUsers, color: "#f59e0b", icon: Crown },
              ].map((p) => {
                const pct = Math.round((p.count / SUMMARY_STATS.totalUsers) * 100);
                return (
                  <div key={p.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                        <span className="text-xs text-gray-400">{p.label}</span>
                      </div>
                      <span className="text-xs text-white font-medium">{p.count}명 ({pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-[#1f1f2e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: p.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#1f1f2e] space-y-2">
              {[
                { label: "활성", count: SUMMARY_STATS.activeUsers, color: "text-green-400", dot: "bg-green-400" },
                { label: "정지", count: SUMMARY_STATS.suspendedUsers, color: "text-red-400", dot: "bg-red-400" },
                { label: "대기", count: SUMMARY_STATS.pendingUsers, color: "text-yellow-400", dot: "bg-yellow-400" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    <span className="text-xs text-gray-500">계정 {s.label}</span>
                  </div>
                  <span className={`text-xs font-medium ${s.color}`}>{s.count}명</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Users */}
          <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">최근 가입 사용자</h3>
              <Link href="/admin/users" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                전체 보기 <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1a1a2e] transition-colors">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                    {user.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      user.status === "active" ? "bg-green-500/15 text-green-400" :
                      user.status === "suspended" ? "bg-red-500/15 text-red-400" :
                      "bg-yellow-500/15 text-yellow-400"
                    }`}>
                      {user.status === "active" ? "활성" : user.status === "suspended" ? "정지" : "대기"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Generations */}
          <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">최근 생성 기록</h3>
              <Link href="/admin/generations" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                전체 보기 <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {recentGens.map((gen) => (
                <div key={gen.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1a1a2e] transition-colors">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${gen.status === "success" ? "bg-green-400" : "bg-red-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">{gen.prompt}</p>
                    <p className="text-[10px] text-gray-500">{gen.userName} · {gen.style}</p>
                  </div>
                  <span className="text-[10px] text-gray-600 shrink-0">
                    {gen.createdAt.toLocaleDateString("ko-KR", { month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "오늘 신규 가입", value: SUMMARY_STATS.newUsersToday, unit: "명", icon: Users, color: "text-violet-400" },
            { label: "이번 주 신규", value: SUMMARY_STATS.newUsersThisWeek, unit: "명", icon: TrendingUp, color: "text-blue-400" },
            { label: "Pro 사용자", value: SUMMARY_STATS.proUsers, unit: "명", icon: Crown, color: "text-purple-400" },
            { label: "정지 계정", value: SUMMARY_STATS.suspendedUsers, unit: "명", icon: UserX, color: "text-red-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#13131f] border border-[#1f1f2e] rounded-xl p-4 flex items-center gap-3">
              <s.icon className={`w-5 h-5 ${s.color} shrink-0`} />
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-lg font-bold text-white">{s.value}<span className="text-xs text-gray-500 ml-1 font-normal">{s.unit}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
