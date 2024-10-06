import { Card, Typography } from '@mui/material';
import { Prompt, Story } from '../utils/types';
import { useState, useEffect } from 'react';

export type StoryCardProps = {
  story: Story;
};

const StoryCard = ({ story }: StoryCardProps) => {
  const [promptData, setPromptData] = useState<Prompt>();

  useEffect(() => {
    fetch(`/api/prompts/${story.promptId}`)
      .then((res) => res.json())
      .then((res) => setPromptData(res.data));
  }, [story.promptId]);
  console.log(`Story: ${JSON.stringify(story)}`);
  console.log(`Prompt: ${JSON.stringify(promptData)}`);

  return (
    <Card variant="outlined">
      <Typography variant="body1">{story.story}</Typography>
      <Typography variant="body1">writer: {story.creatorId}</Typography>
      <Typography variant="body1">Rating: {story.rating}</Typography>
      <Typography variant="body1">Views: {story.views}</Typography>
    </Card>
  );
};

export default StoryCard;
