"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { MOCK_USERS, AdminUser, UserStatus, UserPlan } from "@/lib/admin/mock-data";
import { useState, useMemo } from "react";
import {
  Search, Filter, UserX, UserCheck, CreditCard,
  ChevronDown, ChevronUp, X, Check, Minus, Plus,
  Crown, Zap, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SortKey = "name" | "createdAt" | "lastActive" | "totalGenerations" | "credits";
type SortDir = "asc" | "desc";

const STATUS_LABELS: Record<UserStatus, string> = { active: "활성", suspended: "정지", pending: "대기" };
const PLAN_LABELS: Record<UserPlan, string> = { free: "무료", pro: "Pro", enterprise: "Enterprise" };

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<UserStatus | "all">("all");
  const [filterPlan, setFilterPlan] = useState<UserPlan | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [creditInput, setCreditInput] = useState("");
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  const filtered = useMemo(() => {
    return users
      .filter((u) => {
        const q = search.toLowerCase();
        const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.includes(q);
        const matchStatus = filterStatus === "all" || u.status === filterStatus;
        const matchPlan = filterPlan === "all" || u.plan === filterPlan;
        return matchSearch && matchStatus && matchPlan;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === "name") cmp = a.name.localeCompare(b.name);
        else if (sortKey === "createdAt") cmp = a.createdAt.getTime() - b.createdAt.getTime();
        else if (sortKey === "lastActive") cmp = a.lastActive.getTime() - b.lastActive.getTime();
        else if (sortKey === "totalGenerations") cmp = a.totalGenerations - b.totalGenerations;
        else if (sortKey === "credits") cmp = a.credits - b.credits;
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [users, search, filterStatus, filterPlan, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  function toggleStatus(userId: string, current: UserStatus) {
    const next: UserStatus = current === "active" ? "suspended" : "active";
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: next } : u)));
    if (selectedUser?.id === userId) setSelectedUser((u) => u ? { ...u, status: next } : null);
    showToast(`계정 상태를 '${STATUS_LABELS[next]}'로 변경했습니다`);
  }

  function grantCredits(userId: string, amount: number) {
    if (!amount || isNaN(amount)) return;
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, credits: Math.max(0, u.credits + amount) } : u));
    if (selectedUser?.id === userId) setSelectedUser((u) => u ? { ...u, credits: Math.max(0, u.credits + amount) } : null);
    showToast(`${amount > 0 ? "+" : ""}${amount} 크레딧 ${amount > 0 ? "지급" : "차감"} 완료`);
    setCreditInput("");
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <Minus className="w-3 h-3 text-gray-600" />;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 text-violet-400" /> : <ChevronDown className="w-3 h-3 text-violet-400" />;
  }

  const PlanBadge = ({ plan }: { plan: UserPlan }) => {
    const styles: Record<UserPlan, string> = {
      free: "text-gray-400 bg-gray-500/10",
      pro: "text-violet-400 bg-violet-500/15",
      enterprise: "text-amber-400 bg-amber-500/15",
    };
    const icons: Record<UserPlan, React.ReactNode> = {
      free: <Zap className="w-2.5 h-2.5" />,
      pro: <Crown className="w-2.5 h-2.5" />,
      enterprise: <Shield className="w-2.5 h-2.5" />,
    };
    return (
      <span className={cn("flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium", styles[plan])}>
        {icons[plan]} {PLAN_LABELS[plan]}
      </span>
    );
  };

  const StatusBadge = ({ status }: { status: UserStatus }) => {
    const styles: Record<UserStatus, string> = {
      active: "text-green-400 bg-green-500/10",
      suspended: "text-red-400 bg-red-500/10",
      pending: "text-yellow-400 bg-yellow-500/10",
    };
    return (
      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", styles[status])}>
        {STATUS_LABELS[status]}
      </span>
    );
  };

  return (
    <>
      <AdminHeader
        title="사용자 관리"
        subtitle={`전체 ${users.length}명 · 검색 결과 ${filtered.length}명`}
      />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="이름, 이메일, ID 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#13131f] border border-[#1f1f2e] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            {(["all", "active", "suspended", "pending"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-lg font-medium transition-all",
                  filterStatus === s ? "bg-violet-600/20 text-violet-300 border border-violet-500/30" : "text-gray-400 hover:text-white bg-[#13131f] border border-[#1f1f2e]"
                )}
              >
                {s === "all" ? "전체" : STATUS_LABELS[s]}
              </button>
            ))}
          </div>

          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value as UserPlan | "all")}
            className="bg-[#13131f] border border-[#1f1f2e] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50"
          >
            <option value="all">전체 플랜</option>
            <option value="free">무료</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f2e] text-xs text-gray-500">
                  <th className="text-left px-4 py-3 font-medium">
                    <button className="flex items-center gap-1" onClick={() => toggleSort("name")}>
                      사용자 <SortIcon k="name" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">플랜</th>
                  <th className="text-left px-4 py-3 font-medium">상태</th>
                  <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">
                    <button className="flex items-center gap-1 ml-auto" onClick={() => toggleSort("credits")}>
                      크레딧 <SortIcon k="credits" />
                    </button>
                  </th>
                  <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">
                    <button className="flex items-center gap-1 ml-auto" onClick={() => toggleSort("totalGenerations")}>
                      생성 횟수 <SortIcon k="totalGenerations" />
                    </button>
                  </th>
                  <th className="text-right px-4 py-3 font-medium hidden xl:table-cell">
                    <button className="flex items-center gap-1 ml-auto" onClick={() => toggleSort("lastActive")}>
                      최근 활동 <SortIcon k="lastActive" />
                    </button>
                  </th>
                  <th className="text-right px-4 py-3 font-medium">액션</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#1a1a2e] hover:bg-[#1a1a2e] transition-colors cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                          {user.name[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-white font-medium truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <PlanBadge plan={user.plan} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell">
                      <span className="text-sm text-white font-mono">{user.credits.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell">
                      <span className="text-sm text-gray-300">{user.totalGenerations}</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden xl:table-cell">
                      <span className="text-xs text-gray-500">
                        {user.lastActive.toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleStatus(user.id, user.status)}
                        className={cn(
                          "text-xs px-3 py-1.5 rounded-lg font-medium transition-all",
                          user.status === "active"
                            ? "text-red-400 hover:bg-red-500/10 border border-red-500/20"
                            : "text-green-400 hover:bg-green-500/10 border border-green-500/20"
                        )}
                      >
                        {user.status === "active" ? "정지" : "활성화"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">검색 결과가 없습니다</p>
            </div>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1f1f2e]">
              <h3 className="text-lg font-bold text-white">사용자 상세</h3>
              <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedUser.avatarColor} flex items-center justify-center text-xl font-bold text-white`}>
                  {selectedUser.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white">{selectedUser.name}</h4>
                    {selectedUser.role === "admin" && (
                      <span className="text-xs bg-red-500/15 text-red-400 px-2 py-0.5 rounded-full">Admin</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <PlanBadge plan={selectedUser.plan} />
                    <StatusBadge status={selectedUser.status} />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "크레딧", value: selectedUser.credits.toLocaleString(), icon: CreditCard, color: "text-violet-400" },
                  { label: "생성 횟수", value: selectedUser.totalGenerations, icon: Zap, color: "text-blue-400" },
                  { label: "가입일", value: selectedUser.createdAt.toLocaleDateString("ko-KR", { month: "short", day: "numeric" }), icon: Check, color: "text-green-400" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#0f0f1a] rounded-xl p-3 text-center">
                    <s.icon className={`w-4 h-4 ${s.color} mx-auto mb-1`} />
                    <p className="text-sm font-bold text-white">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Credit Management */}
              <div className="bg-[#0f0f1a] rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-violet-400" />
                  크레딧 조정
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="예: 100 또는 -50"
                    value={creditInput}
                    onChange={(e) => setCreditInput(e.target.value)}
                    className="flex-1 bg-[#13131f] border border-[#2a2a3e] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                  <button
                    onClick={() => grantCredits(selectedUser.id, Number(creditInput))}
                    disabled={!creditInput}
                    className="flex items-center gap-1 text-sm text-white bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    적용
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  {[10, 50, 100, -10].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => grantCredits(selectedUser.id, amt)}
                      className={cn(
                        "flex-1 text-xs py-1.5 rounded-lg border transition-colors",
                        amt > 0
                          ? "text-green-400 border-green-500/20 hover:bg-green-500/10"
                          : "text-red-400 border-red-500/20 hover:bg-red-500/10"
                      )}
                    >
                      {amt > 0 ? `+${amt}` : amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => toggleStatus(selectedUser.id, selectedUser.status)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all",
                    selectedUser.status === "active"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                      : "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                  )}
                >
                  {selectedUser.status === "active" ? <><UserX className="w-4 h-4" />계정 정지</> : <><UserCheck className="w-4 h-4" />계정 활성화</>}
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-gray-300 bg-[#1a1a2e] hover:bg-[#22223e] transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#1f1f2e] border border-violet-500/30 text-white text-sm px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-[100] animate-in slide-in-from-bottom-4">
          <Check className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}
    </>
  );
}
