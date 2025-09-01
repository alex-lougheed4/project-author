// Mock Supabase client
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockSelect = jest.fn();
const mockEq = jest.fn();
const mockSingle = jest.fn();
const mockOrder = jest.fn();
const mockLimit = jest.fn();

export const mockSupabaseClient = {
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

export const createClient = jest.fn(() => Promise.resolve(mockSupabaseClient));
