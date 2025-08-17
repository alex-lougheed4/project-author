export type Profile = {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
};

export type Prompt = {
  id: string;
  title: string;
  summary: string;
  author_id: string;
  deadline_date?: string;
  length: number;
  created_at: string;
  updated_at: string;
  // Relationships
  author?: Profile;
  stories?: Story[];
  votes?: Vote[];
};

export type Story = {
  id: string;
  story_title: string;
  prompt_id: string;
  author_id: string;
  story_description: string;
  word_count: number;
  created_at: string;
  updated_at: string;
  // Relationships
  prompt?: Prompt;
  author?: Profile;
  votes?: Vote[];
};

export type Vote = {
  id: string;
  user_id: string;
  prompt_id?: string;
  story_id?: string;
  vote_type: 'upvote' | 'downvote';
  created_at: string;
  updated_at: string;
  // Relationships
  user?: Profile;
  prompt?: Prompt;
  story?: Story;
};

export type PromptWithMetadata = {
  id: string;
  title: string;
  summary: string;
  author_id: string;
  deadline_date?: string;
  length: number;
  created_at: string;
  updated_at: string;
  story_count: number;
  upvotes: number;
  downvotes: number;
  // Relationships
  author?: Profile;
};

export type User = {
  id: string;
  email: string;
  created_at: string;
  // Profile relationship
  profile?: Profile;
  // User's content
  prompts?: Prompt[];
  stories?: Story[];
  votes?: Vote[];
};
