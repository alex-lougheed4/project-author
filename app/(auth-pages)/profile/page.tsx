import { redirect } from "next/navigation";

import { PromptCard } from "@/components/PromptCard";
import { StoryCard } from "@/components/StoryCard";
import { formatDateReadable } from "@/utils/date-utils";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch user's profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    redirect("/sign-in");
  }

  // Fetch user's prompts
  const { data: prompts, error: promptsError } = await supabase
    .from("prompts_with_metadata")
    .select(
      `
      *,
      author:profiles!prompts_author_id_fkey(username, full_name)
    `
    )
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch user's stories
  const { data: stories, error: storiesError } = await supabase
    .from("stories")
    .select(
      `
      *,
      prompt:prompts(title),
      votes(*)
    `
    )
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Profile</h1>
        <div className="text-white">
          <p className="text-xl mb-2">
            <span className="text-gray-400">Username:</span> {profile.username}
          </p>
          {profile.full_name && (
            <p className="text-lg mb-2">
              <span className="text-gray-400">Full Name:</span>{" "}
              {profile.full_name}
            </p>
          )}
          {profile.bio && (
            <p className="text-lg mb-2">
              <span className="text-gray-400">Bio:</span> {profile.bio}
            </p>
          )}
          <p className="text-sm text-gray-400">
            Member since {formatDateReadable(profile.created_at)}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Your Prompts ({prompts?.length || 0})
        </h2>
        {prompts && prompts.length > 0 ? (
          <div className="space-y-6">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 p-6 bg-gray-900 rounded-lg">
            <p className="text-lg mb-2">No prompts created yet</p>
            <p>Start by creating your first writing prompt!</p>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Your Stories ({stories?.length || 0})
        </h2>
        {stories && stories.length > 0 ? (
          <div className="space-y-6">
            {stories.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 p-6 bg-gray-900 rounded-lg">
            <div className="text-lg mb-2">No stories written yet</div>
            <p>Explore prompts and write your first story!</p>
          </div>
        )}
      </div>
    </div>
  );
}
