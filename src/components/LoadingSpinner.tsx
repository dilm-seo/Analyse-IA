import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      <p className="mt-4 text-gray-600">Analyse des données en cours...</p>
    </div>
  );
}