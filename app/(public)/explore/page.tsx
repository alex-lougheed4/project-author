import { PromptCard } from "@/components/PromptCard";
import { createClient } from "@/utils/supabase/server";

export default async function Explore() {
  const supabase = await createClient();

  // Fetch all prompts with metadata
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

    // Handle JWT errors specifically
    if (error.message.includes("JWS") || error.code === "PGRST301") {
      return (
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center text-yellow-500 p-8">
            <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
            <p className="mb-4">
              There was an issue with your authentication. This usually happens
              when:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Your session has expired</li>
              <li>• You&apos;re using the wrong environment variables</li>
              <li>• The Supabase instance is not running</li>
            </ul>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Current Environment:</strong>{" "}
                {process.env.NEXT_PUBLIC_ENVIRONMENT || "unknown"}
              </p>
              <p className="text-sm">
                <strong>Supabase URL:</strong>{" "}
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Not Set"}
              </p>
            </div>
            <div className="mt-6">
              <a
                href="/sign-in"
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Sign In Again
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center text-red-500 p-8">
        Error loading prompts. Please try again later.
        <br />
        <small className="text-gray-500">Error: {error.message}</small>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Explore Writing Prompts
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">
          Discover creative writing prompts and get inspired to write your next
          story. Click on any prompt to read existing stories or write your own.
        </p>
      </div>

      {prompts && prompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="h-full">
              <PromptCard {...prompt} />
            </div>
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
