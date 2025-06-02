export interface Idea {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  professions: string[];
  category: string;
  timeRequired: string;
  isPaid: boolean;
  teamSize: number;
  createdBy: string;
  createdAt: string;
}

export interface Application {
  id: string;
  ideaId: string;
  userId: string;
  name: string;
  email: string;
  coverLetter: string;
  cv: string;
  createdAt: string;
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