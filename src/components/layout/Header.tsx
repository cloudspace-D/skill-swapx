import React from 'react';
import { Search, User, MessageCircle, Calendar, Settings } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

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
    <header className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => onNavigate('dashboard')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
              <span className="text-2xl font-bold text-gradient">SkillSwap</span>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-primary-700 bg-primary-50 shadow-sm'
                        : 'text-neutral-600 hover:text-primary-700 hover:bg-white/60'
                    }`}
                  >
                    {Icon && <Icon size={18} />}
                    <span>{item.label}</span>
                    {item.id === 'messages' && (
                      <Badge variant="error" size="sm">2</Badge>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('settings')}
              icon={<Settings />}
              className="!p-2.5"
            >
            </Button>
            
            <div className="flex items-center space-x-4 pl-4 border-l border-white/20">
              <img
                src={currentUser.profilePicture}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20 hover:ring-primary-300 transition-all duration-200"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-neutral-900">{currentUser.name}</p>
                <p className="text-xs text-neutral-500">{currentUser.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}