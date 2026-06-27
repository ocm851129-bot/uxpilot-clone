"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Sparkles, CreditCard,
  LayoutTemplate, Settings, LogOut, Zap, Shield,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "대시보드", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "사용자 관리", icon: Users },
  { href: "/admin/generations", label: "생성 히스토리", icon: Sparkles },
  { href: "/admin/credits", label: "크레딧 관리", icon: CreditCard },
  { href: "/admin/templates", label: "템플릿 관리", icon: LayoutTemplate },
  { href: "/admin/settings", label: "시스템 설정", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  function isActive(item: { href: string; exact?: boolean }) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  return (
    <aside className="w-[220px] shrink-0 bg-[#0d0d18] border-r border-[#1f1f2e] flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#1f1f2e]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none">MetaUI/UX</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Shield className="w-2.5 h-2.5 text-red-400" />
            <span className="text-[10px] text-red-400 font-medium">Admin CMS</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a2e]"
              )}
            >
              <item.icon className={cn("w-4 h-4 shrink-0", active ? "text-violet-400" : "")} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 text-violet-400/50" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[#1f1f2e] space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-300 hover:bg-[#1a1a2e] transition-all"
        >
          <Zap className="w-4 h-4" />
          <span>사이트 보기</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
