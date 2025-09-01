"use client";

import React, { useState } from "react";

import { createStoryAction } from "@/app/actions";
import { config } from "@/lib/config";

type CreateStoryModalProps = {
  promptId: string;
};

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  promptId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    storyTitle: "",
    storyDescription: "",
  });

  // Word count validation using config
  const currentWordCount = formData.storyDescription
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const isWordCountValid = currentWordCount <= config.content.maxStoryWordCount;
  const isFormValid =
    formData.storyTitle.trim() &&
    formData.storyDescription.trim() &&
    isWordCountValid;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    // Prevent submission if word count is invalid
    if (!isWordCountValid) {
      setMessage({
        type: "error",
        text: `Story is too long. Maximum allowed is ${config.content.maxStoryWordCount.toLocaleString()} words. Current: ${currentWordCount.toLocaleString()} words.`,
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const form = new FormData();
    form.append("promptId", promptId);
    form.append("storyTitle", formData.storyTitle);
    form.append("storyDescription", formData.storyDescription);

    try {
      const result = await createStoryAction(form);

      if (result?.error) {
        console.log(
          `Story creation failed: ${result.error} (Code: ${result.code})`
        );

        // Handle different error types with appropriate messages
        switch (result.code) {
          case "UNAUTHORIZED":
            setMessage({
              type: "error",
              text: "Please log in to write your story. You must be signed in to create content.",
            });
            break;
          case "RATE_LIMIT":
            setMessage({
              type: "error",
              text: result.error,
            });
            break;
          case "CONTENT_FILTER":
            setMessage({
              type: "error",
              text: result.error,
            });
            break;
          case "VALIDATION_ERROR":
            setMessage({
              type: "error",
              text: result.error,
            });
            break;
          case "DATABASE_ERROR":
            setMessage({
              type: "error",
              text: "Unable to save your story. Please try again later.",
            });
            break;
          default:
            setMessage({
              type: "error",
              text: result.error,
            });
        }
      } else if (result?.data) {
        console.log(`Story creation succeeded: ${result.data}`);
        setMessage({
          type: "success",
          text: "Story submitted successfully! Redirecting...",
        });

        // Reset form and close modal after a brief delay
        setTimeout(() => {
          setFormData({ storyTitle: "", storyDescription: "" });
          setIsOpen(false);
          setMessage(null);
        }, 2000);
      }
      // If result is undefined, it means a redirect happened
    } catch (error) {
      console.error("Unexpected error during story creation:", error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ storyTitle: "", storyDescription: "" });
    setMessage(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
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
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Login Reminder */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400 text-lg">ℹ️</span>
            <p className="text-blue-200 text-sm">
              <strong>Reminder:</strong> You must be logged in to write and
              submit stories. If you&apos;re not signed in, you&apos;ll be
              prompted to do so when you submit.
            </p>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
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
              disabled={isSubmitting}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:border-violet-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isSubmitting}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:border-violet-500 focus:outline-none resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Write your story here..."
            />
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-400">
                Word count: {currentWordCount.toLocaleString()}
              </p>
              {/* Word count warning */}
              {!isWordCountValid && (
                <p className="text-sm text-red-400 font-medium">
                  ⚠️ Exceeds {config.content.maxStoryWordCount.toLocaleString()}{" "}
                  word limit
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting && (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              )}
              <span>
                {isSubmitting
                  ? "Submitting..."
                  : !isFormValid
                    ? "Complete Required Fields"
                    : "Submit Story"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
