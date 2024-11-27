import React from 'react';
import { SettingsForm } from '../components/SettingsForm';
import { loadSettings, saveSettings } from '../utils/storage';
import { Settings as SettingsType } from '../types/settings';

export function Settings() {
  const settings = loadSettings();

  const handleSave = (newSettings: SettingsType) => {
    saveSettings(newSettings);
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Paramètres</h1>
      <SettingsForm settings={settings} onSave={handleSave} />
    </div>
  );
}