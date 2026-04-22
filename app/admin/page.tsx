"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Clock, CheckCircle, Archive, ArrowRight } from "lucide-react";

interface Stats {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
}

interface Enquiry {
  _id: string;
  fullName: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, read: 0, replied: 0, archived: 0 });
  const [recent, setRecent] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/enquiries?limit=5");
        const data = await res.json();
        setRecent(data.enquiries || []);

        const allRes = await fetch("/api/admin/enquiries?limit=1000");
        const allData = await allRes.json();
        const all: Enquiry[] = allData.enquiries || [];
        setStats({
          total: all.length,
          new: all.filter((e) => e.status === "new").length,
          read: all.filter((e) => e.status === "read").length,
          replied: all.filter((e) => e.status === "replied").length,
          archived: all.filter((e) => e.status === "archived").length,
        });
      } catch {
        /* silently fail */
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    { label: "Total Enquiries", value: stats.total, icon: MessageSquare, color: "text-blue-400" },
    { label: "New", value: stats.new, icon: Clock, color: "text-gold" },
    { label: "Replied", value: stats.replied, icon: CheckCircle, color: "text-green-400" },
    { label: "Archived", value: stats.archived, icon: Archive, color: "text-white/40" },
  ];

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  const statusColors: Record<string, string> = {
    new: "bg-gold/20 text-gold",
    read: "bg-blue-500/20 text-blue-400",
    replied: "bg-green-500/20 text-green-400",
    archived: "bg-white/10 text-white/40",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="text-white/50 text-sm mt-1">Overview of enquiries and activity</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-navy/60 border border-white/5 rounded-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold">
                {loading ? "–" : s.value}
              </p>
              <p className="text-xs text-white/40 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-navy/60 border border-white/5 rounded-sm">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="font-heading text-lg font-semibold">Recent Enquiries</h2>
          <Link
            href="/admin/enquiries"
            className="text-gold text-sm hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-white/30 text-sm">Loading...</div>
        ) : recent.length === 0 ? (
          <div className="p-8 text-center text-white/30 text-sm">
            No enquiries yet. They will appear here once submitted through the contact form.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {recent.map((e) => (
              <Link
                key={e._id}
                href={`/admin/enquiries?id=${e._id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium truncate">{e.fullName}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[e.status] || ""}`}>
                      {e.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 truncate mt-0.5">{e.subject}</p>
                </div>
                <span className="text-[11px] text-white/30 shrink-0 ml-4">
                  {timeAgo(e.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
