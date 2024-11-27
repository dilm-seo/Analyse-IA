import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { NewsItem as NewsItemType } from '../types/news';

interface NewsItemProps {
  item: NewsItemType;
}

export function NewsItem({ item }: NewsItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <header className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900">
            {item.title}
          </h2>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{item.creator}</span>
          <span>•</span>
          <time dateTime={item.pubDate}>
            {formatDistanceToNow(new Date(item.pubDate), { addSuffix: true })}
          </time>
        </div>
      </header>
      
      {expanded && (
        <div 
          className="prose prose-sm max-w-none mb-4"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      )}
      
      <footer className="flex items-center justify-between">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {item.category}
        </span>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          Read more <ExternalLink className="w-4 h-4" />
        </a>
      </footer>
    </article>
  );
}