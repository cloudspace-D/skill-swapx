export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
  location: string;
  rating: number;
  completedSwaps: number;
  joinedDate: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  proficiency: ProficiencyLevel;
}

export type SkillCategory = 
  | 'Programming'
  | 'Design'
  | 'Language'
  | 'Music'
  | 'Cooking'
  | 'Sports'
  | 'Business'
  | 'Arts & Crafts'
  | 'Photography'
  | 'Writing'
  | 'Marketing'
  | 'Other';

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Expert';

export interface SwapProposal {
  id: string;
  fromUserId: string;
  toUserId: string;
  skillOffered: Skill;
  skillWanted: Skill;
  proposedTime: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'counter-proposed';
  createdAt: string;
}

export interface SearchFilters {
  category?: SkillCategory;
  proficiency?: ProficiencyLevel;
  location?: string;
  rating?: number;
}