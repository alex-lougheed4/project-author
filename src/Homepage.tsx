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
      {promptData ? ( //only show one prompt and swipe to another or click arrow to the right
        promptData.map((prompt: Prompt) => {
          return <PromptCard key={prompt.id} prompt={prompt} />;
        })
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Homepage;
