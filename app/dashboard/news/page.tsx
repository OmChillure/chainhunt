"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from 'lucide-react';

interface Article {
  url: string;
  urlToImage: string;
  title: string;
  author: string;
  description: string;
  publishedAt: string;
  content: string;
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=solana&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError('Failed to fetch news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Solana News</h1>
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Card key={index} className="w-full">
              <div className="flex">
                <Skeleton className="h-32 w-48 rounded-l" />
                <div className="flex-1 p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4 flex flex-col justify-center items-center">
          {articles.map((article, index) => (
            <Card key={index} className="w-[120%] hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center items-center">
                <img
                  src={article.urlToImage || '/api/placeholder/400/300'}
                  alt={article.title}
                  className="h-40 w-56 object-cover rounded-l"
                />
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <CardTitle className="text-lg mb-1 line-clamp-1">{article.title}</CardTitle>
                    <CardDescription className="text-sm mb-2">{article.author}</CardDescription>
                    <p className="text-sm line-clamp-2">{article.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700"
                    >
                      Read more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}