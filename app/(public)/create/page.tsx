"use client";
import { CreatePromptModal } from "@/components/CreatePromptModal";
import { createClient } from "@/utils/supabase/client"; // Make sure this is the client version
import { useState } from "react";

export default function Create() {
  const [error, setError] = useState<string | null>(null);

  const handleCreatePrompt = async (formData: any) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("prompts").insert({
      created_at: new Date().toISOString(),
      prompt_title: formData.promptTitle,
      prompt_summary: formData.promptSummary,
      author_id: user?.id ?? null,
      deadline: formData.deadline,
      length: formData.length,
      writer_cred: formData.writerCreds,
    });

    if (error) setError(error.message);
    else setError(null);

    //add a trigger when a new prompt is created to add the prompt to the user's prompts
  };

  return (
    <>
      <CreatePromptModal onSubmit={handleCreatePrompt} />
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md">
          <p>Error: {error}</p>
        </div>
      )}
    </>
  );
}
