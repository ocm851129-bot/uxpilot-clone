"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { MOCK_CREDIT_TRANSACTIONS, MOCK_USERS, CreditTransaction } from "@/lib/admin/mock-data";
import { useState, useMemo } from "react";
import { CreditCard, ArrowUpRight, ArrowDownLeft, Gift, RotateCcw, Shield, Search, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_CONFIG: Record<CreditTransaction["type"], { label: string; color: string; icon: React.ElementType }> = {
  signup: { label: "회원가입 보너스", color: "text-green-400", icon: Gift },
  purchase: { label: "플랜 구매", color: "text-blue-400", icon: ArrowUpRight },
  used: { label: "크레딧 사용", color: "text-red-400", icon: ArrowDownLeft },
  admin_grant: { label: "관리자 지급", color: "text-violet-400", icon: Shield },
  refund: { label: "환불", color: "text-orange-400", icon: RotateCcw },
};

export default function CreditsPage() {
  const [transactions, setTransactions] = useState(MOCK_CREDIT_TRANSACTIONS);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<CreditTransaction["type"] | "all">("all");
  const [grantUserId, setGrantUserId] = useState("");
  const [grantAmount, setGrantAmount] = useState("");
  const [grantNote, setGrantNote] = useState("");
  const [showGrantForm, setShowGrantForm] = useState(false);
  const [toast, setToast] = useState("");

  function showToastMsg(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const q = search.toLowerCase();
      const matchSearch = !q || t.userName.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      const matchType = filterType === "all" || t.type === filterType;
      return matchSearch && matchType;
    });
  }, [transactions, search, filterType]);

  function handleGrant(e: React.FormEvent) {
    e.preventDefault();
    const user = MOCK_USERS.find((u) => u.id === grantUserId || u.name === grantUserId || u.email === grantUserId);
    if (!user) { showToastMsg("사용자를 찾을 수 없습니다"); return; }
    const amount = Number(grantAmount);
    if (!amount) { showToastMsg("유효한 금액을 입력하세요"); return; }

    const newTx: CreditTransaction = {
      id: `ct${Date.now()}`,
      userId: user.id,
      userName: user.name,
      type: "admin_grant",
      amount,
      description: grantNote || `관리자 지급`,
      createdAt: new Date(),
    };
    setTransactions((prev) => [newTx, ...prev]);
    setGrantUserId("");
    setGrantAmount("");
    setGrantNote("");
    setShowGrantForm(false);
    showToastMsg(`${user.name}에게 ${amount} 크레딧을 지급했습니다`);
  }

  const totalGranted = transactions.filter((t) => t.amount > 0).reduce((a, c) => a + c.amount, 0);
  const totalUsed = Math.abs(transactions.filter((t) => t.amount < 0).reduce((a, c) => a + c.amount, 0));

  return (
    <>
      <AdminHeader title="크레딧 관리" subtitle={`지급 총계 ${totalGranted.toLocaleString()} · 사용 총계 ${totalUsed.toLocaleString()}`} />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "총 지급 크레딧", value: totalGranted, color: "text-green-400", bg: "from-green-600/10 to-green-600/5", border: "border-green-500/20" },
            { label: "총 사용 크레딧", value: totalUsed, color: "text-red-400", bg: "from-red-600/10 to-red-600/5", border: "border-red-500/20" },
            { label: "잔여 크레딧", value: totalGranted - totalUsed, color: "text-violet-400", bg: "from-violet-600/10 to-violet-600/5", border: "border-violet-500/20" },
            { label: "거래 건수", value: transactions.length, color: "text-blue-400", bg: "from-blue-600/10 to-blue-600/5", border: "border-blue-500/20" },
          ].map((s) => (
            <div key={s.label} className={cn("bg-gradient-to-br rounded-xl border p-4", s.bg, s.border)}>
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className={cn("text-2xl font-bold", s.color)}>{s.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Filters + Grant Button */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="사용자, 설명 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#13131f] border border-[#1f1f2e] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><X className="w-3.5 h-3.5" /></button>}
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as CreditTransaction["type"] | "all")}
            className="bg-[#13131f] border border-[#1f1f2e] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50"
          >
            <option value="all">전체 유형</option>
            {Object.entries(TYPE_CONFIG).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>

          <button
            onClick={() => setShowGrantForm(true)}
            className="btn-primary flex items-center gap-2 text-white px-4 py-2 rounded-xl text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            크레딧 지급
          </button>
        </div>

        {/* Transaction Table */}
        <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f2e] text-xs text-gray-500">
                  <th className="text-left px-4 py-3 font-medium">유형</th>
                  <th className="text-left px-4 py-3 font-medium">사용자</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">설명</th>
                  <th className="text-right px-4 py-3 font-medium">크레딧</th>
                  <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">일시</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => {
                  const cfg = TYPE_CONFIG[tx.type];
                  return (
                    <tr key={tx.id} className="border-b border-[#1a1a2e] hover:bg-[#1a1a2e] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", `bg-${cfg.color.split("-")[1]}-500/10`)}>
                            <cfg.icon className={cn("w-3.5 h-3.5", cfg.color)} />
                          </div>
                          <span className={cn("text-xs font-medium hidden sm:inline", cfg.color)}>{cfg.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-white">{tx.userName}</p>
                        <p className="text-xs text-gray-600">{tx.userId}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-gray-400">{tx.description}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={cn("text-sm font-bold font-mono", tx.amount > 0 ? "text-green-400" : "text-red-400")}>
                          {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right hidden sm:table-cell">
                        <span className="text-xs text-gray-500">
                          {tx.createdAt.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grant Modal */}
      {showGrantForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowGrantForm(false)}>
          <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f2e]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-violet-400" />
                크레딧 수동 지급
              </h3>
              <button onClick={() => setShowGrantForm(false)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleGrant} className="p-6 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">사용자 (이름/이메일/ID)</label>
                <select
                  value={grantUserId}
                  onChange={(e) => setGrantUserId(e.target.value)}
                  required
                  className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="">사용자 선택...</option>
                  {MOCK_USERS.map((u) => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">크레딧 수량</label>
                <input
                  type="number"
                  placeholder="예: 100"
                  value={grantAmount}
                  onChange={(e) => setGrantAmount(e.target.value)}
                  required
                  className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">사유 (선택)</label>
                <input
                  type="text"
                  placeholder="지급 사유 입력..."
                  value={grantNote}
                  onChange={(e) => setGrantNote(e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">지급하기</button>
                <button type="button" onClick={() => setShowGrantForm(false)} className="flex-1 bg-[#1a1a2e] text-gray-300 py-2.5 rounded-xl text-sm hover:bg-[#22223e] transition-colors">취소</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#1f1f2e] border border-violet-500/30 text-white text-sm px-5 py-3 rounded-xl shadow-xl z-[100]">
          {toast}
        </div>
      )}
    </>
  );
}
