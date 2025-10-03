// PDF Tools JavaScript
class PDFTools {
    constructor() {
        this.init();
    }

    init() {
        console.log('📄 PDF Tools initialized');
        this.setupFileUploads();
        this.setupDragAndDrop();
        this.loadStats();
    }

    setupFileUploads() {
        // Setup file upload handlers for all tools
        const uploadAreas = document.querySelectorAll('.upload-area');
        
        uploadAreas.forEach(area => {
            const fileInput = area.querySelector('input[type="file"]');
            
            area.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                this.handleFileSelect(e, area);
            });
        });
    }

    setupDragAndDrop() {
        const uploadAreas = document.querySelectorAll('.upload-area');
        
        uploadAreas.forEach(area => {
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.classList.add('dragover');
            });

            area.addEventListener('dragleave', () => {
                area.classList.remove('dragover');
            });

            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.classList.remove('dragover');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleDroppedFiles(files, area);
                }
            });
        });
    }

    handleFileSelect(event, uploadArea) {
        const files = event.target.files;
        if (files.length > 0) {
            this.processSelectedFiles(files, uploadArea);
        }
    }

    handleDroppedFiles(files, uploadArea) {
        this.processSelectedFiles(files, uploadArea);
    }

    processSelectedFiles(files, uploadArea) {
        const tool = uploadArea.closest('.pdf-tool-card').dataset.tool;
        
        Array.from(files).forEach(file => {
            if (this.validateFile(file, tool)) {
                this.displayFilePreview(file, tool);
            } else {
                this.showError('Invalid file type or size. Please check the requirements.');
            }
        });
    }

    validateFile(file, tool) {
        const maxSize = 50 * 1024 * 1024; // 50MB
        const allowedTypes = {
            'compressor': ['application/pdf'],
            'merger': ['application/pdf'],
            'splitter': ['application/pdf'],
            'converter': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']
        };

        if (file.size > maxSize) {
            return false;
        }

        if (!allowedTypes[tool].includes(file.type)) {
            return false;
        }

        return true;
    }

    displayFilePreview(file, tool) {
        const fileList = document.getElementById(`${tool}FilesList`);
        
        if (fileList) {
            const fileItem = this.createFileItem(file);
            fileList.appendChild(fileItem);
        }

        // Update upload area appearance
        const uploadArea = document.getElementById(`${tool}Upload`);
        uploadArea.querySelector('.upload-content').innerHTML = `
            <i class="fas fa-file-pdf"></i>
            <h4>${file.name}</h4>
            <p>${this.formatFileSize(file.size)}</p>
        `;
    }

    createFileItem(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <i class="fas fa-file-pdf"></i>
            <span class="file-name">${file.name}</span>
            <span class="file-size">${this.formatFileSize(file.size)}</span>
            <i class="fas fa-times file-remove" onclick="this.parentElement.remove()"></i>
        `;
        return fileItem;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    loadStats() {
        // Load statistics from localStorage
        const stats = JSON.parse(localStorage.getItem('pdfToolsStats') || '{"filesProcessed": 0, "sizeSaved": 0}');
        
        document.getElementById('filesProcessed').textContent = stats.filesProcessed;
        document.getElementById('sizeSaved').textContent = (stats.sizeSaved / 1024 / 1024).toFixed(1) + ' MB';
    }

    updateStats(filesProcessed = 0, sizeSaved = 0) {
        const stats = JSON.parse(localStorage.getItem('pdfToolsStats') || '{"filesProcessed": 0, "sizeSaved": 0}');
        
        stats.filesProcessed += filesProcessed;
        stats.sizeSaved += sizeSaved;
        
        localStorage.setItem('pdfToolsStats', JSON.stringify(stats));
        this.loadStats();
    }

    showError(message) {
        alert('Error: ' + message); // In a real app, use a better notification system
    }

    showProcessingModal() {
        document.getElementById('processingModal').classList.add('active');
        this.simulateProgress();
    }

    hideProcessingModal() {
        document.getElementById('processingModal').classList.remove('active');
    }

    simulateProgress() {
        const progressFill = document.getElementById('progressFill');
        let width = 0;
        
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.hideProcessingModal();
                    this.showCPAOffer();
                }, 500);
            } else {
                width += Math.random() * 10;
                progressFill.style.width = Math.min(width, 100) + '%';
            }
        }, 200);
    }

    showCPAOffer() {
        // Load CPA offer content
        const offerContent = document.getElementById('cpaOfferContent');
        offerContent.innerHTML = `
            <div class="cpa-offer">
                <h5>Special Offer: Get Premium Features</h5>
                <p>Complete this quick survey to unlock your file download and get access to all premium features!</p>
                <!-- In a real app, you would load your CPA offer here -->
                <div class="offer-placeholder">
                    <p>🔒 Your CPA offer content would be displayed here</p>
                    <p><small>This is where you integrate with OGAds, CPAGrip, etc.</small></p>
                </div>
            </div>
        `;
        
        document.getElementById('cpaModal').classList.add('active');
    }

    hideCPAOffer() {
        document.getElementById('cpaModal').classList.remove('active');
    }
}

// Tool-specific functions
function initCompressor() {
    const fileInput = document.getElementById('compressorFile');
    if (!fileInput.files.length) {
        alert('Please select a PDF file to compress.');
        return;
    }
    
    window.pdfTools.showProcessingModal();
}

function initMerger() {
    const fileInput = document.getElementById('mergerFiles');
    if (!fileInput.files.length) {
        alert('Please select at least one PDF file to merge.');
        return;
    }
    
    window.pdfTools.showProcessingModal();
}

function initSplitter() {
    const fileInput = document.getElementById('splitterFile');
    if (!fileInput.files.length) {
        alert('Please select a PDF file to split.');
        return;
    }
    
    window.pdfTools.showProcessingModal();
}

function initConverter() {
    const fileInput = document.getElementById('converterFile');
    if (!fileInput.files.length) {
        alert('Please select a file to convert.');
        return;
    }
    
    window.pdfTools.showProcessingModal();
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function completeOffer() {
    // Simulate offer completion and file download
    window.pdfTools.hideCPAOffer();
    window.pdfTools.updateStats(1, 1024 * 1024); // Add 1MB to saved size
    
    // Create and trigger download of a sample file
    const link = document.createElement('a');
    link.href
