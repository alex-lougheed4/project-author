import { notFound } from "next/navigation";

import { CreateStoryModal } from "@/components/CreateStoryModal";
import { PromptCard } from "@/components/PromptCard";
import { StoryCard } from "@/components/StoryCard";
import { createClient } from "@/utils/supabase/server";
import { PromptWithMetadata, Story } from "@/utils/types";

export default async function PromptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch the prompt with metadata
  const { data: prompt, error: promptError } = await supabase
    .from("prompts_with_metadata")
    .select(
      `
      *,
      author:profiles!prompts_author_id_fkey(username, full_name)
    `
    )
    .eq("id", id)
    .single();

  if (promptError || !prompt) {
    notFound();
  }

  // Fetch stories for this prompt
  const { data: stories, error: storiesError } = await supabase
    .from("stories")
    .select(
      `
      *,
      author:profiles!stories_author_id_fkey(username, full_name),
      votes(*)
    `
    )
    .eq("prompt_id", id)
    .order("created_at", { ascending: false });

  if (storiesError) {
    console.error("Error fetching stories:", storiesError);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <PromptCard {...prompt} />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Stories ({stories?.length || 0})
        </h2>
        <CreateStoryModal promptId={id} />
      </div>

      {stories && stories.length > 0 ? (
        <div className="space-y-6">
          {stories.map((story) => (
            <StoryCard key={story.id} {...story} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 p-8">
          <p className="text-xl mb-2">No stories yet</p>
          <p>Be the first to write a story for this prompt!</p>
        </div>
      )}
    </div>
  );
}
