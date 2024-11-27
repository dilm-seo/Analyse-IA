import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { RSSFeed } from '../types/rss';
import { sanitizeHtml } from './sanitizer';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const RSS_URL = 'https://www.forexlive.com/feed/news/';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '_',
  isArray: (name) => name === 'item',
  textNodeName: '_text',
  parseAttributeValue: true,
  trimValues: true,
});

export async function fetchRSSFeed(): Promise<RSSFeed> {
  try {
    const response = await axios.get(`${CORS_PROXY}${encodeURIComponent(RSS_URL)}`);
    const xmlData = response.data;
    
    // Parse XML to JSON
    const parsed = parser.parse(xmlData) as RSSFeed;
    
    // Ensure item is always an array
    if (!Array.isArray(parsed.rss.channel.item)) {
      parsed.rss.channel.item = parsed.rss.channel.item ? [parsed.rss.channel.item] : [];
    }
    
    // Clean and transform the data
    const cleanedFeed: RSSFeed = {
      rss: {
        channel: {
          ...parsed.rss.channel,
          item: parsed.rss.channel.item.map(item => ({
            title: String(item.title || ''),
            link: String(item.link || ''),
            description: sanitizeHtml(String(item.description || '')),
            pubDate: String(item.pubDate || ''),
            creator: String(item['dc:creator'] || item.creator || ''),
            category: String(item.category || ''),
            guid: String(item.guid || item.link || ''),
          }))
        }
      }
    };

    return cleanedFeed;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw new Error('Failed to fetch news feed');
  }
}