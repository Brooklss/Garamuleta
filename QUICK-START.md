# 🚀 Quick Start Guide - GARA Construction Website

Get your website up and running in minutes!

## 📦 What You Have

Your website includes:
- ✅ 6 fully functional HTML pages
- ✅ Professional CSS styling
- ✅ Interactive JavaScript features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Contact forms and newsletter
- ✅ Blog system
- ✅ Project portfolio
- ✅ Product catalog

## ⚡ 5-Minute Setup

### Step 1: Open the Website
1. Navigate to: `c:\Users\Brook\Documents\Development\Garamuleta`
2. Double-click `index.html`
3. Your website opens in your default browser!

### Step 2: View All Pages
- **Home**: `index.html`
- **About**: `about.html`
- **Products**: `products.html`
- **Projects**: `projects.html`
- **Blog**: `blog.html`
- **Contact**: `contact.html`

### Step 3: Test Features
- Click the mobile menu icon (top right on small screens)
- Try the contact form
- Filter projects by category
- Search products
- Expand FAQ items

## 🎨 Customization Basics

### Change Company Information

1. **Update Contact Details** (All pages - Footer)
   ```html
   <!-- Find and replace: -->
   +251 11 XXX XXXX → Your actual phone
   info@garaconstruction.com → Your actual email
   ```

2. **Update Business Hours**
   ```html
   <!-- In contact.html and footer: -->
   Mon - Fri: 8:00 AM - 6:00 PM
   ```

3. **Update Address**
   ```html
   <!-- In contact.html: -->
   Bole Road, near Edna Mall
   Addis Ababa, Ethiopia
   ```

### Change Colors

Open `css/style.css` and find:
```css
:root {
    --primary-color: #1e3a5f;    /* Deep Blue */
    --secondary-color: #c9a961;  /* Gold */
    --accent-color: #2d5f8d;     /* Light Blue */
}
```

Change these hex color codes to your preferred colors!

### Add Your Logo

1. Save your logo as `images/logo.png`
2. Open `index.html` (and all pages)
3. Replace the text logo with:
   ```html
   <div class="logo">
       <img src="images/logo.png" alt="GARA Logo" style="height: 50px;">
   </div>
   ```

## 📸 Adding Images

### Priority Images to Add:

1. **Hero Background**
   - File: `images/hero-bg.jpg`
   - Size: 1920 x 1080 px
   - A stunning construction or building image

2. **About Images**
   - `images/about-preview.jpg`
   - `images/about-main.jpg`

3. **Product Images**
   - Place in: `images/products/`
   - Names match those in `products.html`

4. **Project Images**
   - Place in: `images/projects/`
   - Names match those in `projects.html`

### Using Placeholder Images Temporarily

Replace image paths with free stock photos:
```html
<!-- Example: -->
<img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920" alt="Construction">
```

## 🌐 Publishing Your Website

### Option 1: Netlify (Easiest - Free)
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free
3. Drag your `Garamuleta` folder onto the page
4. Done! Your site is live!

### Option 2: Traditional Hosting
1. Get hosting (e.g., HostGator, Bluehost)
2. Upload files via FTP
3. Point your domain to hosting
4. Done!

### Option 3: GitHub Pages (Free)
1. Create GitHub account
2. Create repository named `gara-construction`
3. Upload files
4. Enable GitHub Pages in settings
5. Done!

## ✏️ Adding Content

### Add a New Blog Post

1. Open `blog.html`
2. Find a blog post card:
   ```html
   <article class="blog-post-card">
       <!-- Blog post content -->
   </article>
   ```
3. Copy the entire `<article>` element
4. Paste it where you want the new post
5. Update:
   - Image path
   - Title
   - Date
   - Author
   - Excerpt
   - Category

### Add a New Project

1. Open `projects.html`
2. Find a project card:
   ```html
   <div class="project-card" data-category="commercial">
       <!-- Project content -->
   </div>
   ```
3. Copy and paste
4. Update the content and image
5. Set the correct `data-category` (commercial, residential, hospitality, retail)

### Add a New Product

1. Open `products.html`
2. Find the relevant category section
3. Copy a product item:
   ```html
   <div class="product-item">
       <!-- Product details -->
   </div>
   ```
4. Update image, title, description, and features

## 🔧 Common Tasks

### Update Social Media Links

Find in footer (all pages):
```html
<div class="social-links">
    <a href="YOUR_FACEBOOK_URL" aria-label="Facebook">
    <a href="YOUR_TWITTER_URL" aria-label="Twitter">
    <a href="YOUR_INSTAGRAM_URL" aria-label="Instagram">
    <a href="YOUR_LINKEDIN_URL" aria-label="LinkedIn">
</div>
```

### Update Google Map

In `contact.html`, find:
```html
<iframe src="GOOGLE_MAPS_EMBED_URL"></iframe>
```

To get your map:
1. Go to Google Maps
2. Search for your address
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Paste it in `contact.html`

### Connect Contact Form

The form currently shows a success message without sending email. To connect it:

**Option A: Use FormSpree (Easy)**
1. Go to [formspree.io](https://formspree.io)
2. Sign up for free
3. Get your form endpoint
4. In `contact.html`, update the form:
   ```html
   <form action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
   ```

**Option B: Use EmailJS**
1. Go to [emailjs.com](https://emailjs.com)
2. Set up an account
3. Follow their integration guide

**Option C: Backend Service**
- Build custom API
- Use PHP mail function
- Use Node.js server

## 📱 Testing Your Website

### Desktop Testing
1. Open in Chrome
2. Press `F12` to open Developer Tools
3. Click the device icon to test different screen sizes
4. Try:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)

### Mobile Testing
1. Get your computer's local IP address
2. On your phone, visit: `http://YOUR-IP-ADDRESS/path/to/index.html`
3. Or use browser dev tools as above

## 🎯 SEO Quick Tips

### Update Page Titles
Each page has a `<title>` tag. Make them descriptive:
```html
<title>GARA Construction - Premium Building Materials Ethiopia</title>
```

### Add Meta Descriptions
```html
<meta name="description" content="Your description here">
```

### Add Alt Text to Images
```html
<img src="image.jpg" alt="Describe the image">
```

## ⚡ Performance Tips

### Compress Images
Before adding images:
1. Use [tinypng.com](https://tinypng.com)
2. Or [squoosh.app](https://squoosh.app)
3. Keep images under 500KB

### Enable Caching
Add to `.htaccess` file (if using Apache):
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access 1 year"
    ExpiresByType image/jpeg "access 1 year"
    ExpiresByType image/gif "access 1 year"
    ExpiresByType image/png "access 1 year"
</IfModule>
```

## 🆘 Troubleshooting

### Images Not Showing?
- Check file path is correct
- Verify image file name matches HTML
- Check file extension (.jpg vs .jpeg)

### Styling Looks Wrong?
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file path in HTML
- Verify CSS file exists in `/css/` folder

### Mobile Menu Not Working?
- Check JavaScript file is loading
- Open browser console (F12) for errors
- Verify JS file path in HTML

### Form Not Submitting?
- Form needs backend to actually send emails
- Use FormSpree or similar service
- Or shows success message only (current setup)

## 📞 Need Help?

1. Check `README.md` for detailed documentation
2. Review `LAUNCH-CHECKLIST.md` before going live
3. See `images/IMAGE-GUIDE.md` for image requirements

## 🎉 Next Steps

After basic setup:
1. ✅ Add all your images
2. ✅ Update all contact information
3. ✅ Test on multiple devices
4. ✅ Set up contact form backend
5. ✅ Add Google Analytics
6. ✅ Connect social media accounts
7. ✅ Create Privacy Policy page
8. ✅ Prepare content for blog
9. ✅ Get SSL certificate (HTTPS)
10. ✅ Launch! 🚀

## 💡 Pro Tips

1. **Start with Homepage**: Make it perfect before other pages
2. **Real Images Matter**: Use actual photos, not stock images
3. **Test Forms**: Always test before launch
4. **Mobile First**: Most visitors will use phones
5. **Update Regularly**: Add new projects and blog posts monthly
6. **Fast Loading**: Optimize images and code
7. **Clear CTAs**: Make it easy for customers to contact you

## 📚 Helpful Resources

- **Free Images**: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- **Icons**: [Font Awesome](https://fontawesome.com)
- **Colors**: [Coolors](https://coolors.co)
- **Fonts**: [Google Fonts](https://fonts.google.com)
- **Hosting**: [Netlify](https://netlify.com), [Vercel](https://vercel.com)
- **Analytics**: [Google Analytics](https://analytics.google.com)
- **Forms**: [FormSpree](https://formspree.io), [EmailJS](https://emailjs.com)

---

## 🎊 You're Ready!

Your professional website is ready to go. Just customize the content, add your images, and publish!

**Need more details?** Check the `README.md` file for comprehensive documentation.

**Questions?** Review the `LAUNCH-CHECKLIST.md` for a complete pre-launch guide.

---

**Built for**: GARA Construction Solutions PLC  
**Last Updated**: November 2025  
**Version**: 1.0

**Good luck with your website! 🚀**
