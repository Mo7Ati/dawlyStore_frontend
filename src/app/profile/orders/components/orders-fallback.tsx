import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrdersFallback() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-border/60 px-6 pb-4 pt-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-6 sm:gap-8">
              <div className="flex items-center gap-1">
                <Skeleton className="h-8 w-8 shrink-0 rounded" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-6">
              <div className="space-y-1 text-right">
                <Skeleton className="ml-auto h-3 w-12" />
                <Skeleton className="ml-auto h-4 w-16" />
              </div>
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-4 p-4">
              {[1, 2].map((j) => (
                <div
                  key={j}
                  className="flex gap-3 border-b border-border/60 py-4 last:border-b-0"
                >
                  <Skeleton className="h-20 w-20 shrink-0 rounded-md" />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-5 w-12 shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
