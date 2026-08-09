import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAiProvider } from "@/lib/ai/provider";
import { validateSvg } from "@/lib/svg/validate";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { prompt, style, styleConfig, count } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (prompt.length > 1000) {
      return NextResponse.json({ error: "Prompt too long (max 1000 characters)" }, { status: 400 });
    }

    let usageCount = 0;
    const limit = 20;

    const usageCheck = await supabase
      .from("usage_records")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("action", "generate")
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (usageCheck.error) {
      console.warn("Usage check failed (table may not exist):", usageCheck.error.message);
    } else {
      usageCount = usageCheck.count || 0;
    }

    if (usageCount >= limit) {
      return NextResponse.json(
        { error: "Generation limit reached. Please upgrade to Pro." },
        { status: 403 }
      );
    }

    const provider = createAiProvider();
    let results;
    try {
      results = await provider.generate({
        prompt: prompt.trim(),
        style,
        styleConfig,
        count: Math.min(count || 6, 12),
      });
    } catch (aiError) {
      console.error("AI provider error:", aiError);
      return NextResponse.json(
        { error: `Generation failed: ${aiError instanceof Error ? aiError.message : "Unknown error"}` },
        { status: 502 }
      );
    }

    const validatedResults = results
      .map((result) => {
        const validation = validateSvg(result.svgContent);
        if (!validation.valid) {
          console.warn("SVG validation failed:", validation.errors);
          return null;
        }
        return {
          svgContent: validation.sanitized!,
          metadata: result.metadata,
        };
      })
      .filter(Boolean);

    if (validatedResults.length === 0) {
      return NextResponse.json(
        { error: "No valid SVGs generated. Try a different prompt." },
        { status: 422 }
      );
    }

    const insertResult = await supabase.from("usage_records").insert({
      user_id: user.id,
      action: "generate",
      metadata: {
        prompt: prompt.trim(),
        style,
        resultCount: validatedResults.length,
      },
    });

    if (insertResult.error) {
      console.warn("Usage record insert failed:", insertResult.error.message);
    }

    return NextResponse.json({
      results: validatedResults,
      usage: {
        used: usageCount + 1,
        limit,
      },
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : "Unknown"}` },
      { status: 500 }
    );
  }
}
