"use client";

import { voteAction } from "@/app/actions";
import { formatDateReadable } from "@/utils/date-utils";
import { Story } from "@/utils/types";

export const StoryCard = ({
  id,
  story_title,
  story_description,
  word_count,
  author_id,
  created_at,
  author,
  votes,
}: Story) => {
  // Use the votes array if available, otherwise default to 0
  const upvotes = votes?.filter((v) => v.vote_type === "upvote").length || 0;
  const downvotes =
    votes?.filter((v) => v.vote_type === "downvote").length || 0;
  const totalVotes = upvotes + downvotes;
  const votePercentage =
    totalVotes > 0 ? Math.round((upvotes / totalVotes) * 100) : 0;

  const handleVote = async (voteType: "upvote" | "downvote") => {
    const formData = new FormData();
    formData.append("storyId", id);
    formData.append("voteType", voteType);
    await voteAction(formData);
  };

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-4 text-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">{story_title}</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-green-600 px-2 py-1 rounded text-xs">
            {word_count} words
          </span>
        </div>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-3">{story_description}</p>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <span>By: {author?.username || author_id}</span>
          <span className="text-xs text-gray-500">
            {formatDateReadable(created_at)}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleVote("upvote")}
              className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
            >
              <span>↑</span>
              <span>{upvotes}</span>
            </button>
            <button
              onClick={() => handleVote("downvote")}
              className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <span>↓</span>
              <span>{downvotes}</span>
            </button>
          </div>
          {totalVotes > 0 && (
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">
              {votePercentage}% positive
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
