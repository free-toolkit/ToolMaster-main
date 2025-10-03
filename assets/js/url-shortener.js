// URL Shortener Functionality
class URLShortener {
    constructor() {
        this.init();
    }

    init() {
        console.log('🔗 URL Shortener initialized');
        this.setupEventListeners();
        this.loadStats();
    }

    setupEventListeners() {
        // Shorten button
        document.getElementById('shortenBtn').addEventListener('click', () => {
            this.shortenURL();
        });

        // Copy button
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyToClipboard();
        });

        // Enter key support
        document.getElementById('longUrl').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.shortenURL();
            }
        });

        // Modal close
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        // Complete offer button
        document.getElementById('completeOfferBtn').addEventListener('click', () => {
            this.completeOffer();
        });
    }

    shortenURL() {
        const longUrl = document.getElementById('longUrl').value.trim();
        
        // Validate URL
        if (!this.isValidURL(longUrl)) {
            alert('⚠️ Please enter a valid URL (e.g., https://example.com)');
            return;
        }

        // Show CPA modal
        this.showCPAModal();
    }

    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    showCPAModal() {
        // Load CPA offer content
        const offerContent = document.querySelector('.cpa-offer-content');
        offerContent.innerHTML = `
            <div class="offer-details">
                <h4>Special Offer Available! 🎁</h4>
                <p>Complete this quick survey to generate your short URL:</p>
                <!-- REPLACE THIS WITH YOUR ACTUAL CPA LINK -->
                <a href="YOUR_CPA_LINK_HERE" target="_blank" class="btn btn-primary" style="margin: 10px 0;">
                    <i class="fas fa-external-link-alt"></i> Access Special Offer
                </a>
                <p style="font-size: 0.9rem; color: #666; margin-top: 10px;">
                    Takes only 30 seconds • 100% free
                </p>
            </div>
        `;

        // Show modal
        document.getElementById('cpaModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('cpaModal').classList.remove('active');
    }

    completeOffer() {
        // Simulate offer completion
        this.generateShortURL();
        this.closeModal();
        
        // Track conversion
        this.trackConversion();
    }

    generateShortURL() {
        const longUrl = document.getElementById('longUrl').value;
        
        // Generate random short code
        const shortCode = this.generateShortCode();
        const shortUrl = `https://free-tk.com/${shortCode}`;
        
        // Display result
        document.getElementById('shortUrl').value = shortUrl;
        document.getElementById('resultSection').style.display = 'block';
        
        // Update stats
        this.updateStats();
        
        // Scroll to result
        document.getElementById('resultSection').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    generateShortCode() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    copyToClipboard() {
        const shortUrlInput = document.getElementById('shortUrl');
        shortUrlInput.select();
        document.execCommand('copy');
        
        // Visual feedback
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }

    updateStats() {
        // Simulate click count (random between 0-5)
        const clickCount = Math.floor(Math.random() * 6);
        document.getElementById('clickCount').textContent = clickCount;
        
        // Update creation time
        document.getElementById('urlCreated').textContent = 'Just now';
    }

    loadStats() {
        // Load any saved statistics
        const stats = JSON.parse(localStorage.getItem('urlShortenerStats') || '{"urlsCreated": 0}');
        // Could display total URLs created if needed
    }

    trackConversion() {
        // Track in localStorage
        const stats = JSON.parse(localStorage.getItem('urlShortenerStats') || '{"urlsCreated": 0}');
        stats.urlsCreated++;
        localStorage.setItem('urlShortenerStats', JSON.stringify(stats));
        
        console.log('✅ URL created - CPA conversion tracked');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.urlShortener = new URLShortener();
});
