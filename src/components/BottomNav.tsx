"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, BookOpen, User, Rocket } from "lucide-react";

const tabs = [
  { href: "/daily", label: "Diario", icon: Sparkles },
  { href: "/cheatsheet", label: "Frases", icon: BookOpen },
  { href: "/profile", label: "Perfil", icon: User },
  { href: "/apps", label: "Apps", icon: Rocket },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 border-t"
      style={{ background: '#ffffff', borderColor: '#f0e6e0' }}
    >
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors"
          >
            <Icon
              size={22}
              strokeWidth={active ? 2.5 : 1.5}
              style={{ color: active ? '#c4956a' : '#9e9e9e' }}
            />
            <span
              className="text-[10px] font-medium"
              style={{ color: active ? '#c4956a' : '#9e9e9e' }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
