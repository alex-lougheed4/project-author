import { RenderOptions, render } from "@testing-library/react";

import { ReactElement } from "react";

import { Tables } from "../../database.types";

// Mock Next.js redirect function
jest.mock("next/navigation", () => ({
  redirect: jest.fn(() => {
    // In tests, we want to return undefined to simulate redirect
    return undefined;
  }),
}));

// Get the mock client and functions from global scope
const mockSupabaseClient = (global as any).mockSupabaseClient;
const setupDefaultMocks = (global as any).setupDefaultMocks;
const setupUnauthenticatedMocks = (global as any).setupUnauthenticatedMocks;
const setupAuthenticatedUser = (global as any).setupAuthenticatedUser;
const setupUnauthenticatedUser = (global as any).setupUnauthenticatedUser;
const resetMocks = (global as any).resetMocks;

// Re-export everything for use in tests
export {
  mockSupabaseClient,
  setupDefaultMocks,
  setupUnauthenticatedMocks,
  setupAuthenticatedUser,
  setupUnauthenticatedUser,
  resetMocks,
};

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { ...options });

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { customRender as render };

// Helper functions for creating mock data
export const createMockPrompt = (
  overrides = {}
): Tables<"prompts_with_metadata"> & {
  author?: Tables<"profiles">;
} => ({
  id: "1",
  title: "Test Prompt",
  summary: "Test summary",
  author_id: "user-1",
  deadline_date: null,
  length: 1000,
  story_count: 0,
  upvotes: 0,
  downvotes: 0,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  author: {
    id: "user-1",
    username: "testuser",
    full_name: "Test User",
    avatar_url: null,
    bio: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  ...overrides,
});

export const createMockStory = (overrides = {}): Tables<"stories"> => ({
  id: "1",
  story_title: "Test Story",
  prompt_id: "1",
  author_id: "user-1",
  story_description: "Test story content",
  word_count: 100,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  ...overrides,
});

export const createMockUser = (overrides = {}): Tables<"profiles"> => ({
  id: "user-1",
  username: "testuser",
  full_name: "Test User",
  avatar_url: null,
  bio: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  ...overrides,
});

// Helper for creating FormData
export const createFormData = (data: Record<string, string | number>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });
  return formData;
};

// Mock Supabase response helpers
export const mockSupabaseResponse = {
  success: (data: unknown) => ({ data, error: null }),
  error: (message: string) => ({ data: null, error: { message } }),
};
