import { Idea, Application } from '@/types';

export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Recipe Generator',
    shortDescription: 'App that creates personalized recipes based on ingredients you have.',
    longDescription: 
      'Developing an application that uses AI to generate custom recipes based on the ingredients users have available. The app will consider dietary restrictions, preferences, and can suggest substitutions. It will include features like meal planning, nutritional information, and the ability to save favorite recipes.',
    professions: ['Developer', 'Designer', 'Data Scientist'],
    category: 'Technology',
    timeRequired: '3-6 months',
    isPaid: true,
    membersNeeded: 4,
    author: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    createdAt: '2025-04-10T12:00:00Z'
  },
  {
    id: '2',
    title: 'Sustainable Fashion Marketplace',
    shortDescription: 'Platform connecting eco-friendly fashion brands with conscious consumers.',
    longDescription: 
      'Creating a marketplace dedicated to sustainable and ethical fashion. The platform will verify brands based on their environmental impact, labor practices, and material sourcing. Features will include carbon footprint tracking for purchases, a recycling program, and educational content about sustainable fashion.',
    professions: ['Developer', 'Designer', 'Marketing Specialist', 'Content Creator'],
    category: 'Business',
    timeRequired: '6-12 months',
    isPaid: true,
    membersNeeded: 5,
    author: {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    createdAt: '2025-04-09T15:30:00Z'
  },
  {
    id: '3',
    title: 'Virtual Reality Meditation Space',
    shortDescription: 'VR environment designed for guided meditation and mindfulness practices.',
    longDescription: 
      'Developing a virtual reality application that creates immersive environments for meditation and mindfulness. Users can choose from various natural settings, guided sessions, and breathing exercises. The app will track progress, offer personalized recommendations, and include social features for group meditation sessions.',
    professions: ['Developer', 'Designer', '3D Artist', 'Sound Engineer'],
    category: 'Health',
    timeRequired: '4-8 months',
    isPaid: false,
    membersNeeded: 3,
    author: {
      id: 'user-3',
      name: 'Alex Johnson',
      email: 'alex@example.com'
    },
    createdAt: '2025-04-08T09:15:00Z'
  },
  {
    id: '4',
    title: 'Local Business Support Network',
    shortDescription: 'Platform connecting small businesses for resource sharing and collaboration.',
    longDescription: 
      'Building a community platform for small businesses to share resources, collaborate, and support each other. Features will include skill-sharing, equipment lending, group purchasing discounts, mentorship matching, and local event coordination. The goal is to strengthen local economies and foster business resilience.',
    professions: ['Developer', 'Designer', 'Business Analyst', 'Community Manager'],
    category: 'Business',
    timeRequired: '2-4 months',
    isPaid: false,
    membersNeeded: 4,
    author: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    createdAt: '2025-04-07T14:45:00Z'
  },
  {
    id: '5',
    title: 'Interactive Educational Comic Series',
    shortDescription: 'Digital comics that teach complex subjects through engaging stories.',
    longDescription: 
      'Creating a series of interactive digital comics that make complex educational subjects accessible and engaging. Topics will range from science and history to financial literacy and digital citizenship. The comics will include interactive elements, quizzes, and supplementary materials for deeper learning.',
    professions: ['Content Creator', 'Illustrator', 'Developer', 'Educational Consultant'],
    category: 'Education',
    timeRequired: '3-6 months',
    isPaid: true,
    membersNeeded: 4,
    author: {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    createdAt: '2025-04-06T10:20:00Z'
  },
  {
    id: '6',
    title: 'Community Garden Management App',
    shortDescription: 'Tool for coordinating tasks and resources in community gardens.',
    longDescription: 
      'Developing an application to help community gardens coordinate volunteer schedules, track plant growth, manage resources, and share knowledge. The app will include features like weather alerts, planting calendars, task assignments, and a forum for gardening tips and plant swaps.',
    professions: ['Developer', 'Designer', 'Project Manager'],
    category: 'Technology',
    timeRequired: '2-4 months',
    isPaid: false,
    membersNeeded: 3,
    author: {
      id: 'user-3',
      name: 'Alex Johnson',
      email: 'alex@example.com'
    },
    createdAt: '2025-04-05T16:10:00Z'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    ideaId: '1',
    ideaTitle: 'AI-Powered Recipe Generator',
    userId: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    coverLetter: 'I have experience with AI development and would love to contribute to this project.',
    cvLink: 'https://example.com/resume_jane_smith.pdf',
    status: 'pending',
    createdAt: '2025-04-11T10:00:00Z'
  },
  {
    id: 'app-2',
    ideaId: '1',
    ideaTitle: 'AI-Powered Recipe Generator',
    userId: 'user-3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    coverLetter: 'As a UI/UX designer, I can help create an intuitive interface for your recipe app.',
    cvLink: 'https://example.com/resume_alex_johnson.pdf',
    status: 'pending',
    createdAt: '2025-04-12T14:30:00Z'
  },
  {
    id: 'app-3',
    ideaId: '3',
    ideaTitle: 'Virtual Reality Meditation Space',
    userId: 'user-1',
    name: 'Sam Wilson',
    email: 'sam@example.com',
    coverLetter: 'I have experience in VR development and meditation practice.',
    cvLink: 'https://example.com/resume_sam_wilson.pdf',
    status: 'pending',
    createdAt: '2025-04-10T09:45:00Z'
  }
];