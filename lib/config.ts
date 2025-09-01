// Environment configuration for Supabase
// This file automatically detects the environment and uses appropriate settings

export const config = {
  // Content limits
  content: {
    maxStoryWordCount: parseInt(process.env.MAX_STORY_WORD_COUNT || "10000"),
    maxStoryContentLength: parseInt(
      process.env.MAX_STORY_CONTENT_LENGTH || "100000"
    ),
    maxStoryTitleLength: parseInt(process.env.MAX_STORY_TITLE_LENGTH || "200"),
    maxPromptTitleLength: parseInt(
      process.env.MAX_PROMPT_TITLE_LENGTH || "200"
    ),
    maxPromptSummaryLength: parseInt(
      process.env.MAX_PROMPT_SUMMARY_LENGTH || "2000"
    ),
  },

  // Rate limiting
  rateLimit: {
    maxPromptsPerHour: parseInt(process.env.MAX_PROMPTS_PER_HOUR || "5"),
    maxStoriesPerHour: parseInt(process.env.MAX_STORIES_PER_HOUR || "3"),
    maxVotesPerHour: parseInt(process.env.MAX_VOTES_PER_HOUR || "50"),
  },

  // Content filtering
  contentFilter: {
    bannedWords: (
      process.env.BANNED_WORDS || "spam,inappropriate,offensive"
    ).split(","),
    enableContentFilter: process.env.ENABLE_CONTENT_FILTER !== "false",
  },

  // Feature flags
  features: {
    enableStoryCreation: process.env.ENABLE_STORY_CREATION !== "false",
    enablePromptCreation: process.env.ENABLE_PROMPT_CREATION !== "false",
    enableVoting: process.env.ENABLE_VOTING !== "false",
  },

  // Security
  security: {
    requireEmailVerification:
      process.env.REQUIRE_EMAIL_VERIFICATION !== "false",
    sessionTimeoutMs: parseInt(process.env.SESSION_TIMEOUT_MS || "3600000"), // 1 hour
  },
} as const;

export default config;
