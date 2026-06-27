import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f2e] bg-[#0a0a0f] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="gradient-text">MetaUI/UX</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              AI 기반의 UI 디자인 생성 플랫폼. 프롬프트 하나로 완성된 UI를 몇 초 만에 생성하세요.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">제품</h4>
            <ul className="space-y-2">
              {["AI 생성기", "템플릿", "기능 소개", "가격"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">회사</h4>
            <ul className="space-y-2">
              {["소개", "블로그", "연락처", "개인정보처리방침"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#1f1f2e] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 MetaUI/UX. All rights reserved.</p>
          <p className="text-sm text-gray-500">Powered by <span className="text-violet-400">Claude AI</span></p>
        </div>
      </div>
    </footer>
  );
}
