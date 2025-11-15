# Image Assets Guide for GARA Construction Website

This document outlines all the image assets needed for the website and their specifications.

## 📸 Required Images

### Hero Section
- **File**: `hero-bg.jpg`
- **Size**: 1920 x 1080 px
- **Format**: JPG
- **Description**: High-quality image of construction site, modern building, or materials
- **Location**: `/images/`

### About Section
- **File**: `about-preview.jpg`
- **Size**: 800 x 600 px
- **Description**: GARA office building or showroom exterior
- **Location**: `/images/`

- **File**: `about-main.jpg`
- **Size**: 800 x 800 px
- **Description**: Team at work or company facility
- **Location**: `/images/`

### Team Members (Leadership)
- **Files**: `team-member1.jpg` through `team-member4.jpg`
- **Size**: 400 x 500 px (portrait)
- **Format**: JPG
- **Description**: Professional headshots of leadership team
- **Location**: `/images/`

### Products

#### Flooring Images
- `products/flooring1.jpg` - Ceramic tiles
- `products/flooring2.jpg` - Porcelain tiles
- `products/flooring3.jpg` - Hardwood flooring
- `products/flooring4.jpg` - Laminate flooring
- `products/flooring5.jpg` - Vinyl flooring
- `products/flooring6.jpg` - Marble flooring
**Size**: 600 x 400 px | **Format**: JPG

#### Wall Cladding Images
- `products/wall1.jpg` - Designer wall tiles
- `products/wall2.jpg` - 3D wall panels
- `products/wall3.jpg` - Stone cladding
- `products/wall4.jpg` - Wood panels
**Size**: 600 x 400 px | **Format**: JPG

#### Ceiling Images
- `products/ceiling1.jpg` - Suspended ceiling
- `products/ceiling2.jpg` - Gypsum board
- `products/ceiling3.jpg` - Metal ceiling
**Size**: 600 x 400 px | **Format**: JPG

#### Sanitary Fixtures Images
- `products/sanitary1.jpg` - Toilets
- `products/sanitary2.jpg` - Basins
- `products/sanitary3.jpg` - Showers
- `products/sanitary4.jpg` - Faucets
**Size**: 600 x 400 px | **Format**: JPG

#### Paint Images
- `products/paint1.jpg` - Interior paint display
- `products/paint2.jpg` - Exterior paint samples
- `products/paint3.jpg` - Texture coatings
**Size**: 600 x 400 px | **Format**: JPG

#### Decorative Products Images
- `products/decorative1.jpg` - Crown moldings
- `products/decorative2.jpg` - Lighting fixtures
- `products/decorative3.jpg` - Hardware
**Size**: 600 x 400 px | **Format**: JPG

### Projects

#### Main Project Images
- `projects/hotel1.jpg` - Luxury hotel project
- `projects/office1.jpg` - Office complex
- `projects/villa1.jpg` - Residential villa
- `projects/mall1.jpg` - Shopping mall
- `projects/restaurant1.jpg` - Restaurant
- `projects/apartment1.jpg` - Apartment complex
- `projects/bank1.jpg` - Bank headquarters
- `projects/spa1.jpg` - Spa and wellness
- `projects/hospital1.jpg` - Medical center
**Size**: 800 x 600 px | **Format**: JPG

#### Project Thumbnails (for modal)
- `projects/hotel1-thumb1.jpg`
- `projects/hotel1-thumb2.jpg`
- `projects/hotel1-thumb3.jpg`
**Size**: 400 x 300 px | **Format**: JPG

### Blog

#### Featured & Post Images
- `blog/featured.jpg` - Featured article main image
- `blog/post1.jpg` - Modern flooring trends
- `blog/post2.jpg` - Sustainable construction
- `blog/post3.jpg` - Luxury finishing
- `blog/post4.jpg` - Bathroom design
- `blog/post5.jpg` - Wall cladding
- `blog/post6.jpg` - Commercial flooring
- `blog/post7.jpg` - Paint colors
- `blog/post8.jpg` - Ceiling design
- `blog/post9.jpg` - Maintenance tips
**Size**: 800 x 500 px | **Format**: JPG

#### Blog Thumbnails
- `blog/thumb1.jpg`
- `blog/thumb2.jpg`
- `blog/thumb3.jpg`
**Size**: 200 x 200 px | **Format**: JPG

### Brand Logos
- `brands/brand1.png` through `brands/brand6.png`
- **Size**: 300 x 150 px
- **Format**: PNG with transparent background
- **Description**: Logos of partner brands/suppliers
- **Location**: `/images/brands/`

## 📐 Image Specifications

### General Guidelines
- **Format**: JPG for photos, PNG for logos with transparency
- **Quality**: High resolution, optimized for web (compress without losing quality)
- **Color Space**: RGB
- **Max File Size**: 500KB for regular images, 200KB for thumbnails

### Optimization Tools
- **TinyPNG** (https://tinypng.com/) - Online compression
- **ImageOptim** - Desktop tool for Mac
- **Squoosh** (https://squoosh.app/) - Google's image optimizer
- **Adobe Photoshop** - Save for Web feature

### Aspect Ratios
- **Hero**: 16:9 (landscape)
- **Products**: 3:2 (landscape)
- **Team**: 4:5 (portrait)
- **Blog**: 16:10 (landscape)
- **Projects**: 4:3 (landscape)

## 🎨 Photography Guidelines

### Style
- **Modern and professional**
- **Well-lit with natural lighting when possible**
- **Clean, uncluttered backgrounds**
- **High contrast and sharp focus**
- **Consistent color temperature**

### For Product Photos
- Use neutral backgrounds (white, light gray)
- Multiple angles when possible
- Show texture and detail
- Include scale references when helpful

### For Project Photos
- Before and after shots
- Wide shots showing entire space
- Detail shots of finishes
- Natural lighting preferred
- Show materials in use

### For Team Photos
- Professional attire
- Neutral background
- Good lighting
- Genuine expressions
- Consistent style across all photos

## 🖼️ Placeholder Images

Until you have actual images, you can use placeholder services:

### Online Placeholder Services
1. **Unsplash** (https://unsplash.com/) - Free high-quality photos
   - Search: "construction", "modern building", "tiles", "interior design"

2. **Pexels** (https://pexels.com/) - Free stock photos
   - Good for construction and architecture images

3. **Pixabay** (https://pixabay.com/) - Free images
   - Wide variety of construction-related images

4. **Placeholder.com** - Generate placeholder images
   - URL format: `https://via.placeholder.com/600x400`

### Temporary Placeholders
Use the following URLs in your HTML temporarily:

```html
<!-- Hero -->
<img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop" alt="Hero">

<!-- Products -->
<img src="https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=400&fit=crop" alt="Flooring">

<!-- Projects -->
<img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" alt="Office">

<!-- Team -->
<img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop" alt="Team Member">
```

## 📝 Image Naming Convention

Follow this naming pattern:
- Use lowercase
- Separate words with hyphens
- Be descriptive but concise
- Include category prefix

**Examples:**
- ✅ `products/ceramic-tiles-white.jpg`
- ✅ `projects/hotel-lobby-marble.jpg`
- ✅ `team-member-ceo.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `photo.jpg`

## 🔄 Image Updates

When updating images:
1. Keep the same filename to avoid updating HTML
2. Clear browser cache to see changes
3. Maintain the same aspect ratio
4. Compress before uploading

## 📦 Bulk Image Processing

For processing multiple images:

### Using ImageMagick (Command Line)
```bash
# Resize all JPG files in a directory
mogrify -resize 800x600 -quality 85 *.jpg

# Convert to progressive JPG
mogrify -interlace Plane *.jpg
```

### Using Photoshop Actions
1. Create action for resize and optimize
2. Run batch process on entire folder
3. Save to optimized folder

## ✅ Quality Checklist

Before adding images to the website:
- [ ] Correct size and aspect ratio
- [ ] Optimized file size (< 500KB)
- [ ] Appropriate filename
- [ ] Proper format (JPG/PNG)
- [ ] Good lighting and composition
- [ ] Sharp and in focus
- [ ] Relevant to content
- [ ] Compressed for web

## 📞 Image Resources

If you need professional photography:
- Hire a local Ethiopian photographer
- Use local stock photo services
- Contact product suppliers for product images
- Request project photos from clients (with permission)

---

**Note**: Replace all placeholder images with actual GARA photos before launch for the most professional presentation.
