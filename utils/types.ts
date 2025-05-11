export type Prompt = {
  id: string;
  createdAt: string;
  promptTitle: string;
  promptSummary: string;
  authorId: string;
  deadline: string;
  length: string;
  writerCreds: Number;
  stories: Story[];
};

export type Story = {
  id: string;
  createdAt: string;
  storyTitle: string;
  promptId: string;
  storyDescription: string;
  authorId: string;
  writerCreds: string;
};

export type User = {
  id: string;
  createdAt: string;
  username: string;
  email: string;
  penNames: string[];
  prompts: Prompt[];
  stories: Story[];
};
