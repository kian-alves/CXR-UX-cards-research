import { Skeleton, SkeletonCard, SkeletonList } from "@/components/ui/skeleton";

/**
 * WexSkeleton - WEX Design System Skeleton Component
 *
 * Loading placeholder for content that hasn't loaded yet.
 * Uses namespace pattern: WexSkeleton.Card, WexSkeleton.List
 *
 * @example
 * <WexSkeleton className="h-4 w-[250px]" />
 * <WexSkeleton className="h-12 w-12 rounded-full" />
 * <WexSkeleton.Card />
 * <WexSkeleton.List count={3} />
 */

export const WexSkeleton = Object.assign(Skeleton, {
  Card: SkeletonCard,
  List: SkeletonList,
});

