import { Zap, Layers, Cpu, GitBranch, Palette, Code2 } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Blitz 모델",
    description: "몇 초 만에 UI를 생성합니다. 빠른 프로토타이핑과 아이디어 검증에 최적화된 초고속 생성 엔진.",
    color: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "고충실도 변환",
    description: "와이어프레임에서 픽셀 퍼펙트 UI까지. 저충실도 스케치를 프로덕션 수준의 디자인으로 자동 변환.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Max AI 모델",
    description: "엣지 케이스와 모든 상태를 자동으로 생성. 강화된 UX 계층구조로 완성도 높은 디자인 시스템 구축.",
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "AI 플로우차트",
    description: "사용자 여정과 앱 플로우를 자동으로 시각화. 복잡한 서비스 구조도를 AI가 즉시 다이어그램으로 생성.",
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "4가지 스타일 동시 생성",
    description: "한 프롬프트로 4가지 다른 스타일을 동시에 생성. 최적의 디자인을 빠르게 비교하고 선택하세요.",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "클린 코드 생성",
    description: "생성된 디자인은 바로 사용 가능한 HTML/CSS 코드로 제공. Figma, GitHub와 자동 동기화 지원.",
    color: "from-cyan-500/20 to-sky-500/20",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-6">
            주요 기능
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            모든 것이 하나의 플랫폼에
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            아이디어 구상부터 디자인, 코드 전달까지 — 단일 AI 플랫폼에서 완결
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.border} card-hover`}
            >
              <div className={`${feature.iconColor} mb-4`}>{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
