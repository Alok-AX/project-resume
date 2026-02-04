// User Types
export interface User {
  _id?: string;
  fullName: string;
  email: string;
  professionalHeadline?: string;
  location?: string;
  linkedinUrl?: string;
  bio?: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TemplateData {
  id: string;
  name: string;
  badge?: string;
  description: string;
  category: "Creative" | "Professional" | "Simple" | "Tech";
  tags: string[];
  accentGradient: string;
  primary: string;
  muted: string;
  accentColor: string;
}

export interface Resume {
  id: string;
  title: string;
  templateName: string;
  completion: number;
  lastEdited: string;
  atsScore?: number;
}
