"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-50 px-4" />}>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    });
    setIsLoading(false);

    if (!response.ok) {
      setError("Email atau password salah.");
      return;
    }

    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form className="grid w-full max-w-md gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm" onSubmit={onSubmit}>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-ocean">CMS Informatika</p>
          <h1 className="mt-2 text-3xl font-bold text-ink">Admin Login</h1>
        </div>
        <label className="grid gap-2 text-sm font-bold text-ink">
          Email
          <input className="h-11 rounded-md border border-slate-200 px-3 text-sm font-normal outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100" name="email" required type="email" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-ink">
          Password
          <input className="h-11 rounded-md border border-slate-200 px-3 text-sm font-normal outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100" name="password" required type="password" />
        </label>
        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
        <button className="rounded-md bg-ocean px-5 py-3 text-sm font-bold text-white hover:bg-ink" disabled={isLoading} type="submit">
          {isLoading ? "Masuk..." : "Masuk"}
        </button>
      </form>
    </main>
  );
}
