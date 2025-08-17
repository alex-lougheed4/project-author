"use client";
import { createClient } from "@/utils/supabase/client";
import { Prompt } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type CreatePromptModalProps = {
  onSubmit: (data: Omit<Prompt, "id" | "authorId" | "stories">) => void;
};

export const CreatePromptModal: React.FC<CreatePromptModalProps> = ({
  onSubmit,
}) => {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    promptTitle: "",
    promptSummary: "",
    deadline: "",
    length: "",
    writerCreds: 0,
    createdAt: new Date().toISOString(), // Add createdAt field
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "writerCreds" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Get the current user's session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (!session?.user?.id) {
        throw new Error("User must be logged in to create a prompt");
      }

      // Insert the prompt into Supabase
      const { data, error } = await supabase
        .from("prompts")
        .insert([
          {
            created_at: formData.createdAt,
            prompt_title: formData.promptTitle,
            prompt_summary: formData.promptSummary,
            author_id: session.user.id,
            deadline: formData.deadline,
            length: formData.length,
            writer_cred: formData.writerCreds,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Call the onSubmit prop with the created prompt
      onSubmit(formData);
    } catch (error) {
      console.error("Error creating prompt:", error);
      if (error && typeof error === "object" && "code" in error) {
        const dbError = error as {
          code: string;
          message: string;
          details: string;
        };
        console.error("Supabase error code:", dbError.code);
        console.error("Supabase error message:", dbError.message);
        console.error("Supabase error details:", dbError.details);
      }
      alert("Failed to create prompt. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-slate-900 items-center justify-center gap-8 p-4 rounded-3xl">
      <h2 className="text-4xl">Create New Prompt</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <label className="text-2xl" htmlFor="promptTitle">
            Prompt Title
          </label>
          <input
            type="text"
            id="promptTitle"
            name="promptTitle"
            value={formData.promptTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-row justify-between">
          <label className="text-2xl" htmlFor="promptSummary">
            Prompt Summary
          </label>
          <textarea
            id="promptSummary"
            name="promptSummary"
            value={formData.promptSummary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-row justify-between">
          <label className="text-2xl" htmlFor="deadline">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-row justify-between">
          <label className="text-2xl" htmlFor="length">
            Length
          </label>
          <select
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            required
            className="p-1 rounded text-white"
          >
            <option value="">Select length</option>
            <option value="short">Short (500-1000 words)</option>
            <option value="medium">Medium (1000-2500 words)</option>
            <option value="long">Long (2500+ words)</option>
          </select>
        </div>

        <div className="flex flex-row items-center justify-center form-actions gap-10">
          <button
            className="bg-violet-900 p-2 rounded-2xl"
            type="button"
            onClick={() => console.log("Cancel")}
          >
            Cancel
          </button>
          <button className="bg-violet-900 p-2 rounded-2xl" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
