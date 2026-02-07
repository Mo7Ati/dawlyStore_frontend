import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrdersFallback() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-12">
          <Skeleton className="mr-2 h-6 w-6 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
