import React from 'react';
import { Calendar as CalendarIcon, Clock, Video, MapPin } from 'lucide-react';

export default function Calendar() {
  const upcomingSwaps = [
    {
      id: '1',
      title: 'Italian Cooking with Maria',
      partner: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      date: '2024-12-20',
      time: '2:00 PM',
      duration: '2 hours',
      type: 'in-person',
      location: 'Maria\'s Kitchen Studio',
      skillOffered: 'React Development',
      skillReceived: 'Italian Cooking',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Guitar Basics with David',
      partner: 'David Chen',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      date: '2024-12-22',
      time: '7:00 PM',
      duration: '1.5 hours',
      type: 'virtual',
      location: 'Zoom Meeting',
      skillOffered: 'Web Development',
      skillReceived: 'Guitar Playing',
      status: 'pending'
    },
    {
      id: '3',
      title: 'UI/UX Design Session with Sarah',
      partner: 'Sarah Williams',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      date: '2024-12-25',
      time: '10:00 AM',
      duration: '2 hours',
      type: 'virtual',
      location: 'Google Meet',
      skillOffered: 'JavaScript',
      skillReceived: 'UI/UX Design',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'virtual' ? (
      <Video className="w-4 h-4 text-blue-500" />
    ) : (
      <MapPin className="w-4 h-4 text-green-500" />
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Calendar</h1>
        <p className="text-gray-600">Manage your upcoming skill swap sessions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">December 2024</h2>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Prev</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Next</button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-xs font-medium text-gray-700 border-b">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Calendar days - simplified for demo */}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 0 + 1;
                const isCurrentMonth = day > 0 && day <= 31;
                const hasEvent = [20, 22, 25].includes(day);
                const isToday = day === 19;
                
                return (
                  <div
                    key={i}
                    className={`aspect-square p-1 text-xs flex items-start justify-center border border-gray-100 ${
                      !isCurrentMonth ? 'text-gray-300' : 'text-gray-900'
                    } ${isToday ? 'bg-blue-100 text-blue-900 font-semibold' : ''} ${
                      hasEvent ? 'bg-green-50' : ''
                    }`}
                  >
                    <span className="mt-1">{isCurrentMonth ? day : ''}</span>
                    {hasEvent && (
                      <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 ml-1"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Sessions</h2>
            
            <div className="space-y-4">
              {upcomingSwaps.map(swap => (
                <div key={swap.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start space-x-3">
                    <img
                      src={swap.avatar}
                      alt={swap.partner}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm">{swap.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{swap.partner}</p>
                      
                      <div className="flex items-center space-x-1 mt-2">
                        <CalendarIcon className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{new Date(swap.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{swap.time} ({swap.duration})</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 mt-1">
                        {getTypeIcon(swap.type)}
                        <span className="text-xs text-gray-600">{swap.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(swap.status)}`}>
                          {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg text-white">
              <h3 className="font-semibold mb-2">📅 This Week</h3>
              <p className="text-sm opacity-90">{upcomingSwaps.length} sessions scheduled</p>
              <p className="text-xs opacity-80 mt-1">Don't forget to prepare materials!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}