"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Zap, Plus, Clock, Sparkles, ChevronRight,
  LayoutDashboard, Settings, LogOut, User, Search,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const EXAMPLE_PROJECTS = [
  { id: 1, name: "SaaS 대시보드", desc: "통계 카드, 차트, 다크 테마", time: "2시간 전", color: "from-violet-600 to-purple-600" },
  { id: 2, name: "이커머스 홈", desc: "상품 그리드, 필터, 장바구니", time: "어제", color: "from-blue-600 to-cyan-600" },
  { id: 3, name: "랜딩 페이지", desc: "히어로, 기능, CTA", time: "3일 전", color: "from-green-600 to-emerald-600" },
];

const STATS = [
  { label: "생성한 UI", value: "12", icon: Sparkles, color: "text-violet-400" },
  { label: "남은 크레딧", value: "33", icon: Zap, color: "text-yellow-400" },
  { label: "저장된 프로젝트", value: "3", icon: LayoutDashboard, color: "text-blue-400" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          email: data.user.email,
          name: data.user.user_metadata?.full_name || data.user.email?.split("@")[0],
        });
      }
      setLoading(false);
    });
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
        <Zap className="w-8 h-8 text-violet-400 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 border-r border-[#1f1f2e] bg-[#0d0d18] flex flex-col shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-[#1f1f2e]">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm gradient-text">UX Pilot</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-violet-600/20 text-violet-300 text-sm">
            <LayoutDashboard className="w-4 h-4" />
            대시보드
          </Link>
          <Link href="/generate" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a2e] transition-colors text-sm">
            <Sparkles className="w-4 h-4" />
            AI 생성기
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a2e] transition-colors text-sm">
            <Clock className="w-4 h-4" />
            히스토리
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a2e] transition-colors text-sm">
            <Settings className="w-4 h-4" />
            설정
          </Link>
        </nav>

        {/* User */}
        <div className="border-t border-[#1f1f2e] p-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.name || "사용자"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm mt-1"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              안녕하세요, {user?.name || "사용자"}님 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">오늘도 멋진 UI를 만들어보세요</p>
          </div>
          <Link
            href="/generate"
            className="btn-primary flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            새 UI 생성
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Start */}
        <div className="bg-gradient-to-r from-violet-900/40 to-purple-900/30 border border-violet-500/20 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">AI로 UI 생성하기</h3>
              <p className="text-gray-400 text-sm">프롬프트 하나로 완성된 HTML/CSS UI를 즉시 만들어보세요</p>
            </div>
            <Link
              href="/generate"
              className="btn-primary flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap text-sm"
            >
              <Sparkles className="w-4 h-4" />
              생성기 열기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">최근 프로젝트</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="검색..."
                className="bg-[#13131f] border border-[#1f1f2e] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 w-40"
              />
            </div>
          </div>

          {user?.email ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXAMPLE_PROJECTS.map((project) => (
                <div key={project.id} className="group bg-[#13131f] border border-[#1f1f2e] rounded-2xl overflow-hidden card-hover cursor-pointer">
                  <div className={`h-32 bg-gradient-to-br ${project.color} opacity-40 relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-2 w-3/4 opacity-50">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-6 bg-white/30 rounded" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-sm mb-1">{project.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{project.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {project.time}
                      </span>
                      <Link
                        href="/generate"
                        className="text-xs text-violet-400 hover:text-violet-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        열기 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* New Project Card */}
              <Link
                href="/generate"
                className="flex flex-col items-center justify-center bg-[#0f0f1a] border border-dashed border-[#2a2a3e] rounded-2xl p-8 hover:border-violet-500/50 hover:bg-[#13131f] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mb-3 group-hover:bg-violet-600/30 transition-colors">
                  <Plus className="w-6 h-6 text-violet-400" />
                </div>
                <p className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">새 UI 생성</p>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <User className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-gray-400 mb-4">로그인하면 프로젝트를 저장할 수 있습니다</p>
              <Link href="/auth/login" className="btn-primary text-white px-6 py-2 rounded-xl text-sm">
                로그인하기
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
