"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Eye,
  Trash2,
  X,
  Mail,
  Phone,
  Clock,
  User,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Enquiry {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: string;
  status: string;
  notes?: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1, limit: 20, total: 0, totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchEnquiries = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/enquiries?${params}`);
      const data = await res.json();
      setEnquiries(data.enquiries || []);
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
    } catch {
      /* silently fail */
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  async function updateStatus(id: string, status: string) {
    try {
      await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (selected && selected._id === id) {
        setSelected({ ...selected, status });
      }
      fetchEnquiries(pagination.page);
    } catch {
      /* fail gracefully */
    }
  }

  async function saveNotes(id: string) {
    setSaving(true);
    try {
      await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (selected) setSelected({ ...selected, notes });
    } catch {
      /* fail gracefully */
    } finally {
      setSaving(false);
    }
  }

  async function deleteEnquiry(id: string) {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      setSelected(null);
      fetchEnquiries(pagination.page);
    } catch {
      /* fail gracefully */
    }
  }

  function openDetail(e: Enquiry) {
    setSelected(e);
    setNotes(e.notes || "");
    if (e.status === "new") updateStatus(e._id, "read");
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  const statusColors: Record<string, string> = {
    new: "bg-gold/20 text-gold",
    read: "bg-blue-500/20 text-blue-400",
    replied: "bg-green-500/20 text-green-400",
    archived: "bg-white/10 text-white/40",
  };

  const statusOptions = ["all", "new", "read", "replied", "archived"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Enquiries</h1>
          <p className="text-white/50 text-sm mt-1">
            {pagination.total} total submission{pagination.total !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => fetchEnquiries(pagination.page)}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchEnquiries()}
            placeholder="Search by name, email, or subject..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/30" />
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-sm border transition-colors capitalize ${
                statusFilter === s
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-white/10 text-white/50 hover:border-white/20"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-navy/60 border border-white/5 rounded-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-white/30 text-sm">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-sm">No enquiries found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left text-white/40 text-xs">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium hidden md:table-cell">Email</th>
                    <th className="px-5 py-3 font-medium hidden lg:table-cell">Subject</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium hidden sm:table-cell">Date</th>
                    <th className="px-5 py-3 font-medium w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {enquiries.map((e) => (
                    <tr
                      key={e._id}
                      className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${
                        e.status === "new" ? "bg-gold/[0.02]" : ""
                      }`}
                      onClick={() => openDetail(e)}
                    >
                      <td className="px-5 py-3.5">
                        <p className={`font-medium ${e.status === "new" ? "text-white" : "text-white/80"}`}>
                          {e.fullName}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-white/50 hidden md:table-cell">{e.email}</td>
                      <td className="px-5 py-3.5 text-white/50 hidden lg:table-cell truncate max-w-[200px]">
                        {e.subject}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[e.status] || ""}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-white/40 text-xs hidden sm:table-cell">
                        {formatDate(e.createdAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2" onClick={(ev) => ev.stopPropagation()}>
                          <button
                            onClick={() => openDetail(e)}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteEnquiry(e._id)}
                            className="p-1.5 hover:bg-red-500/10 rounded transition-colors text-white/40 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 text-xs text-white/40">
                <span>
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={pagination.page <= 1}
                    onClick={() => fetchEnquiries(pagination.page - 1)}
                    className="p-1.5 hover:bg-white/10 rounded disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => fetchEnquiries(pagination.page + 1)}
                    className="p-1.5 hover:bg-white/10 rounded disabled:opacity-30"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-navy border border-white/10 rounded-sm w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <h3 className="font-heading text-lg font-semibold">Enquiry Details</h3>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/40">Name</p>
                    <p className="text-sm font-medium">{selected.fullName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/40">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-sm text-gold hover:underline">
                      {selected.email}
                    </a>
                  </div>
                </div>
                {selected.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Phone</p>
                      <a href={`tel:${selected.phone}`} className="text-sm text-gold hover:underline">
                        {selected.phone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/40">Submitted</p>
                    <p className="text-sm">{formatDate(selected.createdAt)}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-gold" />
                  <p className="text-xs text-white/40">Subject: {selected.subject}</p>
                </div>
                <p className="text-xs text-white/30 mb-2">
                  Preferred contact: {selected.preferredContact}
                </p>
                <div className="bg-white/5 rounded-sm p-4 text-sm text-white/80 whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 block mb-2">Status</label>
                <div className="flex gap-2">
                  {["new", "read", "replied", "archived"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected._id, s)}
                      className={`px-3 py-1.5 text-xs rounded-sm border transition-colors capitalize ${
                        selected.status === s
                          ? "border-gold/50 bg-gold/10 text-gold"
                          : "border-white/10 text-white/50 hover:border-white/20"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 block mb-2">Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                  placeholder="Add internal notes about this enquiry..."
                />
                <button
                  onClick={() => saveNotes(selected._id)}
                  disabled={saving}
                  className="mt-2 px-4 py-2 text-xs bg-gold hover:bg-gold-dark text-navy font-semibold rounded-sm transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
