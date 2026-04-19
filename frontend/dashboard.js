const getBackendURL = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000/api';
    }
    return `${window.location.origin}/api`;
};

const API_URL = window.__BACKEND_URL || getBackendURL();

// Sample feed posts
const SAMPLE_POSTS = [
    {
        id: 1,
        author: 'alex_smith',
        location: 'New York, USA',
        avatar: '#4ECDC4',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(78,205,196);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(45,183,169);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="600" height="600" fill="url(%23grad1)"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="120" font-family="Arial" font-weight="bold"%3E📍%3C/text%3E%3C/svg%3E',
        caption: 'Amazing sunset at Times Square! 🌅',
        likes: 2543,
        timestamp: '2 hours ago',
        liked: false
    },
    {
        id: 2,
        author: 'jane_doe',
        location: 'Los Angeles, USA',
        avatar: '#45B7D1',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"%3E%3Cdefs%3E%3ClinearGradient id="grad2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(69,183,209);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(45,150,180);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="600" height="600" fill="url(%23grad2)"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="120" font-family="Arial" font-weight="bold"%3E☀️%3C/text%3E%3C/svg%3E',
        caption: 'Beach day with friends! Living my best life 🌊✨',
        likes: 3891,
        timestamp: '4 hours ago',
        liked: false
    },
    {
        id: 3,
        author: 'mike_johnson',
        location: 'Seattle, USA',
        avatar: '#F9D56E',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"%3E%3Cdefs%3E%3ClinearGradient id="grad3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(249,213,110);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(240,200,50);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="600" height="600" fill="url(%23grad3)"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="120" font-family="Arial" font-weight="bold"%3E🏔️%3C/text%3E%3C/svg%3E',
        caption: 'Mountain hiking is the best therapy! 🥾🏔️',
        likes: 1567,
        timestamp: '6 hours ago',
        liked: false
    },
    {
        id: 4,
        author: 'sarah_art',
        location: 'Paris, France',
        avatar: '#5F67E7',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"%3E%3Cdefs%3E%3ClinearGradient id="grad4" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(95,103,231);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(70,70,200);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="600" height="600" fill="url(%23grad4)"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="120" font-family="Arial" font-weight="bold"%3E🎨%3C/text%3E%3C/svg%3E',
        caption: 'Creating art in the city of lights 🇫🇷❤️',
        likes: 4102,
        timestamp: '8 hours ago',
        liked: false
    },
    {
        id: 5,
        author: 'photo_pro',
        location: 'Tokyo, Japan',
        avatar: '#F24E4E',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"%3E%3Cdefs%3E%3ClinearGradient id="grad5" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(242,78,78);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(200,50,50);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="600" height="600" fill="url(%23grad5)"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="120" font-family="Arial" font-weight="bold"%3E📸%3C/text%3E%3C/svg%3E',
        caption: 'Night photography at its finest! Love this city 🌃',
        likes: 5678,
        timestamp: '10 hours ago',
        liked: false
    }
];

// Check authentication
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

// Load user data
async function loadUserData() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem('token');
            const loginPath = window.location.pathname.includes('/frontend/') 
                ? '/instagram-login-clone/frontend/'
                : '/';
            window.location.href = loginPath;
            return null;
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Error loading user data:', error);
        return null;
    }
}

// Apply theme
function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}

// Get user initial
function getUserInitial(username) {
    return username ? username.charAt(0).toUpperCase() : 'U';
}

// Render posts
function renderPosts(posts) {
    const feedPosts = document.getElementById('feedPosts');
    feedPosts.innerHTML = '';

    posts.forEach(post => {
        const postHTML = `
            <div class="post">
                <div class="post-header">
                    <a href="#" class="post-author">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='${post.avatar}'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3E${post.author.charAt(0).toUpperCase()}%3C/text%3E%3C/svg%3E" alt="${post.author}" class="post-avatar">
                        <div class="post-author-info">
                            <div class="author-name">${post.author}</div>
                            <div class="author-location">${post.location}</div>
                        </div>
                    </a>
                    <button class="post-menu-btn" onclick="alert('Menu not yet implemented')">⋯</button>
                </div>
                <img src="${post.image}" alt="Post from ${post.author}" class="post-image">
                <div class="post-actions">
                    <button class="action-btn like-btn" onclick="toggleLike(this, ${post.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-btn" onclick="alert('Comments coming soon!')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                    <button class="action-btn" onclick="alert('Share coming soon!')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                    </button>
                    <button class="action-btn" onclick="alert('Save coming soon!)" style="margin-left: auto;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        </svg>
                    </button>
                </div>
                <div class="post-stats">
                    <span id="likes-${post.id}">${post.likes.toLocaleString()}</span> likes
                </div>
                <div class="post-caption">
                    <span class="caption-author">${post.author}</span>
                    <span>${post.caption}</span>
                </div>
                <div class="post-comments" onclick="alert('Comments section coming soon!')">
                    View all comments
                </div>
                <div class="post-date">${post.timestamp}</div>
                <div class="comment-form">
                    <input type="text" class="comment-input" placeholder="Add a comment..." onclick="alert('Comments feature coming soon!')">
                    <button class="comment-submit" onclick="alert('Comments feature coming soon!')">Post</button>
                </div>
            </div>
        `;
        feedPosts.innerHTML += postHTML;
    });
}

// Toggle like
window.toggleLike = function toggleLike(button, postId) {
    const post = SAMPLE_POSTS.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        button.classList.toggle('liked');
        
        const likesSpan = document.getElementById(`likes-${postId}`);
        if (post.liked) {
            post.likes++;
        } else {
            post.likes--;
        }
        likesSpan.textContent = post.likes.toLocaleString();
    }
};

// Profile modal
window.openProfileModal = function openProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
};

window.closeProfileModal = function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.classList.add('hidden');
    }
};

window.handleLogout = function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('theme');
    localStorage.removeItem('palette');
    localStorage.removeItem('introAnimationEnabled');
    const loginPath = window.location.pathname.includes('/frontend/') 
        ? '/instagram-login-clone/frontend/'
        : '/';
    window.location.href = loginPath;
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Check auth
    if (!checkAuth()) {
        return;
    }

    // Load user data
    const user = await loadUserData();
    if (user) {
        // Set user info
        const userInitial = getUserInitial(user.username);
        document.getElementById('userInitial').textContent = userInitial;
        document.getElementById('profileInitial').textContent = userInitial;
        document.getElementById('profileUsername').textContent = user.username;
        document.getElementById('profileFullName').textContent = user.fullName || 'User';
        document.getElementById('profileEmail').textContent = user.email;

        // Apply theme
        const savedTheme = user.preferredTheme || localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
    }

    // Render posts
    renderPosts(SAMPLE_POSTS);

    // Profile button
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', openProfileModal);
    }

    // Modal close on outside click
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                closeProfileModal();
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
