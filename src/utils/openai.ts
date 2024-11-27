import OpenAI from 'openai';
import { TradingAnalysis, CurrencySentiment } from '../types/analysis';
import { Settings } from '../types/settings';
import { RSSFeed } from '../types/rss';
import { getCachedAnalysis, cacheAnalysis } from './storage';

export async function analyzeNews(feed: RSSFeed, settings: Settings): Promise<TradingAnalysis> {
  // Validate API key
  if (!settings.apiKey) {
    throw new Error('Clé API OpenAI non configurée. Veuillez la configurer dans les paramètres.');
  }

  const cacheKey = feed.rss.channel.lastBuildDate;
  
  if (settings.useCache) {
    const cached = getCachedAnalysis(cacheKey);
    if (cached) return cached;
  }

  const openai = new OpenAI({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true,
  });

  const recentNews = feed.rss.channel.item
    .slice(0, 5)
    .map(item => `${item.title}\n${item.description}`)
    .join('\n\n');

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Vous êtes un expert en analyse des marchés forex. Analysez les nouvelles et fournissez une réponse structurée avec:
1. Un résumé court (50 mots)
2. Un résumé détaillé
3. Une opportunité de trading
4. Une analyse du sentiment des devises au format JSON

Votre réponse doit suivre ce format exact:
[RESUME COURT]

[RESUME DETAILLE]

[OPPORTUNITE]

{
  "currencies": [
    {
      "currency": "EUR",
      "sentiment": 75,
      "impact": 80
    }
  ]
}`
        },
        {
          role: 'user',
          content: recentNews
        }
      ],
      model: settings.model,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('Réponse vide de l\'API OpenAI');
    }

    // Split response into sections
    const sections = response.split('\n\n');
    if (sections.length < 4) {
      throw new Error('Format de réponse invalide');
    }

    // Extract JSON data
    const jsonMatch = sections[sections.length - 1].match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Données de sentiment non trouvées');
    }

    let currencySentiments: CurrencySentiment[];
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(parsed.currencies)) {
        throw new Error('Format de données de sentiment invalide');
      }
      currencySentiments = parsed.currencies;
    } catch (e) {
      console.error('Failed to parse currency sentiments:', e);
      throw new Error('Erreur lors de l\'analyse des sentiments');
    }

    const analysis: TradingAnalysis = {
      summary: sections[0].trim(),
      fullSummary: sections[1].trim(),
      tradingOpportunity: sections[2].trim(),
      currencySentiments,
      timestamp: Date.now(),
    };

    if (settings.useCache) {
      cacheAnalysis(cacheKey, analysis);
    }

    return analysis;
  } catch (error) {
    console.error('Error analyzing news:', error);
    if (error instanceof Error) {
      throw new Error(`Erreur d'analyse: ${error.message}`);
    }
    throw new Error('Erreur lors de l\'analyse des nouvelles');
  }
}