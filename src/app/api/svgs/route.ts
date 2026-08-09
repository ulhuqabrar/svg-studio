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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const favorite = searchParams.get("favorite") === "true";

    const offset = (page - 1) * limit;

    let query = supabase
      .from("saved_svgs")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    if (favorite) {
      query = query.eq("is_favorite", true);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Fetch SVGs error:", error);
      return NextResponse.json({ error: "Failed to fetch SVGs" }, { status: 500 });
    }

    return NextResponse.json({
      svgs: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("SVGs GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

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
    const { name, svg_content, generation_id, metadata } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!svg_content || typeof svg_content !== "string") {
      return NextResponse.json({ error: "SVG content is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("saved_svgs")
      .insert({
        user_id: user.id,
        name: name.trim(),
        svg_content,
        generation_id: generation_id || null,
        metadata: metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error("Save SVG error:", error);
      return NextResponse.json({ error: "Failed to save SVG" }, { status: 500 });
    }

    return NextResponse.json({ svg: data }, { status: 201 });
  } catch (error) {
    console.error("SVGs POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
