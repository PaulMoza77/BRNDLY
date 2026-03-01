// src/components/brndly/sections/Contact.tsx
import React, { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { BrndlyLeadPayload } from "../types";

type ContactProps = {
  // optional hook (ex: send email / slack). We still ALWAYS save in DB.
  onSubmitLead?: (payload: BrndlyLeadPayload) => Promise<void> | void;

  kicker?: string;
  title?: string;
  subtitle?: string;
  note?: string;
  buttonText?: string;

  regions?: BrndlyLeadPayload["region"][];
  budgets?: BrndlyLeadPayload["budget"][];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
}

export default function Contact({
  onSubmitLead,

  kicker = "Contact",
  title = "Ready for 1.5M organic views?",
  subtitle =
    "Share a few details and our team will get back with a clear content plan, estimated timelines and a price–on–request proposal.",
  note = "We usually reply within one business day.",
  buttonText = "Send brief & request pricing",

  regions,
  budgets,
}: ContactProps) {
  const REGIONS = useMemo<BrndlyLeadPayload["region"][]>(
    () =>
      (regions && regions.length > 0
        ? regions
        : ([
            "Dubai / Middle East",
            "Romania",
            "Europe (other)",
            "Other / remote",
          ] as BrndlyLeadPayload["region"][])),
    [regions]
  );

  const BUDGETS = useMemo<BrndlyLeadPayload["budget"][]>(
    () =>
      (budgets && budgets.length > 0
        ? budgets
        : ([
            "€2,000 – €5,000",
            "€5,000 – €10,000",
            "€10,000 – €25,000",
            "€25,000+",
          ] as BrndlyLeadPayload["budget"][])),
    [budgets]
  );

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState<BrndlyLeadPayload["region"]>(REGIONS[0]);
  const [budget, setBudget] = useState<BrndlyLeadPayload["budget"]>(BUDGETS[0]);
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorText, setErrorText] = useState<string | null>(null);

  React.useEffect(() => {
    if (!REGIONS.includes(region)) setRegion(REGIONS[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [REGIONS.join("||")]);

  React.useEffect(() => {
    if (!BUDGETS.includes(budget)) setBudget(BUDGETS[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BUDGETS.join("||")]);

  const isValid = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      company.trim().length >= 2 &&
      isValidEmail(email)
    );
  }, [name, company, email]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || status === "sending") return;

    setStatus("sending");
    setErrorText(null);

    const payload: BrndlyLeadPayload = {
      name: name.trim(),
      company: company.trim(),
      email: email.trim().toLowerCase(),
      region,
      budget,
      message: message.trim(),
    };

    try {
      // 1) ALWAYS save to DB
      const { error } = await supabase.from("contact_messages").insert({
        name: payload.name || null,
        email: payload.email,
        phone: null,

        company: payload.company || null,
        region: payload.region || null,
        budget: payload.budget || null,

        message: payload.message || null,
      });

      if (error) throw error;

      // 2) Optional side-effects (email/slack/etc)
      if (onSubmitLead) await onSubmitLead(payload);

      // success UI + reset
      setStatus("sent");
      setName("");
      setCompany("");
      setEmail("");
      setRegion(REGIONS[0]);
      setBudget(BUDGETS[0]);
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setErrorText(err?.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="pb-14 md:pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-4 border border-slate-200 rounded-3xl bg-white/90 shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform transition-shadow duration-300 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/2 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {kicker}
          </p>

          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>

          <p className="text-sm text-slate-600">{subtitle}</p>

          <p className="text-xs text-slate-500">{note}</p>

          {status === "sent" && (
            <div className="text-xs rounded-xl border border-slate-200 bg-white p-3 text-slate-700">
              ✅ Sent. We’ll get back to you shortly.
            </div>
          )}

          {status === "error" && (
            <div className="text-xs rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
              {errorText ?? "Something went wrong. Please try again."}
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
                autoComplete="name"
              />
            </Field>

            <Field label="Brand / Company">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="Brand name"
                autoComplete="organization"
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
                autoComplete="email"
              />
            </Field>

            <Field label="Region">
              <select
                value={region}
                onChange={(e) =>
                  setRegion(e.target.value as BrndlyLeadPayload["region"])
                }
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
              onChange={(e) =>
                setBudget(e.target.value as BrndlyLeadPayload["budget"])
              }
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
            className={cn(
              "mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-900 text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-purple-800 transition",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {status === "sending" ? "Sending..." : buttonText}
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