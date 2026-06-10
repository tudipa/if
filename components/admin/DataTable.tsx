"use client";

import Link from "next/link";
import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog";
import { Badge } from "@/components/student/Badge";

type Column<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
};

type DataTableProps<T extends { id: string }> = {
  items: T[];
  columns: Column<T>[];
  editBasePath: string;
  onDelete: (id: string) => void;
};

export function DataTable<T extends { id: string }>({ items, columns, editBasePath, onDelete }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
      <table className="min-w-[760px] w-full text-left">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600" key={column.header}>
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td className="px-4 py-4 text-sm text-slate-700" key={column.header}>
                  {column.render(item)}
                </td>
              ))}
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <Link className="rounded-md bg-blue-50 px-3 py-2 text-xs font-bold text-ocean" href={`${editBasePath}/${item.id}/edit`}>
                    Edit
                  </Link>
                  <ConfirmDeleteDialog onConfirm={() => onDelete(item.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusBadge({ value }: { value: string }) {
  return <Badge tone={value.includes("published") || value.includes("upcoming") ? "green" : "slate"}>{value}</Badge>;
}
