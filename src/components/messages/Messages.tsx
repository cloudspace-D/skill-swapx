import React from 'react';
import { MessageCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function Messages() {
  const messages = [
    {
      id: '1',
      from: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      lastMessage: 'Great! Looking forward to our cooking session tomorrow at 2 PM.',
      time: '2 hours ago',
      unread: true,
      type: 'swap-confirmed'
    },
    {
      id: '2', 
      from: 'David Chen',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      lastMessage: 'Thanks for the proposal! I\'d be happy to teach you guitar. When works best for you?',
      time: '1 day ago',
      unread: true,
      type: 'proposal-response'
    },
    {
      id: '3',
      from: 'Sarah Williams', 
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      lastMessage: 'Perfect! I\'ll prepare some design resources for our session.',
      time: '3 days ago',
      unread: false,
      type: 'chat'
    }
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'swap-confirmed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'proposal-response':
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Stay connected with your learning partners.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Conversations</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {messages.map(message => (
            <div 
              key={message.id}
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={message.avatar}
                    alt={message.from}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1">
                    {getStatusIcon(message.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900">{message.from}</h3>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  
                  <p className={`text-sm ${message.unread ? 'text-gray-900 font-medium' : 'text-gray-600'} line-clamp-2`}>
                    {message.lastMessage}
                  </p>
                  
                  <div className="mt-2 flex items-center space-x-2">
                    {message.type === 'swap-confirmed' && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Swap Confirmed
                      </span>
                    )}
                    {message.type === 'proposal-response' && (
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                        Waiting for Response
                      </span>
                    )}
                    {message.unread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 text-center border-t border-gray-200">
          <p className="text-gray-500 text-sm">More messaging features coming soon!</p>
          <p className="text-gray-400 text-xs mt-1">Real-time chat, file sharing, and video calls</p>
        </div>
      </div>
    </div>
  );
}