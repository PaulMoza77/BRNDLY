// src/pages/admin/Leads.tsx
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type LeadStatus = "accepted" | "rejected" | "needs_follow_up";

type LeadRow = {
  id: string;
  created_at: string | null;
  updated_at: string | null;

  name: string | null;
  email: string | null;
  phone: string | null;

  company: string | null;
  region: string | null;
  budget: string | null;
  message: string | null;

  status: LeadStatus;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDate(iso?: string | null) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return String(iso);
  }
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function StatusButton({
  active,
  colorClass,
  children,
  onClick,
  disabled,
}: {
  active: boolean;
  colorClass: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-[11px] font-semibold transition border",
        active
          ? cn("text-white border-transparent", colorClass)
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
        "disabled:opacity-60 disabled:cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

export default function LeadsPage() {
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);

    const { data, error } = await supabase
      .from("contact_messages")
      .select(
        "id,created_at,updated_at,name,email,phone,company,region,budget,message,status"
      )
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Failed to load leads");
      return;
    }

    setLeads((data ?? []) as LeadRow[]);
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leads;

    return leads.filter((l) => {
      const blob = [
        l.name,
        l.email,
        l.company,
        l.region,
        l.budget,
        l.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return blob.includes(q);
    });
  }, [leads, search]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const accepted = filtered.filter((x) => x.status === "accepted").length;
    const rejected = filtered.filter((x) => x.status === "rejected").length;
    const follow = filtered.filter((x) => x.status === "needs_follow_up").length;

    const acceptanceRate = total > 0 ? accepted / total : 0;

    return { total, accepted, rejected, follow, acceptanceRate };
  }, [filtered]);

  async function setStatus(leadId: string, status: LeadStatus) {
    if (updatingId) return;

    const prev = leads;

    setUpdatingId(leadId);
    setLeads((arr) =>
      arr.map((l) => (l.id === leadId ? { ...l, status } : l))
    );

    const { error } = await supabase
      .from("contact_messages")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", leadId);

    setUpdatingId(null);

    if (error) {
      console.error(error);
      setLeads(prev);
      toast.error("Failed to update status");
      return;
    }

    toast.success("Lead updated");
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Leads</h1>
          <p className="text-xs text-slate-500">
            Saved from website Contact form (Brndly)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name / email / company / message..."
            className="h-9 w-full sm:w-[360px] rounded-xl border border-slate-200 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 md:grid-cols-3">
        {/* Total Leads */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Total Leads
          </div>
          <div className="mt-2 text-2xl font-semibold">{stats.total}</div>
          <div className="mt-1 text-xs text-slate-500">
            Based on current filter/search
          </div>
        </div>

        {/* Acceptance Rate */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Acceptance Rate
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {pct(stats.acceptanceRate)}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Accepted / Total (filtered)
          </div>
        </div>

        {/* Split card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
            Status Breakdown
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-slate-200 p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Accepted
              </div>
              <div className="mt-1 text-lg font-semibold text-emerald-700">
                {stats.accepted}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Rejected
              </div>
              <div className="mt-1 text-lg font-semibold text-red-700">
                {stats.rejected}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Follow Up
              </div>
              <div className="mt-1 text-lg font-semibold text-blue-700">
                {stats.follow}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leads list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            No leads found.
          </div>
        ) : (
          filtered.map((l) => {
            const isUpdating = updatingId === l.id;

            return (
              <div
                key={l.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  {/* Left info */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <div className="text-sm font-semibold text-slate-900">
                        {l.name || "Unknown"}
                      </div>
                      {l.company ? (
                        <div className="text-xs text-slate-500">
                          • {l.company}
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
                      {l.email ? <span>{l.email}</span> : null}
                      {l.region ? <span>• {l.region}</span> : null}
                      {l.budget ? <span>• {l.budget}</span> : null}
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      Created: {formatDate(l.created_at)}
                      {l.updated_at ? (
                        <> • Updated: {formatDate(l.updated_at)}</>
                      ) : null}
                    </div>
                  </div>

                  {/* Status Switch */}
                  <div className="flex flex-wrap gap-2">
                    <StatusButton
                      active={l.status === "accepted"}
                      colorClass="bg-emerald-600"
                      onClick={() => setStatus(l.id, "accepted")}
                      disabled={isUpdating}
                    >
                      Accepted
                    </StatusButton>

                    <StatusButton
                      active={l.status === "rejected"}
                      colorClass="bg-red-600"
                      onClick={() => setStatus(l.id, "rejected")}
                      disabled={isUpdating}
                    >
                      Rejected
                    </StatusButton>

                    <StatusButton
                      active={l.status === "needs_follow_up"}
                      colorClass="bg-blue-600"
                      onClick={() => setStatus(l.id, "needs_follow_up")}
                      disabled={isUpdating}
                    >
                      Needs Follow Up
                    </StatusButton>
                  </div>
                </div>

                {/* Message */}
                {l.message ? (
                  <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 whitespace-pre-wrap">
                    {l.message}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}