"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import idl from "@/lib/idl.json";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";

const programId = new PublicKey("6jF4p3kYws6M49M4K7NG6SRhSqjwo8bY8hNH2tvrKMEk");

export default function Component() {
  const [products, setProducts] = useState<
    Array<{ title: string; description: string; owner: string; url: string }>
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (connected && anchorWallet) {
      fetchAllProducts();
    } else {
      setProducts([]);
    }
  }, [connected, anchorWallet, publicKey]);

  const fetchAllProducts = async () => {
    if (!anchorWallet) return;

    const provider = new AnchorProvider(connection, anchorWallet, {});
    const program = new Program(idl as Idl, programId, provider);

    try {
      const products = await program.account.product.all();

      const formattedProducts = products.map((entry) => ({
        title: entry.account.title,
        description: entry.account.description,
        owner: entry.account.owner.toString(),
        url: entry.account.url,
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <main className="p-6">
        {/* <Input
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="bg-background rounded-lg overflow-hidden shadow-lg">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                {/* <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <span className="text-sm font-medium">{product.popularity.toFixed(1)}</span>
                  </div> */}
                  {/* <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleUpvote(product.id)}>
                      <ThumbsUpIcon className="w-4 h-4" /
                      {product.upvotes}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownvote(product.id)}>
                      <ThumbsDownIcon className="w-4 h-4" />
                      {product.downvotes}
                    </Button>
                  </div> */}
                <Button size="lg" className="w-full mt-4">
                  <Link href={product.url} target="_blank" rel="noopener noreferrer">
                    Visit
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
