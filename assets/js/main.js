// Free-Toolkit Main JavaScript
class FreeToolkit {
    constructor() {
        this.init();
    }

    init() {
        console.log('🚀 Free-Toolkit initialized');
        this.setupAnimations();
        this.setupAnalytics();
        this.setupServiceWorker();
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe all tool cards
        document.querySelectorAll('.tool-card').forEach(card => {
            observer.observe(card);
        });
    }

    setupAnalytics() {
        // Track tool usage
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const toolName = e.target.closest('.tool-card').querySelector('h3').textContent;
                this.trackEvent('tool_click', toolName);
            });
        });

        // Track page views
        this.trackEvent('page_view', window.location.pathname);
    }

    trackEvent(event, value) {
        // Simple analytics - you can integrate with Google Analytics here
        console.log(`📊 Event: ${event} - Value: ${value}`);
        
        // Save to localStorage for basic analytics
        const stats = JSON.parse(localStorage.getItem('freeToolkitStats') || '{}');
        stats[event] = (stats[event] || 0) + 1;
        localStorage.setItem('freeToolkitStats', JSON.stringify(stats));
    }

    setupServiceWorker() {
        // Register service worker for PWA capabilities
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered');
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed');
                });
        }
    }

    // Utility function to format file sizes
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Utility function to generate unique IDs
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.freeToolkit = new FreeToolkit();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FreeToolkit;
}
