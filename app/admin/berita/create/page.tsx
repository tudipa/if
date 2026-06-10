import { AdminLayout } from "@/components/admin/AdminLayout";
import { NewsForm } from "@/components/admin/NewsForm";

export default function CreateNewsPage() {
  return (
    <AdminLayout title="Tambah Berita">
      <NewsForm />
    </AdminLayout>
  );
}
