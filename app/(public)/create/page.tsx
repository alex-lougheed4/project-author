"use client";
import { CreatePromptModal } from "@/components/CreatePromptModal";
import { createPromptAction } from "@/app/actions";
import { useState } from "react";

export default function Create() {
  const [error, setError] = useState<string | null>(null);

  const handleCreatePrompt = async (formData: FormData) => {
    try {
      await createPromptAction(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create prompt");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Create a Writing Prompt
      </h1>

      <CreatePromptModal onSubmit={handleCreatePrompt} />

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md mt-4">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
}
