import { AdminLayout } from "@/components/admin/AdminLayout";
import { AgendaForm } from "@/components/admin/AgendaForm";

export default function CreateAgendaPage() {
  return (
    <AdminLayout title="Tambah Agenda">
      <AgendaForm />
    </AdminLayout>
  );
}
