// ============================================================
// blog.js — Sanity CMS fetch + interactive blog UI
// GARA Construction Solutions PLC
// Features: live search, category filter, expand modal,
//           skeleton loading, animated cards
// ============================================================

const PROJECT_ID = 'ay18kbbr';
const DATASET    = 'production';

const QUERY = encodeURIComponent(
    '*[_type == "post"] | order(publishedAt desc) { title, body, slug, publishedAt, "imageUrl": mainImage.asset->url, "category": categories[0]->title }'
);
const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// ── State ───────────────────────────────────────────────────
let allPosts       = [];
let activeCategory = 'all';
let searchQuery    = '';

// ── Portable Text → HTML ────────────────────────────────────
function portableTextToHtml(body) {
    if (!body || !Array.isArray(body)) return '';

    return body.map(block => {
        if (block._type !== 'block') return '';

        const text = (block.children || []).map(span => {
            let t = span.text || '';
            (span.marks || []).forEach(mark => {
                if (mark === 'strong')    t = `<strong>${t}</strong>`;
                else if (mark === 'em')   t = `<em>${t}</em>`;
                else if (mark === 'underline') t = `<u>${t}</u>`;
                else if (mark === 'code') t = `<code>${t}</code>`;
            });
            return t;
        }).join('');

        const style = block.style || 'normal';
        switch (style) {
            case 'h1': return `<h1>${text}</h1>`;
            case 'h2': return `<h2>${text}</h2>`;
            case 'h3': return `<h3>${text}</h3>`;
            case 'h4': return `<h4>${text}</h4>`;
            case 'blockquote': return `<blockquote>${text}</blockquote>`;
            default:   return text ? `<p>${text}</p>` : '';
        }
    }).join('');
}

function extractExcerpt(body, maxChars = 180) {
    if (!body) return '';
    if (typeof body === 'string') return body.slice(0, maxChars) + (body.length > maxChars ? '…' : '');
    if (!Array.isArray(body)) return '';

    const text = body
        .filter(b => b._type === 'block' && b.children)
        .map(b => b.children.map(s => s.text || '').join(''))
        .join(' ');
    return text.length > maxChars ? text.slice(0, maxChars) + '…' : text;
}

function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function readTime(body) {
    if (!body || !Array.isArray(body)) return '1 min read';
    const words = body
        .filter(b => b._type === 'block' && b.children)
        .map(b => b.children.map(s => s.text || '').join(' '))
        .join(' ')
        .split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

// ── Skeleton loader ─────────────────────────────────────────
function showSkeletons(grid, count = 6) {
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const sk = document.createElement('div');
        sk.className = 'blog-skeleton-card';
        sk.style.animationDelay = `${i * 60}ms`;
        sk.innerHTML = `
            <div class="blog-sk-img"></div>
            <div class="blog-sk-body">
                <div class="blog-sk-line w-40"></div>
                <div class="blog-sk-line w-90 tall"></div>
                <div class="blog-sk-line w-80 tall"></div>
                <div class="blog-sk-line w-60"></div>
                <div class="blog-sk-line w-80"></div>
            </div>
        `;
        grid.appendChild(sk);
    }
}

// ── Filtering ───────────────────────────────────────────────
function getFilteredPosts() {
    return allPosts.filter(post => {
        const matchCat = activeCategory === 'all' ||
            (post.category || '').toLowerCase() === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch = !q ||
            (post.title || '').toLowerCase().includes(q) ||
            extractExcerpt(post.body, 9999).toLowerCase().includes(q) ||
            (post.category || '').toLowerCase().includes(q);
        return matchCat && matchSearch;
    });
}

// ── Render cards ────────────────────────────────────────────
function renderCards() {
    const grid    = document.querySelector('.blog-posts-grid');
    const counter = document.getElementById('blog-post-count');
    if (!grid) return;

    const posts = getFilteredPosts();
    if (counter) counter.textContent = posts.length;

    if (posts.length === 0) {
        grid.innerHTML = `
            <div class="blog-empty-state">
                <i class="fas fa-search"></i>
                <p>No articles found${searchQuery ? ` for "<strong>${searchQuery}</strong>"` : ''}.</p>
                <button onclick="clearFilters()" class="blog-clear-btn">Clear filters</button>
            </div>`;
        return;
    }

    grid.innerHTML = '';
    posts.forEach((post, i) => {
        const excerpt  = extractExcerpt(post.body);
        const date     = formatDate(post.publishedAt);
        const category = post.category || 'Article';
        const rt       = readTime(post.body);

        const card = document.createElement('article');
        card.className = 'blog-post-card';
        card.style.animationDelay = `${i * 55}ms`;
        card.setAttribute('data-category', category.toLowerCase());
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Read article: ${post.title}`);

        card.innerHTML = `
            <div class="bpc-image">
                ${post.imageUrl
                    ? `<img src="${post.imageUrl}" alt="${post.title}" loading="lazy">`
                    : `<div class="bpc-image-placeholder"><i class="fas fa-hard-hat"></i></div>`
                }
                <span class="bpc-category">${category}</span>
                <div class="bpc-image-overlay"></div>
            </div>
            <div class="bpc-body">
                <div class="bpc-meta">
                    ${date ? `<span><i class="far fa-calendar-alt"></i>${date}</span>` : ''}
                    <span><i class="far fa-clock"></i>${rt}</span>
                </div>
                <h3 class="bpc-title">${post.title}</h3>
                ${excerpt ? `<p class="bpc-excerpt">${excerpt}</p>` : ''}
                <div class="bpc-footer">
                    <span class="bpc-read-more">Read Article <i class="fas fa-arrow-right"></i></span>
                </div>
            </div>
        `;

        card.addEventListener('click',  () => openModal(post));
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(post); } });
        grid.appendChild(card);
    });
}

// ── Category filter tabs ────────────────────────────────────
function buildCategoryTabs() {
    const tabsContainer = document.getElementById('blog-category-tabs');
    if (!tabsContainer) return;

    const categories = ['all', ...new Set(
        allPosts.map(p => (p.category || '').toLowerCase()).filter(Boolean)
    )];

    tabsContainer.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'bcat-tag' + (cat === activeCategory ? ' active' : '');
        btn.textContent = cat === 'all' ? 'All Posts' : capitalize(cat);
        btn.setAttribute('data-category', cat);
        btn.addEventListener('click', () => {
            activeCategory = cat;
            tabsContainer.querySelectorAll('.bcat-tag').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards();
        });
        tabsContainer.appendChild(btn);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function clearFilters() {
    activeCategory = 'all';
    searchQuery    = '';
    const input = document.getElementById('blog-search-input');
    if (input) {
        input.value = '';
        const clearBtn = document.getElementById('blog-search-clear');
        if (clearBtn) clearBtn.style.opacity = '0';
    }
    document.querySelectorAll('.bcat-tag').forEach(b => {
        b.classList.toggle('active', b.dataset.category === 'all');
    });
    renderCards();
}

// ── Modal ───────────────────────────────────────────────────
function openModal(post) {
    const modal = document.getElementById('blog-modal');
    if (!modal) return;

    modal.querySelector('#modal-category').textContent = post.category || 'Article';
    modal.querySelector('#modal-title').textContent    = post.title || '';
    modal.querySelector('#modal-date').textContent     = formatDate(post.publishedAt);
    modal.querySelector('#modal-readtime').textContent = readTime(post.body);

    const img = modal.querySelector('#modal-image');
    if (post.imageUrl) {
        img.src = post.imageUrl;
        img.alt = post.title;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }

    modal.querySelector('#modal-body').innerHTML =
        portableTextToHtml(post.body) || '<p>No content available.</p>';

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.bmodal-panel').scrollTop = 0;

    const closeBtn = modal.querySelector('.bmodal-close');
    if (closeBtn) closeBtn.focus();
}

function closeModal() {
    const modal = document.getElementById('blog-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
}

// ── Fetch & Init ────────────────────────────────────────────
async function fetchBlogs() {
    const grid = document.querySelector('.blog-posts-grid');
    if (!grid) return;

    showSkeletons(grid, 6);

    try {
        const res  = await fetch(SANITY_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        allPosts   = data.result || [];

        buildCategoryTabs();
        renderCards();
    } catch (err) {
        console.error('Sanity fetch error:', err);
        grid.innerHTML = `
            <div class="blog-empty-state">
                <i class="fas fa-exclamation-triangle" style="color:#e07474"></i>
                <p>Failed to load blog posts. Please try again later.</p>
            </div>`;
        const counter = document.getElementById('blog-post-count');
        if (counter) counter.textContent = '0';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogs();

    // Live search
    const searchInput = document.getElementById('blog-search-input');
    const clearBtn    = document.getElementById('blog-search-clear');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value.trim().toLowerCase();
            if (clearBtn) clearBtn.style.opacity = searchInput.value ? '1' : '0';
            renderCards();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            clearBtn.style.opacity = '0';
            searchQuery = '';
            renderCards();
            if (searchInput) searchInput.focus();
        });
    }

    // Modal close button
    const closeBtn = document.querySelector('.bmodal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Click backdrop to close
    const modal = document.getElementById('blog-modal');
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });
    }

    // Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
});
