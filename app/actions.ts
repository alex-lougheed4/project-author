"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { config } from "@/lib/config";
import { createClient } from "@/utils/supabase/server";

import { TablesInsert } from "../database.types";

// Type aliases for better readability
type PromptInsert = TablesInsert<"prompts">;
type StoryInsert = TablesInsert<"stories">;
type VoteInsert = TablesInsert<"votes">;

// Define error response type
type ActionResponse =
  | { data: unknown; error?: never }
  | { error: string; code?: string; data?: never };

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Export function to clear rate limit map for testing
export const clearRateLimitMap = async () => {
  rateLimitMap.clear();
};

const checkRateLimit = (
  userId: string,
  action: string,
  maxAttempts: number,
  windowMs: number
): boolean => {
  const key = `${userId}:${action}`;
  const now = Date.now();
  const userLimit = rateLimitMap.get(key);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= maxAttempts) {
    return false;
  }

  userLimit.count++;
  return true;
};

export const createPromptAction = async (
  formData: FormData
): Promise<ActionResponse | void> => {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return {
      error: "You must be signed in to create a prompt",
      code: "UNAUTHORIZED",
    };
  }

  // Rate limiting: max prompts per hour from config
  if (
    !checkRateLimit(
      user.id,
      "createPrompt",
      config.rateLimit.maxPromptsPerHour,
      60 * 60 * 1000
    )
  ) {
    return {
      error:
        "Too many prompt submissions. Please wait before creating another prompt.",
      code: "RATE_LIMIT",
    };
  }

  const title = formData.get("title")?.toString();
  const summary = formData.get("summary")?.toString();
  const length = parseInt(formData.get("length")?.toString() || "0");
  const deadlineDate = formData.get("deadlineDate")?.toString();

  if (!title || !summary || !length) {
    return {
      error: "Title, summary, and length are required",
      code: "VALIDATION_ERROR",
    };
  }

  if (length <= 0) {
    return {
      error: "Length must be greater than 0",
      code: "VALIDATION_ERROR",
    };
  }

  // Server-side validation using config
  if (title.length > config.content.maxPromptTitleLength) {
    return {
      error: `Title too long. Maximum allowed is ${config.content.maxPromptTitleLength} characters. Current: ${title.length} characters.`,
      code: "VALIDATION_ERROR",
    };
  }

  if (summary.length > config.content.maxPromptSummaryLength) {
    return {
      error: `Summary too long. Maximum allowed is ${config.content.maxPromptSummaryLength} characters. Current: ${summary.length} characters.`,
      code: "VALIDATION_ERROR",
    };
  }

  // Basic content filtering using config
  if (config.contentFilter.enableContentFilter) {
    const hasBannedContent = config.contentFilter.bannedWords.some((word) =>
      (title.toLowerCase() + " " + summary.toLowerCase()).includes(word)
    );

    if (hasBannedContent) {
      return {
        error:
          "Content contains inappropriate language. Please review and try again.",
        code: "CONTENT_FILTER",
      };
    }
  }

  const promptData: PromptInsert = {
    title,
    summary,
    author_id: user.id,
    length,
    deadline_date: deadlineDate || null,
  };

  const { error } = await supabase.from("prompts").insert(promptData);

  if (error) {
    console.error("Error creating prompt:", error);
    return {
      error: "Failed to create prompt",
      code: "DATABASE_ERROR",
    };
  }

  return redirect("/");
};

export const createStoryAction = async (
  formData: FormData
): Promise<ActionResponse | void> => {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return {
      error: "You must be signed in to create a story",
      code: "UNAUTHORIZED",
    };
  }

  // Rate limiting: max stories per hour from config
  if (
    !checkRateLimit(
      user.id,
      "createStory",
      config.rateLimit.maxStoriesPerHour,
      60 * 60 * 1000
    )
  ) {
    return {
      error:
        "Too many story submissions. Please wait before creating another story.",
      code: "RATE_LIMIT",
    };
  }

  const promptId = formData.get("promptId")?.toString();
  const storyTitle = formData.get("storyTitle")?.toString();
  const storyDescription = formData.get("storyDescription")?.toString();

  if (!promptId || !storyTitle || !storyDescription) {
    return {
      error: "All fields are required",
      code: "VALIDATION_ERROR",
    };
  }

  // Server-side word count validation using config
  const wordCount = storyDescription
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  if (wordCount > config.content.maxStoryWordCount) {
    return {
      error: `Story exceeds maximum word limit of ${config.content.maxStoryWordCount.toLocaleString()} words. Current: ${wordCount.toLocaleString()} words.`,
      code: "VALIDATION_ERROR",
    };
  }

  // Content length validation using config
  if (storyDescription.length > config.content.maxStoryContentLength) {
    return {
      error: `Story content too long. Maximum allowed is ${config.content.maxStoryContentLength.toLocaleString()} characters. Current: ${storyDescription.length.toLocaleString()} characters.`,
      code: "VALIDATION_ERROR",
    };
  }

  // Basic content filtering using config
  if (config.contentFilter.enableContentFilter) {
    const hasBannedContent = config.contentFilter.bannedWords.some((word) =>
      storyDescription.toLowerCase().includes(word)
    );

    if (hasBannedContent) {
      return {
        error:
          "Story content contains inappropriate language. Please review and try again.",
        code: "CONTENT_FILTER",
      };
    }
  }

  // Calculate word count
  const calculatedWordCount = wordCount;

  const storyData: StoryInsert = {
    story_title: storyTitle,
    prompt_id: promptId,
    author_id: user.id,
    story_description: storyDescription,
    word_count: calculatedWordCount,
  };

  const { error } = await supabase.from("stories").insert(storyData);

  if (error) {
    console.error("Error creating story:", error);
    return {
      error: "Failed to create story",
      code: "DATABASE_ERROR",
    };
  }

  return redirect(`/prompts/${promptId}`);
};

export const voteAction = async (
  formData: FormData
): Promise<ActionResponse | void> => {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "You must be signed in to vote",
      code: "UNAUTHORIZED",
    };
  }

  const promptId = formData.get("promptId")?.toString();
  const storyId = formData.get("storyId")?.toString();
  const voteType = formData.get("voteType")?.toString();

  if (!voteType || (!promptId && !storyId)) {
    return {
      error: "Invalid vote data",
      code: "VALIDATION_ERROR",
    };
  }

  // Validate vote type
  if (voteType !== "upvote" && voteType !== "downvote") {
    return {
      error: "Invalid vote data",
      code: "VALIDATION_ERROR",
    };
  }

  // Check if user already voted
  const { data: existingVote } = await supabase
    .from("votes")
    .select()
    .eq("user_id", user.id)
    .eq(promptId ? "prompt_id" : "story_id", promptId || storyId || "")
    .single();

  if (existingVote) {
    // Update existing vote
    const { error } = await supabase
      .from("votes")
      .update({ vote_type: voteType })
      .eq("id", existingVote.id);

    if (error) {
      console.error("Error updating vote:", error);
      return {
        error: "Failed to update vote",
        code: "DATABASE_ERROR",
      };
    }
  } else {
    // Create new vote
    const voteData: VoteInsert = {
      user_id: user.id,
      prompt_id: promptId || null,
      story_id: storyId || null,
      vote_type: voteType,
    };

    const { error } = await supabase.from("votes").insert(voteData);

    if (error) {
      console.error("Error creating vote:", error);
      return {
        error: "Failed to create vote",
        code: "DATABASE_ERROR",
      };
    }
  }

  // Redirect back to the same page
  return redirect(promptId ? `/prompts/${promptId}` : "/");
};

export const signUpAction = async (
  formData: FormData
): Promise<ActionResponse | void> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();
  const fullName = formData.get("fullName")?.toString();

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !username) {
    return {
      error: "Email, password, and username are required",
      code: "VALIDATION_ERROR",
    };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        username,
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return {
      error: error.message,
      code: error.code || "AUTH_ERROR",
    };
  } else {
    return {
      data: "Thanks for signing up! Please check your email for a verification link.",
    };
  }
};

export const signInAction = async (
  formData: FormData
): Promise<ActionResponse | void> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
      code: error.code || "AUTH_ERROR",
    };
  }

  return redirect("/");
};

export const forgotPasswordAction = async (
  formData: FormData
): Promise<ActionResponse | void> => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return {
      error: "Email is required",
      code: "VALIDATION_ERROR",
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return {
      error: "Could not reset password",
      code: "AUTH_ERROR",
    };
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return {
    data: "Check your email for a link to reset your password.",
  };
};

export const resetPasswordAction = async (
  formData: FormData
): Promise<ActionResponse | void> => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return {
      error: "Password and confirm password are required",
      code: "VALIDATION_ERROR",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
      code: "VALIDATION_ERROR",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      error: "Password update failed",
      code: "AUTH_ERROR",
    };
  }

  return {
    data: "Password updated successfully",
  };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
