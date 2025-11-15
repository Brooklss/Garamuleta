// Dynamic Content Loader
// Loads blog posts and products from localStorage to display on live pages

class ContentLoader {
    constructor() {
        this.blogs = this.loadData('blogs') || [];
        this.products = this.loadData('products') || [];
    }

    loadData(key) {
        const data = localStorage.getItem(`gara_${key}`);
        return data ? JSON.parse(data) : null;
    }

    // Load blogs on blog page
    loadBlogPosts() {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid || this.blogs.length === 0) return;

        // Keep only the first 3 static blogs, then add dynamic ones
        const staticBlogs = Array.from(blogGrid.children).slice(0, 3);
        
        const dynamicBlogsHTML = this.blogs.map(blog => `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${blog.image}" alt="${blog.title}">
                    <div class="blog-category">${blog.category}</div>
                </div>
                <div class="blog-content">
                    <span class="blog-date"><i class="far fa-calendar"></i> ${blog.date}</span>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <a href="#" class="btn-text" onclick="viewBlogPost(${blog.id}); return false;">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');

        // Add dynamic blogs after static ones
        blogGrid.innerHTML = staticBlogs.map(el => el.outerHTML).join('') + dynamicBlogsHTML;
    }

    // Load blog posts on homepage
    loadHomepageBlogs() {
        const blogShowcase = document.querySelector('.blog-showcase .products-grid');
        if (!blogShowcase || this.blogs.length === 0) return;

        // Get first 3 blogs for homepage
        const recentBlogs = this.blogs.slice(0, 3);
        
        const blogsHTML = recentBlogs.map(blog => `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${blog.image}" alt="${blog.title}">
                    <div class="blog-category">${blog.category}</div>
                </div>
                <div class="blog-content">
                    <span class="blog-date"><i class="far fa-calendar"></i> ${blog.date}</span>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <a href="blog.html" class="btn-text">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');

        if (blogsHTML) {
            // Replace or append to existing content
            const existingCards = Array.from(blogShowcase.children).slice(0, 3);
            blogShowcase.innerHTML = existingCards.map(el => el.outerHTML).join('') + blogsHTML;
        }
    }

    // Load products on products page
    loadProducts() {
        if (this.products.length === 0) return;

        // Add products to the page dynamically
        const productsContainer = document.querySelector('.products-showcase');
        if (!productsContainer) return;

        // Group products by category
        const productsByCategory = {};
        this.products.forEach(product => {
            if (!productsByCategory[product.category]) {
                productsByCategory[product.category] = [];
            }
            productsByCategory[product.category].push(product);
        });

        // Add products to each category
        Object.keys(productsByCategory).forEach(category => {
            const categoryProducts = productsByCategory[category];
            const categorySection = document.querySelector(`[data-category="${category}"]`);
            
            if (categorySection) {
                const productsHTML = categoryProducts.map(product => `
                    <div class="product-item" data-category="${product.category}">
                        <div class="product-image">
                            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <ul class="product-features">
                                ${product.features.map(feature => `
                                    <li><i class="fas fa-check"></i> ${feature}</li>
                                `).join('')}
                            </ul>
                            <a href="contact.html" class="btn btn-primary">Request Quote</a>
                        </div>
                    </div>
                `).join('');

                // Append to category section
                const grid = categorySection.querySelector('.products-grid');
                if (grid) {
                    grid.insertAdjacentHTML('beforeend', productsHTML);
                }
            }
        });
    }

    // Load products on homepage showcase
    loadHomepageProducts() {
        if (this.products.length === 0) return;

        const showcaseGrid = document.querySelector('.products-showcase .products-grid');
        if (!showcaseGrid) return;

        // Get first 3 products for homepage
        const featuredProducts = this.products.slice(0, 3);
        
        const productsHTML = featuredProducts.map(product => `
            <div class="product-card">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-icon">
                    <i class="fas fa-box"></i>
                </div>
                <h3>${product.name}</h3>
                <p>${product.description.substring(0, 100)}...</p>
                <a href="products.html" class="btn-text">
                    Learn More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `).join('');

        if (productsHTML) {
            showcaseGrid.insertAdjacentHTML('beforeend', productsHTML);
        }
    }
}

// Initialize content loader when page loads
document.addEventListener('DOMContentLoaded', () => {
    const contentLoader = new ContentLoader();
    
    // Check which page we're on and load appropriate content
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'blog.html' || currentPage === '') {
        contentLoader.loadBlogPosts();
    }
    
    if (currentPage === 'index.html' || currentPage === '') {
        contentLoader.loadHomepageBlogs();
        contentLoader.loadHomepageProducts();
    }
    
    if (currentPage === 'products.html') {
        contentLoader.loadProducts();
    }
});

// View full blog post (modal or new page)
function viewBlogPost(id) {
    const blogs = JSON.parse(localStorage.getItem('gara_blogs')) || [];
    const blog = blogs.find(b => b.id === id);
    
    if (blog) {
        // Create a modal to show full blog content
        const modal = document.createElement('div');
        modal.className = 'blog-modal';
        modal.innerHTML = `
            <div class="blog-modal-content">
                <button class="blog-modal-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <img src="${blog.image}" alt="${blog.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 2rem;">
                <div class="blog-category" style="display: inline-block; background: var(--secondary-color); color: white; padding: 0.5rem 1rem; border-radius: 5px; margin-bottom: 1rem;">${blog.category}</div>
                <h1 style="color: var(--primary-color); margin-bottom: 1rem;">${blog.title}</h1>
                <p style="color: var(--text-light); margin-bottom: 2rem;"><i class="far fa-calendar"></i> ${blog.date} • By ${blog.author}</p>
                <div style="line-height: 1.8; color: var(--text-dark);">${blog.content.replace(/\n/g, '<br>')}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }
}

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .blog-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 2rem;
        overflow-y: auto;
    }
    
    .blog-modal-content {
        background: white;
        padding: 3rem;
        border-radius: 15px;
        max-width: 900px;
        width: 100%;
        position: relative;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .blog-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: var(--primary-color);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .blog-modal-close:hover {
        background: var(--accent-color);
        transform: rotate(90deg);
    }
`;
document.head.appendChild(modalStyles);
