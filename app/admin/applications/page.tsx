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
  Globe,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Landmark,
  DollarSign,
  MapPin,
} from "lucide-react";

interface Application {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  assetDescription: string;
  estimatedValue: string;
  lossCircumstance: string;
  jurisdictions: string;
  previousCounsel: string;
  previousCounselDetails?: string;
  urgency: string;
  referralSource: string;
  preferredContact: string;
  routingNumber: string;
  bankName: string;
  beneficiaryName: string;
  accountNumber: string;
  homeAddress: string;
  bankAddress: string;
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

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchApplications = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "20",
        });
        if (statusFilter !== "all") params.set("status", statusFilter);
        if (search) params.set("search", search);

        const res = await fetch(`/api/admin/applications?${params}`);
        const data = await res.json();
        setApplications(data.applications || []);
        setPagination(
          data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 }
        );
      } catch {
        /* silently fail */
      } finally {
        setLoading(false);
      }
    },
    [statusFilter, search]
  );

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  async function updateStatus(id: string, status: string) {
    try {
      await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (selected && selected._id === id) {
        setSelected({ ...selected, status });
      }
      fetchApplications(pagination.page);
    } catch {
      /* fail gracefully */
    }
  }

  async function saveNotes(id: string) {
    setSaving(true);
    try {
      await fetch(`/api/admin/applications/${id}`, {
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

  async function deleteApplication(id: string) {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
      setSelected(null);
      fetchApplications(pagination.page);
    } catch {
      /* fail gracefully */
    }
  }

  function openDetail(app: Application) {
    setSelected(app);
    setNotes(app.notes || "");
    if (app.status === "new") updateStatus(app._id, "under_review");
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const statusColors: Record<string, string> = {
    new: "bg-gold/20 text-gold",
    under_review: "bg-blue-500/20 text-blue-400",
    accepted: "bg-green-500/20 text-green-400",
    declined: "bg-red-500/20 text-red-400",
    archived: "bg-white/10 text-white/40",
  };

  const urgencyColors: Record<string, string> = {
    standard: "bg-white/10 text-white/60",
    urgent: "bg-amber-500/20 text-amber-400",
    critical: "bg-red-500/20 text-red-400",
  };

  const statusOptions = [
    "all",
    "new",
    "under_review",
    "accepted",
    "declined",
    "archived",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Applications</h1>
          <p className="text-white/50 text-sm mt-1">
            {pagination.total} asset recovery application
            {pagination.total !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => fetchApplications(pagination.page)}
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
            onKeyDown={(e) => e.key === "Enter" && fetchApplications()}
            placeholder="Search by name, email, country, or bank..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-white/30" />
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-sm border transition-colors capitalize whitespace-nowrap ${
                statusFilter === s
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-white/10 text-white/50 hover:border-white/20"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-navy/60 border border-white/5 rounded-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-white/30 text-sm">
            Loading applications...
          </div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-sm">
            No applications found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left text-white/40 text-xs">
                    <th className="px-5 py-3 font-medium">Applicant</th>
                    <th className="px-5 py-3 font-medium hidden md:table-cell">
                      Value
                    </th>
                    <th className="px-5 py-3 font-medium hidden lg:table-cell">
                      Circumstance
                    </th>
                    <th className="px-5 py-3 font-medium">Urgency</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium hidden sm:table-cell">
                      Date
                    </th>
                    <th className="px-5 py-3 font-medium w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applications.map((app) => (
                    <tr
                      key={app._id}
                      className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${
                        app.status === "new" ? "bg-gold/[0.02]" : ""
                      }`}
                      onClick={() => openDetail(app)}
                    >
                      <td className="px-5 py-3.5">
                        <p
                          className={`font-medium ${app.status === "new" ? "text-white" : "text-white/80"}`}
                        >
                          {app.fullName}
                        </p>
                        <p className="text-[11px] text-white/40 mt-0.5">
                          {app.email}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-white/50 hidden md:table-cell text-xs">
                        {app.estimatedValue}
                      </td>
                      <td className="px-5 py-3.5 text-white/50 hidden lg:table-cell truncate max-w-[180px] text-xs">
                        {app.lossCircumstance}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${urgencyColors[app.urgency] || ""}`}
                        >
                          {app.urgency}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[app.status] || ""}`}
                        >
                          {app.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-white/40 text-xs hidden sm:table-cell">
                        {formatDate(app.createdAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <div
                          className="flex items-center gap-2"
                          onClick={(ev) => ev.stopPropagation()}
                        >
                          <button
                            onClick={() => openDetail(app)}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteApplication(app._id)}
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
                    onClick={() => fetchApplications(pagination.page - 1)}
                    className="p-1.5 hover:bg-white/10 rounded disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => fetchApplications(pagination.page + 1)}
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

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-navy border border-white/10 rounded-sm w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-white/5 sticky top-0 bg-navy z-10">
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  Application Details
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${urgencyColors[selected.urgency] || ""}`}
                  >
                    {selected.urgency} priority
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[selected.status] || ""}`}
                  >
                    {selected.status.replace("_", " ")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Client Information */}
              <div>
                <h4 className="text-gold text-xs font-semibold tracking-wider uppercase mb-3">
                  Client Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Full Name</p>
                      <p className="text-sm font-medium">
                        {selected.fullName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Email</p>
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-sm text-gold hover:underline"
                      >
                        {selected.email}
                      </a>
                    </div>
                  </div>
                  {selected.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-white/40">Phone</p>
                        <a
                          href={`tel:${selected.phone}`}
                          className="text-sm text-gold hover:underline"
                        >
                          {selected.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Country</p>
                      <p className="text-sm">{selected.country}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Submitted</p>
                      <p className="text-sm">
                        {formatDate(selected.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">
                        Preferred Contact
                      </p>
                      <p className="text-sm capitalize">
                        {selected.preferredContact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5" />

              {/* Asset Details */}
              <div>
                <h4 className="text-gold text-xs font-semibold tracking-wider uppercase mb-3">
                  Asset Details
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Estimated Value</p>
                      <p className="text-sm font-medium">
                        {selected.estimatedValue}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">
                        Nature of Loss
                      </p>
                      <p className="text-sm">{selected.lossCircumstance}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Jurisdictions</p>
                      <p className="text-sm">{selected.jurisdictions}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/40">Referral Source</p>
                      <p className="text-sm">{selected.referralSource}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-white/40 mb-1">
                    Previous Counsel
                  </p>
                  <p className="text-sm capitalize">
                    {selected.previousCounsel}
                    {selected.previousCounselDetails &&
                      ` — ${selected.previousCounselDetails}`}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/40 mb-1">
                    Asset Description & Circumstances
                  </p>
                  <div className="bg-white/5 rounded-sm p-4 text-sm text-white/80 whitespace-pre-wrap">
                    {selected.assetDescription}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5" />

              {/* Recovery Account Details */}
              <div>
                <h4 className="text-gold text-xs font-semibold tracking-wider uppercase mb-3">
                  Recovery Account / Wire Information
                </h4>
                <div className="bg-white/5 rounded-sm p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-white/40">
                          Beneficiary Name
                        </p>
                        <p className="text-sm font-medium">
                          {selected.beneficiaryName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Landmark className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-white/40">Bank Name</p>
                        <p className="text-sm font-medium">
                          {selected.bankName}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/40">
                        Account / IBAN
                      </p>
                      <p className="text-sm font-mono mt-0.5">
                        {selected.accountNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40">
                        Routing / SWIFT / BIC
                      </p>
                      <p className="text-sm font-mono mt-0.5">
                        {selected.routingNumber}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-white/40">Home Address</p>
                        <p className="text-sm">{selected.homeAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-white/40">Bank Address</p>
                        <p className="text-sm">{selected.bankAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5" />

              {/* Status */}
              <div>
                <label className="text-xs text-white/40 block mb-2">
                  Status
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    "new",
                    "under_review",
                    "accepted",
                    "declined",
                    "archived",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected._id, s)}
                      className={`px-3 py-1.5 text-xs rounded-sm border transition-colors capitalize ${
                        selected.status === s
                          ? "border-gold/50 bg-gold/10 text-gold"
                          : "border-white/10 text-white/50 hover:border-white/20"
                      }`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs text-white/40 block mb-2">
                  Internal Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                  placeholder="Add internal notes about this application..."
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
