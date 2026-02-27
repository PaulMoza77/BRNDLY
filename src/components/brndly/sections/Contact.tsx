import React, { useMemo, useState } from "react";
import type { BrndlyLeadPayload } from "../types";

type Props = {
  onSubmitLead?: (payload: BrndlyLeadPayload) => Promise<void> | void;
};

const REGIONS: BrndlyLeadPayload["region"][] = [
  "Dubai / Middle East",
  "Romania",
  "Europe (other)",
  "Other / remote",
];

const BUDGETS: BrndlyLeadPayload["budget"][] = [
  "€2,000 – €5,000",
  "€5,000 – €10,000",
  "€10,000 – €25,000",
  "€25,000+",
];

export default function Contact({ onSubmitLead }: Props) {
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [region, setRegion] = useState<BrndlyLeadPayload["region"]>(REGIONS[0]);
  const [budget, setBudget] = useState<BrndlyLeadPayload["budget"]>(BUDGETS[0]);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const isValid = useMemo(() => {
    const e = email.trim().toLowerCase();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    return name.trim().length >= 2 && company.trim().length >= 2 && okEmail;
  }, [name, company, email]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || status === "sending") return;

    setStatus("sending");

    const payload: BrndlyLeadPayload = {
      name: name.trim(),
      company: company.trim(),
      email: email.trim().toLowerCase(),
      region,
      budget,
      message: message.trim(),
    };

    try {
      if (onSubmitLead) await onSubmitLead(payload);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="pb-14 md:pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-4 border border-slate-200 rounded-3xl bg-white/90 shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform transition-shadow duration-300 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/2 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Contact</p>

          <h2 className="text-xl md:text-2xl font-semibold">Ready for 1.5M organic views?</h2>

          <p className="text-sm text-slate-600">
            Share a few details and our team will get back with a clear content plan,
            estimated timelines and a price–on–request proposal.
          </p>

          <p className="text-xs text-slate-500">We usually reply within one business day.</p>

          {status === "sent" && (
            <div className="text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-700">
              ✅ Sent. We’ll get back to you shortly.
            </div>
          )}

          {status === "error" && (
            <div className="text-xs rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
              Something went wrong. Please try again.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="md:w-1/2 grid gap-4 text-xs">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="Full name"
              />
            </Field>

            <Field label="Brand / Company">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="Brand name"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="you@brand.com"
              />
            </Field>

            <Field label="Region">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as BrndlyLeadPayload["region"])}
                className="h-9 rounded-lg border border-slate-200 px-3 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Approx. monthly budget">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value as BrndlyLeadPayload["budget"])}
              className="h-9 rounded-lg border border-slate-200 px-3 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>

          <Field label="What do you want to achieve?">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[80px] rounded-lg border border-slate-200 px-3 py-2 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-slate-900"
              placeholder="Tell us about your brand, platforms and goals."
            />
          </Field>

          <button
            type="submit"
            disabled={!isValid || status === "sending" || status === "sent"}
            className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-900 text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-purple-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send brief & request pricing"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props;

  return (
    <div className="flex flex-col gap-1">
      <label className="uppercase tracking-[0.2em] text-[10px] text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}