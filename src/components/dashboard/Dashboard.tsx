import React from 'react';
import { Star, MapPin, Users, Calendar, TrendingUp, Award } from 'lucide-react';
import { User } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold text-gradient mb-4">
          Welcome back, {currentUser.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl">
          Discover new learning opportunities and connect with amazing people in your journey of growth.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slide-up">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              variant="elevated" 
              className="group hover:shadow-glow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${
                  stat.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' :
                  stat.color === 'text-yellow-600' ? 'from-yellow-100 to-yellow-200' :
                  stat.color === 'text-green-600' ? 'from-green-100 to-green-200' :
                  'from-purple-100 to-purple-200'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Your Skills */}
        <div className="lg:col-span-2">
          <Card variant="default" className="animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Your Skills</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('profile')}
              >
                Manage Skills
              </Button>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-success-500 rounded-full mr-3"></div>
                  Skills You Offer
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.skillsOffered.map(skill => (
                    <Card key={skill.id} variant="interactive" padding="sm" className="bg-gradient-to-br from-success-50 to-success-100 border-success-200 hover:from-success-100 hover:to-success-200">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-success-900 text-lg">{skill.name}</h4>
                        <Badge variant="success" size="sm">
                          {skill.proficiency}
                        </Badge>
                      </div>
                      <p className="text-sm text-success-700 mb-3 leading-relaxed">{skill.description}</p>
                      <Badge variant="default" size="sm">{skill.category}</Badge>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  Skills You Want to Learn
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.skillsWanted.map(skill => (
                    <Card key={skill.id} variant="interactive" padding="sm" className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 hover:from-primary-100 hover:to-primary-200">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-primary-900 text-lg">{skill.name}</h4>
                        <Badge variant="primary" size="sm">
                          {skill.proficiency}
                        </Badge>
                      </div>
                      <p className="text-sm text-primary-700 mb-3 leading-relaxed">{skill.description}</p>
                      <Badge variant="default" size="sm">{skill.category}</Badge>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Suggested Matches */}
        <div>
          <Card variant="default" className="animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Suggested Matches</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('search')}
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {suggestedMatches.slice(0, 3).map(user => (
                <Card
                  key={user.id} 
                  variant="interactive"
                  padding="sm"
                  className="hover:shadow-md"
                  onClick={() => onViewProfile(user)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-neutral-900 truncate">{user.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-warning-500 fill-current" />
                          <span className="text-sm font-medium text-neutral-700">{user.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-neutral-500 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user.location}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600">Offers:</span>
                          <Badge variant="success" size="sm">{user.skillsOffered[0]?.name}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600">Match Score:</span>
                          <Badge variant="primary" size="sm">85%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card variant="glass" className="mt-6 bg-gradient-to-br from-primary-500 to-secondary-500 text-white border-white/20">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <Button
                variant="ghost"
                size="lg"
                fullWidth
                onClick={() => onNavigate('search')}
                icon={<Users />}
                className="!bg-white/20 hover:!bg-white/30 !text-white !border-white/20 justify-start"
              >
                Find New Matches
              </Button>
              <Button
                variant="ghost"
                size="lg"
                fullWidth
                onClick={() => onNavigate('messages')}
                icon={<Calendar />}
                className="!bg-white/20 hover:!bg-white/30 !text-white !border-white/20 justify-start"
              >
                Schedule a Swap
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}