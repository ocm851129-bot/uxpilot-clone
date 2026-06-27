"use client";

import Link from "next/link";
import { useState } from "react";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1f1f2e] backdrop-blur-md bg-[#0a0a0f]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="gradient-text">UX Pilot</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">기능</Link>
            <Link href="#workflow" className="text-sm text-gray-400 hover:text-white transition-colors">워크플로우</Link>
            <Link href="#templates" className="text-sm text-gray-400 hover:text-white transition-colors">템플릿</Link>
            <Link href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              로그인
            </Link>
            <Link
              href="/auth/signup"
              className="btn-primary text-sm text-white px-5 py-2 rounded-lg font-medium"
            >
              무료로 시작
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1f1f2e] bg-[#0a0a0f] px-4 py-4 flex flex-col gap-4">
          <Link href="#features" className="text-sm text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>기능</Link>
          <Link href="#workflow" className="text-sm text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>워크플로우</Link>
          <Link href="#templates" className="text-sm text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>템플릿</Link>
          <Link href="#faq" className="text-sm text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>FAQ</Link>
          <div className="flex gap-3 pt-2 border-t border-[#1f1f2e]">
            <Link href="/auth/login" className="flex-1 text-center text-sm text-gray-300 border border-[#2a2a3e] rounded-lg px-4 py-2">로그인</Link>
            <Link href="/auth/signup" className="flex-1 text-center btn-primary text-sm text-white rounded-lg px-4 py-2">무료로 시작</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
