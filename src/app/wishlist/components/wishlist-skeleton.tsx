import { Skeleton } from "@/components/ui/skeleton";

const CARD_COUNT = 6;

function WishlistCardSkeleton() {
  return (
    <div
      data-slot="card"
      className="bg-card text-card-foreground flex flex-col gap-6 relative overflow-hidden rounded-md border py-0 shadow-none"
    >
      <div data-slot="card-content" className="px-0">
        <div className="relative aspect-square w-full overflow-hidden">
          <Skeleton className="size-full rounded-none" />
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-full max-w-[85%]" />
            <Skeleton className="h-4 w-full max-w-[70%]" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-5 w-14" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WishlistSkeleton() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: CARD_COUNT }).map((_, i) => (
        <WishlistCardSkeleton key={i} />
      ))}
    </div>
  );
}
