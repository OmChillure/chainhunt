import { TITLE_TAILWIND_CLASS } from '@/utils/constants'
import Image from 'next/image'
import Link from "next/link"
export default function BlogSample() {

  const articles = [
    {
      id: 1,
      image: "https://seo-heist.s3.amazonaws.com/user_2cxTR5I0BjOLeNCnee3qUze0LUo/1af01aca-6ce1-4a3f-8e54-e945e3104889.png",
      title: "A onchain store for marketing & reviews of your product",
      date: "2024-04-15 21:16:04.765648-05",
      description: "An on-chain store for marketing and reviews allows businesses to showcase their products and gather customer feedback directly on a blockchain. Smart contracts can automate incentives, enhancing engagement.",
    },
    {
      id: 2,
      image: "https://gateway.pinata.cloud/ipfs/QmW7fveGFAVcbCpycMX1idH5mjpzr6ESDYZK4oAKyJZu9z",
      title: "Top Solana News section for the latest updates",
      date: "2024-04-16 08:29:32.188999-05",
      description: "Top Solana News section delivers the latest updates on Solana's rapidly evolving ecosystem using api services. Stay informed on the most recent developments in DeFi, NFTs, and dApps built on Solana blockchain."
    },
    {
      id: 3,
      image: "https://seo-heist.s3.amazonaws.com/user_2cxTR5I0BjOLeNCnee3qUze0LUo/36292d36-cfae-4106-8d59-ace222f4bc82.png",
      title: "A Blog Creating Section built in your website",
      date: "2024-04-16 15:20:52.368844-05",
      description : "The Blog Creation section empowers users to share insights, experiences, and knowledge by creating and publishing their own content. This platform provides easy-to-use tools for drafting, editing, and styling your blog posts."
    }
  ]

  return (
    <div className="flex flex-col justify-center items-center">
      <div className='flex flex-col items-center p-3 w-full'>
        <div className='flex flex-col justify-start items-center gap-2 w-full'>
          <div className='flex gap-3 justify-start items-center w-full'>
            <h1 className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold tracking-tight dark:text-white text-gray-900`}>
              Features
            </h1>
          </div>
          <div className='flex gap-3 justify-start items-center w-full border-b pb-4'>
            <p className="text-gray-600 dark:text-gray-400">
              The features that our website provides are 
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-start'>
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
          {articles?.map((article) => (
            <Link href={"/"} key={article?.id}>
              <article
                className="flex flex-col space-y-2 p-4 rounded-md border dark:bg-black"
              >
                <Image
                  src={article?.image!}
                  alt={"blog image"}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                />
                <div className='flex lg:flex-row w-full justify-between items-center'>
                  <h2 className="text-md lg:text-lg font-bold">{article?.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(article?.date!)?.toLocaleDateString()}
                </p>
                <h2 className="text-md lg:text-lg font-light">{article?.description}</h2>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>

  )
}
