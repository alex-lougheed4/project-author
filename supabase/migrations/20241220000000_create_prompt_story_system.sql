-- Migration: Create prompt and story system
-- Created: 2024-12-20
-- Description: Sets up the complete database schema for prompts, stories, and voting system

-- 1. Create profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create prompts table
CREATE TABLE prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  deadline_date TIMESTAMP WITH TIME ZONE,
  length INTEGER NOT NULL CHECK (length > 0), -- in words
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create stories table
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_title TEXT NOT NULL,
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  story_description TEXT NOT NULL,
  word_count INTEGER NOT NULL CHECK (word_count > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create votes table (for both prompts and stories)
CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure a user can only vote on either a prompt OR a story, not both
  CONSTRAINT one_vote_target CHECK (
    (prompt_id IS NOT NULL AND story_id IS NULL) OR 
    (prompt_id IS NULL AND story_id IS NOT NULL)
  ),
  
  -- Ensure a user can only vote once per prompt/story
  UNIQUE(user_id, prompt_id),
  UNIQUE(user_id, story_id)
);

-- 5. Create indexes for better query performance
CREATE INDEX idx_prompts_author_id ON prompts(author_id);
CREATE INDEX idx_prompts_created_at ON prompts(created_at);
CREATE INDEX idx_stories_prompt_id ON stories(prompt_id);
CREATE INDEX idx_stories_author_id ON stories(author_id);
CREATE INDEX idx_stories_created_at ON stories(created_at);
CREATE INDEX idx_votes_prompt_id ON votes(prompt_id);
CREATE INDEX idx_votes_story_id ON votes(story_id);
CREATE INDEX idx_votes_user_id ON votes(user_id);

-- 6. Enable Row Level Security (RLS) on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 8. Create RLS policies for prompts
CREATE POLICY "Anyone can view prompts" ON prompts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create prompts" ON prompts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authors can update own prompts" ON prompts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own prompts" ON prompts FOR DELETE USING (auth.uid() = author_id);

-- 9. Create RLS policies for stories
CREATE POLICY "Anyone can view stories" ON stories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create stories" ON stories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authors can update own stories" ON stories FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own stories" ON stories FOR DELETE USING (auth.uid() = author_id);

-- 10. Create RLS policies for votes
CREATE POLICY "Anyone can view votes" ON votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create votes" ON votes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own votes" ON votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own votes" ON votes FOR DELETE USING (auth.uid() = user_id);

-- 11. Create helper functions for vote counting
CREATE OR REPLACE FUNCTION get_prompt_votes(prompt_uuid UUID)
RETURNS TABLE(upvotes BIGINT, downvotes BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(COUNT(*) FILTER (WHERE v.vote_type = 'upvote'), 0) as upvotes,
    COALESCE(COUNT(*) FILTER (WHERE v.vote_type = 'downvote'), 0) as downvotes
  FROM votes v
  WHERE v.prompt_id = prompt_uuid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_story_votes(story_uuid UUID)
RETURNS TABLE(upvotes BIGINT, downvotes BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(COUNT(*) FILTER (WHERE v.vote_type = 'upvote'), 0) as upvotes,
    COALESCE(COUNT(*) FILTER (WHERE v.vote_type = 'downvote'), 0) as downvotes
  FROM votes v
  WHERE v.story_id = story_uuid;
END;
$$ LANGUAGE plpgsql;

-- 12. Create view for prompts with metadata
CREATE VIEW prompts_with_metadata AS
SELECT 
  p.*,
  COUNT(s.id) as story_count,
  (SELECT upvotes FROM get_prompt_votes(p.id)) as upvotes,
  (SELECT downvotes FROM get_prompt_votes(p.id)) as downvotes
FROM prompts p
LEFT JOIN stories s ON p.id = s.prompt_id
GROUP BY p.id;

-- 13. Create trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 14. Create trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
