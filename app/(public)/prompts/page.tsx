import { PromptCard } from "@/components/PromptCard";
import { createClient } from "@/utils/supabase/server";
import { PromptWithMetadata } from "@/utils/types";

export default async function Page() {
  const supabase = await createClient();

  const { data: prompts, error } = await supabase
    .from("prompts_with_metadata")
    .select(
      `
      *,
      author:profiles!prompts_author_id_fkey(username, full_name)
    `
    )
    .order("created_at", { ascending: false });

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
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        All Writing Prompts
      </h1>

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
  );
}
