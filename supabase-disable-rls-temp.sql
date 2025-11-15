-- TEMPORARY FIX - Disable Row Level Security for Testing
-- Run this in your Supabase SQL Editor

-- WARNING: This disables all security checks!
-- Only use this for development/testing
-- Re-enable RLS before going to production!

-- Disable RLS on both tables
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- To re-enable later (when you add authentication):
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
