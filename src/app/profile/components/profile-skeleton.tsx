"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 p-4">
      {/* Name Field Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-5 w-32 rounded-md" /> {/* Label */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
      </div>

      {/* Email Field Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-5 w-32 rounded-md" /> {/* Label */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
      </div>

      {/* Phone Field Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-5 w-32 rounded-md" /> {/* Label */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
      </div>

      {/* Submit Button Skeleton */}
      <Skeleton className="h-10 w-40 rounded-md mt-4" />
    </div>
  );
};
