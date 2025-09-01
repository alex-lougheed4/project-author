import React from "react";

import { PromptCard } from "../../components/PromptCard";
import { fireEvent, render, screen, waitFor } from "../utils/test-utils";
import { createMockPrompt } from "../utils/test-utils";

// Mock the voteAction
jest.mock("../../app/actions", () => ({
  voteAction: jest.fn(),
}));

describe("PromptCard", () => {
  const mockPrompt = createMockPrompt();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders prompt information correctly", () => {
    render(<PromptCard {...mockPrompt} />);

    expect(screen.getByText("Test Prompt")).toBeDefined();
    expect(screen.getByText("Test summary")).toBeDefined();
    expect(screen.getByText("1000 words")).toBeDefined();
    expect(screen.getByText("By: testuser")).toBeDefined();
    expect(screen.getByText("0 stories")).toBeDefined();
    expect(screen.getByText("Created: Jan 1, 2024")).toBeDefined();
  });

  it("displays deadline when provided", () => {
    const promptWithDeadline = createMockPrompt({
      deadline_date: "2024-12-31T23:59:59Z",
    });

    render(<PromptCard {...promptWithDeadline} />);

    expect(screen.getByText("12/31/2024")).toBeDefined();
  });

  it("calculates and displays vote percentage correctly", () => {
    const promptWithVotes = createMockPrompt({
      upvotes: 8,
      downvotes: 2,
    });

    render(<PromptCard {...promptWithVotes} />);

    expect(screen.getByText("80% positive")).toBeDefined();
  });

  it("handles missing data gracefully", () => {
    const promptWithMissingData = createMockPrompt({
      story_count: null,
      upvotes: null,
      downvotes: null,
      author: null,
    });

    render(<PromptCard {...promptWithMissingData} />);

    expect(screen.getByText("By: user-1")).toBeDefined();
    expect(screen.getByText("0 stories")).toBeDefined();
    // Use more specific selectors for the vote counts
    expect(
      screen.getByLabelText("Upvote this prompt (0 upvotes)")
    ).toBeDefined();
    expect(
      screen.getByLabelText("Downvote this prompt (0 downvotes)")
    ).toBeDefined();
  });

  it("renders links to prompt detail page", () => {
    render(<PromptCard {...mockPrompt} />);

    const titleLink = screen.getByRole("link", { name: "Test Prompt" });
    const viewStoriesLink = screen.getByRole("link", {
      name: "View Stories (0)",
    });

    expect(titleLink).toHaveAttribute("href", "/prompts/1");
    expect(viewStoriesLink).toHaveAttribute("href", "/prompts/1");
  });

  it("handles voting actions", async () => {
    const { voteAction } = await import("../../app/actions");
    voteAction.mockResolvedValue(undefined);

    render(<PromptCard {...mockPrompt} />);

    const upvoteButton = screen.getByLabelText(
      "Upvote this prompt (0 upvotes)"
    );
    const downvoteButton = screen.getByLabelText(
      "Downvote this prompt (0 downvotes)"
    );

    fireEvent.click(upvoteButton);

    await waitFor(() => {
      expect(voteAction).toHaveBeenCalledWith(expect.any(FormData));
    });

    fireEvent.click(downvoteButton);

    await waitFor(() => {
      expect(voteAction).toHaveBeenCalledTimes(2);
    });
  });

  it("has proper accessibility attributes", () => {
    render(<PromptCard {...mockPrompt} />);

    // Check for article role
    expect(screen.getByRole("article")).toBeDefined();

    // Check for proper button labels
    expect(
      screen.getByLabelText("Upvote this prompt (0 upvotes)")
    ).toBeDefined();
    expect(
      screen.getByLabelText("Downvote this prompt (0 downvotes)")
    ).toBeDefined();

    // Check for proper link text
    expect(screen.getByRole("link", { name: "Test Prompt" })).toBeDefined();
    expect(
      screen.getByRole("link", { name: "View Stories (0)" })
    ).toBeDefined();
  });
});
