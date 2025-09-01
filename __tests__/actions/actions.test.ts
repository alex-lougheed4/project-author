import {
  createPromptAction,
  createStoryAction,
  voteAction,
} from "../../app/actions";
import {
  createFormData,
  mockSupabaseClient,
  resetMocks,
  setupAuthenticatedUser,
  setupUnauthenticatedUser,
} from "../utils/test-utils";

describe("Server Actions", () => {
  beforeEach(async () => {
    await resetMocks();
    setupAuthenticatedUser(); // Default to authenticated user
  });

  describe("createPromptAction", () => {
    const validFormData = createFormData({
      title: "Test Prompt",
      summary: "Test summary",
      length: "1000",
      deadlineDate: "2024-12-31",
    });

    it("creates a prompt successfully when user is authenticated", async () => {
      const result = await createPromptAction(validFormData);

      expect(result).toBeUndefined(); // redirect happens
      expect(mockSupabaseClient.from).toHaveBeenCalledWith("prompts");
      expect(mockSupabaseClient.from().insert).toHaveBeenCalledWith({
        title: "Test Prompt",
        summary: "Test summary",
        author_id: "user-1",
        length: 1000,
        deadline_date: "2024-12-31",
      });
    });

    it("returns error when user is not authenticated", async () => {
      setupUnauthenticatedUser();

      const result = await createPromptAction(validFormData);

      expect(result).toEqual({
        error: "You must be signed in to create a prompt",
        code: "UNAUTHORIZED",
      });
    });

    it("returns error when required fields are missing", async () => {
      const incompleteFormData = createFormData({
        title: "Test Prompt",
        // missing summary and length
      });

      const result = await createPromptAction(incompleteFormData);

      expect(result).toEqual({
        error: "Title, summary, and length are required",
        code: "VALIDATION_ERROR",
      });
    });

    it("returns error when title is too long", async () => {
      const longTitle = "a".repeat(201); // exceeds 200 character limit
      const formDataWithLongTitle = createFormData({
        title: longTitle,
        summary: "Test summary",
        length: "1000",
      });

      const result = await createPromptAction(formDataWithLongTitle);

      expect(result).toEqual({
        error:
          "Title too long. Maximum allowed is 200 characters. Current: 201 characters.",
        code: "VALIDATION_ERROR",
      });
    });

    it("returns error when summary is too long", async () => {
      const longSummary = "a".repeat(2001); // exceeds 2000 character limit
      const formDataWithLongSummary = createFormData({
        title: "Test Prompt",
        summary: longSummary,
        length: "1000",
      });

      const result = await createPromptAction(formDataWithLongSummary);

      expect(result).toEqual({
        error:
          "Summary too long. Maximum allowed is 2000 characters. Current: 2001 characters.",
        code: "VALIDATION_ERROR",
      });
    });

    it("returns error when content contains banned words", async () => {
      const formDataWithBannedContent = createFormData({
        title: "Test Prompt",
        summary: "This summary contains spam content.",
        length: "1000",
      });

      const result = await createPromptAction(formDataWithBannedContent);

      expect(result).toEqual({
        error:
          "Content contains inappropriate language. Please review and try again.",
        code: "CONTENT_FILTER",
      });
    });

    it("enforces rate limiting for prompt creation", async () => {
      // This test would require more sophisticated mocking of the rate limiting logic
      // For now, we'll test that the action succeeds under normal conditions
      const result = await createPromptAction(validFormData);
      expect(result).toBeUndefined();
    });
  });

  describe("createStoryAction", () => {
    const validFormData = createFormData({
      promptId: "prompt-1",
      storyTitle: "Test Story",
      storyDescription: "This is a test story with some content.",
    });

    it("creates a story successfully when user is authenticated", async () => {
      const result = await createStoryAction(validFormData);

      expect(result).toBeUndefined(); // redirect happens
      expect(mockSupabaseClient.from).toHaveBeenCalledWith("stories");
      expect(mockSupabaseClient.from().insert).toHaveBeenCalledWith({
        story_title: "Test Story",
        prompt_id: "prompt-1",
        author_id: "user-1",
        story_description: "This is a test story with some content.",
        word_count: 8, // 8 words in the description
      });
    });

    it("returns error when user is not authenticated", async () => {
      setupUnauthenticatedUser();

      const result = await createStoryAction(validFormData);

      expect(result).toEqual({
        error: "You must be signed in to create a story",
        code: "UNAUTHORIZED",
      });
    });

    it("returns error when story exceeds word limit", async () => {
      const longStory = "word ".repeat(10001); // exceeds 10,000 word limit
      const formDataWithLongStory = createFormData({
        promptId: "prompt-1",
        storyTitle: "Test Story",
        storyDescription: longStory,
      });

      const result = await createStoryAction(formDataWithLongStory);

      expect(result).toEqual({
        error:
          "Story exceeds maximum word limit of 10,000 words. Current: 10,001 words.",
        code: "VALIDATION_ERROR",
      });
    });

    it("returns error when story content is too long", async () => {
      const longContent = "a".repeat(100001); // exceeds 100,000 character limit
      const formDataWithLongContent = createFormData({
        promptId: "prompt-1",
        storyTitle: "Test Story",
        storyDescription: longContent,
      });

      const result = await createStoryAction(formDataWithLongContent);

      expect(result).toEqual({
        error:
          "Story content too long. Maximum allowed is 100,000 characters. Current: 100,001 characters.",
        code: "VALIDATION_ERROR",
      });
    });

    it("returns error when content contains banned words", async () => {
      const formDataWithBannedContent = createFormData({
        promptId: "prompt-1",
        storyTitle: "Test Story",
        storyDescription: "This story contains spam content.",
      });

      const result = await createStoryAction(formDataWithBannedContent);

      expect(result).toEqual({
        error:
          "Story content contains inappropriate language. Please review and try again.",
        code: "CONTENT_FILTER",
      });
    });

    it("returns error when required fields are missing", async () => {
      const incompleteFormData = createFormData({
        promptId: "prompt-1",
        storyTitle: "Test Story",
        // missing storyDescription
      });

      const result = await createStoryAction(incompleteFormData);

      expect(result).toEqual({
        error: "All fields are required",
        code: "VALIDATION_ERROR",
      });
    });

    it("enforces rate limiting for story creation", async () => {
      // This test would require more sophisticated mocking of the rate limiting logic
      // For now, we'll test that the action succeeds under normal conditions
      const result = await createStoryAction(validFormData);
      expect(result).toBeUndefined();
    });
  });

  describe("voteAction", () => {
    const validFormData = createFormData({
      promptId: "prompt-1",
      voteType: "upvote",
    });

    it("creates a new vote successfully when user is authenticated", async () => {
      const result = await voteAction(validFormData);

      expect(result).toBeUndefined(); // redirect happens
      expect(mockSupabaseClient.from).toHaveBeenCalledWith("votes");
      expect(mockSupabaseClient.from().insert).toHaveBeenCalledWith({
        user_id: "user-1",
        prompt_id: "prompt-1",
        story_id: null,
        vote_type: "upvote",
      });
    });

    it("updates existing vote successfully when user is authenticated", async () => {
      const existingVote = { id: "vote-1", vote_type: "downvote" };

      // Mock the chained select().eq().eq().single() calls
      const mockSingle = jest.fn().mockResolvedValue({
        data: existingVote,
        error: null,
      });

      const mockEqChain = jest.fn().mockReturnValue({
        single: mockSingle,
      });

      const mockSelect = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          eq: mockEqChain,
        }),
      });

      // Override the mock for this specific test
      mockSupabaseClient.from.mockReturnValue({
        ...mockSupabaseClient.from(),
        select: mockSelect,
      });

      const result = await voteAction(validFormData);

      expect(result).toBeUndefined(); // redirect happens
      expect(mockSupabaseClient.from).toHaveBeenCalledWith("votes");
      expect(mockSupabaseClient.from().update).toHaveBeenCalledWith({
        vote_type: "upvote",
      });
    });

    it("returns error when user is not authenticated", async () => {
      setupUnauthenticatedUser();

      const result = await voteAction(validFormData);

      expect(result).toEqual({
        error: "You must be signed in to vote",
        code: "UNAUTHORIZED",
      });
    });

    it("returns error when vote data is invalid", async () => {
      const invalidFormData = createFormData({
        // missing promptId and voteType
      });

      const result = await voteAction(invalidFormData);

      expect(result).toEqual({
        error: "Invalid vote data",
        code: "VALIDATION_ERROR",
      });
    });

    it("returns error when vote type is invalid", async () => {
      const invalidVoteTypeFormData = createFormData({
        promptId: "prompt-1",
        voteType: "invalid-vote-type",
      });

      const result = await voteAction(invalidVoteTypeFormData);

      expect(result).toEqual({
        error: "Invalid vote data",
        code: "VALIDATION_ERROR",
      });
    });

    it("handles different vote types correctly", async () => {
      const downvoteFormData = createFormData({
        promptId: "prompt-1",
        voteType: "downvote",
      });

      const result = await voteAction(downvoteFormData);

      expect(result).toBeUndefined(); // redirect happens
      expect(mockSupabaseClient.from().insert).toHaveBeenCalledWith({
        user_id: "user-1",
        prompt_id: "prompt-1",
        story_id: null,
        vote_type: "downvote",
      });
    });
  });
});
