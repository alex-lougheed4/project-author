"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type CreatePromptModalProps = {
  onSubmit: (formData: FormData) => void;
};

export const CreatePromptModal: React.FC<CreatePromptModalProps> = ({
  onSubmit,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    deadlineDate: "",
    length: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object
    const form = new FormData();
    form.append("title", formData.title);
    form.append("summary", formData.summary);
    form.append("deadlineDate", formData.deadlineDate);
    form.append("length", formData.length);

    // Call the onSubmit prop with FormData
    onSubmit(form);
  };

  return (
    <div className="flex flex-col bg-slate-900 items-center justify-center gap-8 p-6 rounded-3xl max-w-2xl mx-auto">
      <h2 className="text-4xl text-white">Create New Prompt</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-xl text-white" htmlFor="title">
            Prompt Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl text-white" htmlFor="summary">
            Prompt Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows={4}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl text-white" htmlFor="deadlineDate">
            Deadline (Optional)
          </label>
          <input
            type="date"
            id="deadlineDate"
            name="deadlineDate"
            value={formData.deadlineDate}
            onChange={handleChange}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl text-white" htmlFor="length">
            Target Word Count
          </label>
          <select
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            required
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="">Select word count</option>
            <option value="500">500 words</option>
            <option value="1000">1,000 words</option>
            <option value="1500">1,500 words</option>
            <option value="2000">2,000 words</option>
            <option value="2500">2,500 words</option>
            <option value="3000">3,000 words</option>
            <option value="5000">5,000 words</option>
          </select>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg transition-colors"
            type="submit"
          >
            Create Prompt
          </button>
        </div>
      </form>
    </div>
  );
};
