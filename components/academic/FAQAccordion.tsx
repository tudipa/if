"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { academicFaqs } from "@/lib/data/academic";

export function FAQAccordion() {
  const [openId, setOpenId] = useState(academicFaqs[0]?.question ?? "");

  return (
    <div className="grid gap-3">
      {academicFaqs.map((faq) => {
        const isOpen = openId === faq.question;

        return (
          <div className="rounded-md border border-slate-200 bg-white" key={faq.question}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-ink"
              onClick={() => setOpenId(isOpen ? "" : faq.question)}
              type="button"
            >
              {faq.question}
              <ChevronDown className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`} size={20} />
            </button>
            {isOpen ? <p className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600">{faq.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
