import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BottomNav from "@/components/BottomNav";
import InstallPrompt from "@/components/InstallPrompt";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Track session
  await supabase.from("glowup_sessions").insert({ user_id: user.id });

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <main className="flex-1">{children}</main>
      <InstallPrompt />
      <BottomNav />
    </div>
  );
}
