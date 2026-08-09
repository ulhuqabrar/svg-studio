import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { searchParams } = new URL(request.url);
    const curated = searchParams.get("curated");
    const category = searchParams.get("category");

    let query = supabase
      .from("svg_styles")
      .select("*")
      .order("sort_order", { ascending: true });

    if (curated === "true") {
      query = query.eq("is_curated", true);
    }

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Fetch styles error:", error);
      return NextResponse.json({ error: "Failed to fetch styles" }, { status: 500 });
    }

    return NextResponse.json({ styles: data });
  } catch (error) {
    console.error("Styles GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
