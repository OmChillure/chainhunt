"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { SearchIcon, StarIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

export default function Component() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Cozy Knit Sweater",
      description: "Soft and warm knit sweater perfect for fall. Handcrafted ceramic mugs in a set of 4.",
      price: 59.99,
      category: "Clothing",
      popularity: 0,
      upvotes: 0,
      downvotes: 0,
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Ceramic Mug Set",
      description: "Handcrafted ceramic mugs in a set of 4.",
      price: 29.99,
      category: "Home",
      popularity: 0,
      upvotes: 0,
      downvotes: 0,
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Leather Backpack",
      description: "Durable leather backpack with multiple compartments.",
      price: 99.99,
      category: "Bags",
      popularity: 0,
      upvotes: 0,
      downvotes: 0,
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Bamboo Cutting Board",
      description: "Eco-friendly bamboo cutting board with juice groove.",
      price: 24.99,
      category: "Home",
      popularity: 0,
      upvotes: 0,
      downvotes: 0,
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Wireless Earbuds",
      description: "High-quality wireless earbuds with noise cancellation.",
      price: 79.99,
      category: "Electronics",
      popularity: 0,
      upvotes: 0,
      downvotes: 0,
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Linen Throw Pillow",
      description: "Soft and breathable linen throw pillow in neutral tones.",
      price: 39.99,
      category: "Home",
      popularity: 4.6,
      upvotes: 0,
      downvotes: 0,
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popularity")
  const [filterCategory, setFilterCategory] = useState("all")

  const handleUpvote = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, upvotes: product.upvotes + 1, popularity: product.popularity + 0.1 }
          : product
      )
    )
  }

  const handleDownvote = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, downvotes: product.downvotes + 1, popularity: product.popularity - 0.1 }
          : product
      )
    )
  }

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((product) => (filterCategory !== "all" ? product.category === filterCategory : true))
      .sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price
        } else if (sortBy === "popularity") {
          return b.popularity - a.popularity
        } else {
          return 0
        }
      })
  }, [products, searchTerm, sortBy, filterCategory])

  return (
    <div>
      <header className="bg-background shadow-sm">
          {/* <div className="flex items-center ">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Home">Home</SelectItem>
                <SelectItem value="Bags">Bags</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-background rounded-lg overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg"
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <span className="text-sm font-medium">{product.popularity.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleUpvote(product.id)}>
                      <ThumbsUpIcon className="w-4 h-4" />
                      {product.upvotes}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownvote(product.id)}>
                      <ThumbsDownIcon className="w-4 h-4" />
                      {product.downvotes}
                    </Button>
                  </div>
                </div>
                <Button size="lg" className="w-full mt-4">
                  Visit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}