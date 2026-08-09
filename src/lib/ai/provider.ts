export interface GenerateRequest {
  prompt: string;
  style?: string;
  styleConfig?: Record<string, unknown>;
  count?: number;
}

export interface GenerateResult {
  svgContent: string;
  metadata?: Record<string, unknown>;
}

export interface AiProvider {
  generate(request: GenerateRequest): Promise<GenerateResult[]>;
}

export function createAiProvider(): AiProvider {
  const apiKey = process.env.OPENCODE_API_KEY;

  if (apiKey) {
    return new OpenCodeProvider(apiKey);
  }

  console.warn("[AI] No OPENCODE_API_KEY found, using mock provider");
  return new MockProvider();
}

class OpenCodeProvider implements AiProvider {
  private apiKey: string;
  private baseUrl = "https://opencode.ai/zen/v1";
  private model = "mimo-v2.5-free";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(request: GenerateRequest): Promise<GenerateResult[]> {
    const count = request.count || 6;
    const styleInstruction = request.style
      ? ` Use the "${request.style}" visual style.`
      : "";

    const systemPrompt = `You are an SVG generator. Generate clean, valid SVG icons based on the user's description.
Rules:
- Output ONLY the SVG code, no explanations
- Use viewBox="0 0 24 24" for all SVGs
- Use stroke-based rendering (stroke, not fill) unless specifically asked for filled
- Keep paths simple and clean
- Use currentColor for stroke/fill so they adapt to parent color
- Output each SVG as a separate code block
- Generate exactly ${count} variations${styleInstruction}`;

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: request.prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenCode API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return this.parseSvgs(content, count);
  }

  private parseSvgs(content: string, expectedCount: number): GenerateResult[] {
    const svgRegex = /<svg[\s\S]*?<\/svg>/gi;
    const matches = content.match(svgRegex) || [];

    const results: GenerateResult[] = matches.slice(0, expectedCount).map((svg, i) => ({
      svgContent: svg.trim(),
      metadata: { index: i, provider: "opencode-zen", model: this.model },
    }));

    if (results.length === 0) {
      throw new Error("No valid SVGs found in API response");
    }

    return results;
  }
}

class MockProvider implements AiProvider {
  async generate(request: GenerateRequest): Promise<GenerateResult[]> {
    const count = request.count || 6;
    const results: GenerateResult[] = [];

    for (let i = 0; i < count; i++) {
      results.push({
        svgContent: this.generateMockSvg(request.prompt, request.style, i),
        metadata: {
          index: i,
          provider: "mock",
          prompt: request.prompt,
          style: request.style,
        },
      });
    }

    return results;
  }

  private generateMockSvg(prompt: string, style?: string, index?: number): string {
    const strokeWidth = style?.toLowerCase().includes("bold") ? 2.5 : 1.5;
    const fill = style?.toLowerCase().includes("filled") ? "currentColor" : "none";
    const color = style?.toLowerCase().includes("bold") ? "#3b82f6" : "currentColor";

    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="2" fill="${fill}"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 3v3m0 12v3M3 12h3m12 0h3"/>
</svg>`;
  }
}
