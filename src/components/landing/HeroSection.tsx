import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[80px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8">
          <Sparkles className="w-4 h-4" />
          <span>AI 기반 UI 생성 플랫폼 — 45개 무료 크레딧으로 시작</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
          <span className="text-white">아이디어를 즉시</span>
          <br />
          <span className="gradient-text">아름다운 UI</span>
          <span className="text-white">로</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          프롬프트 하나로 완성된 HTML/CSS UI를 생성하세요. 스케치, PRD, 아이디어를 바로
          사용 가능한 디자인 코드로 변환합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/generate"
            className="btn-primary flex items-center gap-2 text-white px-8 py-4 rounded-xl font-semibold text-lg"
          >
            <Zap className="w-5 h-5" />
            무료로 생성 시작
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg border border-[#2a2a3e] hover:border-violet-500/50 transition-all"
          >
            기능 살펴보기
          </Link>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-2 mb-16">
          <div className="flex -space-x-2">
            {[
              "bg-gradient-to-br from-pink-500 to-rose-500",
              "bg-gradient-to-br from-blue-500 to-cyan-500",
              "bg-gradient-to-br from-green-500 to-emerald-500",
              "bg-gradient-to-br from-orange-500 to-amber-500",
              "bg-gradient-to-br from-violet-500 to-purple-500",
            ].map((gradient, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${gradient} border-2 border-[#0a0a0f]`} />
            ))}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-gray-400 text-sm ml-1">1M+ 사용자가 신뢰</span>
        </div>

        {/* Demo Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="glow-border rounded-2xl overflow-hidden bg-[#13131f]">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f1f2e] bg-[#0f0f1a]">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4 bg-[#1a1a2e] rounded-md px-3 py-1 text-xs text-gray-500">
                uxpilot.local/generate
              </div>
            </div>
            {/* Mock UI Generation Preview */}
            <div className="p-6 grid grid-cols-3 gap-4 min-h-[300px]">
              {/* Left Panel - Prompt */}
              <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#1f1f2e]">
                <div className="text-xs text-violet-400 font-medium mb-3">프롬프트</div>
                <div className="text-xs text-gray-300 leading-relaxed mb-4">
                  &ldquo;모던한 SaaS 대시보드 — 왼쪽 사이드바, 통계 카드, 차트, 다크 테마&rdquo;
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-[#1f1f2e] rounded w-3/4" />
                  <div className="h-2 bg-[#1f1f2e] rounded w-1/2" />
                </div>
                <div className="mt-4 btn-primary rounded-lg px-3 py-2 text-xs text-white text-center">
                  생성하기
                </div>
              </div>
              {/* Center - Generated UI Preview */}
              <div className="col-span-2 bg-[#0f0f1a] rounded-xl border border-[#1f1f2e] overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1f1f2e]">
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  <span className="text-xs text-violet-400">생성 완료</span>
                  <div className="ml-auto flex gap-1">
                    <div className="text-xs text-gray-500 bg-[#1a1a2e] px-2 py-0.5 rounded">미리보기</div>
                    <div className="text-xs text-gray-500 bg-[#1a1a2e] px-2 py-0.5 rounded">코드</div>
                  </div>
                </div>
                {/* Mock Dashboard UI */}
                <div className="flex h-52">
                  <div className="w-14 bg-[#0a0a14] border-r border-[#1f1f2e] p-2 space-y-3 flex flex-col items-center pt-3">
                    {["bg-violet-500", "bg-blue-500/50", "bg-blue-500/50", "bg-blue-500/50"].map((c, i) => (
                      <div key={i} className={`w-6 h-6 rounded-lg ${c}`} />
                    ))}
                  </div>
                  <div className="flex-1 p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "총 방문", value: "12,493", color: "from-violet-600/20 to-violet-600/5" },
                        { label: "전환율", value: "3.24%", color: "from-blue-600/20 to-blue-600/5" },
                        { label: "수익", value: "$8,291", color: "from-green-600/20 to-green-600/5" },
                      ].map((card) => (
                        <div key={card.label} className={`bg-gradient-to-br ${card.color} border border-[#1f1f2e] rounded-lg p-2`}>
                          <div className="text-[9px] text-gray-500">{card.label}</div>
                          <div className="text-sm font-bold text-white mt-0.5">{card.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#0a0a14] border border-[#1f1f2e] rounded-lg h-20 flex items-end px-2 pb-2 gap-1">
                      {[30, 50, 40, 70, 55, 80, 60, 90, 75, 85, 70, 95].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-violet-600 to-violet-400/50"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="mt-16">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-6">글로벌 기업들이 신뢰하는 플랫폼</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-30">
            {["Apple", "Samsung", "Microsoft", "Spotify", "HubSpot", "T-Mobile"].map((brand) => (
              <span key={brand} className="text-white font-semibold text-lg tracking-wider">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
