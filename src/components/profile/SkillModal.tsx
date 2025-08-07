import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Skill, SkillCategory, ProficiencyLevel } from '../../types';
import { skillCategories } from '../../data/mockData';

interface SkillModalProps {
  skill?: Skill | null;
  type: 'offered' | 'wanted';
  onClose: () => void;
  onSave: (skill: Skill) => void;
}

export default function SkillModal({ skill, type, onClose, onSave }: SkillModalProps) {
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    category: skill?.category || 'Programming' as SkillCategory,
    description: skill?.description || '',
    proficiency: skill?.proficiency || 'Beginner' as ProficiencyLevel
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSkill: Skill = {
      id: skill?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      description: formData.description,
      proficiency: formData.proficiency
    };
    
    onSave(newSkill);
  };

  const isEdit = !!skill;
  const title = isEdit 
    ? `Edit ${type === 'offered' ? 'Offered' : 'Wanted'} Skill`
    : `Add ${type === 'offered' ? 'Offered' : 'Wanted'} Skill`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., React Development"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillCategory })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {skillCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level *
            </label>
            <select
              id="proficiency"
              required
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: e.target.value as ProficiencyLevel })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe what you can teach or want to learn..."
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
              className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                type === 'offered' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isEdit ? 'Update' : 'Add'} Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}