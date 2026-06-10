"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormCheckbox, FormDateInput, FormInput, FormSelect, FormTextarea } from "@/components/admin/FormControls";
import { saveNews, type NewsItem } from "@/lib/queries/news";

export function NewsForm({ item }: { item?: NewsItem }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: Partial<NewsItem>) => saveNews(payload, item?.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["news"] });
      router.push("/admin/berita");
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
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      image: String(formData.get("image") || ""),
      status: String(formData.get("status") || "draft") as NewsItem["status"],
      featured: formData.get("featured") === "on"
    });
  }

  return (
    <form className="grid gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm" onSubmit={onSubmit}>
      <FormInput defaultValue={item?.title} label="Title" name="title" required />
      <FormInput defaultValue={item?.slug} label="Slug" name="slug" />
      <FormInput defaultValue={item?.category} label="Category" name="category" required />
      <FormDateInput defaultValue={item?.date?.slice(0, 10)} label="Date" name="date" required />
      <FormTextarea defaultValue={item?.excerpt} label="Excerpt" name="excerpt" required />
      <FormTextarea defaultValue={item?.content} label="Content" name="content" required />
      <FormInput defaultValue={item?.image || ""} label="Image URL" name="image" type="url" />
      <FormSelect
        defaultValue={item?.status || "draft"}
        label="Status"
        name="status"
        options={[
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" }
        ]}
      />
      <FormCheckbox defaultChecked={item?.featured} label="Featured" name="featured" />
      {mutation.isError ? <p className="text-sm font-semibold text-red-700">Gagal menyimpan berita.</p> : null}
      <button className="w-fit rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink" disabled={mutation.isPending} type="submit">
        {mutation.isPending ? "Menyimpan..." : "Simpan Berita"}
      </button>
    </form>
  );
}
