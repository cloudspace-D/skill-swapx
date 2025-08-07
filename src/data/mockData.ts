import { User, Skill } from '../types';

export const skillCategories = [
  'Programming',
  'Design', 
  'Language',
  'Music',
  'Cooking',
  'Sports',
  'Business',
  'Arts & Crafts',
  'Photography',
  'Writing',
  'Marketing',
  'Other'
] as const;

export const mockCurrentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  bio: 'Full-stack developer passionate about learning new skills and sharing knowledge. I love connecting with people and exploring creative pursuits.',
  profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  location: 'San Francisco, CA',
  rating: 4.8,
  completedSwaps: 15,
  joinedDate: '2024-01-15',
  skillsOffered: [
    {
      id: '1',
      name: 'React Development',
      category: 'Programming',
      description: 'Modern React development with hooks, TypeScript, and best practices',
      proficiency: 'Expert'
    },
    {
      id: '2', 
      name: 'JavaScript',
      category: 'Programming',
      description: 'ES6+, async programming, and frontend frameworks',
      proficiency: 'Expert'
    }
  ],
  skillsWanted: [
    {
      id: '3',
      name: 'Guitar Playing',
      category: 'Music',
      description: 'Beginner looking to learn acoustic guitar basics',
      proficiency: 'Beginner'
    },
    {
      id: '4',
      name: 'Italian Language',
      category: 'Language', 
      description: 'Want to learn conversational Italian for travel',
      proficiency: 'Beginner'
    }
  ]
};

export const mockUsers: User[] = [
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    bio: 'Professional chef turned cooking instructor. Love teaching culinary arts and learning about technology.',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    location: 'Los Angeles, CA',
    rating: 4.9,
    completedSwaps: 28,
    joinedDate: '2023-11-20',
    skillsOffered: [
      {
        id: '5',
        name: 'Italian Cooking',
        category: 'Cooking',
        description: 'Traditional Italian recipes and cooking techniques',
        proficiency: 'Expert'
      },
      {
        id: '6',
        name: 'Food Photography',
        category: 'Photography',
        description: 'Styling and photographing food for social media',
        proficiency: 'Intermediate'
      }
    ],
    skillsWanted: [
      {
        id: '7',
        name: 'Web Development',
        category: 'Programming',
        description: 'Want to build a website for my cooking classes',
        proficiency: 'Beginner'
      }
    ]
  },
  {
    id: '3',
    name: 'David Chen',
    email: 'david.chen@example.com',
    bio: 'Multilingual teacher and music enthusiast. Fluent in 5 languages and play multiple instruments.',
    profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    location: 'New York, NY',
    rating: 4.7,
    completedSwaps: 35,
    joinedDate: '2023-08-10',
    skillsOffered: [
      {
        id: '8',
        name: 'Guitar Teaching',
        category: 'Music',
        description: 'Acoustic and electric guitar lessons for all levels',
        proficiency: 'Expert'
      },
      {
        id: '9',
        name: 'Spanish Language',
        category: 'Language',
        description: 'Native Spanish speaker offering conversation practice',
        proficiency: 'Expert'
      },
      {
        id: '10',
        name: 'Mandarin Chinese',
        category: 'Language',
        description: 'Business and conversational Mandarin',
        proficiency: 'Expert'
      }
    ],
    skillsWanted: [
      {
        id: '11',
        name: 'Photography',
        category: 'Photography',
        description: 'Portrait and landscape photography techniques',
        proficiency: 'Beginner'
      }
    ]
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    bio: 'UX/UI designer with a passion for creating beautiful, accessible designs. Always eager to learn new tools.',
    profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    location: 'Seattle, WA',
    rating: 4.6,
    completedSwaps: 12,
    joinedDate: '2024-02-05',
    skillsOffered: [
      {
        id: '12',
        name: 'UI/UX Design',
        category: 'Design',
        description: 'User interface design, wireframing, and prototyping',
        proficiency: 'Expert'
      },
      {
        id: '13',
        name: 'Figma',
        category: 'Design',
        description: 'Advanced Figma techniques and design systems',
        proficiency: 'Expert'
      }
    ],
    skillsWanted: [
      {
        id: '14',
        name: 'Frontend Development',
        category: 'Programming',
        description: 'Want to implement my designs with code',
        proficiency: 'Intermediate'
      }
    ]
  },
  {
    id: '5',
    name: 'James Rodriguez',
    email: 'james.rodriguez@example.com',
    bio: 'Marketing professional and fitness enthusiast. Love helping others achieve their business and health goals.',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    location: 'Austin, TX',
    rating: 4.5,
    completedSwaps: 8,
    joinedDate: '2024-03-12',
    skillsOffered: [
      {
        id: '15',
        name: 'Digital Marketing',
        category: 'Marketing',
        description: 'SEO, social media marketing, and content strategy',
        proficiency: 'Expert'
      },
      {
        id: '16',
        name: 'Personal Training',
        category: 'Sports',
        description: 'Strength training and fitness coaching',
        proficiency: 'Intermediate'
      }
    ],
    skillsWanted: [
      {
        id: '17',
        name: 'Video Editing',
        category: 'Design',
        description: 'Want to create better marketing videos',
        proficiency: 'Beginner'
      }
    ]
  }
];