-- Add new columns to bounties table
ALTER TABLE public.bounties
ADD COLUMN IF NOT EXISTS difficulty text DEFAULT 'intermediate',
ADD COLUMN IF NOT EXISTS deadline timestamp with time zone,
ADD COLUMN IF NOT EXISTS requirements text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS repository_url text,
ADD COLUMN IF NOT EXISTS long_description text;

-- Add check constraint for difficulty if you want to enforce values (optional but good)
-- Valid values: beginner, intermediate, advanced, expert
ALTER TABLE public.bounties
ADD CONSTRAINT check_difficulty 
CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert'));
