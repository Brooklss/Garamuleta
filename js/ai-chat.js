// ============================================================
// ai-chat.js — Floating AI Chat Widget
// GARA Construction Solutions PLC
// Talks to Express backend at localhost:5000/api/chat
// ============================================================

(function () {
    'use strict';

    const API_URL = 'http://localhost:5000/api/chat';

    // Conversation history for multi-turn context (role/text pairs)
    let history = [];
    let isWaiting = false;

    // Suggestion chips shown on first open
    const SUGGESTIONS = [
        'Which water heater is best for my family?',
        'What is the price of a 50L electric heater?',
        'Do you offer solar water heaters?',
        'How do I get installation service?',
    ];

    // ── Inject HTML ────────────────────────────────────────────
    function injectWidget() {
        const html = `
        <!-- AI Chat Toggle Button -->
        <button id="gara-chat-toggle" aria-label="Open AI assistant" title="Chat with GARA Assistant">
            <i class="fas fa-robot chat-icon"></i>
            <i class="fas fa-times close-icon"></i>
            <span id="gara-chat-unread"></span>
        </button>

        <!-- AI Chat Window -->
        <div id="gara-chat-window" role="dialog" aria-label="GARA AI Assistant" aria-live="polite">
            <div class="gchat-header">
                <div class="gchat-avatar">
                    <i class="fas fa-hard-hat"></i>
                    <span class="gchat-avatar-dot"></span>
                </div>
                <div class="gchat-header-info">
                    <div class="gchat-header-name">Tekcon Assistant</div>
                    <div class="gchat-header-status">Online · Powered by Gemini AI</div>
                </div>
                    <button class="gchat-clear-btn" id="gara-chat-clear" title="Clear chat">
                    <i class="fas fa-trash-alt"></i> Clear
                </button>
            </div>

            <div class="gchat-messages" id="gara-chat-messages"></div>

            <div class="gchat-input-wrap">
                <textarea
                    id="gara-chat-input"
                    placeholder="Ask about water heaters…"
                    rows="1"
                    aria-label="Chat message"
                ></textarea>
                <button id="gara-chat-send" aria-label="Send message" title="Send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            <div class="gchat-powered">Powered by <span>Google Gemini AI</span></div>
        </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.id = 'gara-chat-root';
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
    }

    // ── Time formatter ─────────────────────────────────────────
    function nowTime() {
        return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    // ── Append a message bubble ────────────────────────────────
    function appendMessage(role, text) {
        const container = document.getElementById('gara-chat-messages');
        if (!container) return;

        const msg = document.createElement('div');
        msg.className = `gchat-msg ${role}`;

        const bubble = document.createElement('div');
        bubble.className = 'gchat-bubble';
        // Render simple markdown-ish formatting
        bubble.innerHTML = formatText(text);

        const ts = document.createElement('div');
        ts.className = 'gchat-timestamp';
        ts.textContent = nowTime();

        msg.appendChild(bubble);
        msg.appendChild(ts);
        container.appendChild(msg);
        scrollToBottom();
    }

    // ── Format AI text (basic markdown) ───────────────────────
    function formatText(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code style="background:rgba(136,178,145,0.15);padding:0.1em 0.35em;border-radius:4px;font-size:0.85em;">$1</code>')
            .replace(/\n/g, '<br>');
    }

    // ── Show typing indicator ──────────────────────────────────
    function showTyping() {
        const container = document.getElementById('gara-chat-messages');
        if (!container) return;
        const el = document.createElement('div');
        el.className = 'gchat-typing';
        el.id = 'gara-typing';
        el.innerHTML = '<span></span><span></span><span></span>';
        container.appendChild(el);
        scrollToBottom();
    }

    function removeTyping() {
        const el = document.getElementById('gara-typing');
        if (el) el.remove();
    }

    // ── Scroll to bottom ───────────────────────────────────────
    function scrollToBottom() {
        const container = document.getElementById('gara-chat-messages');
        if (container) container.scrollTop = container.scrollHeight;
    }

    // ── Render suggestion chips ────────────────────────────────
    function renderSuggestions() {
        const container = document.getElementById('gara-chat-messages');
        if (!container) return;

        const wrap = document.createElement('div');
        wrap.className = 'gchat-suggestions';
        wrap.id = 'gara-chips';

        SUGGESTIONS.forEach(text => {
            const chip = document.createElement('button');
            chip.className = 'gchat-chip';
            chip.textContent = text;
            chip.addEventListener('click', () => {
                const el = document.getElementById('gara-chips');
                if (el) el.remove();
                sendMessage(text);
            });
            wrap.appendChild(chip);
        });

        container.appendChild(wrap);
        scrollToBottom();
    }

    // ── Send message ───────────────────────────────────────────
    async function sendMessage(text) {
        const input   = document.getElementById('gara-chat-input');
        const sendBtn = document.getElementById('gara-chat-send');
        const msg     = (text || (input && input.value.trim()));

        if (!msg || isWaiting) return;

        // Remove suggestion chips if still showing
        const chips = document.getElementById('gara-chips');
        if (chips) chips.remove();

        // Clear input
        if (input) { input.value = ''; autoResize(input); }

        // Disable send button
        isWaiting = true;
        if (sendBtn) sendBtn.disabled = true;

        // Show user message
        appendMessage('user', msg);

        // Add to history
        history.push({ role: 'user', text: msg });

        // Show typing
        showTyping();

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg, history: history.slice(-10) }), // send last 5 turns
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            const reply = data.reply || 'Sorry, I didn\'t get a response. Please try again.';

            removeTyping();
            appendMessage('ai', reply);

            // Save AI reply to history
            history.push({ role: 'model', text: reply });

        } catch (err) {
            console.error('Chat error:', err);
            removeTyping();
            appendMessage('ai', '⚠️ I\'m having trouble connecting. Please check your internet connection or try again shortly.');
        } finally {
            isWaiting = false;
            if (sendBtn) sendBtn.disabled = false;
            if (input) input.focus();
        }
    }

    // ── Auto-resize textarea ───────────────────────────────────
    function autoResize(el) {
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }

    // ── Toggle window ──────────────────────────────────────────
    let isOpen = false;
    let hasOpened = false;

    function toggleChat() {
        const win    = document.getElementById('gara-chat-window');
        const toggle = document.getElementById('gara-chat-toggle');
        const unread = document.getElementById('gara-chat-unread');
        if (!win || !toggle) return;

        isOpen = !isOpen;
        win.classList.toggle('is-open', isOpen);
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);

        if (isOpen) {
            // Hide unread dot
            if (unread) unread.style.display = 'none';
            const input = document.getElementById('gara-chat-input');
            if (input) setTimeout(() => input.focus(), 300);

            // Show welcome + chips on first open
            if (!hasOpened) {
                hasOpened = true;
                appendMessage('ai', '👋 ሰላም! I\'m your **Tekcon Assistant** — here to help you find the right water heater for your home or business. What can I help you with? / Hello! Ask me about our electric, solar, or gas water heaters.');
                setTimeout(renderSuggestions, 350);
            }
        }
    }

    // ── Clear chat ─────────────────────────────────────────────
    function clearChat() {
        history = [];
        hasOpened = false;
        const container = document.getElementById('gara-chat-messages');
        if (container) container.innerHTML = '';
        // Re-show welcome
        appendMessage('ai', '🔄 Chat cleared! How can I help you find the right water heater?');
        setTimeout(renderSuggestions, 350);
    }

    // ── Boot ───────────────────────────────────────────────────
    function init() {
        injectWidget();

        // Show unread dot after 3s to grab attention
        setTimeout(() => {
            const dot = document.getElementById('gara-chat-unread');
            if (dot && !isOpen) dot.style.display = 'block';
        }, 3000);

        // Event listeners
        document.getElementById('gara-chat-toggle')
            ?.addEventListener('click', toggleChat);

        document.getElementById('gara-chat-send')
            ?.addEventListener('click', () => sendMessage());

        document.getElementById('gara-chat-clear')
            ?.addEventListener('click', clearChat);

        const input = document.getElementById('gara-chat-input');
        if (input) {
            input.addEventListener('keydown', e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            input.addEventListener('input', () => autoResize(input));
        }
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
