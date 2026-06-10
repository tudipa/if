export function LoadingState({ label = "Memuat data..." }: { label?: string }) {
  return <div className="rounded-md border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-600">{label}</div>;
}

export function ErrorState({ label = "Terjadi kesalahan saat memuat data." }: { label?: string }) {
  return <div className="rounded-md border border-red-200 bg-red-50 p-6 text-sm font-semibold text-red-700">{label}</div>;
}
