"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/student/EmptyState";
import { Badge } from "@/components/student/Badge";
import { curriculumCourses } from "@/lib/data/academic";

export function CurriculumTable() {
  const semesters = useMemo(
    () => ["Semua", ...Array.from(new Set(curriculumCourses.map((course) => String(course.semester))))],
    []
  );
  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(curriculumCourses.map((course) => course.category)))],
    []
  );
  const [semester, setSemester] = useState("Semua");
  const [category, setCategory] = useState("Semua");
  const [query, setQuery] = useState("");

  const filteredCourses = curriculumCourses.filter((course) => {
    const matchesSemester = semester === "Semua" || String(course.semester) === semester;
    const matchesCategory = category === "Semua" || course.category === category;
    const matchesQuery =
      query.trim().length === 0 ||
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.code.toLowerCase().includes(query.toLowerCase());

    return matchesSemester && matchesCategory && matchesQuery;
  });

  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  const allCredits = curriculumCourses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div>
      <div className="mb-6 grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_180px_180px]">
        <label className="relative block">
          <span className="sr-only">Cari mata kuliah</span>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="h-11 w-full rounded-md border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari kode atau nama mata kuliah"
            type="search"
            value={query}
          />
        </label>
        <select
          className="h-11 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700 outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
          onChange={(event) => setSemester(event.target.value)}
          value={semester}
        >
          {semesters.map((item) => (
            <option key={item} value={item}>
              {item === "Semua" ? "Semua Semester" : `Semester ${item}`}
            </option>
          ))}
        </select>
        <select
          className="h-11 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700 outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "Semua" ? "Semua Kategori" : item}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-ink p-5 text-white">
          <p className="text-sm font-semibold text-blue-100">Total SKS Kurikulum Dummy</p>
          <p className="mt-2 text-3xl font-bold text-campus">{allCredits}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-600">Total SKS Hasil Filter</p>
          <p className="mt-2 text-3xl font-bold text-ink">{totalCredits}</p>
        </div>
      </div>
      {filteredCourses.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
          <table className="min-w-[760px] w-full border-collapse text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">Kode</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">Mata Kuliah</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">Semester</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">SKS</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">Kategori</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 py-4 text-sm font-bold text-ocean">{course.code}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-ink">{course.name}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">Semester {course.semester}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{course.credits}</td>
                  <td className="px-4 py-4">
                    <Badge tone={course.category === "Tugas Akhir" ? "gold" : course.category === "Praktikum" ? "green" : "blue"}>
                      {course.category}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
