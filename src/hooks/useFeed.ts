import { useState, useEffect } from 'react';
import { RSSFeed } from '../types/rss';
import { fetchRSSFeed } from '../utils/api';

export function useFeed() {
  const [feed, setFeed] = useState<RSSFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadFeed() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRSSFeed();
      setFeed(data);
    } catch (err) {
      setError('Failed to load news feed. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeed();
    const interval = setInterval(loadFeed, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return { feed, loading, error, refresh: loadFeed };
}