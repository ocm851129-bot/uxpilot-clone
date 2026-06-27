import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const templates = [
  { label: "SaaS 대시보드", desc: "통계, 차트, 사이드바 포함", gradient: "from-violet-900/60 to-blue-900/60", tag: "웹 앱", featured: false },
  { label: "모바일 로그인", desc: "소셜 로그인, 폼 검증", gradient: "from-blue-900/60 to-cyan-900/60", tag: "모바일", featured: false },
  { label: "이커머스 홈", desc: "상품 그리드, 필터, 카트", gradient: "from-pink-900/60 to-rose-900/60", tag: "쇼핑", featured: false },
  { label: "랜딩 페이지", desc: "히어로, 기능, FAQ, CTA", gradient: "from-green-900/60 to-emerald-900/60", tag: "마케팅", featured: false },
  { label: "채팅 인터페이스", desc: "AI 챗봇, 메시지 버블", gradient: "from-orange-900/60 to-amber-900/60", tag: "소통", featured: false },
  { label: "프로필 페이지", desc: "사용자 정보, 활동 피드", gradient: "from-purple-900/60 to-fuchsia-900/60", tag: "소셜", featured: false },
];

export default function TemplatesSection() {
  return (
    <section id="templates" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm mb-4">
              템플릿
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              바로 사용 가능한 템플릿
            </h2>
          </div>
          <Link href="/generate" className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium">
            전체 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Showcase */}
        <div className="mb-6">
          <a
            href="/showcase/space-landing.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-2xl overflow-hidden border border-indigo-500/30 hover:border-indigo-400/60 transition-all card-hover"
            style={{ background: "linear-gradient(135deg, #0f0a1e 0%, #0a0f2e 50%, #0e0818 100%)" }}
          >
            {/* Stars background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() > 0.7 ? 2 : 1,
                    height: Math.random() > 0.7 ? 2 : 1,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.7 + 0.1,
                  }}
                />
              ))}
            </div>
            <div className="relative flex items-center justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1 text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-medium">
                    <Star className="w-3 h-3 fill-indigo-300" /> Featured Showcase
                  </span>
                  <span className="text-xs text-gray-500">Liquid Glass · Cinematic</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">시네마틱 우주여행 랜딩 페이지</h3>
                <p className="text-gray-400 text-sm max-w-lg">
                  Liquid Glass 디자인 시스템 · 풀스크린 비디오 배경 · 단어별 blur-in 애니메이션 · 글래스모피즘 컴포넌트
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm group-hover:bg-white/10 transition-colors">
                  미리보기 <ArrowRight className="w-4 h-4" />
                </div>
                <Link
                  href="/generate"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  이 스타일로 생성하기 →
                </Link>
              </div>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <Link
              key={t.label}
              href={`/generate?template=${encodeURIComponent(t.label)}`}
              className={`group block bg-gradient-to-br ${t.gradient} border border-[#1f1f2e] rounded-2xl overflow-hidden card-hover`}
            >
              <div className="h-40 relative p-4">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="grid grid-cols-3 gap-2 w-3/4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-8 bg-white/30 rounded" />
                    ))}
                  </div>
                </div>
                <span className="absolute top-3 right-3 text-xs bg-black/40 text-white/70 px-2 py-0.5 rounded-full">
                  {t.tag}
                </span>
              </div>
              <div className="px-4 pb-4">
                <h3 className="font-semibold text-white mb-1">{t.label}</h3>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
