// Supabase Content Loader
// Loads blog posts and products from Supabase to display on live pages

class SupabaseContentLoader {
    constructor() {
        this.supabase = window.supabaseClient;
        this.blogs = [];
        this.products = [];
        
        if (!this.supabase) {
            console.error('Supabase client not available in content loader');
            return;
        }
        
        this.init();
    }

    async init() {
        console.log('Initializing Supabase Content Loader...');
        
        await this.loadBlogs();
        await this.loadProducts();
        
        console.log('Loaded blogs:', this.blogs.length);
        console.log('Loaded products:', this.products.length);
        
        // Load content based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        console.log('Current page:', currentPage);
        
        if (currentPage.includes('blog.html')) {
            this.loadBlogPosts();
        } else if (currentPage.includes('index.html') || currentPage === '' || currentPage === '/') {
            this.loadHomepageBlogs();
            this.loadHomepageProducts();
        } else if (currentPage.includes('products.html')) {
            this.loadProductsPage();
        }
    }

    // Load data from Supabase
    async loadBlogs() {
        try {
            const { data, error } = await this.supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            this.blogs = data || [];
        } catch (error) {
            console.error('Error loading blogs:', error);
        }
    }

    async loadProducts() {
        try {
            const { data, error } = await this.supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            this.products = data || [];
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    // Load blogs on blog page
    loadBlogPosts() {
        console.log('Loading blog posts to page...');
        const blogContainer = document.querySelector('.blog-posts') || 
                             document.querySelector('.blog-grid') ||
                             document.querySelector('.blog-section .container');
        
        if (!blogContainer) {
            console.warn('Blog container not found on page (tried .blog-posts, .blog-grid)');
            return;
        }
        
        if (this.blogs.length === 0) {
            console.warn('No blogs to display');
            return;
        }

        console.log('Found blog container, adding', this.blogs.length, 'blogs');
        
        // Keep only the first 3 static blogs, then add dynamic ones
        const staticBlogs = Array.from(blogContainer.children).slice(0, 3);
        
        const dynamicBlogsHTML = this.blogs.map(blog => `
            <article class="blog-post-card" onclick="viewSupabaseBlogPost(${blog.id})">
                <div class="post-image">
                    <img src="${blog.image}" alt="${blog.title}">
                    <span class="post-category">${blog.category}</span>
                </div>
                <div class="post-content">
                    <h3><a href="#" onclick="event.stopPropagation(); viewSupabaseBlogPost(${blog.id}); return false;">${blog.title}</a></h3>
                    <p class="post-meta">
                        <span><i class="far fa-calendar"></i> ${new Date(blog.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                        <span><i class="far fa-user"></i> ${blog.author || 'Admin'}</span>
                    </p>
                    <p class="post-excerpt">
                        ${blog.excerpt}
                    </p>
                    <a href="#" class="read-more" onclick="event.stopPropagation(); viewSupabaseBlogPost(${blog.id}); return false;">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `).join('');

        console.log('Generated HTML for blogs:', dynamicBlogsHTML.substring(0, 200));
        blogContainer.innerHTML = staticBlogs.map(el => el.outerHTML).join('') + dynamicBlogsHTML;
        console.log('Blogs added to page successfully');
    }

    // Load blog posts on homepage
    loadHomepageBlogs() {
        console.log('Loading homepage blogs...');
        const blogShowcase = document.querySelector('.blog-showcase .products-grid');
        
        if (!blogShowcase) {
            console.warn('Blog showcase not found on homepage');
            return;
        }
        
        if (this.blogs.length === 0) {
            console.warn('No blogs to display on homepage');
            return;
        }

        console.log('Adding', this.blogs.length, 'blogs to homepage');
        
        // Get first 3 blogs for homepage
        const recentBlogs = this.blogs.slice(0, 3);
        
        const blogsHTML = recentBlogs.map(blog => `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${blog.image}" alt="${blog.title}">
                    <div class="blog-category">${blog.category}</div>
                </div>
                <div class="blog-content">
                    <span class="blog-date">
                        <i class="far fa-calendar"></i> 
                        ${new Date(blog.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </span>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <a href="blog.html" class="btn-text">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');

        if (blogsHTML) {
            // Get existing static content
            const existingCards = Array.from(blogShowcase.children).slice(0, 3);
            blogShowcase.innerHTML = existingCards.map(el => el.outerHTML).join('') + blogsHTML;
        }
    }

    // Load products on homepage
    loadHomepageProducts() {
        console.log('Loading homepage products...');
        const productsShowcase = document.querySelector('.products-showcase .products-grid');
        
        if (!productsShowcase) {
            console.warn('Products showcase not found on homepage');
            return;
        }
        
        if (this.products.length === 0) {
            console.warn('No products to display on homepage');
            return;
        }

        console.log('Adding', this.products.length, 'products to homepage');
        
        // Get first 6 products for homepage
        const featuredProducts = this.products.slice(0, 6);
        
        const productsHTML = featuredProducts.map(product => `
            <div class="product-item">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-overlay">
                        <span class="product-category">${product.category}</span>
                    </div>
                </div>
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <a href="products.html" class="btn-text">
                        Learn More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `).join('');

        if (productsHTML) {
            const existingProducts = Array.from(productsShowcase.children).slice(0, 6);
            productsShowcase.innerHTML = existingProducts.map(el => el.outerHTML).join('') + productsHTML;
        }
    }

    // Load products on products page
    loadProductsPage() {
        console.log('Loading products page...');
        
        if (this.products.length === 0) {
            console.warn('No products to display');
            return;
        }

        // Try multiple selectors for products container
        const productsContainer = document.querySelector('.products-showcase') || 
                                 document.querySelector('.products-grid') ||
                                 document.querySelector('#flooring .products-showcase');
        
        if (!productsContainer) {
            console.warn('Products container not found (tried .products-showcase, .products-grid)');
            return;
        }

        console.log('Found products container, adding', this.products.length, 'products to page');
        
        // Keep static products and add dynamic ones
        const staticProducts = Array.from(productsContainer.children).slice(0, 6);

        const dynamicProductsHTML = this.products.map(product => `
            <div class="product-item" data-category="${product.category.toLowerCase()}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <ul class="product-features">
                        ${Array.isArray(product.features) 
                            ? product.features.slice(0, 3).map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('') 
                            : ''}
                    </ul>
                    <a href="contact.html" class="btn btn-primary">Request Quote</a>
                </div>
            </div>
        `).join('');

        console.log('Generated HTML for products:', dynamicProductsHTML.substring(0, 200));
        productsContainer.innerHTML = staticProducts.map(el => el.outerHTML).join('') + dynamicProductsHTML;
        console.log('Products added to page successfully');
    }
}

// View blog post in modal
async function viewSupabaseBlogPost(id) {
    const supabase = window.supabaseClient;
    
    try {
        const { data: blog, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        if (!blog) return;

        const modal = document.getElementById('blogModal');
        if (!modal) {
            // Create modal if it doesn't exist
            const modalHTML = `
                <div id="blogModal" class="modal">
                    <div class="modal-content">
                        <span class="modal-close">&times;</span>
                        <div id="blogModalContent"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        const modalContent = document.getElementById('blogModalContent');
        modalContent.innerHTML = `
            <article class="blog-detail">
                <div class="blog-detail-image-wrapper">
                    <img src="${blog.image}" alt="${blog.title}">
                    <div class="blog-detail-category">${blog.category}</div>
                </div>
                <div class="blog-detail-body">
                    <h1>${blog.title}</h1>
                    <div class="blog-detail-meta">
                        <span><i class="far fa-calendar"></i> ${new Date(blog.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                        <span><i class="far fa-user"></i> ${blog.author}</span>
                    </div>
                    <div class="blog-detail-content">
                        ${blog.content.split('\n').map(p => `<p>${p}</p>`).join('')}
                    </div>
                </div>
            </article>
        `;

        document.getElementById('blogModal').style.display = 'block';

        // Close modal
        document.querySelector('.modal-close').onclick = function() {
            document.getElementById('blogModal').style.display = 'none';
        };

        window.onclick = function(event) {
            if (event.target == document.getElementById('blogModal')) {
                document.getElementById('blogModal').style.display = 'none';
            }
        };
    } catch (error) {
        console.error('Error loading blog post:', error);
        alert('Failed to load blog post.');
    }
}

// Initialize content loader when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking for Supabase client...');
    
    // Check if Supabase is available
    if (typeof window.supabaseClient !== 'undefined') {
        console.log('Supabase client found, initializing content loader');
        new SupabaseContentLoader();
    } else {
        console.error('Supabase client not initialized. Content will not be loaded.');
        console.log('Make sure supabase-config.js is loaded before supabase-content-loader.js');
    }
});
