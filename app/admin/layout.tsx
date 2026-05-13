"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface AdminUser {
  name?: string;
  email: string;
  role: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    fetch("/api/admin/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setUser(d.user);
      })
      .catch(() => {});
  }, [isLoginPage]);

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#080E1A] text-white flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy border-r border-white/5 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/5">
          <Image
            src="/logo.svg"
            alt="Von Steiger & Associates"
            width={160}
            height={40}
            className="h-8 w-auto"
          />
          <p className="text-[10px] text-gold/60 tracking-wider uppercase mt-2">
            Admin Panel
          </p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                  active
                    ? "bg-gold/10 text-gold border-l-2 border-gold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          {user && (
            <div className="mb-3 px-4">
              <p className="text-sm font-medium text-white truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-white/40 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-sm w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-[#080E1A]/80 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h2 className="text-sm font-medium text-white/80 hidden lg:block">
            {navItems.find((n) => n.href === pathname)?.label || "Admin"}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">
              {user?.role === "superadmin" ? "Super Admin" : "Admin"}
            </span>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
