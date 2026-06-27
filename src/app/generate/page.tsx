"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Zap, Send, Copy, Download, RefreshCw, Code2, Eye,
  Sparkles, ChevronDown, Loader2, Check, ArrowLeft, Maximize2,
} from "lucide-react";

const STYLE_OPTIONS = [
  { id: "modern-dark", label: "모던 다크", desc: "Dark theme, purple accents" },
  { id: "minimal-light", label: "미니멀 라이트", desc: "Clean white, subtle shadows" },
  { id: "glassmorphism", label: "글래스모피즘", desc: "Frosted glass, blur effects" },
  { id: "brutalist", label: "브루탈리스트", desc: "Bold, high contrast, raw" },
];

const SPACE_LANDING_PROMPT = `시네마틱 우주여행 랜딩 페이지 — 2개의 풀스크린 섹션 (Hero + Capabilities).

디자인 시스템:
- 폰트: Instrument Serif (이탤릭 헤딩), Barlow (본문)
- 배경: 순수 블랙 (#000)
- 글래스모피즘: liquid-glass (blur:4px) + liquid-glass-strong (blur:50px) 유틸리티
- 테두리: 그라디언트 마스킹으로 상/하 반투명 경계선

Section 1 — Hero (전체화면):
- Navbar: 왼쪽 글래스 원형 로고 "a" (이탤릭), 가운데 글래스 pill 네비 + "Claim a Spot" 흰색 버튼
- Badge: "New" 흰 pill + "Maiden Crewed Voyage to Mars Arrives 2026"
- 헤드라인: "Venture Past Our Sky Across the Universe" (단어별 blur-in 애니메이션, 5.5rem 이탤릭)
- 서브: 우주 탐험 설명 문구, 폰트 라이트
- CTA: "Start Your Voyage" (liquid-glass-strong) + "View Liftoff" (텍스트+플레이아이콘)
- 통계 카드 2개 (220px wide): 34.5 Min 시청시간 / 2.8B+ 글로벌 사용자
- 파트너: Aeon · Vela · Apex · Orbit · Zeno (이탤릭 세리프)

Section 2 — Capabilities (min-h-screen):
- 헤딩: "Production\\nevolved" (6rem 이탤릭)
- 카드 3개 (liquid-glass, 360px min-height):
  1. AI Scenery: 이미지 아이콘 + 태그 4개 + 설명
  2. Batch Production: 영화 아이콘 + 태그 4개 + 설명
  3. Smart Lighting: 전구 아이콘 + 태그 4개 + 설명
- 각 카드: 아이콘 박스(글래스) + pill 태그들(top), flex-1 spacer, h3 제목 + 설명(bottom)

모든 텍스트 흰색, 오버레이 없음, 순수 글래스 크롬으로 대비 표현`;

const QUICK_PROMPTS = [
  "SaaS 대시보드 — 통계 카드, 차트, 다크 테마",
  "이커머스 상품 목록 — 필터, 그리드, 장바구니",
  "모바일 소셜 앱 홈피드",
  "AI 챗봇 인터페이스",
  "팀 협업 도구 프로젝트 보드",
  "포트폴리오 랜딩 페이지",
  "금융 앱 트랜잭션 내역",
  "음악 스트리밍 플레이어 UI",
];

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");

  const [prompt, setPrompt] = useState(templateParam || "");
  const [selectedStyle, setSelectedStyle] = useState(STYLE_OPTIONS[0]);
  const [styleOpen, setStyleOpen] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Array<{ prompt: string; html: string; timestamp: Date }>>([]);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateIframe = useCallback((html: string) => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, []);

  useEffect(() => {
    if (generatedHtml && activeTab === "preview") {
      updateIframe(generatedHtml);
    }
  }, [generatedHtml, activeTab, updateIframe]);

  async function handleGenerate() {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setGeneratedHtml("");
    setActiveTab("preview");

    // Clear iframe
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html><html><body style="background:#0a0a0f;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;">
          <div style="text-align:center;color:#a855f7;">
            <div style="width:40px;height:40px;border:3px solid #a855f720;border-top-color:#a855f7;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 16px;"></div>
            <p style="color:#6b7280;font-size:14px;">AI가 UI를 생성하고 있습니다...</p>
          </div>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
          </body></html>
        `);
        doc.close();
      }
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), style: selectedStyle.desc }),
      });

      if (!res.ok) throw new Error("생성 실패");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullHtml = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullHtml += chunk;
        setGeneratedHtml(fullHtml);

        // Stream to iframe
        if (iframeRef.current) {
          const doc = iframeRef.current.contentDocument;
          if (doc) {
            doc.open();
            doc.write(fullHtml);
            doc.close();
          }
        }
      }

      setHistory((prev) => [
        { prompt: prompt.trim(), html: fullHtml, timestamp: new Date() },
        ...prev.slice(0, 9),
      ]);
    } catch (err) {
      console.error(err);
      setGeneratedHtml("<p style='color:red;padding:2rem;'>생성 중 오류가 발생했습니다.</p>");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `metauix-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f2e] bg-[#0a0a0f] shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-px h-4 bg-[#1f1f2e]" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm gradient-text">MetaUI/UX</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {generatedHtml && (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-[#2a2a3e] hover:border-violet-500/50 px-3 py-1.5 rounded-lg transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "복사됨" : "코드 복사"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-[#2a2a3e] hover:border-violet-500/50 px-3 py-1.5 rounded-lg transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                다운로드
              </button>
            </>
          )}
          <Link
            href="/auth/signup"
            className="btn-primary text-xs text-white px-4 py-1.5 rounded-lg font-medium"
          >
            업그레이드
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 border-r border-[#1f1f2e] flex flex-col bg-[#0d0d18] shrink-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Prompt Input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">프롬프트</label>
              </div>
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="만들고 싶은 UI를 설명하세요...&#10;&#10;예) SaaS 대시보드 — 왼쪽 사이드바, 통계 카드, 차트, 다크 테마"
                className="w-full h-36 bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-3 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none leading-relaxed"
              />
              <p className="text-xs text-gray-600 mt-1">⌘+Enter 로 생성</p>
            </div>

            {/* Style Selector */}
            <div>
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 block">스타일</label>
              <div className="relative">
                <button
                  onClick={() => setStyleOpen(!styleOpen)}
                  className="w-full flex items-center justify-between bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl px-3 py-2.5 text-sm text-white hover:border-violet-500/50 transition-colors"
                >
                  <span>{selectedStyle.label}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${styleOpen ? "rotate-180" : ""}`} />
                </button>
                {styleOpen && (
                  <div className="absolute top-full mt-1 left-0 right-0 bg-[#13131f] border border-[#2a2a3e] rounded-xl overflow-hidden z-10 shadow-xl">
                    {STYLE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { setSelectedStyle(opt); setStyleOpen(false); }}
                        className="w-full flex flex-col items-start px-3 py-2.5 hover:bg-[#1a1a2e] transition-colors text-left"
                      >
                        <span className="text-sm text-white font-medium">{opt.label}</span>
                        <span className="text-xs text-gray-500">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="btn-primary w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  UI 생성하기
                </>
              )}
            </button>

            {/* Featured Showcase */}
            <div>
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 block">🌟 쇼케이스</label>
              <button
                onClick={() => { setPrompt(SPACE_LANDING_PROMPT); setSelectedStyle(STYLE_OPTIONS[2]); }}
                className="w-full text-left bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/30 hover:border-indigo-400/50 rounded-xl p-3 transition-all group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium">Featured</span>
                  <span className="text-xs text-gray-500">글래스모피즘</span>
                </div>
                <p className="text-xs text-white font-medium leading-snug">시네마틱 우주여행 랜딩</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Liquid Glass · 풀스크린 · 비디오 배경</p>
                <div className="mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span className="text-[10px] text-indigo-400">클릭하여 프롬프트 불러오기</span>
                </div>
              </button>

              {/* Showcase Preview Link */}
              <a
                href="/showcase/space-landing.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 flex items-center justify-center gap-1.5 w-full text-xs text-gray-500 hover:text-indigo-400 transition-colors py-1.5"
              >
                <Eye className="w-3 h-3" />
                완성 예시 미리보기
              </a>
            </div>

            {/* Quick Prompts */}
            <div>
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 block">빠른 프롬프트</label>
              <div className="space-y-1">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrompt(p)}
                    className="w-full text-left text-xs text-gray-400 hover:text-white bg-[#0f0f1a] hover:bg-[#1a1a2e] border border-[#1f1f2e] hover:border-violet-500/30 px-3 py-2 rounded-lg transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="border-t border-[#1f1f2e] p-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">최근 생성</label>
              <div className="space-y-1">
                {history.slice(0, 3).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setGeneratedHtml(item.html);
                      setPrompt(item.prompt);
                    }}
                    className="w-full text-left text-xs text-gray-500 hover:text-gray-300 px-2 py-1.5 rounded-lg hover:bg-[#1a1a2e] transition-colors truncate"
                  >
                    {item.prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#1f1f2e] bg-[#0d0d18] shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === "preview"
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                미리보기
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === "code"
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                코드
              </button>
            </div>
            <div className="flex items-center gap-2">
              {generatedHtml && (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                  재생성
                </button>
              )}
              {generatedHtml && activeTab === "preview" && (
                <button
                  onClick={() => {
                    const win = window.open("", "_blank");
                    if (win) { win.document.write(generatedHtml); win.document.close(); }
                  }}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  전체 화면
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden relative">
            {/* Preview */}
            <div className={`absolute inset-0 ${activeTab === "preview" ? "block" : "hidden"}`}>
              {!generatedHtml && !isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-8">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/20 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">UI를 생성해보세요</h3>
                    <p className="text-gray-500 text-sm max-w-sm">
                      왼쪽에서 프롬프트를 입력하고 생성 버튼을 누르세요.<br />
                      Claude AI가 완성된 HTML/CSS UI를 즉시 만들어드립니다.
                    </p>
                  </div>
                  <button
                    onClick={() => textareaRef.current?.focus()}
                    className="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium"
                  >
                    프롬프트 작성 시작
                  </button>
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin"
                  title="Generated UI Preview"
                />
              )}
            </div>

            {/* Code View */}
            <div className={`absolute inset-0 overflow-auto ${activeTab === "code" ? "block" : "hidden"}`}>
              {generatedHtml ? (
                <pre className="p-4 text-xs text-green-300 font-mono leading-relaxed bg-[#080810] h-full overflow-auto">
                  <code>{generatedHtml}</code>
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-600 text-sm">
                  아직 생성된 코드가 없습니다
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
      </div>
    }>
      <GeneratePageContent />
    </Suspense>
  );
}
