import { Box, Card, Typography } from '@mui/material';
import { Prompt } from '../utils/types';
import StoryCard from './StoryCard';

export type PromptCardProps = {
  prompt: Prompt;
};

const PromptCard = ({ prompt }: PromptCardProps) => {
  console.log(`inCard promptData: ${JSON.stringify(prompt)}`);
  return (
    <>
      <Card variant="outlined">
        <Typography variant="h3">{prompt.prompt}</Typography>
        {/** Display only the top x story? */}
        {prompt.stories ? prompt.stories.map((story) => <StoryCard story={story} />) : null}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="body1">Promptr: {prompt.creatorId}</Typography>
          <Typography variant="body1">Deadline: {prompt.deadline.toLocaleString()}</Typography>
          <Typography variant="body1">Story Length:{prompt.length}</Typography>
        </Box>
      </Card>
    </>
  );
};

export default PromptCard;
