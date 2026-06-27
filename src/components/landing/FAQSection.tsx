"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "MetaUI/UX은 어떻게 동작하나요?",
    a: "MetaUI/UX은 Claude AI를 활용하여 자연어 프롬프트를 완성된 HTML/CSS UI 코드로 변환합니다. 원하는 UI를 텍스트로 설명하면 AI가 즉시 생성하고 브라우저에서 바로 미리볼 수 있습니다.",
  },
  {
    q: "생성된 코드를 어떻게 활용할 수 있나요?",
    a: "생성된 HTML/CSS 코드를 복사하거나 파일로 다운로드할 수 있습니다. React 컴포넌트로 변환하거나 기존 프로젝트에 직접 통합할 수 있습니다.",
  },
  {
    q: "무료로 얼마나 사용할 수 있나요?",
    a: "회원가입 시 45개의 무료 크레딧이 제공됩니다. 각 UI 생성에 1-3 크레딧이 사용됩니다. 크레딧 소진 후에는 유료 플랜으로 계속 사용할 수 있습니다.",
  },
  {
    q: "Figma와 연동이 가능한가요?",
    a: "네, 생성된 디자인을 Figma로 내보내거나 기존 Figma 컴포넌트를 가져올 수 있습니다. 양방향 동기화를 통해 워크플로우를 최적화하세요.",
  },
  {
    q: "모바일 UI도 생성할 수 있나요?",
    a: "네, 모바일 앱 UI를 위한 전용 프롬프트와 템플릿을 제공합니다. iOS, Android 스타일의 UI를 모두 생성할 수 있습니다.",
  },
  {
    q: "생성된 UI의 저작권은 누구에게 있나요?",
    a: "생성된 모든 UI 코드의 저작권은 사용자에게 있습니다. 상업적 목적으로 자유롭게 활용하실 수 있습니다.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm mb-6">
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[#1f1f2e] rounded-xl overflow-hidden bg-[#13131f]"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#1a1a2e] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-medium text-white">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ml-4 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
