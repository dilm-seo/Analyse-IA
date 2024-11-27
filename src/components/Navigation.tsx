import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Home } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                location.pathname === '/'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Home className="w-5 h-5 mr-2" />
              Accueil
            </Link>
            <Link
              to="/settings"
              className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                location.pathname === '/settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="w-5 h-5 mr-2" />
              Paramètres
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}