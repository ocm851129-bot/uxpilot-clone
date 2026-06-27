"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { MOCK_GENERATIONS } from "@/lib/admin/mock-data";
import { useState, useMemo } from "react";
import { Search, CheckCircle, XCircle, X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const STYLES = ["전체", "모던 다크", "미니멀 라이트", "글래스모피즘", "브루탈리스트"];

export default function GenerationsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "failed">("all");
  const [filterStyle, setFilterStyle] = useState("전체");
  const [page, setPage] = useState(1);
  const [selectedGen, setSelectedGen] = useState<typeof MOCK_GENERATIONS[0] | null>(null);
  const PER_PAGE = 15;

  const filtered = useMemo(() => {
    return MOCK_GENERATIONS.filter((g) => {
      const q = search.toLowerCase();
      const matchSearch = !q || g.prompt.toLowerCase().includes(q) || g.userName.toLowerCase().includes(q) || g.userEmail.toLowerCase().includes(q);
      const matchStatus = filterStatus === "all" || g.status === filterStatus;
      const matchStyle = filterStyle === "전체" || g.style === filterStyle;
      return matchSearch && matchStatus && matchStyle;
    });
  }, [search, filterStatus, filterStyle]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const successCount = filtered.filter((g) => g.status === "success").length;
  const failCount = filtered.filter((g) => g.status === "failed").length;

  function formatDate(d: Date) {
    return d.toLocaleDateString("ko-KR", { month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
  }

  return (
    <>
      <AdminHeader
        title="생성 히스토리"
        subtitle={`전체 ${MOCK_GENERATIONS.length}건 · 성공 ${successCount}건 · 실패 ${failCount}건`}
      />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Summary Pills */}
        <div className="flex flex-wrap gap-3 mb-5">
          {[
            { label: "전체 생성", value: MOCK_GENERATIONS.length, color: "text-white", bg: "bg-[#1a1a2e] border-[#2a2a3e]" },
            { label: "성공", value: MOCK_GENERATIONS.filter((g) => g.status === "success").length, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
            { label: "실패", value: MOCK_GENERATIONS.filter((g) => g.status === "failed").length, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
            { label: "오늘 생성", value: MOCK_GENERATIONS.filter((g) => new Date().toDateString() === g.createdAt.toDateString()).length, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
          ].map((s) => (
            <div key={s.label} className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium", s.bg)}>
              <span className="text-gray-400 text-xs">{s.label}</span>
              <span className={s.color}>{s.value}건</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="프롬프트, 사용자 이름, 이메일 검색..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-[#13131f] border border-[#1f1f2e] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {(["all", "success", "failed"] as const).map((s) => (
              <button
                key={s}
                onClick={() => { setFilterStatus(s); setPage(1); }}
                className={cn(
                  "text-xs px-3 py-2 rounded-lg font-medium transition-all",
                  filterStatus === s ? "bg-violet-600/20 text-violet-300 border border-violet-500/30" : "text-gray-400 bg-[#13131f] border border-[#1f1f2e] hover:text-white"
                )}
              >
                {s === "all" ? "전체" : s === "success" ? "성공" : "실패"}
              </button>
            ))}
          </div>

          <select
            value={filterStyle}
            onChange={(e) => { setFilterStyle(e.target.value); setPage(1); }}
            className="bg-[#13131f] border border-[#1f1f2e] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50"
          >
            {STYLES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f2e] text-xs text-gray-500">
                  <th className="text-left px-4 py-3 font-medium">상태</th>
                  <th className="text-left px-4 py-3 font-medium">프롬프트</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">사용자</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">스타일</th>
                  <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">토큰</th>
                  <th className="text-right px-4 py-3 font-medium">일시</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((gen) => (
                  <tr
                    key={gen.id}
                    className="border-b border-[#1a1a2e] hover:bg-[#1a1a2e] transition-colors cursor-pointer"
                    onClick={() => setSelectedGen(gen)}
                  >
                    <td className="px-4 py-3">
                      {gen.status === "success"
                        ? <CheckCircle className="w-4 h-4 text-green-400" />
                        : <XCircle className="w-4 h-4 text-red-400" />}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-sm text-white truncate">{gen.prompt}</p>
                      <p className="text-xs text-gray-600">{gen.id}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-white">{gen.userName}</p>
                      <p className="text-xs text-gray-500 truncate">{gen.userEmail}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs bg-[#1f1f2e] text-gray-300 px-2 py-0.5 rounded-md">{gen.style}</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell">
                      <span className="text-xs text-gray-400 font-mono">{gen.tokensUsed.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs text-gray-500">{formatDate(gen.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paged.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">검색 결과가 없습니다</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-xs px-4 py-2 rounded-lg bg-[#13131f] border border-[#1f1f2e] text-gray-400 hover:text-white disabled:opacity-40 transition-all"
            >
              이전
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "text-xs w-8 h-8 rounded-lg transition-all",
                  page === p ? "bg-violet-600 text-white" : "bg-[#13131f] border border-[#1f1f2e] text-gray-400 hover:text-white"
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-xs px-4 py-2 rounded-lg bg-[#13131f] border border-[#1f1f2e] text-gray-400 hover:text-white disabled:opacity-40 transition-all"
            >
              다음
            </button>
          </div>
        )}
      </div>

      {/* Generation Detail Modal */}
      {selectedGen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedGen(null)}>
          <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f2e]">
              <div className="flex items-center gap-2">
                {selectedGen.status === "success"
                  ? <CheckCircle className="w-4 h-4 text-green-400" />
                  : <XCircle className="w-4 h-4 text-red-400" />}
                <h3 className="text-sm font-bold text-white">생성 상세</h3>
              </div>
              <button onClick={() => setSelectedGen(null)} className="text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">프롬프트</p>
                <p className="text-sm text-white bg-[#0f0f1a] rounded-xl px-4 py-3 leading-relaxed">{selectedGen.prompt}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "사용자", value: selectedGen.userName },
                  { label: "이메일", value: selectedGen.userEmail },
                  { label: "스타일", value: selectedGen.style },
                  { label: "토큰", value: selectedGen.tokensUsed.toLocaleString() },
                  { label: "생성 ID", value: selectedGen.id },
                  { label: "일시", value: formatDate(selectedGen.createdAt) },
                ].map((item) => (
                  <div key={item.label} className="bg-[#0f0f1a] rounded-xl p-3">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm text-white font-medium mt-0.5 truncate">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
