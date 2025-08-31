"use client"

import useSWR from "swr"
import Image from "next/image"
import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/types"


// Simple fetcher for SWR
const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to load")
    return r.json()
  })

export default function ProductsPage() {
  const { data, error, isLoading } = useSWR<Product[]>("/api/products", fetcher)

  // Local state for search + filter
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")

  // Build category list dynamically
  const categories = useMemo(() => {
    const set = new Set<string>()
    ;(data ?? []).forEach((p) => set.add(p.category))
    return ["all", ...Array.from(set)]
  }, [data])

  // Filter products by search + category
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (data ?? []).filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q)
      const matchesCat = category === "all" || p.category === category
      return matchesQuery && matchesCat
    })
  }, [data, query, category])

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* 🔍 Search + Filter controls */}
      <div className="flex items-center gap-4 mb-8">
        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md"
        />
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <Alert variant="destructive" className="max-w-lg">
          <AlertTitle>Failed to load products</AlertTitle>
          <AlertDescription>Please refresh the page or try again later.</AlertDescription>
        </Alert>
      )}

      {/* Product Grid */}
      {!isLoading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className="mt-6 text-muted-foreground">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-gray-600">₹{(product.price / 100).toFixed(2)}</p>
                    <Badge variant="outline" className="mt-2">{product.category}</Badge>
                    <Button className="w-full mt-3">Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}
