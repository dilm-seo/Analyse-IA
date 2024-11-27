import React, { useState, useEffect } from 'react';
import { NewsFeed } from '../components/NewsFeed';
import { AnalysisPanel } from '../components/AnalysisPanel';
import { useFeed } from '../hooks/useFeed';
import { analyzeNews } from '../utils/openai';
import { loadSettings } from '../utils/storage';
import { TradingAnalysis } from '../types/analysis';

export function Home() {
  const settings = loadSettings();
  const { feed, loading: feedLoading, error: feedError } = useFeed();
  const [analysis, setAnalysis] = useState<TradingAnalysis | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  useEffect(() => {
    if (feed && settings.apiKey) {
      setAnalysisLoading(true);
      setAnalysisError(null);
      
      analyzeNews(feed, settings)
        .then(setAnalysis)
        .catch(error => setAnalysisError(error.message))
        .finally(() => setAnalysisLoading(false));
    }
  }, [feed, settings.apiKey]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <AnalysisPanel
        analysis={analysis}
        loading={analysisLoading}
        error={analysisError}
      />
      <NewsFeed />
    </div>
  );
}