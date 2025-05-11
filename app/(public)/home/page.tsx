import { PromptCard } from "@/components/PromptCard";
import { createClient } from "@/utils/supabase/server";

// Import Swiper React components

// Import Swiper styles
import "swiper/css";

export default async function Home() {
  const supabase = await createClient();

  const { data: promptData, error } = await supabase.from("prompts").select();
  console.log("Prompt Data", JSON.stringify(promptData));
  return (
    <>
      {promptData?.map((prompt) => (
        <PromptCard
          key={prompt.id}
          id={prompt.id}
          createdAt={prompt.created_at}
          promptTitle={prompt.prompt_title}
          promptSummary={prompt.prompt_summary}
          authorId={prompt.author_id}
          deadline={prompt.deadline}
          length={prompt.length}
          writerCreds={prompt.writer_cred}
          stories={[]}
        />
      ))}
      <PromptCard
        id="1"
        createdAt={new Date().toISOString()}
        promptTitle="Sample Prompt"
        promptSummary="This is a sample prompt summary."
        authorId="Author Name"
        deadline="
          2023-10-01T00:00:00Z"
        length="Short"
        writerCreds={10}
        stories={[]}
      />
    </>
  );
}
