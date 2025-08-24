"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const createPromptAction = async (formData: FormData) => {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return encodedRedirect(
      "error",
      "/create",
      "You must be signed in to create a prompt"
    );
  }

  const title = formData.get("title")?.toString();
  const summary = formData.get("summary")?.toString();
  const length = parseInt(formData.get("length")?.toString() || "0");
  const deadlineDate = formData.get("deadlineDate")?.toString();

  if (!title || !summary || !length) {
    return encodedRedirect(
      "error",
      "/create",
      "Title, summary, and length are required"
    );
  }

  if (length <= 0) {
    return encodedRedirect("error", "/create", "Length must be greater than 0");
  }

  const { error } = await supabase.from("prompts").insert({
    title,
    summary,
    author_id: user.id,
    length,
    deadline_date: deadlineDate || null,
  });

  if (error) {
    console.error("Error creating prompt:", error);
    return encodedRedirect("error", "/create", "Failed to create prompt");
  }

  return redirect("/");
};

export const createStoryAction = async (formData: FormData) => {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return encodedRedirect(
      "error",
      "/prompts/[id]",
      "You must be signed in to create a story"
    );
  }

  const promptId = formData.get("promptId")?.toString();
  const storyTitle = formData.get("storyTitle")?.toString();
  const storyDescription = formData.get("storyDescription")?.toString();

  if (!promptId || !storyTitle || !storyDescription) {
    return encodedRedirect("error", "/prompts/[id]", "All fields are required");
  }

  // Calculate word count
  const wordCount = storyDescription.trim().split(/\s+/).length;

  const { error } = await supabase.from("stories").insert({
    story_title: storyTitle,
    prompt_id: promptId,
    author_id: user.id,
    story_description: storyDescription,
    word_count: wordCount,
  });

  if (error) {
    console.error("Error creating story:", error);
    return encodedRedirect("error", "/prompts/[id]", "Failed to create story");
  }

  return redirect(`/prompts/${promptId}`);
};

export const voteAction = async (formData: FormData) => {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return encodedRedirect("error", "/", "You must be signed in to vote");
  }

  const promptId = formData.get("promptId")?.toString();
  const storyId = formData.get("storyId")?.toString();
  const voteType = formData.get("voteType")?.toString() as
    | "upvote"
    | "downvote";

  if (!voteType || (!promptId && !storyId)) {
    return encodedRedirect("error", "/", "Invalid vote data");
  }

  // Check if user already voted
  const { data: existingVote } = await supabase
    .from("votes")
    .select()
    .eq("user_id", user.id)
    .eq(promptId ? "prompt_id" : "story_id", promptId || storyId)
    .single();

  if (existingVote) {
    // Update existing vote
    const { error } = await supabase
      .from("votes")
      .update({ vote_type: voteType })
      .eq("id", existingVote.id);

    if (error) {
      console.error("Error updating vote:", error);
      return encodedRedirect("error", "/", "Failed to update vote");
    }
  } else {
    // Create new vote
    const { error } = await supabase.from("votes").insert({
      user_id: user.id,
      prompt_id: promptId || null,
      story_id: storyId || null,
      vote_type: voteType,
    });

    if (error) {
      console.error("Error creating vote:", error);
      return encodedRedirect("error", "/", "Failed to create vote");
    }
  }

  // Redirect back to the same page
  return redirect(promptId ? `/prompts/${promptId}` : "/");
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();
  const fullName = formData.get("fullName")?.toString();

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !username) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email, password, and username are required"
    );
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
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
