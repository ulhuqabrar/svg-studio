import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data: generations, error: genError } = await supabase
      .from("usage_records")
      .select("id, action, created_at")
      .eq("user_id", user.id)
      .eq("action", "generate")
      .gte("created_at", thirtyDaysAgo);

    if (genError) {
      console.error("Usage fetch error:", genError);
    }

    const generationCount = generations?.length || 0;
    const limit = 20;

    return NextResponse.json({
      usage: {
        generations: {
          used: generationCount,
          limit,
          remaining: Math.max(0, limit - generationCount),
        },
      },
    });
  } catch (error) {
    console.error("Usage GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
