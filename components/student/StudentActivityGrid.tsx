"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/student/EmptyState";
import { FilterTabs } from "@/components/student/FilterTabs";
import { StudentActivityCard } from "@/components/student/StudentActivityCard";
import { studentActivities } from "@/lib/data/student";

export function StudentActivityGrid() {
  const statuses = useMemo(() => ["Semua", ...Array.from(new Set(studentActivities.map((activity) => activity.status)))], []);
  const [activeStatus, setActiveStatus] = useState("Semua");
  const filteredActivities =
    activeStatus === "Semua" ? studentActivities : studentActivities.filter((activity) => activity.status === activeStatus);

  return (
    <div>
      <FilterTabs activeValue={activeStatus} onChange={setActiveStatus} values={statuses} />
      {filteredActivities.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredActivities.map((activity) => (
            <StudentActivityCard {...activity} key={activity.id} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
