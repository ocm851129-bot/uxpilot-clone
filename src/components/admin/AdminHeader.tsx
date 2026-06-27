"use client";

import { Bell, Search } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: Props) {
  const [query, setQuery] = useState("");

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f2e] bg-[#0a0a0f] shrink-0">
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="전체 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[#13131f] border border-[#1f1f2e] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 w-48 transition-colors"
          />
        </div>
        <button className="relative w-9 h-9 rounded-xl bg-[#13131f] border border-[#1f1f2e] flex items-center justify-center hover:border-violet-500/30 transition-colors">
          <Bell className="w-4 h-4 text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-xs font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
