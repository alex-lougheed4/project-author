import Link from "next/link";

import { PromptCard } from "@/components/PromptCard";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Fetch prompts with metadata using the view we created
  const { data: prompts, error } = await supabase
    .from("prompts_with_metadata")
    .select(
      `
      *,
      author:profiles!prompts_author_id_fkey(username, full_name)
    `
    )
    .order("created_at", { ascending: false })
    .limit(10); // Show only the latest 10 prompts on home

  if (error) {
    console.error("Error fetching prompts:", error);
    return (
      <div className="text-center text-red-500 p-8">
        Error loading prompts. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Project Author</h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Discover creative writing prompts, share your stories, and connect
          with fellow writers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/create"
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg transition-colors font-medium text-lg"
          >
            Create a Prompt
          </Link>
          <Link
            href="/explore"
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors font-medium text-lg"
          >
            Explore All Prompts
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Latest Prompts</h2>
        {prompts && prompts.length > 0 ? (
          <div className="space-y-6">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 p-8">
            <p className="text-xl mb-2">No prompts yet</p>
            <p>Be the first to create a writing prompt!</p>
          </div>
        )}
      </div>

      {prompts && prompts.length > 0 && (
        <div className="text-center">
          <Link
            href="/explore"
            className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
          >
            View all prompts →
          </Link>
        </div>
      )}
    </div>
  );
}
