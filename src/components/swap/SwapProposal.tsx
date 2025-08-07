import React, { useState } from 'react';
import { X, Clock, MessageSquare } from 'lucide-react';
import { User, Skill } from '../../types';

interface SwapProposalProps {
  targetUser: User;
  currentUser: User;
  onClose: () => void;
  onSubmit: (proposal: any) => void;
}

export default function SwapProposal({ targetUser, currentUser, onClose, onSubmit }: SwapProposalProps) {
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState('');
  const [selectedWantedSkill, setSelectedWantedSkill] = useState('');
  const [proposedTime, setProposedTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOfferedSkill || !selectedWantedSkill) return;

    const offeredSkill = currentUser.skillsOffered.find(s => s.id === selectedOfferedSkill);
    const wantedSkill = targetUser.skillsOffered.find(s => s.id === selectedWantedSkill);

    if (!offeredSkill || !wantedSkill) return;

    const proposal = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toUserId: targetUser.id,
      skillOffered: offeredSkill,
      skillWanted: wantedSkill,
      proposedTime,
      message,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    onSubmit(proposal);
  };

  // Find compatible skills (what current user offers that target user wants)
  const compatibleSkills = currentUser.skillsOffered.filter(offered =>
    targetUser.skillsWanted.some(wanted => 
      wanted.category === offered.category || 
      wanted.name.toLowerCase().includes(offered.name.toLowerCase())
    )
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Propose a Skill Swap</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <img
              src={targetUser.profilePicture}
              alt={targetUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{targetUser.name}</h3>
              <p className="text-sm text-gray-600">{targetUser.location}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* What you'll teach */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What skill will you share? *
              </label>
              <select
                required
                value={selectedOfferedSkill}
                onChange={(e) => setSelectedOfferedSkill(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a skill you offer...</option>
                {currentUser.skillsOffered.map(skill => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name} ({skill.proficiency})
                  </option>
                ))}
              </select>
              {compatibleSkills.length > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  💡 {compatibleSkills.length} of your skills match what {targetUser.name.split(' ')[0]} wants to learn!
                </p>
              )}
            </div>

            {/* What you want to learn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to learn from {targetUser.name.split(' ')[0]}? *
              </label>
              <select
                required
                value={selectedWantedSkill}
                onChange={(e) => setSelectedWantedSkill(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a skill they offer...</option>
                {targetUser.skillsOffered.map(skill => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name} ({skill.proficiency})
                  </option>
                ))}
              </select>
            </div>

            {/* Proposed time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-1" />
                Proposed time (optional)
              </label>
              <input
                type="datetime-local"
                value={proposedTime}
                onChange={(e) => setProposedTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="inline w-4 h-4 mr-1" />
                Personal message (optional)
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi ${targetUser.name.split(' ')[0]}, I'd love to learn from you and share what I know...`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Send Proposal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}