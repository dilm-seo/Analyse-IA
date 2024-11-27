import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { CurrencySentiment } from '../types/analysis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SentimentChartProps {
  sentiments: CurrencySentiment[];
}

export function SentimentChart({ sentiments }: SentimentChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const sentiment = context.raw;
            const impact = sentiments[context.dataIndex].impact;
            return [
              `Sentiment: ${sentiment > 0 ? '+' : ''}${sentiment}%`,
              `Impact: ${impact}%`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        min: -100,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: (value: number) => `${value}%`,
          font: {
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Sentiment',
          color: '#6B7280',
          font: {
            size: 12,
            weight: 'normal'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    },
  };

  const data = {
    labels: sentiments.map(s => s.currency),
    datasets: [
      {
        data: sentiments.map(s => s.sentiment),
        backgroundColor: sentiments.map(s => 
          s.sentiment > 0 
            ? `rgba(34, 197, 94, ${Math.max(0.3, s.impact / 100)})`
            : `rgba(239, 68, 68, ${Math.max(0.3, s.impact / 100)})`
        ),
        borderColor: sentiments.map(s => 
          s.sentiment > 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
        ),
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}