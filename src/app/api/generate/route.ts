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
            const chunk = event.delta.text;
            controller.enqueue(encoder.encode(chunk));
          }
        }

        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "생성 오류가 발생했습니다";
        controller.enqueue(encoder.encode(`<p style="color:red;padding:2rem;">${msg}</p>`));
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
