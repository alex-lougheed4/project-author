-- Seed data for prompts and stories
-- This file will be run after migrations to populate the database with sample data

-- Note: Profiles will be created automatically when users sign up via the trigger
-- For local development, you'll need to sign up users first, then manually link the data
-- Or use the alternative approach below with dummy auth users

-- First, create some dummy auth users for local development
-- (This only works in local development, not production)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES 
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', 'alice@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"username":"alice_writer","full_name":"Alice Johnson"}', NOW(), NOW(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', 'bob@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"username":"bob_storyteller","full_name":"Bob Smith"}', NOW(), NOW(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'authenticated', 'authenticated', 'charlie@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"username":"charlie_poet","full_name":"Charlie Brown"}', NOW(), NOW(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '44444444-4444-4444-4444-444444444444', 'authenticated', 'authenticated', 'diana@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"username":"diana_mystery","full_name":"Diana Chen"}', NOW(), NOW(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '55555555-5555-5555-5555-555555555555', 'authenticated', 'authenticated', 'edward@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"username":"edward_romance","full_name":"Edward Wilson"}', NOW(), NOW(), '', '', '', '');

-- Insert sample profiles (these will be created by the trigger, but we'll add bio info)
INSERT INTO profiles (id, username, full_name, bio, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'alice_writer', 'Alice Johnson', 'Fantasy and sci-fi enthusiast. Love exploring new worlds through words.', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'bob_storyteller', 'Bob Smith', 'Historical fiction writer. Passionate about bringing the past to life.', NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'charlie_poet', 'Charlie Brown', 'Poetry and short story writer. Finding beauty in everyday moments.', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'diana_mystery', 'Diana Chen', 'Mystery and thriller author. Crafting puzzles that keep readers guessing.', NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555555', 'edward_romance', 'Edward Wilson', 'Romance novelist. Believing in love stories that touch the heart.', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  bio = EXCLUDED.bio,
  updated_at = NOW();

-- Insert sample prompts
INSERT INTO prompts (id, title, summary, author_id, deadline_date, length, created_at, updated_at) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'The Last Library on Earth', 'In a post-apocalyptic world where all digital knowledge has been lost, a librarian discovers the last remaining physical library. Write about their journey to preserve and share this knowledge with the scattered survivors.', '11111111-1111-1111-1111-111111111111', NOW() + INTERVAL '30 days', 2000, NOW(), NOW()),
  
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Time Traveler''s Dilemma', 'A time traveler accidentally changes one small event in the past, only to return to a present that''s completely unrecognizable. They must figure out what they changed and how to fix it.', '22222222-2222-2222-2222-222222222222', NOW() + INTERVAL '21 days', 1500, NOW(), NOW()),
  
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'The Painting That Moves', 'An art student buys a painting at a flea market. That night, they discover the painting changes slightly each time they look away. The changes become more dramatic with each viewing.', '33333333-3333-3333-3333-333333333333', NOW() + INTERVAL '14 days', 1000, NOW(), NOW()),
  
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'The Restaurant at the End of the Universe', 'A mysterious restaurant appears in your town that only opens at midnight. The food is unlike anything you''ve ever tasted, and the other diners seem to be from different time periods.', '44444444-4444-4444-4444-444444444444', NOW() + INTERVAL '45 days', 3000, NOW(), NOW()),
  
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Letters from the Future', 'You receive a letter in the mail that''s dated 50 years in the future. It''s from yourself, warning about a decision you''re about to make. The letter contains specific details only you would know.', '55555555-5555-5555-5555-555555555555', NOW() + INTERVAL '60 days', 2500, NOW(), NOW()),
  
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'The Garden of Forgotten Dreams', 'A botanist discovers a garden where plants grow based on people''s forgotten dreams and aspirations. Each plant represents a different abandoned hope or ambition.', '11111111-1111-1111-1111-111111111111', NOW() + INTERVAL '35 days', 1800, NOW(), NOW()),
  
  ('abcdefab-cdef-abcd-efab-cdefabcdefab', 'The Sound of Silence', 'In a world where everyone can hear each other''s thoughts, one person discovers they''ve suddenly gone silent. No one can hear their thoughts, and they can''t hear anyone else''s.', '22222222-2222-2222-2222-222222222222', NOW() + INTERVAL '25 days', 1200, NOW(), NOW()),
  
  ('fedcbafe-dcba-fedc-baef-dcbafedcbafe', 'The Last Laugh', 'A comedian who''s never told a successful joke discovers that their failed jokes are actually prophecies. Every time they tell a joke that doesn''t get laughs, it comes true.', '33333333-3333-3333-3333-333333333333', NOW() + INTERVAL '40 days', 2200, NOW(), NOW());

-- Insert sample stories
INSERT INTO stories (id, story_title, prompt_id, author_id, story_description, word_count, created_at, updated_at) VALUES
  ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'Guardian of Knowledge', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'Sarah adjusted her glasses as she carefully placed another book back on the shelf. The dust motes danced in the beam of her flashlight, and she could hear the distant howl of wind through the broken windows. This library had been her sanctuary for the past three years, ever since the Great Collapse had wiped out all digital records. She had started with just a few dozen books salvaged from abandoned homes, but now her collection numbered in the thousands. Each book represented a piece of human knowledge that might otherwise be lost forever. She had learned to repair bindings, preserve paper, and even create new copies by hand when necessary. The survivors who came to her library were always amazed at what they found - everything from medical textbooks to children''s stories, from cookbooks to philosophy. Sarah knew she couldn''t save everything, but she could save enough to give humanity a chance to rebuild. As she lit another candle and settled down to catalog her latest acquisitions, she felt a deep sense of purpose. She was the guardian of knowledge, and she would not let it die.', 250, NOW(), NOW()),
  
  ('bbbbbbbb-cccc-dddd-eeee-ffffffffffff', 'The Butterfly Effect', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 'Dr. Elena Martinez stared at the newspaper headline in disbelief: "President Johnson Re-elected in Landslide Victory." That wasn''t right. Johnson had lost the election in her timeline. She had only been trying to save a butterfly that was caught in a spider''s web. How could that tiny act have changed the entire course of history? She quickly pulled out her temporal calculator and began running scenarios. The butterfly had been near a polling station. Maybe someone had seen her rescue it and been inspired to vote differently. Or perhaps the butterfly had been destined to land on someone''s ballot, changing their vote. The implications were terrifying. She had to find a way to reverse this. But what if trying to fix it made things even worse? Elena realized that time travel was like playing with a house of cards - one small change could bring the entire structure crashing down. She would have to be more careful in the future. Much more careful.', 200, NOW(), NOW()),
  
  ('cccccccc-dddd-eeee-ffff-cccccccccccc', 'Midnight Feast', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'The neon sign flickered to life at exactly 11:59 PM. "Le Temps Perdu" it read in elegant cursive. I had walked past this building every day for months and never noticed it before. Tonight, something drew me inside. The restaurant was dimly lit with candles, and the air was thick with the aroma of spices I couldn''t identify. The maître d'' was dressed in what looked like 1920s fashion, complete with a pocket watch on a chain. "Ah, you''ve found us," he said with a knowing smile. "We don''t get many visitors from your time." My time? I looked around and noticed the other diners. A woman in Victorian dress was sipping wine, while a man in futuristic clothing was eating something that seemed to glow. I was seated at a table near the window, where I could see the street outside. But the street looked different - the cars were older, the buildings newer. The menu was written in a language I didn''t recognize, but somehow I understood what each dish was. I ordered something called "Memory Soup" and "Future Bread." When the food arrived, it tasted like nothing I had ever experienced. Each bite brought back forgotten memories and showed me glimpses of possibilities yet to come. I realized this wasn''t just a restaurant - it was a bridge between all times and places. And I had been invited to dine.', 300, NOW(), NOW()),
  
  ('dddddddd-eeee-ffff-aaaa-bbbbbbbbbbbb', 'Dreams in Bloom', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', 'Dr. Isabella Chen carefully labeled the new specimen. This one was particularly interesting - a delicate flower with petals that seemed to shimmer with an inner light. According to her research, it represented someone''s dream of becoming a dancer. The plant had grown from a seed that had been planted with a small note describing the dream. Isabella had discovered this garden six months ago, quite by accident. She had been studying rare plant species when she stumbled upon a hidden greenhouse in the university''s botanical gardens. Inside, she found plants that defied all known botanical classifications. There was a tree with leaves that whispered forgotten lullabies, a vine that grew in the shape of mathematical equations, and flowers that bloomed in colors that didn''t exist in nature. Each plant was connected to a human dream that had been abandoned or forgotten. The garden was tended by an elderly woman who called herself the Gardener of Lost Hopes. She explained that the garden served as a repository for dreams that people had given up on. "Sometimes," she said, "just seeing their dream in physical form gives people the courage to try again." Isabella had started her own research project, documenting each plant and trying to understand how dreams could manifest as living things. She had even planted a few seeds of her own - dreams she had once had but had set aside for more practical pursuits. Now she was watching them grow, and with each new sprout, she felt a renewed sense of possibility.', 280, NOW(), NOW()),
  
  ('eeeeeeee-ffff-aaaa-bbbb-cccccccccccc', 'The Silent One', 'abcdefab-cdef-abcd-efab-cdefabcdefab', '55555555-5555-5555-5555-555555555555', 'The silence was deafening. For the first time in his life, Marcus couldn''t hear the constant stream of thoughts that had always surrounded him. Since birth, everyone in his world had been telepathic. It was normal to hear the thoughts of everyone around you - their worries, their hopes, their secret desires. It was like living in a never-ending conversation that you couldn''t escape. But now, suddenly, Marcus was alone in his own mind. He couldn''t hear anyone else''s thoughts, and no one could hear his. At first, he thought he was going crazy. He tried to concentrate, to reach out with his mind as he had always done. But there was nothing. Just silence. He went to the doctor, who was baffled. "This has never happened before," the doctor said, his thoughts completely silent to Marcus. "You''re the first person to lose their telepathic abilities." Marcus realized that he was now completely isolated. He couldn''t communicate with anyone except through speech, which felt clumsy and inadequate. But as the days passed, he began to appreciate the silence. For the first time, he could think his own thoughts without interference. He could have private moments. He could be alone with his own mind. He started to wonder if maybe the telepathy had been a curse rather than a gift. Maybe true connection came from choice, not from forced mental intimacy. He began to learn sign language and other forms of non-verbal communication. And slowly, he started to build genuine relationships based on mutual understanding rather than mental invasion.', 320, NOW(), NOW());

-- Insert sample votes
INSERT INTO votes (id, user_id, prompt_id, story_id, vote_type, created_at, updated_at) VALUES
  -- Votes on prompts
  ('aaaaaaaa-1111-2222-3333-444444444444', '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, 'upvote', NOW(), NOW()),
  ('bbbbbbbb-2222-3333-4444-555555555555', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, 'upvote', NOW(), NOW()),
  ('cccccccc-3333-4444-5555-666666666666', '44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, 'upvote', NOW(), NOW()),
  ('dddddddd-4444-5555-6666-777777777777', '55555555-5555-5555-5555-555555555555', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, 'downvote', NOW(), NOW()),
  
  ('eeeeeeee-5555-6666-7777-888888888888', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', NULL, 'upvote', NOW(), NOW()),
  ('ffffffff-6666-7777-8888-999999999999', '33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', NULL, 'upvote', NOW(), NOW()),
  ('abcdefab-7777-8888-9999-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', NULL, 'upvote', NOW(), NOW()),
  
  ('fedcbafe-8888-9999-aaaa-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', NULL, 'upvote', NOW(), NOW()),
  ('abcdefab-9999-aaaa-bbbb-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', NULL, 'upvote', NOW(), NOW()),
  ('fedcbafe-aaaa-bbbb-cccc-dddddddddddd', '55555555-5555-5555-5555-555555555555', 'cccccccc-cccc-cccc-cccc-cccccccccccc', NULL, 'upvote', NOW(), NOW()),
  
  ('12345678-bbbb-cccc-dddd-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'dddddddd-dddd-dddd-dddd-dddddddddddd', NULL, 'upvote', NOW(), NOW()),
  ('87654321-cccc-dddd-eeee-ffffffffffff', '22222222-2222-2222-2222-222222222222', 'dddddddd-dddd-dddd-dddd-dddddddddddd', NULL, 'upvote', NOW(), NOW()),
  ('abcd1234-dddd-eeee-ffff-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'dddddddd-dddd-dddd-dddd-dddddddddddd', NULL, 'upvote', NOW(), NOW()),
  ('dcba4321-eeee-ffff-aaaa-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', NULL, 'upvote', NOW(), NOW()),
  
  ('1a2b3c4d-ffff-aaaa-bbbb-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', NULL, 'upvote', NOW(), NOW()),
  ('4d3c2b1a-aaaa-bbbb-cccc-dddddddddddd', '33333333-3333-3333-3333-333333333333', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', NULL, 'downvote', NOW(), NOW()),
  
  -- Votes on stories
  ('f1e2d3c4-bbbb-cccc-dddd-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', NULL, 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'upvote', NOW(), NOW()),
  ('c4d3e2f1-cccc-dddd-eeee-ffffffffffff', '33333333-3333-3333-3333-333333333333', NULL, 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'upvote', NOW(), NOW()),
  ('a1b2c3d4-dddd-eeee-ffff-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', NULL, 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'upvote', NOW(), NOW()),
  
  ('d4c3b2a1-eeee-ffff-aaaa-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', NULL, 'bbbbbbbb-cccc-dddd-eeee-ffffffffffff', 'upvote', NOW(), NOW()),
  ('1f2e3d4c-ffff-aaaa-bbbb-cccccccccccc', '22222222-2222-2222-2222-222222222222', NULL, 'bbbbbbbb-cccc-dddd-eeee-ffffffffffff', 'upvote', NOW(), NOW()),
  ('c4d3e2f1-aaaa-bbbb-cccc-dddddddddddd', '55555555-5555-5555-5555-555555555555', NULL, 'bbbbbbbb-cccc-dddd-eeee-ffffffffffff', 'downvote', NOW(), NOW()),
  
  ('9a8b7c6d-bbbb-cccc-dddd-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', NULL, 'cccccccc-dddd-eeee-ffff-cccccccccccc', 'upvote', NOW(), NOW()),
  ('6d7c8b9a-cccc-dddd-eeee-ffffffffffff', '33333333-3333-3333-3333-333333333333', NULL, 'cccccccc-dddd-eeee-ffff-cccccccccccc', 'upvote', NOW(), NOW()),
  ('5e4f3a2b-dddd-eeee-ffff-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', NULL, 'cccccccc-dddd-eeee-ffff-cccccccccccc', 'upvote', NOW(), NOW()),
  ('2b3a4f5e-eeee-ffff-aaaa-bbbbbbbbbbbb', '55555555-5555-5555-5555-555555555555', NULL, 'cccccccc-dddd-eeee-ffff-cccccccccccc', 'upvote', NOW(), NOW()),
  
  ('7f8e9d0c-ffff-aaaa-bbbb-cccccccccccc', '11111111-1111-1111-1111-111111111111', NULL, 'dddddddd-eeee-ffff-aaaa-bbbbbbbbbbbb', 'upvote', NOW(), NOW()),
  ('0c9d8e7f-aaaa-bbbb-cccc-dddddddddddd', '22222222-2222-2222-2222-222222222222', NULL, 'dddddddd-eeee-ffff-aaaa-bbbbbbbbbbbb', 'upvote', NOW(), NOW()),
  ('3b4a5f6e-bbbb-cccc-dddd-eeeeeeeeeeee', '44444444-4444-4444-4444-444444444444', NULL, 'dddddddd-eeee-ffff-aaaa-bbbbbbbbbbbb', 'upvote', NOW(), NOW()),
  
  ('8e7f6a5b-cccc-dddd-eeee-ffffffffffff', '11111111-1111-1111-1111-111111111111', NULL, 'eeeeeeee-ffff-aaaa-bbbb-cccccccccccc', 'upvote', NOW(), NOW()),
  ('5b6a7f8e-dddd-eeee-ffff-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', NULL, 'eeeeeeee-ffff-aaaa-bbbb-cccccccccccc', 'upvote', NOW(), NOW()),
  ('4c5d6e7f-eeee-ffff-aaaa-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', NULL, 'eeeeeeee-ffff-aaaa-bbbb-cccccccccccc', 'upvote', NOW(), NOW()),
  ('7f6e5d4c-ffff-aaaa-bbbb-cccccccccccc', '55555555-5555-5555-5555-555555555555', NULL, 'eeeeeeee-ffff-aaaa-bbbb-cccccccccccc', 'upvote', NOW(), NOW());

-- Update the prompts_with_metadata view to reflect the new data
-- (This will happen automatically when the view is queried)