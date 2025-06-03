export interface Idea {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  timeRequired: string;
  isPaid: boolean;
  membersNeeded: number; // Cambiado de teamSize para consistencia con API
  professions: string[];
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface Application {
  id: string;
  ideaId: string;
  ideaTitle: string;
  userId: string;
  name: string;
  email: string;
  coverLetter: string;
  cvLink: string; // Cambiado de cv para consistencia con API
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type Category = 
  | "Technology"
  | "Design"
  | "Business"
  | "Marketing"
  | "Education"
  | "Health"
  | "Entertainment"
  | "Other";

export type Profession = 
  | "Developer"
  | "Designer"
  | "Project Manager"
  | "Marketing Specialist"
  | "Content Creator"
  | "Data Scientist"
  | "Business Analyst"
  | "Financial Advisor"
  | "Legal Consultant"
  | "Other";