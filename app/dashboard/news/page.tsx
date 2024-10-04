"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  guid: string;
  published_on: number;
  imageurl: string;
  title: string;
  url: string;
  body: string;
  tags: string;
  categories: string;
}

export default function News() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?categories=SOL,regulation&extraParams=YourSite');
      const data = await response.json();
      if (data.Type === 100 && data.Data) {
        setNewsItems(data.Data);
      } else {
        throw new Error('Failed to fetch news data');
      }
    } catch (err) {
      setError('Failed to fetch news articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleRefresh = () => {
    fetchNews();
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen p-4 overflow-hidden">
        <Card className="w-full max-w-4xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button onClick={handleRefresh} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Latest Crypto News</h1>
        <Button onClick={handleRefresh} disabled={loading}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>
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
        <div className="space-y-4">
          {newsItems.map((item) => (
            <Card key={item.id} className="w-full hover:shadow-lg transition-shadow duration-300">
              <div className="flex">
                <img
                  src={item.imageurl || '/api/placeholder/400/300'}
                  alt={item.title}
                  className="h-40 w-56 object-cover rounded-l"
                />
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <CardTitle className="text-lg mb-1 line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="text-sm mb-2">
                      Categories: {item.categories}
                    </CardDescription>
                    <p className="text-sm line-clamp-3">{item.body}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(item.published_on * 1000).toLocaleDateString()}
                    </span>
                    <a
                      href={item.url}
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