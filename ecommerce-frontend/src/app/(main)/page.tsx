import { Suspense } from "react";
import { FilteredProductGrid } from "../component/Products/FilteredProductGrid";
import { Skeleton } from "../ui/skeleton";
import { ProductFilters } from "../component/Products/ProductFilters";

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

export default function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string; category?: string; sort?: string };
}) {
  return (
    <section className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <ProductFilters />
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <FilteredProductGrid
          query={searchParams?.query}
          category={searchParams?.category}
          sort={searchParams?.sort}
        />
      </Suspense>
    </section>
  );
}
