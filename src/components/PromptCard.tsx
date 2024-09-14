import { Card, Typography } from '@mui/material';
import { Prompt } from '../utils/types';

const PromptCard = (prompt: Prompt) => {
  console.log(prompt.promptTitle);
  return (
    <>
      <Card>
        <p>{prompt.promptTitle}</p>
        <Typography variant="h1">{prompt.promptTitle}</Typography>
      </Card>
    </>
  );
};

export default PromptCard;
