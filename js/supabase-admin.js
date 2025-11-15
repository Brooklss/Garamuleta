// Supabase Admin Manager
// Manages blog posts and products using Supabase

class SupabaseAdminManager {
    constructor() {
        this.supabase = window.supabaseClient;
        this.blogs = [];
        this.products = [];
        this.init();
    }

    async init() {
        await this.loadBlogs();
        await this.loadProducts();
        this.setupEventListeners();
        this.updateStats();
        this.renderBlogs();
        this.renderProducts();
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
            this.showAlert('error', 'Failed to load blog posts: ' + error.message);
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
            this.showAlert('error', 'Failed to load products: ' + error.message);
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Blog Form
        document.getElementById('blogForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const editId = document.getElementById('blogForm').dataset.editId;
            if (editId) {
                await this.updateBlog(parseInt(editId));
            } else {
                await this.addBlog();
            }
        });

        // Product Form
        document.getElementById('productForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const editId = document.getElementById('productForm').dataset.editId;
            if (editId) {
                await this.updateProduct(parseInt(editId));
            } else {
                await this.addProduct();
            }
        });
    }

    // Blog Management
    async addBlog() {
        try {
            const blog = {
                title: document.getElementById('blogTitle').value,
                category: document.getElementById('blogCategory').value,
                excerpt: document.getElementById('blogExcerpt').value,
                content: document.getElementById('blogContent').value,
                image: document.getElementById('blogImage').value,
                author: document.getElementById('blogAuthor').value,
                created_at: new Date().toISOString()
            };

            const { data, error } = await this.supabase
                .from('blog_posts')
                .insert([blog])
                .select();

            if (error) throw error;

            await this.loadBlogs();
            this.renderBlogs();
            this.updateStats();
            this.showAlert('success', 'Blog post published successfully!');
            document.getElementById('blogForm').reset();
        } catch (error) {
            console.error('Error adding blog:', error);
            this.showAlert('error', 'Failed to publish blog post: ' + error.message);
        }
    }

    async deleteBlog(id) {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const { error } = await this.supabase
                .from('blog_posts')
                .delete()
                .eq('id', id);

            if (error) throw error;

            await this.loadBlogs();
            this.renderBlogs();
            this.updateStats();
            this.showAlert('success', 'Blog post deleted successfully!');
        } catch (error) {
            console.error('Error deleting blog:', error);
            this.showAlert('error', 'Failed to delete blog post: ' + error.message);
        }
    }

    async editBlog(id) {
        const blog = this.blogs.find(b => b.id === id);
        if (!blog) return;

        document.getElementById('blogTitle').value = blog.title;
        document.getElementById('blogCategory').value = blog.category;
        document.getElementById('blogExcerpt').value = blog.excerpt;
        document.getElementById('blogContent').value = blog.content;
        document.getElementById('blogImage').value = blog.image;
        document.getElementById('blogAuthor').value = blog.author;

        // Store the blog ID for updating
        document.getElementById('blogForm').dataset.editId = id;

        // Update button text
        const submitBtn = document.querySelector('#blogForm button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Blog Post';

        switchTab('blog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.showAlert('success', 'Blog loaded for editing. Update and save!');
    }

    async updateBlog(id) {
        try {
            const blog = {
                title: document.getElementById('blogTitle').value,
                category: document.getElementById('blogCategory').value,
                excerpt: document.getElementById('blogExcerpt').value,
                content: document.getElementById('blogContent').value,
                image: document.getElementById('blogImage').value,
                author: document.getElementById('blogAuthor').value,
                updated_at: new Date().toISOString()
            };

            const { error } = await this.supabase
                .from('blog_posts')
                .update(blog)
                .eq('id', id);

            if (error) throw error;

            delete document.getElementById('blogForm').dataset.editId;
            const submitBtn = document.querySelector('#blogForm button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Publish Blog Post';

            await this.loadBlogs();
            this.renderBlogs();
            this.updateStats();
            this.showAlert('success', 'Blog post updated successfully!');
            document.getElementById('blogForm').reset();
        } catch (error) {
            console.error('Error updating blog:', error);
            this.showAlert('error', 'Failed to update blog post: ' + error.message);
        }
    }

    renderBlogs() {
        const blogList = document.getElementById('blogList');
        if (!blogList) return;

        if (this.blogs.length === 0) {
            blogList.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 2rem;">No blog posts yet. Create your first one!</p>';
            return;
        }

        blogList.innerHTML = this.blogs.map(blog => `
            <div class="item-row">
                <div class="item-info">
                    <h3>${blog.title}</h3>
                    <p>${blog.category} • ${new Date(blog.created_at).toLocaleDateString()}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-icon edit" onclick="adminManager.editBlog(${blog.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="adminManager.deleteBlog(${blog.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Product Management
    async addProduct() {
        try {
            const features = document.getElementById('productFeatures').value
                .split('\n')
                .filter(f => f.trim());

            const product = {
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                description: document.getElementById('productDescription').value,
                features: features,
                image: document.getElementById('productImage').value,
                created_at: new Date().toISOString()
            };

            const { data, error } = await this.supabase
                .from('products')
                .insert([product])
                .select();

            if (error) throw error;

            await this.loadProducts();
            this.renderProducts();
            this.updateStats();
            this.showAlert('success', 'Product added successfully!');
            document.getElementById('productForm').reset();
        } catch (error) {
            console.error('Error adding product:', error);
            this.showAlert('error', 'Failed to add product: ' + error.message);
        }
    }

    async deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const { error } = await this.supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            await this.loadProducts();
            this.renderProducts();
            this.updateStats();
            this.showAlert('success', 'Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            this.showAlert('error', 'Failed to delete product: ' + error.message);
        }
    }

    async editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;

        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productFeatures').value = Array.isArray(product.features) 
            ? product.features.join('\n') 
            : product.features;
        document.getElementById('productImage').value = product.image;

        document.getElementById('productForm').dataset.editId = id;

        const submitBtn = document.querySelector('#productForm button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Product';

        switchTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.showAlert('success', 'Product loaded for editing. Update and save!');
    }

    async updateProduct(id) {
        try {
            const features = document.getElementById('productFeatures').value
                .split('\n')
                .filter(f => f.trim());

            const product = {
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                description: document.getElementById('productDescription').value,
                features: features,
                image: document.getElementById('productImage').value,
                updated_at: new Date().toISOString()
            };

            const { error } = await this.supabase
                .from('products')
                .update(product)
                .eq('id', id);

            if (error) throw error;

            delete document.getElementById('productForm').dataset.editId;
            const submitBtn = document.querySelector('#productForm button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Add Product';

            await this.loadProducts();
            this.renderProducts();
            this.updateStats();
            this.showAlert('success', 'Product updated successfully!');
            document.getElementById('productForm').reset();
        } catch (error) {
            console.error('Error updating product:', error);
            this.showAlert('error', 'Failed to update product: ' + error.message);
        }
    }

    renderProducts() {
        const productList = document.getElementById('productList');
        if (!productList) return;

        if (this.products.length === 0) {
            productList.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 2rem;">No products yet. Add your first one!</p>';
            return;
        }

        productList.innerHTML = this.products.map(product => `
            <div class="item-row">
                <div class="item-info">
                    <h3>${product.name}</h3>
                    <p>${product.category} • ${new Date(product.created_at).toLocaleDateString()}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-icon edit" onclick="adminManager.editProduct(${product.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="adminManager.deleteProduct(${product.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Stats and UI
    updateStats() {
        const blogCountEl = document.getElementById('blogCount') || document.getElementById('totalBlogs');
        const productCountEl = document.getElementById('productCount') || document.getElementById('totalProducts');
        
        if (blogCountEl) blogCountEl.textContent = this.blogs.length;
        if (productCountEl) productCountEl.textContent = this.products.length;
        
        // Count unique categories
        const categories = new Set([
            ...this.blogs.map(b => b.category),
            ...this.products.map(p => p.category)
        ]);
        
        const categoryCountEl = document.getElementById('categoryCount');
        if (categoryCountEl) categoryCountEl.textContent = categories.size;
    }

    updateLastUpdated() {
        const lastUpdated = document.getElementById('lastUpdated');
        if (lastUpdated) {
            lastUpdated.textContent = 'Today';
        }
    }

    showAlert(type, message) {
        // Try new structure first
        let alert = document.getElementById(type === 'success' ? 'successAlert' : 'errorAlert');
        
        // Fallback to old structure
        if (!alert) {
            alert = document.getElementById('alert');
        }
        
        if (!alert) {
            // Create alert if it doesn't exist
            alert = document.createElement('div');
            alert.id = 'alert';
            alert.className = 'alert';
            document.querySelector('.admin-container').insertBefore(alert, document.querySelector('.admin-tabs'));
        }

        // Handle new structure with separate alerts
        if (alert.id === 'successAlert' || alert.id === 'errorAlert') {
            const messageSpan = alert.querySelector('span');
            if (messageSpan) {
                messageSpan.textContent = message;
            } else {
                alert.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
            }
        } else {
            // Old structure
            alert.className = `alert alert-${type}`;
            alert.textContent = message;
        }
        
        alert.classList.add('show');

        setTimeout(() => {
            alert.classList.remove('show');
        }, 4000);
    }
}

// Tab switching function
function switchTab(tab) {
    const tabs = document.querySelectorAll('.admin-tab');
    const sections = document.querySelectorAll('.admin-section');

    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    // Find tab by data-tab attribute or by onclick content
    const targetTab = document.querySelector(`[data-tab="${tab}"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Find section - try both formats
    const section = document.getElementById(tab) || document.getElementById(`${tab}Section`);
    if (section) {
        section.classList.add('active');
    }
}

// Initialize admin manager when page loads
let adminManager;
document.addEventListener('DOMContentLoaded', () => {
    // Check if Supabase is available
    if (typeof window.supabaseClient === 'undefined') {
        console.error('Supabase client not initialized. Please check your configuration.');
        alert('Supabase connection failed. Please check your configuration in supabase-config.js');
        return;
    }

    adminManager = new SupabaseAdminManager();
});
