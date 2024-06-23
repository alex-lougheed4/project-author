"use client";

import { usePrompts } from "@/app/firebase/usePrompts";
import { useUser } from "reactfire";

const Page = () => {
  const { data: user } = useUser();
  const { GetPromptsByUid } = usePrompts();

  console.log(`inPromptsPage: ${user?.uid}`);
  const prompts = GetPromptsByUid(user?.uid!);
  console.log(`prompts: ${prompts}`);
  return (
    <>
      <div>Your Prompts</div>
      <div>{JSON.stringify(prompts)}</div>
    </>
  );
};

export default Page;
