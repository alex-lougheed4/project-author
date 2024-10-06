export type Story = {
  id: string;
  promptId: string;
  story: string;
  creatorId: string;
  createdAt: Date;
  views: number;
  rating: number;
};

export type Prompt = {
  id: string;
  promptTitle: string;
  creatorId: string;
  stories: Story[];
  createdAt: Date;
  deadline: string;
  length: string;
};
