import { ActivityForm } from "@/components/admin/ActivityForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function CreateActivityPage() {
  return (
    <AdminLayout title="Tambah Kegiatan Mahasiswa">
      <ActivityForm />
    </AdminLayout>
  );
}
