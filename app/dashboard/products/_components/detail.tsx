"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // to get the dynamic route params
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "@/lib/idl.json";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Product {
  title: string;
  description: string;
  url: string;
  owner: string;
  ipfsHash: string;
}

const ProductDetail = () => {
  const { title } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (anchorWallet && title) {
      fetchProductByTitle(title as string);
    }
  }, [anchorWallet, title]);

  const fetchProductByTitle = async (title: string) => {
    const programId = new PublicKey(
      "HZWY8cL6EfYkx8BMCTv9KtdekTq1n1h1x7p9oMP1pMiG"
    );
    if (!anchorWallet) {
      console.error("Wallet not connected");
      return;
    }
    const provider = new AnchorProvider(connection, anchorWallet, {});
    const program = new Program(idl as Idl, programId, provider);

    try {
      const allProducts = await program.account.productEntryState.all();
      const selectedProduct = allProducts.find(
        (product) => product.account.title === title
      );

      if (selectedProduct) {
        setProduct({
          title: selectedProduct.account.title,
          description: selectedProduct.account.description,
          url: selectedProduct.account.url,
          owner: selectedProduct.account.owner.toString(),
          ipfsHash: selectedProduct.account.ipfsHash,
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="">
        <section className="w-full md:py-24 lg:py-32">
          <div className="container grid md:grid-cols-2 gap-6 lg:gap-12 items-center px-4 md:px-6">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${product.ipfsHash}`}
              alt={product.title}
              width={600}
              height={300}
              className="h-46 object-cover border w-full rounded-lg overflow-hidden"
            />
            <div className="grid gap-4 md:gap-10">
              <div className="grid gap-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {product.title}
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  {product.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href={product.url}>
                <Button size="lg">View Product</Button>
                </Link>
                <Button size="lg" variant="outline">
                  <HeartIcon className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full md:py-24 lg:py-12">
          <div className="container grid gap-10 px-4 md:px-6">
            <div className="grid gap-4 md:gap-10">
              <div className="grid gap-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Product Images
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Take a closer look at {product.title}.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img
                  src={`https://gateway.pinata.cloud/ipfs/${product.ipfsHash}`}
                  alt={`${product.title} Image`}
                  width={300}
                  height={300}
                  className="aspect-square object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid gap-10 px-4 md:px-6">
            <div className="grid gap-4 md:gap-10">
              <div className="grid gap-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Customer Reviews
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  See what our customers have to say about {product.title}.
                </p>
              </div>
              <div className="grid gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder.svg"
                      alt="Customer Avatar"
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <div className="flex items-center gap-0.5 text-sm">
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-muted" />
                        <StarIcon className="w-4 h-4 fill-muted" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-loose">
                    I absolutely love this product The fabric is so soft and
                    comfortable, and the design is truly unique.
                  </p>
                </Card>
                <div className="flex justify-center">
                  <Button size="lg">Leave a Review</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetail;

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.33 1-4.5 2.57A5.977 5.977 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5L12 21l7-7z" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
