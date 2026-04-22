"use client";

import { useEffect, useState } from "react";
import { Save, Plus, Trash2, Building2, Mail, Phone, Globe } from "lucide-react";

interface Office {
  name: string;
  street: string;
  city: string;
  postal: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
}

interface Settings {
  generalEmail: string;
  generalPhone: string;
  offices: Office[];
}

const emptyOffice: Office = {
  name: "",
  street: "",
  city: "",
  postal: "",
  country: "DE",
  phone: "",
  email: "",
  hours: "Mon–Fri: 08:00–18:00 CET",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      /* silently fail */
    } finally {
      setSaving(false);
    }
  }

  function updateField(field: keyof Settings, value: string) {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  }

  function updateOffice(index: number, field: keyof Office, value: string) {
    if (!settings) return;
    const offices = [...settings.offices];
    offices[index] = { ...offices[index], [field]: value };
    setSettings({ ...settings, offices });
  }

  function addOffice() {
    if (!settings) return;
    setSettings({ ...settings, offices: [...settings.offices, { ...emptyOffice }] });
  }

  function removeOffice(index: number) {
    if (!settings) return;
    if (!confirm("Remove this office?")) return;
    const offices = settings.offices.filter((_, i) => i !== index);
    setSettings({ ...settings, offices });
  }

  if (loading) {
    return <div className="text-center text-white/30 py-12">Loading settings...</div>;
  }

  if (!settings) {
    return <div className="text-center text-red-400 py-12">Failed to load settings.</div>;
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Site Settings</h1>
          <p className="text-white/50 text-sm mt-1">
            Update contact information displayed on the public website
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-dark text-navy font-semibold text-sm rounded-sm transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="bg-navy/60 border border-white/5 rounded-sm p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-gold" />
          <h2 className="font-heading text-lg font-semibold">General Contact</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/40 block mb-1.5">
              <Mail className="w-3 h-3 inline mr-1" /> General Email
            </label>
            <input
              type="email"
              value={settings.generalEmail}
              onChange={(e) => updateField("generalEmail", e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-1.5">
              <Phone className="w-3 h-3 inline mr-1" /> General Phone
            </label>
            <input
              type="text"
              value={settings.generalPhone}
              onChange={(e) => updateField("generalPhone", e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gold" />
            <h2 className="font-heading text-lg font-semibold">Offices</h2>
          </div>
          <button
            onClick={addOffice}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors"
          >
            <Plus className="w-3 h-3" /> Add Office
          </button>
        </div>

        {settings.offices.map((office, i) => (
          <div key={i} className="bg-navy/60 border border-white/5 rounded-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gold">
                {office.name || `Office ${i + 1}`}
              </h3>
              {settings.offices.length > 1 && (
                <button
                  onClick={() => removeOffice(i)}
                  className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/40 block mb-1.5">Office Name</label>
                <input
                  value={office.name}
                  onChange={(e) => updateOffice(i, "name", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
                  placeholder="Hamburg Office"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-1.5">Street Address</label>
                <input
                  value={office.street}
                  onChange={(e) => updateOffice(i, "street", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
                  placeholder="Neuer Wall 50"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-1.5">City</label>
                <input
                  value={office.city}
                  onChange={(e) => updateOffice(i, "city", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
                  placeholder="Hamburg"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-1.5">Postal Code</label>
                <input
                  value={office.postal}
                  onChange={(e) => updateOffice(i, "postal", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
                  placeholder="20354"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-1.5">Phone</label>
                <input
                  value={office.phone}
                  onChange={(e) => updateOffice(i, "phone", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
                  placeholder="+49 (40) 123 456 789"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-1.5">Email</label>
                <input
                  type="email"
                  value={office.email}
                  onChange={(e) => updateOffice(i, "email", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
                  placeholder="hamburg@vonsteiger.law"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-1.5">Business Hours</label>
                <input
                  value={office.hours}
                  onChange={(e) => updateOffice(i, "hours", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
                  placeholder="Mon–Fri: 08:00–18:00 CET"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-1.5">Country</label>
                <input
                  value={office.country}
                  onChange={(e) => updateOffice(i, "country", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-gold/50"
                  placeholder="DE"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold-dark text-navy font-semibold text-sm rounded-sm transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
