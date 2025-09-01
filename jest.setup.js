import "@testing-library/jest-dom";

// Mock Supabase client
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockSelect = jest.fn();
const mockEq = jest.fn();
const mockSingle = jest.fn();
const mockOrder = jest.fn();
const mockLimit = jest.fn();

const mockSupabaseClient = {
  auth: {
    getUser: jest.fn(),
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    resetPasswordForEmail: jest.fn(),
    updateUser: jest.fn(),
    signOut: jest.fn(),
  },
  from: jest.fn(() => ({
    insert: mockInsert,
    update: mockUpdate,
    select: mockSelect,
    eq: mockEq,
    single: mockSingle,
    order: mockOrder,
    limit: mockLimit,
  })),
};

// Make mockSupabaseClient available globally
global.mockSupabaseClient = mockSupabaseClient;

// Setup default mock responses for authenticated user
global.setupDefaultMocks = () => {
  // Default authentication success - user is logged in
  mockSupabaseClient.auth.getUser.mockResolvedValue({
    data: { user: { id: "user-1", email: "test@example.com" } },
    error: null,
  });

  // Default database success
  mockInsert.mockResolvedValue({ error: null });
  mockUpdate.mockResolvedValue({ error: null });

  // Mock the chained select().eq().eq().single() calls
  const mockEqChain = jest.fn().mockReturnValue({
    single: jest.fn().mockResolvedValue({
      data: null,
      error: null,
    }),
  });

  mockSelect.mockReturnValue({
    eq: jest.fn().mockReturnValue({
      eq: mockEqChain,
    }),
  });

  // Mock the update().eq() chain
  const mockUpdateChain = jest.fn().mockReturnValue({
    eq: jest.fn().mockResolvedValue({ error: null }),
  });

  // Make sure update returns the chain
  mockUpdate.mockReturnValue(mockUpdateChain);

  // Ensure the from() mock returns the same object with all methods
  mockSupabaseClient.from.mockReturnValue({
    insert: mockInsert,
    update: mockUpdateChain, // Use the chain instead of the base mock
    select: mockSelect,
    eq: mockEq,
    single: mockSingle,
    order: mockOrder,
    limit: mockLimit,
  });
};

// Setup mocks for unauthenticated user
global.setupUnauthenticatedMocks = () => {
  mockSupabaseClient.auth.getUser.mockResolvedValue({
    data: { user: null },
    error: { message: "Not authenticated" },
  });
};

// Helper to set up authenticated user for specific tests
global.setupAuthenticatedUser = (
  userId = "user-1",
  email = "test@example.com"
) => {
  mockSupabaseClient.auth.getUser.mockResolvedValue({
    data: { user: { id: userId, email } },
    error: null,
  });
};

// Helper to set up unauthenticated user for specific tests
global.setupUnauthenticatedUser = () => {
  mockSupabaseClient.auth.getUser.mockResolvedValue({
    data: { user: null },
    error: { message: "Not authenticated" },
  });
};

// Reset all mocks between tests
global.resetMocks = async () => {
  // Clear all mock call history
  jest.clearAllMocks();

  // Clear rate limiting map for testing
  try {
    const { clearRateLimitMap } = require("./app/actions.ts");
    await clearRateLimitMap();
  } catch (e) {
    // Ignore if module can't be loaded
  }

  // Re-apply default mocks after reset
  global.setupDefaultMocks();
};

// Mock Supabase modules
jest.mock("./utils/supabase/server", () => ({
  createClient: jest.fn(() => Promise.resolve(mockSupabaseClient)),
}));

jest.mock("./utils/supabase/client", () => ({
  createClient: jest.fn(() => Promise.resolve(mockSupabaseClient)),
}));

// Mock Next.js router
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

// Mock Next.js headers
jest.mock("next/headers", () => ({
  headers: () => new Map([["origin", "http://localhost:3000"]]),
  cookies: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    has: jest.fn(),
  }),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Suppress console warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render is no longer supported")
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
