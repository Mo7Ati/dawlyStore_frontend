"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseAsString, useQueryState } from "nuqs";

export function OrdersHeader() {
  const [search, setSearch] = useQueryState('search', parseAsString.withOptions({ shallow: false }));
  const [status, setStatus] = useQueryState('status', parseAsString.withOptions({ shallow: false }));
      
  return (
    <div className="min-w-0 space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Orders</h1>
        <p className="text-muted-foreground text-sm">
          Track, return, or buy items again
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="all" className="w-full sm:w-auto" value={status ?? undefined} onValueChange={(value) => setStatus(value as string)}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"  />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-9"
            aria-label="Search orders"
            value={search ?? undefined}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
