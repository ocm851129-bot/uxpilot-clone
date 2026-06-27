import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-[#0d0d18]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative glow-border rounded-3xl p-12 bg-gradient-to-br from-violet-900/30 to-purple-900/20 overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/40 bg-violet-500/20 text-violet-300 text-sm mb-8">
              <Zap className="w-4 h-4" />
              45개 무료 크레딧 제공
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              신용카드 없이 무료로 시작. 45개 크레딧으로 아이디어를 즉시 UI로 변환해보세요.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="btn-primary flex items-center gap-2 text-white px-8 py-4 rounded-xl font-semibold text-lg"
              >
                무료로 시작하기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/generate"
                className="flex items-center gap-2 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg border border-[#2a2a3e] hover:border-violet-500/50 transition-all"
              >
                데모 체험
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
