"use client"

import useSWR from "swr"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to load")
    return r.json()
  })

export default function ProductGrid() {
  const { data, error, isLoading } = useSWR<Product[]>("/api/products", fetcher)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
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
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-lg m-6">
        <AlertTitle>Failed to load products</AlertTitle>
        <AlertDescription>Please refresh the page or try again later.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product) => (
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
    </div>
  )
}
