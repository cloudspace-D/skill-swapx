import React, { useState } from 'react';
import { Star, MapPin, Calendar, Edit, Plus } from 'lucide-react';
import { User, Skill } from '../../types';
import SkillModal from './SkillModal';

interface ProfileViewProps {
  user: User;
  isOwnProfile: boolean;
  onEdit?: () => void;
  onProposeSwap?: (user: User) => void;
}

export default function ProfileView({ user, isOwnProfile, onEdit, onProposeSwap }: ProfileViewProps) {
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillType, setSkillType] = useState<'offered' | 'wanted'>('offered');

  const handleAddSkill = (type: 'offered' | 'wanted') => {
    setSkillType(type);
    setEditingSkill(null);
    setShowSkillModal(true);
  };

  const handleEditSkill = (skill: Skill, type: 'offered' | 'wanted') => {
    setSkillType(type);
    setEditingSkill(skill);
    setShowSkillModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-teal-500"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            <div className="relative -mt-16">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div className="flex-1 pt-4 sm:pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-900 ml-1">{user.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{user.completedSwaps} swaps</span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                  {isOwnProfile ? (
                    <button
                      onClick={onEdit}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onProposeSwap?.(user)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Propose Swap
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills Offered */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Skills Offered</h2>
            {isOwnProfile && (
              <button
                onClick={() => handleAddSkill('offered')}
                className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium"
              >
                <Plus size={16} />
                <span>Add Skill</span>
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {user.skillsOffered.map(skill => (
              <div 
                key={skill.id} 
                className={`p-4 bg-green-50 border border-green-200 rounded-lg ${isOwnProfile ? 'cursor-pointer hover:bg-green-100' : ''}`}
                onClick={isOwnProfile ? () => handleEditSkill(skill, 'offered') : undefined}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-green-900">{skill.name}</h3>
                      <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">
                        {skill.proficiency}
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mb-2">{skill.description}</p>
                    <span className="text-xs text-green-600 font-medium">{skill.category}</span>
                  </div>
                </div>
              </div>
            ))}
            {user.skillsOffered.length === 0 && (
              <p className="text-gray-500 text-center py-8">No skills offered yet</p>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Skills Wanted</h2>
            {isOwnProfile && (
              <button
                onClick={() => handleAddSkill('wanted')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Plus size={16} />
                <span>Add Skill</span>
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {user.skillsWanted.map(skill => (
              <div 
                key={skill.id} 
                className={`p-4 bg-blue-50 border border-blue-200 rounded-lg ${isOwnProfile ? 'cursor-pointer hover:bg-blue-100' : ''}`}
                onClick={isOwnProfile ? () => handleEditSkill(skill, 'wanted') : undefined}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-blue-900">{skill.name}</h3>
                      <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
                        {skill.proficiency}
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">{skill.description}</p>
                    <span className="text-xs text-blue-600 font-medium">{skill.category}</span>
                  </div>
                </div>
              </div>
            ))}
            {user.skillsWanted.length === 0 && (
              <p className="text-gray-500 text-center py-8">No learning goals set yet</p>
            )}
          </div>
        </div>
      </div>

      {showSkillModal && (
        <SkillModal
          skill={editingSkill}
          type={skillType}
          onClose={() => setShowSkillModal(false)}
          onSave={(skill) => {
            // Handle save logic
            setShowSkillModal(false);
          }}
        />
      )}
    </div>
  );
}