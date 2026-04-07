export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: string | null;
  publishedAt: string;
  readingTime: number;
  categories: { title: string; slug: { current: string } }[];
  isPlaceholder?: boolean;
  body?: unknown;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}
