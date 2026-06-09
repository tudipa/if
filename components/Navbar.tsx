"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/data/homepage";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-ink text-lg font-bold text-white">
            IF
          </span>
          <span>
            <span className="block text-base font-bold leading-tight text-ink">Jurusan Informatika</span>
            <span className="block text-xs font-medium text-slate-500">UHN IGB Sugriwa Denpasar</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div className="group relative" key={item.label}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-ink"
              >
                {item.label}
              </Link>
              {item.children ? (
                <div className="invisible absolute left-0 top-full w-72 translate-y-2 rounded-md border border-slate-200 bg-white p-2 opacity-0 shadow-soft transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-ocean"
                      href={child.href}
                      key={child.label}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/akademik/panduan-akademik"
            className="rounded-md bg-ocean px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-ink"
          >
            Lihat Akademik
          </Link>
        </div>

        <button
          aria-label="Buka menu navigasi"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-ink lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.label} className="rounded-md border border-slate-200 p-2">
                <Link className="block px-2 py-2 text-sm font-bold text-ink" href={item.href}>
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="grid gap-1 pb-1">
                    {item.children.map((child) => (
                      <Link className="rounded-md px-2 py-2 text-sm text-slate-600" href={child.href} key={child.label}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Link className="mt-2 rounded-md bg-ocean px-4 py-3 text-center text-sm font-bold text-white" href="/akademik/panduan-akademik">
              Lihat Akademik
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
