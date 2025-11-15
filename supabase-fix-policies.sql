-- Fix Row Level Security Policies
-- Run this in your Supabase SQL Editor to fix the insert/update/delete issues

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_posts;

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON products;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON products;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON products;

-- Create new policies that allow public access for testing
-- WARNING: This allows anyone to insert/update/delete. For production, add authentication!

-- Blog Posts Policies
CREATE POLICY "Enable insert for all users" ON blog_posts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON blog_posts
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON blog_posts
    FOR DELETE USING (true);

-- Products Policies
CREATE POLICY "Enable insert for all users" ON products
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON products
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON products
    FOR DELETE USING (true);

-- Verify policies are set correctly
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename IN ('blog_posts', 'products');
