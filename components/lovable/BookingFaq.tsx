"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Do I need to prepare anything before we speak?",
    a: "No preparation needed. Just come as you are. The introductory call is informal — there are no right or wrong things to say.",
  },
  {
    q: "How do online sessions work?",
    a: "Sessions take place via a secure video platform. All you need is a quiet space and a stable internet connection. The experience is much the same as meeting in person.",
  },
  {
    q: "What if I'm not sure therapy is right for me?",
    a: "That's exactly what the introductory call is for. We can explore together whether this feels like the right fit — no commitment required.",
  },
  {
    q: "Is everything confidential?",
    a: "Yes. Everything shared in sessions is confidential, within the ethical guidelines of the BACP. Exceptions are rare and would be discussed with you whenever possible.",
  },
  {
    q: "Can I reschedule or cancel?",
    a: "Yes, with reasonable notice. We'll agree on a cancellation policy together before sessions begin, so there are no surprises.",
  },
] as const;

export function BookingFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border">
      {FAQS.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="font-light text-foreground/90 text-base">{item.q}</span>
            <span
              className={`shrink-0 text-accent transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="8" y1="1" x2="8" y2="15" />
                <line x1="1" y1="8" x2="15" y2="8" />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-48 pb-5" : "max-h-0"}`}
          >
            <p className="text-sm font-light leading-relaxed text-muted-foreground">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
