import { Settings, DEFAULT_SETTINGS } from '../types/settings';

const SETTINGS_KEY = 'forex_reader_settings';
const CACHE_PREFIX = 'forex_cache_';

export function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(): Settings {
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
}

export function cacheAnalysis(key: string, data: any, ttl: number = 3600000): void {
  const item = {
    data,
    timestamp: Date.now(),
    ttl,
  };
  localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(item));
}

export function getCachedAnalysis(key: string): any | null {
  const stored = localStorage.getItem(`${CACHE_PREFIX}${key}`);
  if (!stored) return null;

  const item = JSON.parse(stored);
  if (Date.now() - item.timestamp > item.ttl) {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    return null;
  }

  return item.data;
}