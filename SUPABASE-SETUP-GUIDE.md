# Supabase Integration Setup Guide

This guide will help you integrate Supabase with your GARA Construction website to manage blog posts and products.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: `gara-construction` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
5. Click "Create new project" and wait for setup to complete (2-3 minutes)

## Step 2: Set Up the Database

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase-setup.sql`
4. Paste it into the SQL Editor
5. Click "Run" to execute the SQL commands
6. You should see success messages for:
   - 2 tables created (blog_posts, products)
   - RLS enabled
   - Policies created
   - Indexes created

## Step 3: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** > **API** (left sidebar)
2. Find and copy:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 4: Configure Your Website

1. Open `js/supabase-config.js`
2. Replace the placeholder values:

```javascript
const SUPABASE_CONFIG = {
    url: 'YOUR_ACTUAL_SUPABASE_URL', // Paste your Project URL here
    anonKey: 'YOUR_ACTUAL_ANON_KEY' // Paste your anon public key here
};
```

3. Save the file

## Step 5: Update Your HTML Files

### Update admin.html

Add these script tags **before the closing `</body>` tag**:

```html
<!-- Supabase Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Supabase Configuration -->
<script src="js/supabase-config.js"></script>

<!-- Supabase Admin Manager -->
<script src="js/supabase-admin.js"></script>
```

**Remove or comment out the old admin.js:**
```html
<!-- <script src="js/admin.js"></script> -->
```

### Update index.html, blog.html, and products.html

Add these script tags **before the closing `</body>` tag** on pages where you want to display dynamic content:

```html
<!-- Supabase Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Supabase Configuration -->
<script src="js/supabase-config.js"></script>

<!-- Supabase Content Loader -->
<script src="js/supabase-content-loader.js"></script>
```

**Remove or comment out the old content-loader.js:**
```html
<!-- <script src="js/content-loader.js"></script> -->
```

## Step 6: Test Your Integration

1. Open `admin.html` in your browser
2. Try creating a new blog post:
   - Fill in all fields
   - Click "Publish Blog Post"
   - You should see a success message
3. Check the blog list - your new post should appear
4. Go to `blog.html` - your new post should automatically appear on the page
5. Try creating a product in the admin panel
6. Check `products.html` and `index.html` - your product should appear

## Step 7: Verify in Supabase Dashboard

1. Go to your Supabase dashboard
2. Click **Table Editor** (left sidebar)
3. Select `blog_posts` or `products` table
4. You should see the data you created through the admin panel

## Authentication (Optional but Recommended)

To secure your admin panel so only authorized users can add/edit/delete content:

### Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable **Email** provider
3. Configure email templates if desired

### Create an Admin User

1. Go to **Authentication** > **Users**
2. Click "Add user" > "Create new user"
3. Enter email and password for your admin account
4. Click "Create user"

### Update admin.html with Login

Add a login form to your admin page (we can create this if needed).

## Troubleshooting

### "Supabase client not initialized" Error

- Check that you've added the Supabase script tag: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`
- Verify your credentials in `supabase-config.js` are correct
- Make sure `supabase-config.js` is loaded before `supabase-admin.js` or `supabase-content-loader.js`

### Data Not Showing on Website

- Open browser console (F12) and check for errors
- Verify the SQL setup was completed successfully
- Check that RLS policies are set up correctly
- Make sure the content loader script is included on your pages

### "Permission Denied" Errors

- Check your Row Level Security policies in Supabase
- For testing, you can temporarily disable RLS:
  ```sql
  ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
  ALTER TABLE products DISABLE ROW LEVEL SECURITY;
  ```
- **Important**: Re-enable RLS before going live!

## Next Steps

Once everything is working:

1. ✅ Add authentication to protect your admin panel
2. ✅ Test on mobile devices
3. ✅ Add more fields to your database if needed
4. ✅ Set up automated backups in Supabase
5. ✅ Consider adding image upload functionality using Supabase Storage

## Database Schema

### blog_posts
- `id` - Auto-generated unique identifier
- `title` - Blog post title
- `category` - Category (e.g., "Construction Updates", "Safety")
- `excerpt` - Short description
- `content` - Full blog content
- `image` - Image URL
- `author` - Author name
- `created_at` - Automatically set when created
- `updated_at` - Automatically updated on changes

### products
- `id` - Auto-generated unique identifier
- `name` - Product name
- `category` - Category (e.g., "Construction Equipment", "Materials")
- `description` - Product description
- `features` - Array of feature strings
- `image` - Image URL
- `created_at` - Automatically set when created
- `updated_at` - Automatically updated on changes

## Support

For Supabase-specific issues, check:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)

Good luck! 🚀
