import React from 'react';
import { Settings } from '../types/settings';

interface SettingsFormProps {
  settings: Settings;
  onSave: (settings: Settings) => void;
}

export function SettingsForm({ settings, onSave }: SettingsFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSave({
      apiKey: formData.get('apiKey') as string,
      model: formData.get('model') as string,
      refreshInterval: Number(formData.get('refreshInterval')),
      useCache: formData.get('useCache') === 'true',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
          Clé API OpenAI
        </label>
        <input
          type="password"
          name="apiKey"
          id="apiKey"
          defaultValue={settings.apiKey}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
          Modèle OpenAI
        </label>
        <select
          name="model"
          id="model"
          defaultValue={settings.model}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        </select>
      </div>

      <div>
        <label htmlFor="refreshInterval" className="block text-sm font-medium text-gray-700">
          Intervalle de rafraîchissement (minutes)
        </label>
        <input
          type="number"
          name="refreshInterval"
          id="refreshInterval"
          min="1"
          max="60"
          defaultValue={settings.refreshInterval}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="useCache"
            defaultChecked={settings.useCache}
            value="true"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Activer le cache</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sauvegarder
      </button>
    </form>
  );
}