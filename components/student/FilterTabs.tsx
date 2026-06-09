"use client";

type FilterTabsProps = {
  activeValue: string;
  values: string[];
  onChange: (value: string) => void;
};

export function FilterTabs({ activeValue, values, onChange }: FilterTabsProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {values.map((value) => (
        <button
          className={`rounded-md border px-4 py-2 text-sm font-bold transition ${
            activeValue === value
              ? "border-ocean bg-ocean text-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-ocean hover:text-ocean"
          }`}
          key={value}
          onClick={() => onChange(value)}
          type="button"
        >
          {value}
        </button>
      ))}
    </div>
  );
}
