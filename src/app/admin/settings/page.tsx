"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useState } from "react";
import { Save, Shield, Zap, Globe, Bell, Check } from "lucide-react";

export default function SettingsPage() {
  const [toast, setToast] = useState("");
  const [settings, setSettings] = useState({
    siteName: "UX Pilot",
    siteDesc: "AI 기반의 UI 디자인 생성 플랫폼",
    signupCredits: 45,
    maxCreditsPerUser: 9999,
    aiModel: "claude-sonnet-4-6",
    maxTokens: 8192,
    maintenanceMode: false,
    signupEnabled: true,
    freeGenLimit: 3,
    emailNotify: true,
    slackWebhook: "",
    adminPassword: "",
    newAdminPassword: "",
  });

  function showToastMsg(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2000); }

  function handleSave(section: string) {
    showToastMsg(`${section} 설정이 저장되었습니다`);
  }

  return (
    <>
      <AdminHeader title="시스템 설정" subtitle="플랫폼 전역 설정 관리" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl">
        {/* Site Settings */}
        <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">사이트 설정</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">사이트 이름</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings((p) => ({ ...p, siteName: e.target.value }))}
                className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">사이트 설명</label>
              <input
                type="text"
                value={settings.siteDesc}
                onChange={(e) => setSettings((p) => ({ ...p, siteDesc: e.target.value }))}
                className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <div className="flex items-center justify-between py-3 border-t border-[#1f1f2e]">
              <div>
                <p className="text-sm text-white">점검 모드</p>
                <p className="text-xs text-gray-500">활성화 시 일반 사용자 접근 차단</p>
              </div>
              <button
                onClick={() => setSettings((p) => ({ ...p, maintenanceMode: !p.maintenanceMode }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${settings.maintenanceMode ? "bg-red-500" : "bg-[#2a2a3e]"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings.maintenanceMode ? "left-5.5" : "left-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-[#1f1f2e]">
              <div>
                <p className="text-sm text-white">회원가입 허용</p>
                <p className="text-xs text-gray-500">비활성화 시 신규 가입 중단</p>
              </div>
              <button
                onClick={() => setSettings((p) => ({ ...p, signupEnabled: !p.signupEnabled }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${settings.signupEnabled ? "bg-violet-600" : "bg-[#2a2a3e]"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings.signupEnabled ? "left-5.5" : "left-0.5"}`} />
              </button>
            </div>
          </div>
          <button onClick={() => handleSave("사이트")} className="btn-primary flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-medium mt-5">
            <Save className="w-4 h-4" />저장
          </button>
        </div>

        {/* Credit Settings */}
        <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-4 h-4 text-yellow-400" />
            <h3 className="text-sm font-bold text-white">크레딧 정책</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">회원가입 기본 크레딧</label>
              <input
                type="number"
                value={settings.signupCredits}
                onChange={(e) => setSettings((p) => ({ ...p, signupCredits: Number(e.target.value) }))}
                className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">무료 플랜 일일 생성 제한</label>
              <input
                type="number"
                value={settings.freeGenLimit}
                onChange={(e) => setSettings((p) => ({ ...p, freeGenLimit: Number(e.target.value) }))}
                className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
          <button onClick={() => handleSave("크레딧")} className="btn-primary flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-medium mt-5">
            <Save className="w-4 h-4" />저장
          </button>
        </div>

        {/* AI Model Settings */}
        <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-white">AI 모델 설정</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Claude 모델</label>
              <select
                value={settings.aiModel}
                onChange={(e) => setSettings((p) => ({ ...p, aiModel: e.target.value }))}
                className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
              >
                <option value="claude-haiku-4-5-20251001">Claude Haiku 4.5 (빠름)</option>
                <option value="claude-sonnet-4-6">Claude Sonnet 4.6 (추천)</option>
                <option value="claude-opus-4-8">Claude Opus 4.8 (고품질)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">최대 토큰</label>
              <input
                type="number"
                value={settings.maxTokens}
                onChange={(e) => setSettings((p) => ({ ...p, maxTokens: Number(e.target.value) }))}
                className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
          <button onClick={() => handleSave("AI 모델")} className="btn-primary flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-medium mt-5">
            <Save className="w-4 h-4" />저장
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white">알림 설정</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">이메일 알림</p>
                <p className="text-xs text-gray-500">신규 가입, 에러 발생 시 이메일 알림</p>
              </div>
              <button
                onClick={() => setSettings((p) => ({ ...p, emailNotify: !p.emailNotify }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${settings.emailNotify ? "bg-violet-600" : "bg-[#2a2a3e]"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings.emailNotify ? "left-5.5" : "left-0.5"}`} />
              </button>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Slack Webhook URL</label>
              <input
                type="url"
                value={settings.slackWebhook}
                onChange={(e) => setSettings((p) => ({ ...p, slackWebhook: e.target.value }))}
                placeholder="https://hooks.slack.com/services/..."
                className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
          <button onClick={() => handleSave("알림")} className="btn-primary flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-medium mt-5">
            <Save className="w-4 h-4" />저장
          </button>
        </div>

        {/* Security */}
        <div className="bg-[#13131f] border border-red-500/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-bold text-white">보안 설정</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">현재 관리자 비밀번호</label>
              <input
                type="password"
                placeholder="현재 비밀번호"
                value={settings.adminPassword}
                onChange={(e) => setSettings((p) => ({ ...p, adminPassword: e.target.value }))}
                className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">새 비밀번호</label>
              <input
                type="password"
                placeholder="새 비밀번호 (8자 이상)"
                value={settings.newAdminPassword}
                onChange={(e) => setSettings((p) => ({ ...p, newAdminPassword: e.target.value }))}
                className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>
          <button onClick={() => handleSave("보안")} className="mt-5 flex items-center gap-2 text-red-400 border border-red-500/30 hover:bg-red-500/10 px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
            <Shield className="w-4 h-4" />비밀번호 변경
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#1f1f2e] border border-violet-500/30 text-white text-sm px-5 py-3 rounded-xl shadow-xl z-[100] flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}
    </>
  );
}
