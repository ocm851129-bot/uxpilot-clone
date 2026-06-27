import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are an expert UI/UX designer and frontend developer. Generate complete, beautiful, production-ready HTML pages with inline CSS and minimal JavaScript.

Rules:
- Output ONLY valid HTML starting with <!DOCTYPE html>
- Use modern CSS (flexbox, grid, custom properties)
- Dark theme by default unless specified otherwise
- Use placeholder images from https://picsum.photos
- Make it visually stunning with gradients, shadows, and smooth typography
- Include responsive design
- Use Google Fonts via @import in <style> tag
- Add subtle animations/transitions
- Do NOT include any explanations, markdown, or code fences — only pure HTML
- The design should look professional and modern like a real product`;

function getErrorHtml(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  console.error("[Gemini API Error]", raw);

  if (raw.includes("API_KEY_INVALID") || raw.includes("invalid") || raw.includes("API key")) {
    return `<!DOCTYPE html><html><body style="background:#0a0a0f;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;">
<div style="text-align:center;max-width:400px;padding:2rem;">
  <div style="font-size:3rem;margin-bottom:1rem;">🔑</div>
  <h2 style="color:#f87171;font-size:1.25rem;margin-bottom:0.75rem;">Gemini API 키 오류</h2>
  <p style="color:#9ca3af;font-size:0.875rem;line-height:1.6;">
    GEMINI_API_KEY가 유효하지 않습니다.<br/>
    Google AI Studio에서 API 키를 확인해주세요.
  </p>
  <a href="https://aistudio.google.com/apikey" target="_blank"
     style="display:inline-block;margin-top:1rem;background:linear-gradient(135deg,#4285f4,#0f9d58);color:white;padding:0.75rem 1.5rem;border-radius:0.75rem;text-decoration:none;font-size:0.875rem;font-weight:600;">
    API 키 확인하기 →
  </a>
</div>
</body></html>`;
  }

  if (raw.includes("quota") || raw.includes("RESOURCE_EXHAUSTED") || raw.includes("429")) {
    return `<!DOCTYPE html><html><body style="background:#0a0a0f;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;">
<div style="text-align:center;max-width:400px;padding:2rem;">
  <div style="font-size:3rem;margin-bottom:1rem;">⏱️</div>
  <h2 style="color:#fbbf24;font-size:1.25rem;margin-bottom:0.75rem;">사용량 한도 초과</h2>
  <p style="color:#9ca3af;font-size:0.875rem;line-height:1.6;">
    Gemini API 요청 한도에 도달했습니다.<br/>
    잠시 후 다시 시도해주세요.
  </p>
  <p style="color:#4b5563;font-size:0.7rem;margin-top:1rem;">${raw.slice(0, 200)}</p>
</div>
</body></html>`;
  }

  return `<!DOCTYPE html><html><body style="background:#0a0a0f;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;">
<div style="text-align:center;max-width:500px;padding:2rem;">
  <div style="font-size:3rem;margin-bottom:1rem;">⚠️</div>
  <h2 style="color:#f87171;font-size:1.25rem;margin-bottom:0.75rem;">생성 오류</h2>
  <p style="color:#9ca3af;font-size:0.875rem;word-break:break-all;">${raw.slice(0, 400)}</p>
</div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const { prompt, style = "modern dark" } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    return new Response(JSON.stringify({ error: "프롬프트를 입력해주세요" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const fullPrompt = `${SYSTEM_PROMPT}

Create a beautiful, complete HTML UI page for: "${prompt}"
Style preference: ${style}
Requirements: Full page with proper layout, navigation if needed, realistic content, beautiful design.`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContentStream(fullPrompt);

        let buffer = "";
        let htmlStarted = false;

        for await (const chunk of result.stream) {
          const text = chunk.text();
          buffer += text;

          // Strip markdown code fences if Gemini adds them
          if (!htmlStarted) {
            const htmlIdx = buffer.indexOf("<!DOCTYPE");
            if (htmlIdx !== -1) {
              buffer = buffer.slice(htmlIdx);
              htmlStarted = true;
            } else if (buffer.length > 200) {
              // No DOCTYPE found yet, just stream as-is
              htmlStarted = true;
            } else {
              continue;
            }
          }

          controller.enqueue(encoder.encode(text));
        }

        // Strip trailing code fence if present
        controller.close();
      } catch (err) {
        controller.enqueue(encoder.encode(getErrorHtml(err)));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
