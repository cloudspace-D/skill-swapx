import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter, Star, MapPin, Users } from 'lucide-react';
import { User, SearchFilters, SkillCategory, ProficiencyLevel } from '../../types';
import { skillCategories } from '../../data/mockData';

interface SearchProps {
  users: User[];
  onViewProfile: (user: User) => void;
  onProposeSwap: (user: User) => void;
}

export default function Search({ users, onViewProfile, onProposeSwap }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = user.name.toLowerCase().includes(query);
        const matchesSkills = user.skillsOffered.some(skill => 
          skill.name.toLowerCase().includes(query) || 
          skill.description.toLowerCase().includes(query)
        );
        const matchesLocation = user.location.toLowerCase().includes(query);
        
        if (!matchesName && !matchesSkills && !matchesLocation) {
          return false;
        }
      }

      // Category filter
      if (filters.category) {
        const hasMatchingSkill = user.skillsOffered.some(skill => skill.category === filters.category);
        if (!hasMatchingSkill) return false;
      }

      // Proficiency filter
      if (filters.proficiency) {
        const hasMatchingProficiency = user.skillsOffered.some(skill => skill.proficiency === filters.proficiency);
        if (!hasMatchingProficiency) return false;
      }

      // Rating filter
      if (filters.rating) {
        if (user.rating < filters.rating) return false;
      }

      return true;
    });
  }, [users, searchQuery, filters]);

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Learning Partner</h1>
        <p className="text-gray-600">Discover amazing people ready to share their skills with you.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, skill, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={18} />
            <span>Filters</span>
            {Object.keys(filters).length > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                {Object.keys(filters).length}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => setFilters({ ...filters, category: (e.target.value as SkillCategory) || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {skillCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency</label>
                <select
                  value={filters.proficiency || ''}
                  onChange={(e) => setFilters({ ...filters, proficiency: (e.target.value as ProficiencyLevel) || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={filters.rating || ''}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Rating</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} found
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{user.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{user.completedSwaps} swaps</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">{user.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.bio}</p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-2">TOP SKILLS OFFERED</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.slice(0, 2).map(skill => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {user.skillsOffered.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{user.skillsOffered.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {user.skillsWanted.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-2">WANTS TO LEARN</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.skillsWanted.slice(0, 2).map(skill => (
                        <span
                          key={skill.id}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {user.skillsWanted.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{user.skillsWanted.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => onViewProfile(user)}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-white transition-colors text-sm font-medium"
              >
                View Profile
              </button>
              <button
                onClick={() => onProposeSwap(user)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Propose Swap
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}