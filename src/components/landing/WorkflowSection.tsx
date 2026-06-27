import { MessageSquare, Wand2, Eye, Download } from "lucide-react";

const steps = [
  {
    icon: <MessageSquare className="w-7 h-7" />,
    number: "01",
    title: "프롬프트 입력",
    description: "만들고 싶은 UI를 자유롭게 설명하세요. 스케치, PRD, 아이디어 어느 형태든 OK.",
    color: "from-violet-600 to-purple-600",
  },
  {
    icon: <Wand2 className="w-7 h-7" />,
    number: "02",
    title: "AI 생성",
    description: "Claude AI가 설명을 분석하고 완성도 높은 HTML/CSS UI를 즉시 생성합니다.",
    color: "from-blue-600 to-cyan-600",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    number: "03",
    title: "실시간 미리보기",
    description: "생성된 UI를 브라우저에서 바로 확인하고, 스타일과 레이아웃을 조정합니다.",
    color: "from-green-600 to-emerald-600",
  },
  {
    icon: <Download className="w-7 h-7" />,
    number: "04",
    title: "코드 다운로드",
    description: "완성된 HTML/CSS 코드를 즉시 내보내거나 프로젝트에 바로 적용하세요.",
    color: "from-orange-600 to-amber-600",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-24 relative bg-[#0d0d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm mb-6">
            워크플로우
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            4단계로 완성되는 UI
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            복잡한 디자인 툴 없이도 프로 수준의 UI를 몇 분 안에 완성하세요
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-violet-600 via-blue-600 to-orange-600" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className="text-xs font-bold text-gray-600 mb-3">{step.number}</div>
                {/* Icon Circle */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {step.icon}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute -right-4 top-1/2 -translate-y-1/2 text-gray-600">→</div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
