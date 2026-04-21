import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // Count unique users who have at least one completion
  const { count } = await supabase
    .from("glowup_completions")
    .select("user_id", { count: "exact", head: true });

  return Response.json({
    app: "glowup",
    users: count ?? 0,
  });
}
