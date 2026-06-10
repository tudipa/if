"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormDateInput, FormInput, FormSelect, FormTextarea } from "@/components/admin/FormControls";
import { saveActivity, type ActivityItem } from "@/lib/queries/student";

export function ActivityForm({ item }: { item?: ActivityItem }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: Partial<ActivityItem>) => saveActivity(payload, item?.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
      router.push("/admin/kegiatan-mahasiswa");
    }
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const galleryImages = String(formData.get("galleryImages") || "")
      .split(/\r?\n/)
      .map((url) => url.trim())
      .filter(Boolean);

    mutation.mutate({
      title: String(formData.get("title") || ""),
      slug: String(formData.get("slug") || ""),
      category: String(formData.get("category") || ""),
      date: String(formData.get("date") || ""),
      location: String(formData.get("location") || ""),
      description: String(formData.get("description") || ""),
      image: String(formData.get("image") || ""),
      galleryImages,
      attachment: String(formData.get("attachment") || ""),
      publicationStatus: String(formData.get("publicationStatus") || "draft") as ActivityItem["publicationStatus"]
    });
  }

  return (
    <form className="grid gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm" onSubmit={onSubmit}>
      <FormInput defaultValue={item?.title} label="Title" name="title" required />
      <FormInput defaultValue={item?.slug} label="Slug" name="slug" />
      <FormInput defaultValue={item?.category} label="Activity Category" name="category" required />
      <FormDateInput defaultValue={item?.date?.slice(0, 10)} label="Date" name="date" required />
      <FormInput defaultValue={item?.location} label="Location" name="location" required />
      <FormTextarea defaultValue={item?.description} label="Description (Markdown supported)" name="description" required />
      <FormInput defaultValue={item?.image || ""} label="Featured Image URL" name="image" type="url" />
      {item?.image ? <img alt="" className="h-40 w-full rounded-md object-cover" src={item.image} /> : null}
      <FormTextarea defaultValue={item?.galleryImages?.join("\n")} label="Gallery Image URLs (one per line)" name="galleryImages" />
      <FormInput defaultValue={item?.attachment || ""} label="Attachment / Report URL" name="attachment" type="url" />
      <FormSelect
        defaultValue={item?.publicationStatus || "draft"}
        label="Publication Status"
        name="publicationStatus"
        options={[
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" }
        ]}
      />
      {mutation.isError ? <p className="text-sm font-semibold text-red-700">Gagal menyimpan kegiatan.</p> : null}
      <button className="w-fit rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink" disabled={mutation.isPending} type="submit">
        {mutation.isPending ? "Menyimpan..." : "Simpan Kegiatan"}
      </button>
    </form>
  );
}
