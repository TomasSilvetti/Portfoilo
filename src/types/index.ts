export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  type: 'web' | 'system' | 'ai-tool';
  status: 'completed' | 'in-progress' | 'demo';
  client?: string;
  duration?: string;
  imageUrl: string;
  projectUrl: string;
  imagePreviewUrl?: string;
  order?: number;
  isDisabled?: boolean;
  disabledMessage?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
}

export interface MeetingSchedule {
  date: string;
  time: string;
  projectType: string;
  contactInfo: ContactForm;
}