import { AchievementForm } from "@/components/admin/AchievementForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function CreateAchievementPage() {
  return (
    <AdminLayout title="Tambah Prestasi Mahasiswa">
      <AchievementForm />
    </AdminLayout>
  );
}
