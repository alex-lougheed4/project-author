"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { createStoryAction } from "@/app/actions";

type CreateStoryModalProps = {
  promptId: string;
};

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  promptId,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    storyTitle: "",
    storyDescription: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("promptId", promptId);
    form.append("storyTitle", formData.storyTitle);
    form.append("storyDescription", formData.storyDescription);

    await createStoryAction(form);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
      >
        Write Your Story
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl text-white">Write Your Story</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-xl text-white mb-2"
              htmlFor="storyTitle"
            >
              Story Title
            </label>
            <input
              type="text"
              id="storyTitle"
              name="storyTitle"
              value={formData.storyTitle}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:border-violet-500 focus:outline-none"
              placeholder="Enter your story title"
            />
          </div>

          <div>
            <label
              className="block text-xl text-white mb-2"
              htmlFor="storyDescription"
            >
              Story Content
            </label>
            <textarea
              id="storyDescription"
              name="storyDescription"
              value={formData.storyDescription}
              onChange={handleChange}
              required
              rows={8}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:border-violet-500 focus:outline-none resize-vertical"
              placeholder="Write your story here..."
            />
            <p className="text-sm text-gray-400 mt-1">
              Word count:{" "}
              {
                formData.storyDescription
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length
              }
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Submit Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
