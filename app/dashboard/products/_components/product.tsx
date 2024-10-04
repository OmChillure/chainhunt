"use client";
import React, { useState, useEffect } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import idl from "@/lib/idl.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFile } from "@/actions/page";
import { ThumbsUpIcon, ThumbsDownIcon, StarIcon } from "lucide-react";

function AllProducts() {
  interface Product {
    title: string;
    description: string;
    url: string;
    owner: string;
    ipfsHash: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { connected } = useWallet();

  useEffect(() => {
    if (connected && anchorWallet) {
      fetchAllProducts().then(() => {
        products.forEach((product) => {
          if (product.ipfsHash) {
            getFile(product.ipfsHash).then((data) => {
              console.log(data);
            });
          }
        });
      });
    }
  }, [connected, anchorWallet]);

  const fetchAllProducts = async () => {
    if (!anchorWallet) return;

    const programId = new PublicKey(
      "HZWY8cL6EfYkx8BMCTv9KtdekTq1n1h1x7p9oMP1pMiG"
    );

    const provider = new AnchorProvider(connection, anchorWallet, {});
    const program = new Program(idl as Idl, programId, provider);

    try {
      const allProducts = await program.account.productEntryState.all();

      const formattedProducts = allProducts.map((product) => ({
        title: product.account.title,
        description: product.account.description,
        url: product.account.url,
        owner: product.account.owner.toString(),
        ipfsHash: product.account.ipfsHash,
      }));

      console.log("Fetched products:", formattedProducts);
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-hidden">
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Button>
            <Link href="/dashboard/products/new">New</Link>
          </Button>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        {!connected ? (
          <p className="text-center text-muted-foreground">
            Please connect your wallet to view products.
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No products found. Create some products first!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-background rounded-lg overflow-hidden shadow-lg p-2"
              >
                <div className="p-2">
                  <Link
                    href={`/dashboard/products/${encodeURIComponent(
                      product.title
                    )}`}
                    key={index}
                  >
                    <div className="relative w-full h-48 mb-2">
                      <img
                        src={`https://gateway.pinata.cloud/ipfs/${product.ipfsHash}`}
                        alt={product.title}
                        className="w-full h-full object-cover" // Makes image responsive
                      />
                    </div>
                  </Link>
                  <h3 className="text-md font-semibold">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-3 h-3 fill-primary" />
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <ThumbsUpIcon className="w-3 h-3" />
                        1
                      </Button>
                      <Button size="sm" variant="outline">
                        <ThumbsDownIcon className="w-3 h-3" />
                        1
                      </Button>
                    </div>
                  </div>
                  <Link href={product.url} passHref legacyBehavior>
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AllProducts;
