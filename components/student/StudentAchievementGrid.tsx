"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/student/EmptyState";
import { FilterTabs } from "@/components/student/FilterTabs";
import { StudentAchievementCard } from "@/components/student/StudentAchievementCard";
import { studentAchievements } from "@/lib/data/student";

export function StudentAchievementGrid() {
  const levels = useMemo(
    () => ["Semua", ...Array.from(new Set(studentAchievements.map((achievement) => achievement.level)))],
    []
  );
  const [activeLevel, setActiveLevel] = useState("Semua");
  const filteredAchievements =
    activeLevel === "Semua"
      ? studentAchievements
      : studentAchievements.filter((achievement) => achievement.level === activeLevel);

  return (
    <div>
      <FilterTabs activeValue={activeLevel} onChange={setActiveLevel} values={levels} />
      {filteredAchievements.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAchievements.map((achievement) => (
            <StudentAchievementCard {...achievement} key={achievement.id} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
