import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
- Do NOT include any explanations, only pure HTML code
- The design should look professional and modern like a real product`;

function getErrorMessage(err: unknown): { html: string; status: number } {
  const raw = err instanceof Error ? err.message : String(err);

  if (raw.includes("credit balance is too low") || raw.includes("Your credit balance")) {
    return {
      status: 402,
      html: `<!DOCTYPE html><html><body style="background:#0a0a0f;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;">
<div style="text-align:center;max-width:400px;padding:2rem;">
  <div style="font-size:3rem;margin-bottom:1rem;">💳</div>
  <h2 style="color:#f87171;font-size:1.25rem;margin-bottom:0.75rem;">Anthropic 크레딧 부족</h2>
  <p style="color:#9ca3af;font-size:0.875rem;line-height:1.6;margin-bottom:1.5rem;">
    API 크레딧이 소진되었습니다.<br/>
    Anthropic 콘솔에서 크레딧을 충전해주세요.
  </p>
  <a href="https://console.anthropic.com/settings/billing" target="_blank"
     style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:white;padding:0.75rem 1.5rem;border-radius:0.75rem;text-decoration:none;font-size:0.875rem;font-weight:600;">
    크레딧 충전하기 →
  </a>
</div>
</body></html>`,
    };
  }

  if (raw.includes("401") || raw.includes("invalid_api_key") || raw.includes("Authentication")) {
    return {
      status: 401,
      html: `<!DOCTYPE html><html><body style="background:#0a0a0f;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;">
<div style="text-align:center;max-width:400px;padding:2rem;">
  <div style="font-size:3rem;margin-bottom:1rem;">🔑</div>
  <h2 style="color:#f87171;font-size:1.25rem;margin-bottom:0.75rem;">API 키 오류</h2>
  <p style="color:#9ca3af;font-size:0.875rem;line-height:1.6;">
    ANTHROPIC_API_KEY가 유효하지 않습니다.<br/>
    .env.local 파일의 API 키를 확인해주세요.
  </p>
</div>
</body></html>`,
    };
  }

  return {
    status: 500,
    html: `<!DOCTYPE html><html><body style="background:#0a0a0f;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;">
<div style="text-align:center;max-width:400px;padding:2rem;">
  <div style="font-size:3rem;margin-bottom:1rem;">⚠️</div>
  <h2 style="color:#f87171;font-size:1.25rem;margin-bottom:0.75rem;">생성 오류</h2>
  <p style="color:#9ca3af;font-size:0.875rem;">${raw.slice(0, 200)}</p>
</div>
</body></html>`,
  };
}

export async function POST(req: NextRequest) {
  const { prompt, style = "modern dark" } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    return new Response(JSON.stringify({ error: "프롬프트를 입력해주세요" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userMessage = `Create a beautiful, complete HTML UI page for: "${prompt}"
Style preference: ${style}
Requirements: Full page with proper layout, navigation if needed, realistic content, beautiful design.`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 8192,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        });

        for await (const event of messageStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        controller.close();
      } catch (err) {
        const { html } = getErrorMessage(err);
        controller.enqueue(encoder.encode(html));
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
