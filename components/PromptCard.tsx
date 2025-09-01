"use client";

import Link from "next/link";

import { voteAction } from "@/app/actions";
import { formatDate, formatDateReadable } from "@/utils/date-utils";

import { Tables } from "../database.types";

// Use generated type for prompts with metadata and extend it with author info
type PromptWithMetadata = Tables<"prompts_with_metadata"> & {
  author?: Tables<"profiles">;
};

/*
 * Usage Example for Action Responses:
 *
 * The new action pattern returns either:
 * - Success: { data: "Success message" }
 * - Error: { error: "Error message", code: "ERROR_CODE" }
 * - Undefined: Redirect happened
 *
 * Example usage:
 * const result = await voteAction(formData);
 *
 * if (result?.error) {
 *   console.log(`Action failed: ${result.error} (Code: ${result.code})`);
 *   // Handle error in your UI
 * } else if (result?.data) {
 *   console.log(`Action succeeded: ${result.data}`);
 *   // Handle success in your UI
 * }
 * // If result is undefined, it means a redirect happened
 */

export const PromptCard = ({
  id,
  title,
  summary,
  author_id,
  deadline_date,
  length,
  story_count,
  upvotes,
  downvotes,
  created_at,
  author,
}: PromptWithMetadata) => {
  const totalVotes = (upvotes || 0) + (downvotes || 0);
  const votePercentage =
    totalVotes > 0 ? Math.round(((upvotes || 0) / totalVotes) * 100) : 0;

  const handleVote = async (voteType: "upvote" | "downvote") => {
    const formData = new FormData();
    formData.append("promptId", id);
    formData.append("voteType", voteType);

    try {
      const result = await voteAction(formData);

      if (result?.error) {
        console.log(`Vote failed: ${result.error} (Code: ${result.code})`);
        // You can add error handling here, like showing a toast notification
        // or updating the UI to reflect the error state
      } else if (result?.data) {
        console.log(`Vote succeeded: ${result.data}`);
        // You can add success handling here, like showing a success message
        // or updating the UI optimistically
      }
      // If result is undefined, it means a redirect happened
    } catch (error) {
      console.error("Unexpected error during vote:", error);
    }
  };

  return (
    <article className="flex flex-col justify-evenly bg-gray-900 shadow-md min-h-[450px] rounded-lg p-6 mb-4 text-white">
      <div className="flex flex-col justify-between items-start mb-4 gap-4">
        <Link href={`/prompts/${id}`} className="hover:underline">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </Link>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 px-2 py-1 rounded text-xs">
            {length} words
          </span>
          {deadline_date && (
            <span className="bg-orange-600 px-2 py-1 rounded text-xs">
              {formatDate(deadline_date)}
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-300 mb-4">{summary}</p>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <span>By: {author?.username || author_id}</span>
          <span>{story_count || 0} stories</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleVote("upvote")}
              aria-label={`Upvote this prompt (${upvotes || 0} upvotes)`}
              className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
            >
              <span aria-hidden="true">↑</span>
              <span>{upvotes || 0}</span>
            </button>
            <button
              onClick={() => handleVote("downvote")}
              aria-label={`Downvote this prompt (${downvotes || 0} downvotes)`}
              className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <span aria-hidden="true">↓</span>
              <span>{downvotes || 0}</span>
            </button>
          </div>
          {totalVotes > 0 && (
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">
              {votePercentage}% positive
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Created: {formatDateReadable(created_at)}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <Link
          href={`/prompts/${id}`}
          className="inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
        >
          View Stories ({story_count || 0})
        </Link>
      </div>
    </article>
  );
};
