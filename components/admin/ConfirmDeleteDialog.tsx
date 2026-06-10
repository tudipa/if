"use client";

type ConfirmDeleteDialogProps = {
  label?: string;
  onConfirm: () => void;
};

export function ConfirmDeleteDialog({ label = "Hapus", onConfirm }: ConfirmDeleteDialogProps) {
  return (
    <button
      className="rounded-md bg-red-50 px-3 py-2 text-xs font-bold text-red-700"
      onClick={() => window.confirm("Hapus data ini?") && onConfirm()}
      type="button"
    >
      {label}
    </button>
  );
}
