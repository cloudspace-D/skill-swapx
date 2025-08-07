import React, { useState } from 'react';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import ProfileView from './components/profile/ProfileView';
import Search from './components/search/Search';
import Messages from './components/messages/Messages';
import Calendar from './components/calendar/Calendar';
import Settings from './components/settings/Settings';
import SwapProposal from './components/swap/SwapProposal';
import { mockCurrentUser, mockUsers } from './data/mockData';
import { User } from './types';

type View = 'dashboard' | 'profile' | 'search' | 'messages' | 'calendar' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showSwapProposal, setShowSwapProposal] = useState(false);
  const [swapTargetUser, setSwapTargetUser] = useState<User | null>(null);

  const handleNavigate = (view: string) => {
    setCurrentView(view as View);
    setSelectedUser(null);
  };

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setCurrentView('profile');
  };

  const handleProposeSwap = (user: User) => {
    setSwapTargetUser(user);
    setShowSwapProposal(true);
  };

  const handleSwapProposal = (proposal: any) => {
    console.log('Swap proposal submitted:', proposal);
    setShowSwapProposal(false);
    setSwapTargetUser(null);
    // Here you would typically send the proposal to your backend
    // For now, we'll just show a success message or redirect to messages
    alert(`Swap proposal sent to ${proposal.toUserId}!`);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            currentUser={mockCurrentUser}
            suggestedMatches={mockUsers}
            onNavigate={handleNavigate}
            onViewProfile={handleViewProfile}
          />
        );
      
      case 'profile':
        const userToShow = selectedUser || mockCurrentUser;
        const isOwnProfile = userToShow.id === mockCurrentUser.id;
        return (
          <ProfileView
            user={userToShow}
            isOwnProfile={isOwnProfile}
            onEdit={() => console.log('Edit profile')}
            onProposeSwap={handleProposeSwap}
          />
        );
      
      case 'search':
        return (
          <Search
            users={mockUsers}
            onViewProfile={handleViewProfile}
            onProposeSwap={handleProposeSwap}
          />
        );
      
      case 'messages':
        return <Messages />;
      
      case 'calendar':
        return <Calendar />;
      
      case 'settings':
        return <Settings />;
      
      default:
        return (
          <Dashboard
            currentUser={mockCurrentUser}
            suggestedMatches={mockUsers}
            onNavigate={handleNavigate}
            onViewProfile={handleViewProfile}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={mockCurrentUser}
        onNavigate={handleNavigate}
        currentView={currentView}
      />
      
      <main>
        {renderCurrentView()}
      </main>

      {showSwapProposal && swapTargetUser && (
        <SwapProposal
          targetUser={swapTargetUser}
          currentUser={mockCurrentUser}
          onClose={() => setShowSwapProposal(false)}
          onSubmit={handleSwapProposal}
        />
      )}
    </div>
  );
}

export default App;