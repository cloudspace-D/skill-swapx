import React from 'react';
import { Star, MapPin, Users, Calendar, TrendingUp, Award } from 'lucide-react';
import { User } from '../../types';

interface DashboardProps {
  currentUser: User;
  suggestedMatches: User[];
  onNavigate: (view: string) => void;
  onViewProfile: (user: User) => void;
}

export default function Dashboard({ currentUser, suggestedMatches, onNavigate, onViewProfile }: DashboardProps) {
  const stats = [
    { label: 'Completed Swaps', value: currentUser.completedSwaps, icon: Users, color: 'text-blue-600' },
    { label: 'Average Rating', value: currentUser.rating.toFixed(1), icon: Star, color: 'text-yellow-600' },
    { label: 'Skills Offered', value: currentUser.skillsOffered.length, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Skills Learning', value: currentUser.skillsWanted.length, icon: Award, color: 'text-purple-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
        <p className="text-gray-600">Discover new learning opportunities and connect with amazing people.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Your Skills */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Skills</h2>
              <button 
                onClick={() => onNavigate('profile')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Manage Skills
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Skills You Offer</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentUser.skillsOffered.map(skill => (
                    <div key={skill.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-green-900">{skill.name}</h4>
                        <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">
                          {skill.proficiency}
                        </span>
                      </div>
                      <p className="text-sm text-green-700">{skill.description}</p>
                      <span className="text-xs text-green-600 font-medium">{skill.category}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Skills You Want to Learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentUser.skillsWanted.map(skill => (
                    <div key={skill.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-blue-900">{skill.name}</h4>
                        <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
                          {skill.proficiency}
                        </span>
                      </div>
                      <p className="text-sm text-blue-700">{skill.description}</p>
                      <span className="text-xs text-blue-600 font-medium">{skill.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Matches */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Suggested Matches</h2>
              <button 
                onClick={() => onNavigate('search')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {suggestedMatches.slice(0, 3).map(user => (
                <div 
                  key={user.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                  onClick={() => onViewProfile(user)}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">{user.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {user.location}
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-700">Offers: {user.skillsOffered[0]?.name}</p>
                        <p className="text-xs text-gray-600">Match Score: 85%</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl p-6 mt-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate('search')}
                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-left transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Find New Matches</span>
                </div>
              </button>
              <button 
                onClick={() => onNavigate('messages')}
                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-left transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Schedule a Swap</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}