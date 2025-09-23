"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const TeacherDashboardSkeleton = () => {
  return (
    <div className="min-h-screen w-full flex justify-center px-4 animate-pulse relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/30 to-violet-200/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-200/30 to-cyan-200/20 blur-3xl" />
      </div>

      <div className="w-full max-w-7xl space-y-6 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-10 w-48 rounded-md bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-5 w-36 rounded-md bg-gray-300 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-10 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Sidebar + Main content */}
        <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-6 items-start">
          {/* Sidebar */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-20 w-full rounded-xl bg-gray-300 dark:bg-gray-700"
              />
            ))}
          </div>

          {/* Main content */}
          <div className="space-y-6">
            {/* Add student / Add assignment */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Skeleton className="h-6 w-48 rounded-md bg-gray-300 dark:bg-gray-700" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-36 rounded-md bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="h-10 w-36 rounded-md bg-gray-300 dark:bg-gray-700" />
              </div>
            </div>

            {/* Assignments list */}
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 border rounded-2xl w-full bg-gray-200 dark:bg-gray-800"
                >
                  <Skeleton className="h-8 w-1/2 rounded-md mb-4 bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-32 w-full rounded-md mb-4 bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-6 w-1/4 rounded-md bg-gray-300 dark:bg-gray-700" />
                </div>
              ))}
            </div>

            {/* Chat card */}
            <div className="h-[400px] w-full border rounded-2xl p-4 flex flex-col bg-gray-200 dark:bg-gray-800">
              <div className="flex-1 space-y-3 overflow-y-auto">
                {[...Array(6)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className={`h-8 w-3/4 rounded-md ${
                      i % 2 === 0 ? "self-start" : "self-end"
                    } bg-gray-300 dark:bg-gray-700`}
                  />
                ))}
              </div>
              <div className="mt-3 flex gap-2 items-center">
                <Skeleton className="flex-1 h-10 rounded-md bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="h-10 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
