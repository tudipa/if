import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span className="flex items-center gap-2" key={item.label}>
            {item.href && !isLast ? (
              <Link className="font-semibold text-blue-100 hover:text-campus" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-white" : "text-blue-100"}>{item.label}</span>
            )}
            {!isLast ? <span className="text-blue-200">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
