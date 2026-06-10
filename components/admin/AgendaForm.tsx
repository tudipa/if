"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormCheckbox, FormDateInput, FormInput, FormSelect, FormTextarea } from "@/components/admin/FormControls";
import { saveAgenda, type AgendaItem } from "@/lib/queries/agenda";

export function AgendaForm({ item }: { item?: AgendaItem }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: Partial<AgendaItem>) => saveAgenda(payload, item?.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["agenda"] });
      router.push("/admin/agenda");
    }
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutation.mutate({
      title: String(formData.get("title") || ""),
      slug: String(formData.get("slug") || ""),
      category: String(formData.get("category") || ""),
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      location: String(formData.get("location") || ""),
      statusAgenda: String(formData.get("statusAgenda") || "upcoming") as AgendaItem["statusAgenda"],
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      image: String(formData.get("image") || ""),
      publishStatus: String(formData.get("publishStatus") || "draft") as AgendaItem["publishStatus"],
      featured: formData.get("featured") === "on"
    });
  }

  return (
    <form className="grid gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm" onSubmit={onSubmit}>
      <FormInput defaultValue={item?.title} label="Title" name="title" required />
      <FormInput defaultValue={item?.slug} label="Slug" name="slug" />
      <FormInput defaultValue={item?.category} label="Category" name="category" required />
      <FormDateInput defaultValue={item?.date?.slice(0, 10)} label="Date" name="date" required />
      <FormInput defaultValue={item?.time} label="Time" name="time" required />
      <FormInput defaultValue={item?.location} label="Location" name="location" required />
      <FormTextarea defaultValue={item?.excerpt} label="Excerpt" name="excerpt" required />
      <FormTextarea defaultValue={item?.content} label="Content" name="content" required />
      <FormInput defaultValue={item?.image || ""} label="Image URL" name="image" type="url" />
      <FormSelect
        defaultValue={item?.statusAgenda || "upcoming"}
        label="Status Agenda"
        name="statusAgenda"
        options={[
          { label: "Upcoming", value: "upcoming" },
          { label: "Ongoing", value: "ongoing" },
          { label: "Completed", value: "completed" }
        ]}
      />
      <FormSelect
        defaultValue={item?.publishStatus || "draft"}
        label="Publish Status"
        name="publishStatus"
        options={[
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" }
        ]}
      />
      <FormCheckbox defaultChecked={item?.featured} label="Featured" name="featured" />
      {mutation.isError ? <p className="text-sm font-semibold text-red-700">Gagal menyimpan agenda.</p> : null}
      <button className="w-fit rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink" disabled={mutation.isPending} type="submit">
        {mutation.isPending ? "Menyimpan..." : "Simpan Agenda"}
      </button>
    </form>
  );
}
