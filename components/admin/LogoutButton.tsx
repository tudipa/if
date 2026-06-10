"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button className="mt-6 w-full rounded-md border border-white/20 px-3 py-2 text-left text-sm font-bold text-blue-50 hover:bg-white/10" onClick={logout} type="button">
      Logout
    </button>
  );
}
