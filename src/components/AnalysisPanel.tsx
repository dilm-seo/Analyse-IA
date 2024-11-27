import React, { useState } from 'react';
import { TradingAnalysis } from '../types/analysis';
import { LoadingSpinner } from './LoadingSpinner';
import { Brain, ChevronDown, ChevronUp, AlertCircle, TrendingUp } from 'lucide-react';
import { SentimentChart } from './SentimentChart';

interface AnalysisPanelProps {
  analysis: TradingAnalysis | null;
  loading: boolean;
  error: string | null;
}

export function AnalysisPanel({ analysis, loading, error }: AnalysisPanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Analyse IA en cours
          </h2>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl shadow-lg p-8 mb-8 border border-red-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-2 rounded-lg">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-600">Erreur d'analyse</h2>
        </div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const hasSentiments = analysis.currencySentiments && analysis.currencySentiments.length > 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Analyse IA
        </h2>
      </div>
      
      <div className="space-y-8">
        {/* Résumé Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Résumé</h3>
              <p className="text-gray-700 leading-relaxed">
                {expanded ? analysis.fullSummary : analysis.summary}
              </p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={expanded ? "Voir moins" : "Voir plus"}
            >
              {expanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Opportunité de Trading Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">Opportunité de Trading</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{analysis.tradingOpportunity}</p>
        </div>

        {/* Sentiment Chart Section */}
        {hasSentiments && (
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Analyse des Sentiments</h3>
            <div className="h-64">
              <SentimentChart sentiments={analysis.currencySentiments} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}