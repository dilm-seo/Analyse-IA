export interface CurrencySentiment {
  currency: string;
  sentiment: number; // -100 to 100, negative for bearish, positive for bullish
  impact: number; // 0 to 100
}

export interface TradingAnalysis {
  summary: string;
  fullSummary: string;
  tradingOpportunity: string;
  currencySentiments: CurrencySentiment[];
  timestamp: number;
}