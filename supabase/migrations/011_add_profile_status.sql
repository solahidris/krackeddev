-- Add status column to profiles table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'status') THEN
        ALTER TABLE public.profiles 
        ADD COLUMN status text NOT NULL DEFAULT 'active';

        ALTER TABLE public.profiles 
        ADD CONSTRAINT check_status 
        CHECK (status IN ('active', 'banned'));
    END IF;
END $$;
