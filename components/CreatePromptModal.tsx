"use client";
import { Prompt } from "@/utils/types";
import React, { useState } from "react";

type CreatePromptModalProps = {
  //isOpen: boolean;
  //onClose: () => void;
  onSubmit: (data: Omit<Prompt, "id" | "authorId" | "stories">) => void;
};

export const CreatePromptModal: React.FC<CreatePromptModalProps> = ({
  //isOpen,
  //onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    promptTitle: "",
    promptSummary: "",
    deadline: "",
    length: "",
    writerCreds: 0,
    createdAt: new Date().toISOString(), // Add createdAt field
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "writerCreds" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    //onClose();
  };

  return (
    <div className="bg-slate-900 w-96 items-center justify-center p-4 rounded-3xl">
      <h2>Create New Prompt</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="promptTitle">Prompt Title</label>
          <input
            type="text"
            id="promptTitle"
            name="promptTitle"
            value={formData.promptTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="promptSummary">Prompt Summary</label>
          <textarea
            id="promptSummary"
            name="promptSummary"
            value={formData.promptSummary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="length">Length</label>
          <input
            type="text"
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-row form-actions gap-10">
          <button type="button" onClick={() => console.log("Cancel")}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
