const getBackendURL = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000/api';
    }
    return `${window.location.origin}/api`;
};

const API_URL = window.__BACKEND_URL || getBackendURL();

const STORIES = [
    { user: 'your_story', label: 'Your story', color: '#ff6f64' },
    { user: 'alex_smith', label: 'alex_smith', color: '#4ecdc4' },
    { user: 'jane_doe', label: 'jane_doe', color: '#45b7d1' },
    { user: 'mike_johnson', label: 'mike_johnson', color: '#f9d56e' },
    { user: 'travel_hub', label: 'travel_hub', color: '#49cc90' }
];

const SUGGESTED_USERS = [
    { user: 'sarah_art', meta: 'Followed by alex_smith', color: '#5f67e7' },
    { user: 'photo_pro', meta: 'Followed by jane_doe', color: '#f24e4e' },
    { user: 'travel_hub', meta: 'Popular creator', color: '#49cc90' },
    { user: 'daily.recipes', meta: 'New to your feed', color: '#f09f4f' },
    { user: 'city.frames', meta: 'Photography', color: '#6b75ff' }
];

const INITIAL_POSTS = [
    {
        id: 1,
        author: 'alex_smith',
        location: 'New York, USA',
        avatar: '#4ecdc4',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 750'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2326c6da'/%3E%3Cstop offset='100%25' stop-color='%2300879f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1000' height='750' fill='url(%23g1)'/%3E%3Ccircle cx='790' cy='165' r='70' fill='rgba(255,255,255,0.26)'/%3E%3Ctext x='88' y='650' fill='white' font-size='72' font-family='Arial' font-weight='700'%3ECITY SUNSET%3C/text%3E%3C/svg%3E",
        caption: 'Golden hour over the city streets. Perfect light today.',
        likes: 2543,
        liked: false,
        saved: false,
        createdAt: '2h',
        comments: ['wow vibe', 'this is clean']
    },
    {
        id: 2,
        author: 'jane_doe',
        location: 'Los Angeles, USA',
        avatar: '#45b7d1',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 750'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23ff9f43'/%3E%3Cstop offset='100%25' stop-color='%23ff6b6b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1000' height='750' fill='url(%23g2)'/%3E%3Ctext x='90' y='640' fill='white' font-size='68' font-family='Arial' font-weight='700'%3EBEACH DAY%3C/text%3E%3C/svg%3E",
        caption: 'Beach day with friends. Sun, breeze, and no deadlines.',
        likes: 3891,
        liked: false,
        saved: false,
        createdAt: '4h',
        comments: ['need this trip', 'great colors']
    },
    {
        id: 3,
        author: 'mike_johnson',
        location: 'Seattle, USA',
        avatar: '#f9d56e',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 750'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%237171ff'/%3E%3Cstop offset='100%25' stop-color='%23374bff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1000' height='750' fill='url(%23g3)'/%3E%3Ctext x='90' y='640' fill='white' font-size='68' font-family='Arial' font-weight='700'%3EMOUNTAIN TRAIL%3C/text%3E%3C/svg%3E",
        caption: 'Morning hike before work. Reset the mind.',
        likes: 1567,
        liked: false,
        saved: false,
        createdAt: '6h',
        comments: ['so fresh', 'goals']
    },
    {
        id: 4,
        author: 'sarah_art',
        location: 'Paris, France',
        avatar: '#5f67e7',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 750'%3E%3Cdefs%3E%3ClinearGradient id='g4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f368e0'/%3E%3Cstop offset='100%25' stop-color='%238576ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1000' height='750' fill='url(%23g4)'/%3E%3Ctext x='90' y='640' fill='white' font-size='68' font-family='Arial' font-weight='700'%3EART STUDIO%3C/text%3E%3C/svg%3E",
        caption: 'Color study from today in my studio.',
        likes: 4102,
        liked: false,
        saved: false,
        createdAt: '8h',
        comments: ['love this palette', 'amazing work']
    }
];

const state = {
    currentView: 'home',
    searchTerm: '',
    posts: INITIAL_POSTS.map((post) => ({ ...post })),
    following: new Set(['alex_smith']),
    toastTimer: null,
    user: {
        username: 'user',
        fullName: 'Instagram User',
        email: 'user@instagram.com',
        preferredTheme: localStorage.getItem('theme') || 'light'
    }
};

const dom = {
    feedPosts: document.getElementById('feedPosts'),
    storiesSection: document.getElementById('storiesSection'),
    suggestedList: document.getElementById('suggestedList'),
    feedStateText: document.getElementById('feedStateText'),
    feedSearch: document.getElementById('feedSearch'),
    sidebarNav: document.getElementById('sidebarNav'),
    profileBtn: document.getElementById('profileBtn'),
    profileModal: document.getElementById('profileModal'),
    closeProfileModalBtn: document.getElementById('closeProfileModalBtn'),
    editProfileBtn: document.getElementById('editProfileBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    logoutModalBtn: document.getElementById('logoutModalBtn'),
    toast: document.getElementById('toast'),
    notificationBtn: document.getElementById('notificationBtn'),
    messageBtn: document.getElementById('messageBtn'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    seeAllSuggestions: document.getElementById('seeAllSuggestions')
};

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getInitial(name) {
    return name && name.length > 0 ? name[0].toUpperCase() : 'U';
}

function showToast(message, type = 'info') {
    if (!dom.toast) {
        return;
    }

    dom.toast.textContent = message;
    dom.toast.style.borderColor = type === 'error' ? 'var(--danger)' : type === 'success' ? 'var(--success)' : 'var(--border)';
    dom.toast.classList.add('show');

    if (state.toastTimer) {
        window.clearTimeout(state.toastTimer);
    }

    state.toastTimer = window.setTimeout(() => {
        dom.toast.classList.remove('show');
    }, 1700);
}

function applyTheme(theme) {
    const useDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', useDark);
    document.documentElement.style.colorScheme = useDark ? 'dark' : 'light';
    localStorage.setItem('theme', useDark ? 'dark' : 'light');
    state.user.preferredTheme = useDark ? 'dark' : 'light';
}

function getAvatarSvg(color, text) {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
}

function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        const loginPath = window.location.pathname.includes('/frontend/')
            ? '/instagram-login-clone/frontend/'
            : '/';
        window.location.href = loginPath;
        return false;
    }
    return true;
}

async function loadUserData() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('User load failed:', error);
        return null;
    }
}

function buildStories() {
    dom.storiesSection.innerHTML = STORIES.map((story) => {
        const avatar = getAvatarSvg(story.color, getInitial(story.label));
        return `
            <button class="story-item" type="button" data-user="${escapeHtml(story.user)}">
                <span class="story-avatar">
                    <img src="${avatar}" alt="${escapeHtml(story.label)}">
                </span>
                <span class="story-name">${escapeHtml(story.label)}</span>
            </button>
        `;
    }).join('');
}

function buildSuggestions() {
    dom.suggestedList.innerHTML = SUGGESTED_USERS.map((item) => {
        const avatar = getAvatarSvg(item.color, getInitial(item.user));
        const following = state.following.has(item.user);
        return `
            <div class="suggested-item">
                <img class="suggested-avatar" src="${avatar}" alt="${escapeHtml(item.user)}">
                <div>
                    <p class="suggested-username">${escapeHtml(item.user)}</p>
                    <p class="suggested-meta">${escapeHtml(item.meta)}</p>
                </div>
                <button
                    type="button"
                    class="follow-btn ${following ? 'following' : ''}"
                    data-user="${escapeHtml(item.user)}"
                    data-action="follow"
                >${following ? 'Following' : 'Follow'}</button>
            </div>
        `;
    }).join('');
}

function getVisiblePosts() {
    const term = state.searchTerm.trim().toLowerCase();

    let scoped = [...state.posts];

    if (state.currentView === 'liked') {
        scoped = scoped.filter((post) => post.liked);
    }

    if (state.currentView === 'saved') {
        scoped = scoped.filter((post) => post.saved);
    }

    if (state.currentView === 'friends') {
        scoped = scoped.filter((post) => state.following.has(post.author));
    }

    if (state.currentView === 'explore') {
        scoped = scoped.sort((a, b) => b.likes - a.likes);
    }

    if (term) {
        scoped = scoped.filter((post) => {
            const text = `${post.author} ${post.caption} ${post.location}`.toLowerCase();
            return text.includes(term);
        });
    }

    return scoped;
}

function setFeedStateText(posts) {
    const label = state.currentView === 'home'
        ? 'Showing home feed'
        : state.currentView === 'explore'
            ? 'Showing top posts'
            : state.currentView === 'liked'
                ? 'Showing liked posts'
                : state.currentView === 'saved'
                    ? 'Showing saved posts'
                    : 'Showing friends posts';

    dom.feedStateText.textContent = `${label}${state.searchTerm ? ` for "${state.searchTerm}"` : ''} (${posts.length})`;
}

function renderPosts() {
    const visiblePosts = getVisiblePosts();
    setFeedStateText(visiblePosts);

    if (visiblePosts.length === 0) {
        dom.feedPosts.innerHTML = `
            <article class="post-card">
                <div class="post-meta" style="padding: 28px 16px; border-bottom: none;">
                    <p class="post-likes">No posts found</p>
                    <p class="post-caption">Try another search or switch feed section.</p>
                </div>
            </article>
        `;
        return;
    }

    dom.feedPosts.innerHTML = visiblePosts.map((post) => {
        const comments = post.comments
            .slice(0, 2)
            .map((comment) => `<p class="comment-item">${escapeHtml(comment)}</p>`)
            .join('');

        return `
            <article class="post-card" data-post-id="${post.id}">
                <header class="post-head">
                    <div class="post-author">
                        <img class="post-author-avatar" src="${getAvatarSvg(post.avatar, getInitial(post.author))}" alt="${escapeHtml(post.author)}">
                        <div>
                            <p class="post-author-name">${escapeHtml(post.author)}</p>
                            <p class="post-location">${escapeHtml(post.location)}</p>
                        </div>
                    </div>
                    <button class="post-menu-btn" type="button" data-action="menu">...</button>
                </header>

                <img class="post-image" src="${post.image}" alt="${escapeHtml(post.author)} post image">

                <div class="post-actions">
                    <button class="action-btn ${post.liked ? 'active' : ''}" type="button" data-action="like" aria-label="Like post">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-btn" type="button" data-action="comment" aria-label="Focus comment input">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                    <button class="action-btn" type="button" data-action="share" aria-label="Share post link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                    </button>
                    <button class="action-btn ${post.saved ? 'active' : ''}" type="button" data-action="save" aria-label="Save post">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                </div>

                <div class="post-meta">
                    <p class="post-likes">${post.likes.toLocaleString()} likes</p>
                    <p class="post-caption"><b>${escapeHtml(post.author)}</b>${escapeHtml(post.caption)}</p>
                    <div class="comment-list">${comments}</div>
                </div>

                <form class="comment-form" data-action="comment-form">
                    <input class="comment-input" name="comment" type="text" placeholder="Add a comment..." autocomplete="off">
                    <button class="comment-submit" type="submit">Post</button>
                </form>
            </article>
        `;
    }).join('');
}

function openProfileModal() {
    dom.profileModal.classList.remove('hidden');
    dom.profileModal.setAttribute('aria-hidden', 'false');
}

function closeProfileModal() {
    dom.profileModal.classList.add('hidden');
    dom.profileModal.setAttribute('aria-hidden', 'true');
}

function getLoginPath() {
    return window.location.pathname.includes('/frontend/')
        ? '/instagram-login-clone/frontend/'
        : '/';
}

function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('theme');
    localStorage.removeItem('palette');
    localStorage.removeItem('introAnimationEnabled');
    window.location.href = getLoginPath();
}

function hydrateProfile(user) {
    const username = user && user.username ? user.username : state.user.username;
    const fullName = user && user.fullName ? user.fullName : state.user.fullName;
    const email = user && user.email ? user.email : state.user.email;

    state.user.username = username;
    state.user.fullName = fullName;
    state.user.email = email;

    const initial = getInitial(username);

    document.getElementById('userInitial').textContent = initial;
    document.getElementById('profileChipInitial').textContent = initial;
    document.getElementById('profileChipUsername').textContent = username;
    document.getElementById('profileChipName').textContent = fullName;
    document.getElementById('profileInitial').textContent = initial;
    document.getElementById('profileUsername').textContent = username;
    document.getElementById('profileFullName').textContent = fullName;
    document.getElementById('profileEmail').textContent = email;
}

function setActiveNavButton(view) {
    const navButtons = dom.sidebarNav.querySelectorAll('.nav-item');
    navButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.view === view);
    });
}

function attachEvents() {
    dom.sidebarNav.addEventListener('click', (event) => {
        const target = event.target.closest('.nav-item');
        if (!target) {
            return;
        }
        state.currentView = target.dataset.view;
        setActiveNavButton(state.currentView);
        renderPosts();
    });

    dom.feedSearch.addEventListener('input', (event) => {
        state.searchTerm = event.target.value;
        renderPosts();
    });

    dom.storiesSection.addEventListener('click', (event) => {
        const story = event.target.closest('.story-item');
        if (!story) {
            return;
        }
        showToast(`Opened story: ${story.dataset.user}`);
    });

    dom.suggestedList.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-action="follow"]');
        if (!button) {
            return;
        }

        const user = button.dataset.user;
        if (state.following.has(user)) {
            state.following.delete(user);
            showToast(`Unfollowed ${user}`);
        } else {
            state.following.add(user);
            showToast(`Now following ${user}`, 'success');
        }

        buildSuggestions();
        if (state.currentView === 'friends') {
            renderPosts();
        }
    });

    dom.feedPosts.addEventListener('click', async (event) => {
        const button = event.target.closest('button[data-action]');
        if (!button) {
            return;
        }

        const postNode = event.target.closest('.post-card');
        if (!postNode) {
            return;
        }

        const postId = Number(postNode.dataset.postId);
        const post = state.posts.find((item) => item.id === postId);
        if (!post) {
            return;
        }

        const action = button.dataset.action;

        if (action === 'like') {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            renderPosts();
            return;
        }

        if (action === 'save') {
            post.saved = !post.saved;
            renderPosts();
            showToast(post.saved ? 'Post saved' : 'Removed from saved');
            return;
        }

        if (action === 'comment') {
            const input = postNode.querySelector('.comment-input');
            if (input) {
                input.focus();
            }
            return;
        }

        if (action === 'menu') {
            showToast('Post options: report, hide, copy link');
            return;
        }

        if (action === 'share') {
            const shareText = `Check this post by ${post.author}`;
            const shareUrl = `${window.location.origin}${window.location.pathname}#post-${post.id}`;

            if (navigator.share) {
                try {
                    await navigator.share({ title: 'Instagram post', text: shareText, url: shareUrl });
                    showToast('Shared successfully', 'success');
                } catch (error) {
                    if (error && error.name !== 'AbortError') {
                        showToast('Share cancelled');
                    }
                }
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(shareUrl);
                showToast('Link copied to clipboard', 'success');
            } else {
                showToast('Sharing not supported on this browser', 'error');
            }
        }
    });

    dom.feedPosts.addEventListener('submit', (event) => {
        const form = event.target.closest('form[data-action="comment-form"]');
        if (!form) {
            return;
        }

        event.preventDefault();
        const postNode = form.closest('.post-card');
        const input = form.querySelector('.comment-input');
        if (!postNode || !input) {
            return;
        }

        const value = input.value.trim();
        if (!value) {
            showToast('Write a comment first', 'error');
            return;
        }

        const postId = Number(postNode.dataset.postId);
        const post = state.posts.find((item) => item.id === postId);
        if (!post) {
            return;
        }

        post.comments.unshift(`${state.user.username}: ${value}`);
        input.value = '';
        renderPosts();
        showToast('Comment posted', 'success');
    });

    dom.profileBtn.addEventListener('click', openProfileModal);
    dom.closeProfileModalBtn.addEventListener('click', closeProfileModal);
    dom.profileModal.addEventListener('click', (event) => {
        if (event.target === dom.profileModal) {
            closeProfileModal();
        }
    });

    dom.editProfileBtn.addEventListener('click', () => {
        showToast('Profile editor will be added next');
    });

    dom.logoutBtn.addEventListener('click', handleLogout);
    dom.logoutModalBtn.addEventListener('click', handleLogout);

    dom.notificationBtn.addEventListener('click', () => {
        showToast('You are all caught up');
    });

    dom.messageBtn.addEventListener('click', () => {
        showToast('No new messages');
    });

    dom.themeToggleBtn.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(nextTheme);
        showToast(`Theme: ${nextTheme}`, 'success');
    });

    dom.seeAllSuggestions.addEventListener('click', () => {
        state.currentView = 'friends';
        setActiveNavButton('friends');
        renderPosts();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) {
        return;
    }

    const user = await loadUserData();
    hydrateProfile(user);

    const initialTheme = user && (user.preferredTheme === 'dark' || user.preferredTheme === 'light')
        ? user.preferredTheme
        : localStorage.getItem('theme') || 'light';
    applyTheme(initialTheme);

    buildStories();
    buildSuggestions();
    renderPosts();
    attachEvents();
});
