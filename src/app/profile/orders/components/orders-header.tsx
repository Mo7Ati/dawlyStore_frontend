"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseAsBoolean, useQueryState } from "nuqs";

export function OrdersHeader() {
  const [isCompleted, setIsCompleted] = useQueryState("is_completed", parseAsBoolean.withOptions({ shallow: false }));

  // Default = Active (no param or false); Completed when is_completed=true
  const activeTab = isCompleted === true ? "completed" : "active";

  return (
    <div className="min-w-0 space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Orders</h1>
        <p className="text-muted-foreground text-sm">
          Track, return, or buy items again
        </p>
      </div>
      {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          className="w-full sm:w-auto"
          value={activeTab}
          onValueChange={(value) => setIsCompleted(value === "completed" ? true : null)}
        >
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div> */}
    </div>
  );
}
