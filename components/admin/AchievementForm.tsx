"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormDateInput, FormInput, FormSelect, FormTextarea } from "@/components/admin/FormControls";
import { saveAchievement, type AchievementItem } from "@/lib/queries/student";

export function AchievementForm({ item }: { item?: AchievementItem }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: Partial<AchievementItem>) => saveAchievement(payload, item?.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["achievements"] });
      router.push("/admin/prestasi-mahasiswa");
    }
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutation.mutate({
      title: String(formData.get("title") || ""),
      slug: String(formData.get("slug") || ""),
      studentName: String(formData.get("studentName") || ""),
      level: String(formData.get("level") || "local") as AchievementItem["level"],
      eventName: String(formData.get("eventName") || ""),
      organizer: String(formData.get("organizer") || ""),
      date: String(formData.get("date") || ""),
      description: String(formData.get("description") || ""),
      image: String(formData.get("image") || ""),
      attachment: String(formData.get("attachment") || ""),
      publicationStatus: String(formData.get("publicationStatus") || "draft") as AchievementItem["publicationStatus"]
    });
  }

  return (
    <form className="grid gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm" onSubmit={onSubmit}>
      <FormInput defaultValue={item?.title} label="Title" name="title" required />
      <FormInput defaultValue={item?.slug} label="Slug" name="slug" />
      <FormInput defaultValue={item?.studentName} label="Student / Team Name" name="studentName" required />
      <FormSelect
        defaultValue={item?.level || "local"}
        label="Achievement Level"
        name="level"
        options={[
          { label: "Local", value: "local" },
          { label: "Regional", value: "regional" },
          { label: "National", value: "national" },
          { label: "International", value: "international" }
        ]}
      />
      <FormInput defaultValue={item?.eventName} label="Competition / Event Name" name="eventName" required />
      <FormInput defaultValue={item?.organizer} label="Organizer" name="organizer" required />
      <FormDateInput defaultValue={item?.date?.slice(0, 10)} label="Date / Year" name="date" required />
      <FormTextarea defaultValue={item?.description} label="Description (Markdown supported)" name="description" required />
      <FormInput defaultValue={item?.image || ""} label="Featured Image URL" name="image" type="url" />
      {item?.image ? <img alt="" className="h-40 w-full rounded-md object-cover" src={item.image} /> : null}
      <FormInput defaultValue={item?.attachment || ""} label="Attachment URL" name="attachment" type="url" />
      <FormSelect
        defaultValue={item?.publicationStatus || "draft"}
        label="Publication Status"
        name="publicationStatus"
        options={[
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" }
        ]}
      />
      {mutation.isError ? <p className="text-sm font-semibold text-red-700">Gagal menyimpan prestasi.</p> : null}
      <button className="w-fit rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink" disabled={mutation.isPending} type="submit">
        {mutation.isPending ? "Menyimpan..." : "Simpan Prestasi"}
      </button>
    </form>
  );
}
