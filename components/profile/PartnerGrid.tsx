"use client";

import { useMemo, useState } from "react";
import { PartnerCard } from "@/components/profile/PartnerCard";
import { partners } from "@/lib/data/profile";

export function PartnerGrid() {
  const categories = useMemo(() => ["Semua", ...Array.from(new Set(partners.map((partner) => partner.category)))], []);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const filteredPartners =
    activeCategory === "Semua" ? partners : partners.filter((partner) => partner.category === activeCategory);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            className={`rounded-md border px-4 py-2 text-sm font-bold transition ${
              activeCategory === category
                ? "border-ocean bg-ocean text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-ocean hover:text-ocean"
            }`}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPartners.map((partner) => (
          <PartnerCard
            category={partner.category}
            description={partner.description}
            key={partner.name}
            name={partner.name}
          />
        ))}
      </div>
    </div>
  );
}
