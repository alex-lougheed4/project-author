import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Prompt } from './utils/types';
import PromptCard from './components/PromptCard';

const Homepage = () => {
  //const { isAuthenticated } = useAuth0();
  const [promptData, setPromptData] = useState<Prompt[]>();

  useEffect(() => {
    fetch('/api/prompts')
      .then((res) => res.json())
      .then((res) => setPromptData(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <p>{promptData ? JSON.stringify(promptData) : 'Loading...'}</p>
      {promptData ? (
        promptData.map((prompt: Prompt) => {
          console.log(prompt.id);
          <PromptCard {...prompt} />;
          {
            /** not rendering */
          }
        })
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Homepage;
