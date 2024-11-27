import React from 'react';
import { RefreshCw } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { NewsItem } from './NewsItem';
import { useFeed } from '../hooks/useFeed';

export function NewsFeed() {
  const { feed, loading, error, refresh } = useFeed();

  if (loading && !feed) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!feed) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {feed.rss.channel.title}
          </h1>
          <p className="text-gray-600">
            {feed.rss.channel.description}
          </p>
        </div>
        <button
          onClick={refresh}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </header>

      <div className="space-y-6">
        {feed.rss.channel.item.map((item, index) => (
          <NewsItem key={`${item.guid}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}