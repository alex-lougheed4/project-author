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
    prompt: string;
    creatorId: string;
    stories: Story[];
    createdAt: Date;
    deadline: Date;
    length: string;
}