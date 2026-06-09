import { Breadcrumb } from "@/components/profile/Breadcrumb";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  parentLabel?: string;
  parentHref?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow = "Profile Jurusan",
  parentLabel = "Profile",
  parentHref
}: PageHeaderProps) {
  const breadcrumbItems =
    parentLabel === title
      ? [{ label: "Beranda", href: "/" }, { label: title }]
      : [{ label: "Beranda", href: "/" }, { label: parentLabel, href: parentHref }, { label: title }];

  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-campus">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
          {description ? <p className="mt-5 text-base leading-8 text-blue-50">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}
