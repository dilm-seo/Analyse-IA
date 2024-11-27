export interface Settings {
  apiKey: string;
  model: string;
  refreshInterval: number;
  useCache: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  apiKey: '',
  model: 'gpt-4-turbo-preview',
  refreshInterval: 5,
  useCache: true,
};