import { Star } from "lucide-react";

const testimonials = [
  {
    content: "MetaUI/UX 덕분에 디자인 작업 시간이 80% 줄었어요. 프롬프트 하나로 완성도 높은 UI를 바로 얻을 수 있다는 게 믿기지 않을 정도입니다.",
    author: "김지현",
    role: "스타트업 창업자",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    content: "기존에 Figma로 2-3시간 걸리던 작업을 이제 10분 만에 끝냅니다. 개발자로서 디자인 없이도 좋은 UI를 만들 수 있게 되었어요.",
    author: "박민준",
    role: "풀스택 개발자",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    content: "클라이언트 제안용 목업을 회의 중에 실시간으로 만들어서 보여줄 수 있어요. 제안 성공률이 눈에 띄게 올랐습니다.",
    author: "이수진",
    role: "UX 디자이너",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0d0d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            사용자들의 이야기
          </h2>
          <p className="text-gray-400 text-lg">
            전 세계 1M+ 팀이 MetaUI/UX을 선택한 이유
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-[#13131f] border border-[#1f1f2e] rounded-2xl p-6 flex flex-col gap-4 card-hover"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#1f1f2e]">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
