import React from 'react';
import { Search, User, MessageCircle, Calendar, Settings } from 'lucide-react';

interface HeaderProps {
  currentUser: any;
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Header({ currentUser, onNavigate, currentView }: HeaderProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: null },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'calendar', label: 'Calendar', icon: Calendar }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate('dashboard')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SkillSwap</span>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('settings')}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Settings size={20} />
            </button>
            
            <div className="flex items-center space-x-3">
              <img
                src={currentUser.profilePicture}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}