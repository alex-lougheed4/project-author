import { Box, Card, Typography } from '@mui/material';
import { Prompt } from '../utils/types';
import StoryCard from './StoryCard';

export type PromptCardProps = {
  prompt: Prompt;
};

//const PromptCard = ({ prompt }: PromptCardProps) => {
const PromptCard = ({ prompt }: PromptCardProps) => {
  const { promptTitle, stories, creatorId, deadline, length } = prompt; 

  const handleClick = () => {
    
  };

  console.log(`inCard promptData: ${JSON.stringify(prompt)}`);
  return (
    <>
      <Card onClick={handleClick} variant="outlined">
        <Typography variant="h3">{promptTitle}</Typography>
        {/** Display only the top x story? */}
        {stories ? stories.map((story) => <StoryCard story={story} />) : null}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="body1">Promptr: {creatorId}</Typography>
          <Typography variant="body1">Deadline: {deadline}</Typography>
          <Typography variant="body1">Story Length:{length}</Typography>
        </Box>
      </Card>
    </>
  );
};

export default PromptCard;
