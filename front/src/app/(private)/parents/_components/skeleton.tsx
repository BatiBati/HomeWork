"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const ParentSkeleton = () => {
  return (
    <div className="bg-[#f2f2f2] h-screen w-screen flex  justify-center items-center">
      <div className="w-full h-full border-[1px] p-4 flex gap-3 rounded-xl bg-white">
        {/* Sidebar skeleton */}
        <div className="w-60 mr-5 flex rounded-r-2xl flex-col space-y-3 py-7 px-5 bg-gray-300 dark:bg-gray-800">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-15 w-full rounded-md bg-gray-400 dark:bg-gray-700"
            />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-6 overflow-hidden">
          {/* Header */}
          <div className="flex mt-5 items-center gap-5">
            <Skeleton className="h-10 w-20 rounded-md bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-10 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
          </div>

          {/* Content blocks */}
          <div className="space-y-4"></div>
        </div>
      </div>
    </div>
  );
};
{
  /* <div className="p-4 border rounded-xl space-y-3 bg-gray-200/30 dark:bg-gray-800/40">
  <Skeleton className="h-6 w-ful rounded bg-gray-300 dark:bg-gray-700" />
  <Skeleton className="h-6 w-ful rounded bg-gray-300 dark:bg-gray-700" />
</div>; */
}
