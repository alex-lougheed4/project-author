"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { createPromptAction } from "@/app/actions";

type CreatePromptModalProps = {
  onSubmit?: (formData: FormData) => void; // Keep for backward compatibility
};

export const CreatePromptModal: React.FC<CreatePromptModalProps> = ({
  onSubmit,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
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
    // Clear any existing messages when user starts typing
    if (message) setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Create FormData object
    const form = new FormData();
    form.append("title", formData.title);
    form.append("summary", formData.summary);
    form.append("deadlineDate", formData.deadlineDate);
    form.append("length", formData.length);

    try {
      // If onSubmit prop is provided, use it (for backward compatibility)
      if (onSubmit) {
        onSubmit(form);
        return;
      }

      // Otherwise, use the new action pattern
      const result = await createPromptAction(form);

      if (result?.error) {
        console.error(
          `Prompt creation failed: ${result.error} (Code: ${result.code})`
        );

        // Handle different error types with appropriate messages
        const getErrorMessage = (code: string, error: string) => {
          switch (code) {
            case "UNAUTHORIZED":
              return "Please log in to create a prompt. You must be signed in to create content.";
            case "DATABASE_ERROR":
              return "Unable to save your prompt. Please try again later.";
            default:
              return error;
          }
        };

        setMessage({
          type: "error",
          text: getErrorMessage(result.code || "", result.error),
        });
      } else if (result?.data) {
        console.log(`Prompt creation succeeded: ${result.data}`);
        setMessage({
          type: "success",
          text: "Prompt created successfully! Redirecting...",
        });

        // Reset form and redirect after a brief delay
        setTimeout(() => {
          setFormData({ title: "", summary: "", deadlineDate: "", length: "" });
          router.push("/");
        }, 2000);
      }
      // If result is undefined, it means a redirect happened
    } catch (error) {
      console.error("Unexpected error during prompt creation:", error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", summary: "", deadlineDate: "", length: "" });
    setMessage(null);
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    resetForm();
    router.back();
  };

  return (
    <div className="flex flex-col bg-slate-900 items-center justify-center gap-8 p-6 rounded-3xl max-w-2xl mx-auto">
      <h2 className="text-4xl text-white">Create New Prompt</h2>

      {/* Login Reminder */}
      <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 w-full">
        <div className="flex items-center space-x-2">
          <span className="text-blue-400 text-lg">ℹ️</span>
          <p className="text-blue-200 text-sm">
            <strong>Reminder:</strong> You must be logged in to create and
            submit prompts. If you&apos;re not signed in, you&apos;ll be
            prompted to do so when you submit.
          </p>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`w-full p-4 rounded-lg border ${
            message.type === "success"
              ? "bg-green-900/30 border-green-500/50 text-green-200"
              : "bg-red-900/30 border-red-500/50 text-red-200"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {message.type === "success" ? "✅" : "❌"}
            </span>
            <p>{message.text}</p>
          </div>
        </div>
      )}

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
            disabled={isSubmitting}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            )}
            <span>{isSubmitting ? "Creating..." : "Create Prompt"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
