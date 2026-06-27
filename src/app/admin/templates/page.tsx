"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, Check, X, ToggleLeft, ToggleRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  desc: string;
  category: string;
  gradient: string;
  uses: number;
  enabled: boolean;
  createdAt: Date;
}

const INITIAL_TEMPLATES: Template[] = [
  { id: "t1", name: "SaaS 대시보드", desc: "통계 카드, 차트, 사이드바 포함", category: "웹 앱", gradient: "from-violet-900/60 to-blue-900/60", uses: 312, enabled: true, createdAt: new Date("2026-01-10") },
  { id: "t2", name: "모바일 로그인", desc: "소셜 로그인, 폼 검증", category: "모바일", gradient: "from-blue-900/60 to-cyan-900/60", uses: 201, enabled: true, createdAt: new Date("2026-01-15") },
  { id: "t3", name: "이커머스 홈", desc: "상품 그리드, 필터, 카트", category: "쇼핑", gradient: "from-pink-900/60 to-rose-900/60", uses: 178, enabled: true, createdAt: new Date("2026-01-20") },
  { id: "t4", name: "랜딩 페이지", desc: "히어로, 기능, FAQ, CTA", category: "마케팅", gradient: "from-green-900/60 to-emerald-900/60", uses: 445, enabled: true, createdAt: new Date("2026-02-01") },
  { id: "t5", name: "AI 챗봇 인터페이스", desc: "채팅 버블, 스트리밍 UI", category: "소통", gradient: "from-orange-900/60 to-amber-900/60", uses: 267, enabled: true, createdAt: new Date("2026-02-10") },
  { id: "t6", name: "프로필 페이지", desc: "사용자 정보, 활동 피드", category: "소셜", gradient: "from-purple-900/60 to-fuchsia-900/60", uses: 134, enabled: false, createdAt: new Date("2026-02-15") },
];

const CATEGORIES = ["웹 앱", "모바일", "쇼핑", "마케팅", "소통", "소셜", "금융", "교육"];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES);
  const [editTarget, setEditTarget] = useState<Template | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", desc: "", category: "웹 앱", gradient: "from-violet-900/60 to-blue-900/60" });
  const [toast, setToast] = useState("");

  function showToastMsg(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2000); }

  function toggleEnabled(id: string) {
    setTemplates((prev) => prev.map((t) => t.id === id ? { ...t, enabled: !t.enabled } : t));
  }

  function deleteTemplate(id: string) {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    showToastMsg("템플릿이 삭제되었습니다");
  }

  function saveTemplate(e: React.FormEvent) {
    e.preventDefault();
    if (editTarget) {
      setTemplates((prev) => prev.map((t) => t.id === editTarget.id ? { ...t, ...formData } : t));
      showToastMsg("템플릿이 수정되었습니다");
    } else {
      const newT: Template = {
        id: `t${Date.now()}`,
        ...formData,
        uses: 0,
        enabled: true,
        createdAt: new Date(),
      };
      setTemplates((prev) => [...prev, newT]);
      showToastMsg("새 템플릿이 추가되었습니다");
    }
    setShowForm(false);
    setEditTarget(null);
    setFormData({ name: "", desc: "", category: "웹 앱", gradient: "from-violet-900/60 to-blue-900/60" });
  }

  function openEdit(t: Template) {
    setEditTarget(t);
    setFormData({ name: t.name, desc: t.desc, category: t.category, gradient: t.gradient });
    setShowForm(true);
  }

  return (
    <>
      <AdminHeader title="템플릿 관리" subtitle={`${templates.length}개 템플릿 · 활성 ${templates.filter((t) => t.enabled).length}개`} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            {[
              { label: "전체", value: templates.length, color: "text-white" },
              { label: "활성", value: templates.filter((t) => t.enabled).length, color: "text-green-400" },
              { label: "비활성", value: templates.filter((t) => !t.enabled).length, color: "text-gray-500" },
            ].map((s) => (
              <div key={s.label} className="bg-[#13131f] border border-[#1f1f2e] px-4 py-2 rounded-xl text-sm">
                <span className="text-gray-500">{s.label} </span>
                <span className={cn("font-bold", s.color)}>{s.value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setEditTarget(null); setFormData({ name: "", desc: "", category: "웹 앱", gradient: "from-violet-900/60 to-blue-900/60" }); setShowForm(true); }}
            className="btn-primary flex items-center gap-2 text-white px-4 py-2 rounded-xl text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            템플릿 추가
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div
              key={t.id}
              className={cn(
                "bg-[#13131f] border rounded-2xl overflow-hidden transition-all",
                t.enabled ? "border-[#1f1f2e]" : "border-[#1f1f2e] opacity-60"
              )}
            >
              {/* Preview */}
              <div className={cn("h-28 bg-gradient-to-br relative", t.gradient)}>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="grid grid-cols-3 gap-2 w-3/4">
                    {[...Array(6)].map((_, i) => <div key={i} className="h-6 bg-white/30 rounded" />)}
                  </div>
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-xs bg-black/40 text-white/70 px-2 py-0.5 rounded-full">{t.category}</span>
                  {!t.enabled && <span className="text-xs bg-red-500/40 text-red-200 px-2 py-0.5 rounded-full">비활성</span>}
                </div>
                <div className="absolute top-3 right-3 flex gap-1">
                  <button
                    onClick={() => openEdit(t)}
                    className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
                  >
                    <Edit2 className="w-3 h-3 text-white" />
                  </button>
                  <button
                    onClick={() => deleteTemplate(t.id)}
                    className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center hover:bg-red-500/60 transition-colors"
                  >
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white text-sm">{t.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                  </div>
                  <button onClick={() => toggleEnabled(t.id)} className="ml-2 shrink-0">
                    {t.enabled
                      ? <ToggleRight className="w-5 h-5 text-green-400" />
                      : <ToggleLeft className="w-5 h-5 text-gray-600" />}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1f1f2e]">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {t.uses.toLocaleString()}회 사용
                  </span>
                  <span className="text-xs text-gray-600">
                    {t.createdAt.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f2e]">
              <h3 className="text-sm font-bold text-white">{editTarget ? "템플릿 수정" : "새 템플릿 추가"}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={saveTemplate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">템플릿 이름 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="예: SaaS 대시보드"
                  required
                  className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">설명</label>
                <input
                  type="text"
                  value={formData.desc}
                  onChange={(e) => setFormData((p) => ({ ...p, desc: e.target.value }))}
                  placeholder="예: 통계 카드, 차트, 사이드바"
                  className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                  className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">
                  {editTarget ? "수정 저장" : "추가하기"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-[#1a1a2e] text-gray-300 py-2.5 rounded-xl text-sm hover:bg-[#22223e] transition-colors">취소</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#1f1f2e] border border-violet-500/30 text-white text-sm px-5 py-3 rounded-xl shadow-xl z-[100] flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}
    </>
  );
}
