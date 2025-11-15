// Admin Dashboard JavaScript
// Manages blog posts and products using localStorage

class AdminManager {
    constructor() {
        this.blogs = this.loadData('blogs') || [];
        this.products = this.loadData('products') || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStats();
        this.renderBlogs();
        this.renderProducts();
    }

    // Data Management
    loadData(key) {
        const data = localStorage.getItem(`gara_${key}`);
        return data ? JSON.parse(data) : null;
    }

    saveData(key, data) {
        localStorage.setItem(`gara_${key}`, JSON.stringify(data));
        this.updateStats();
        this.updateLastUpdated();
    }

    // Event Listeners
    setupEventListeners() {
        // Blog Form
        document.getElementById('blogForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBlog();
        });

        // Product Form
        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProduct();
        });
    }

    // Blog Management
    addBlog() {
        const blog = {
            id: Date.now(),
            title: document.getElementById('blogTitle').value,
            category: document.getElementById('blogCategory').value,
            excerpt: document.getElementById('blogExcerpt').value,
            content: document.getElementById('blogContent').value,
            image: document.getElementById('blogImage').value,
            author: document.getElementById('blogAuthor').value,
            date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        };

        this.blogs.unshift(blog);
        this.saveData('blogs', this.blogs);
        this.renderBlogs();
        this.showAlert('success', 'Blog post published successfully!');
        document.getElementById('blogForm').reset();
    }

    deleteBlog(id) {
        if (confirm('Are you sure you want to delete this blog post?')) {
            this.blogs = this.blogs.filter(blog => blog.id !== id);
            this.saveData('blogs', this.blogs);
            this.renderBlogs();
            this.showAlert('success', 'Blog post deleted successfully!');
        }
    }

    editBlog(id) {
        const blog = this.blogs.find(b => b.id === id);
        if (blog) {
            document.getElementById('blogTitle').value = blog.title;
            document.getElementById('blogCategory').value = blog.category;
            document.getElementById('blogExcerpt').value = blog.excerpt;
            document.getElementById('blogContent').value = blog.content;
            document.getElementById('blogImage').value = blog.image;
            document.getElementById('blogAuthor').value = blog.author;

            // Delete the old entry
            this.blogs = this.blogs.filter(b => b.id !== id);
            this.saveData('blogs', this.blogs);
            this.renderBlogs();

            // Scroll to form
            switchTab('blog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.showAlert('success', 'Blog loaded for editing. Update and save!');
        }
    }

    renderBlogs() {
        const blogList = document.getElementById('blogList');
        
        if (this.blogs.length === 0) {
            blogList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>No blog posts yet. Create your first post!</p>
                </div>
            `;
            return;
        }

        blogList.innerHTML = this.blogs.map(blog => `
            <div class="item-row">
                <div class="item-info">
                    <h3>${blog.title}</h3>
                    <p><i class="fas fa-tag"></i> ${blog.category} • ${blog.date}</p>
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
    addProduct() {
        const featuresText = document.getElementById('productFeatures').value;
        const features = featuresText.split('\n').filter(f => f.trim());

        const product = {
            id: Date.now(),
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value,
            features: features,
            image: document.getElementById('productImage').value,
            badge: document.getElementById('productBadge').value
        };

        this.products.unshift(product);
        this.saveData('products', this.products);
        this.renderProducts();
        this.showAlert('success', 'Product added successfully!');
        document.getElementById('productForm').reset();
    }

    deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.products = this.products.filter(product => product.id !== id);
            this.saveData('products', this.products);
            this.renderProducts();
            this.showAlert('success', 'Product deleted successfully!');
        }
    }

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productFeatures').value = product.features.join('\n');
            document.getElementById('productImage').value = product.image;
            document.getElementById('productBadge').value = product.badge || '';

            // Delete the old entry
            this.products = this.products.filter(p => p.id !== id);
            this.saveData('products', this.products);
            this.renderProducts();

            // Scroll to form
            switchTab('products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.showAlert('success', 'Product loaded for editing. Update and save!');
        }
    }

    renderProducts() {
        const productList = document.getElementById('productList');
        
        if (this.products.length === 0) {
            productList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                    <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>No products yet. Add your first product!</p>
                </div>
            `;
            return;
        }

        productList.innerHTML = this.products.map(product => `
            <div class="item-row">
                <div class="item-info">
                    <h3>${product.name} ${product.badge ? `<span style="color: var(--secondary-color); font-size: 0.8rem;">[${product.badge}]</span>` : ''}</h3>
                    <p><i class="fas fa-layer-group"></i> ${this.getCategoryName(product.category)} • ${product.features.length} features</p>
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

    getCategoryName(category) {
        const categories = {
            'flooring': 'Flooring',
            'wall-cladding': 'Wall Cladding',
            'ceiling': 'Ceiling Systems',
            'sanitary': 'Sanitary',
            'paints': 'Paints',
            'decorative': 'Decorative'
        };
        return categories[category] || category;
    }

    // UI Updates
    updateStats() {
        document.getElementById('totalBlogs').textContent = this.blogs.length;
        document.getElementById('totalProducts').textContent = this.products.length;
    }

    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
        });
        document.getElementById('lastUpdated').textContent = timeString;
    }

    showAlert(type, message) {
        const alertId = type === 'success' ? 'successAlert' : 'errorAlert';
        const messageId = type === 'success' ? 'successMessage' : 'errorMessage';
        
        const alertEl = document.getElementById(alertId);
        const messageEl = document.getElementById(messageId);
        
        messageEl.textContent = message;
        alertEl.classList.add('show');
        
        setTimeout(() => {
            alertEl.classList.remove('show');
        }, 4000);

        // Scroll to top to see alert
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Export/Import (Future feature)
    exportData() {
        const data = {
            blogs: this.blogs,
            products: this.products,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gara-data-backup.json';
        link.click();
    }
}

// Tab Switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

// Initialize Admin Manager
let adminManager;
document.addEventListener('DOMContentLoaded', () => {
    adminManager = new AdminManager();
});

// Export data function (can be called from console)
function exportBackup() {
    adminManager.exportData();
}
