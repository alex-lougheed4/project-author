export enum PromptLength {
  SHORT,
  MEDIUM,
  LONG,
}

export type Prompt = {
  id?: string | undefined;
  title: string;
  summary: string;
  userCreatorId: string | undefined;
  stories?: string[] | undefined;
  createdAt: Date;
  deadline: Date;
  length: PromptLength;
  kudos?: number | undefined;
};

export type Story = {
  id: string;
  story: string;
  createdByUserId: string;
  competitionId: string;
  createdAt: Date;
  views: number;
  kudos: number;
};
