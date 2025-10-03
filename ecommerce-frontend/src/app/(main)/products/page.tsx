import { FilteredProductGrid } from "@/app/component/Products/FilteredProductGrid";
import { ProductFilters } from "@/app/component/Products/ProductFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

// A loading component to show while data is being filtered/fetched
function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      ))}
    </div>
  );
}

// The page is no longer async
export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { query?: string; category?: string; sort?: string };
}) {
  const query = searchParams?.query ?? "";
  const sort = searchParams?.sort ?? "";
  const category = searchParams?.category ?? "";

  return (
    <div className="p-6 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <ProductFilters />
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <FilteredProductGrid query={query} category={category} sort={sort} />
      </Suspense>
    </div>
  );
}
