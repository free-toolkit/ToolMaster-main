// ToolMaster App - Optimizado para máxima velocidad
class ToolMasterApp {
    constructor() {
        this.currentTab = 'video';
        this.isLoading = false;
        this.cache = new Map();
        this.init();
    }

    async init() {
        this.setupPerformanceMonitoring();
        await this.loadCriticalResources();
        this.bindEvents();
        this.preloadCommonTools();
        this.hideLoadingBar();
    }

    setupPerformanceMonitoring() {
        // Monitoreo de performance en tiempo real
        this.metrics = {
            toolLoadTimes: {},
            userInteractions: 0
        };

        // Reportar métricas cuando la página se descargue
        window.addEventListener('beforeunload', () => {
            this.reportPerformance();
        });
    }

    async loadCriticalResources() {
        // Carga diferida de recursos no críticos
        const loadNonCritical = () => {
            // Cargar librerías QR solo cuando sean necesarias
            this.loadQRGenerator();
        };

        // Esperar a que la página esté lista
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadNonCritical);
        } else {
            loadNonCritical();
        }
    }

    bindEvents() {
        // Event delegation para mejor performance
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.matches('.nav-btn')) {
                this.handleNavClick(target);
            } else if (target.matches('.tool-btn')) {
                this.handleToolClick(target);
            } else if (target.matches('#close-output')) {
                this.hideOutput();
            }
        });

        // Input throttling para búsquedas
        this.setupInputThrottling();
    }

    handleNavClick(button) {
        const tab = button.dataset.tab;
        if (this.currentTab === tab || this.isLoading) return;

        this.showLoadingBar();
        this.switchTab(tab);
        this.updateActiveNav(button);
    }

    async switchTab(tab) {
        this.currentTab = tab;
        this.isLoading = true;

        // Verificar cache primero
        if (this.cache.has(tab)) {
            this.displayCachedContent(tab);
            this.isLoading = false;
            this.hideLoadingBar();
            return;
        }

        // Carga diferida del contenido de la pestaña
        try {
            const content = await this.loadTabContent(tab);
            this.cache.set(tab, content);
            this.displayContent(content);
            this.trackPerformance(`tab-${tab}`);
        } catch (error) {
            this.showError('Error cargando la herramienta');
        } finally {
            this.isLoading = false;
            this.hideLoadingBar();
        }
    }

    async loadTabContent(tab) {
        const startTime = performance.now();
        
        // Simular carga de módulos (en producción sería import())
        const content = await this.fetchTabHTML(tab);
        
        this.metrics.toolLoadTimes[tab] = performance.now() - startTime;
        return content;
    }

    async fetchTabHTML(tab) {
        // En producción, esto cargaría HTML/componentes específicos
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.generateTabHTML(tab));
            }, 50); // Simular latencia de red
        });
    }

    generateTabHTML(tab) {
        const templates = {
            video: this.getVideoToolsHTML(),
            qr: this.getQRToolsHTML(),
            text: this.getTextToolsHTML()
        };
        
        return templates[tab] || '<div>Contenido no disponible</div>';
    }

    displayContent(content) {
        const contentArea = document.getElementById('content-area');
        
        // Usar requestAnimationFrame para animación suave
        requestAnimationFrame(() => {
            contentArea.style.opacity = '0';
            
            requestAnimationFrame(() => {
                contentArea.innerHTML = content;
                contentArea.style.opacity = '1';
                this.bindToolEvents();
            });
        });
    }

    displayCachedContent(tab) {
        const content = this.cache.get(tab);
        document.getElementById('content-area').innerHTML = content;
        this.bindToolEvents();
    }

    updateActiveNav(activeButton) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Sistema de carga de herramientas con Web Workers
    async handleToolClick(button) {
        if (this.isLoading) return;
        
        const toolId = button.dataset.tool;
        this.showLoadingBar();
        this.isLoading = true;

        try {
            await this.executeTool(toolId);
        } catch (error) {
            this.showOutput(`❌ Error: ${error.message}`);
        } finally {
            this.isLoading = false;
            this.hideLoadingBar();
        }
    }

    async executeTool(toolId) {
        const startTime = performance.now();
        
        switch(toolId) {
            case 'download-video':
                await this.processVideoDownload();
                break;
            case 'generate-qr':
                await this.generateQRCode();
                break;
            case 'count-text':
                this.analyzeText();
                break;
            default:
                throw new Error('Herramienta no implementada');
        }
        
        const duration = performance.now() - startTime;
        console.log(`🛠️ ${toolId} ejecutado en ${duration.toFixed(2)}ms`);
    }

    // Herramienta de video optimizada
    async processVideoDownload() {
        const url = document.getElementById('video-url')?.value;
        if (!url) {
            this.showOutput('❌ Introduce una URL válida');
            return;
        }

        this.showOutput('⏳ Procesando...');
        
        // Simular procesamiento en segundo plano
        await this.delay(1000);
        
        this.showOutput(`
            ✅ <strong>Video procesado</strong>
            <p>URL: ${url}</p>
            <div class="download-options">
                <button class="btn" onclick="app.downloadFile('video', 'mp4')">Descargar MP4</button>
                <button class="btn" onclick="app.downloadFile('video', 'webm')">Descargar WEBM</button>
            </div>
        `);
    }

    // Generador de QR con Web Worker
    async generateQRCode() {
        const text = document.getElementById('qr-text')?.value;
        if (!text) {
            this.showOutput('❌ Introduce texto para el QR');
            return;
        }

        this.showOutput('🔳 Generando código QR...');

        try {
            // Usar Web Worker para no bloquear la UI
            const qrCode = await this.generateQRWithWorker(text);
            this.showOutput(`
                <h4>✅ QR Generado</h4>
                <img src="${qrCode}" alt="Código QR" style="max-width: 200px; border-radius: 8px;">
                <p style="word-break: break-all; margin: 1rem 0;">Contenido: ${text}</p>
                <button class="btn" onclick="app.downloadQR('${qrCode}', 'qrcode.png')">Descargar QR</button>
            `);
        } catch (error) {
            this.showOutput('❌ Error generando el QR');
        }
    }

    async generateQRWithWorker(text) {
        // En producción, esto usaría un Web Worker real
        return new Promise(resolve => {
            setTimeout(() => {
                // Simular generación de QR
                const canvas = document.createElement('canvas');
                canvas.width = 200;
                canvas.height = 200;
                const ctx = canvas.getContext('2d');
                
                // QR simple (en producción usarías librería)
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, 200, 200);
                ctx.fillStyle = 'black';
                ctx.font = '12px monospace';
                ctx.fillText('QR: ' + text.substring(0, 20), 10, 100);
                
                resolve(canvas.toDataURL());
            }, 300);
        });
    }

    // Analizador de texto instantáneo
    analyzeText() {
        const text = document.getElementById('text-input')?.value || '';
        const startTime = performance.now();
        
        const stats = {
            characters: text.length,
            words: text.trim() ? text.trim().split(/\s+/).length : 0,
            lines: text.split('\n').length,
            spaces: (text.match(/ /g) || []).length,
            readingTime: Math.ceil(text.split(/\s+/).length / 200)
        };
        
        const duration = performance.now() - startTime;
        
        this.showOutput(`
            <h4>📊 Análisis de Texto</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin: 1rem 0;">
                <div><strong>Caracteres:</strong> ${stats.characters}</div>
                <div><strong>Palabras:</strong> ${stats.words}</div>
                <div><strong>Líneas:</strong> ${stats.lines}</div>
                <div><strong>Espacios:</strong> ${stats.spaces}</div>
                <div><strong>Tiempo lectura:</strong> ${stats.readingTime} min</div>
            </div>
            <small>Analizado en ${duration.toFixed(2)}ms</small>
        `);
    }

    // Utilidades de UI optimizadas
    showOutput(content) {
        const outputPanel = document.getElementById('output-panel');
        const outputContent = document.getElementById('output-content');
        
        outputContent.innerHTML = content;
        outputPanel.classList.remove('hidden');
        
        // Auto-ocultar después de 30 segundos
        this.autoHideOutput();
    }

    hideOutput() {
        document.getElementById('output-panel').classList.add('hidden');
    }

    autoHideOutput() {
        clearTimeout(this.autoHideTimeout);
        this.autoHideTimeout = setTimeout(() => {
            this.hideOutput();
        }, 30000);
    }

    showLoadingBar() {
        const loadingBar = document.getElementById('loadingBar');
        loadingBar.style.transform = 'scaleX(0.3)';
    }

    hideLoadingBar() {
        const loadingBar = document.getElementById('loadingBar');
        loadingBar.style.transform = 'scaleX(1)';
        
        setTimeout(() => {
            loadingBar.style.transform = 'scaleX(0)';
        }, 300);
    }

    // Pre-carga inteligente
    preloadCommonTools() {
        // Pre-cargar herramientas basado en probabilidad de uso
        setTimeout(() => {
            this.loadQRGenerator();
        }, 1000);
    }

    async loadQRGenerator() {
        // Carga diferida de librería QR
        if (!window.QRCode) {
            try {
                // En producción, cargarías la librería real
                console.log('📦 Cargando generador QR...');
                await this.delay(100);
            } catch (error) {
                console.warn('QR library load failed:', error);
            }
        }
    }

    // Throttling para inputs
    setupInputThrottling() {
        let timeoutId;
        
        document.addEventListener('input', (e) => {
            if (e.target.matches('.search-input')) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    this.handleSearch(e.target.value);
                }, 300);
            }
        });
    }

    // Métodos de utilidad
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    downloadQR(dataUrl, filename) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadFile(type, format) {
        this.showOutput(`📥 Descargando ${type} en formato ${format}...`);
        // Implementación real iría aquí
    }

    trackPerformance(metricName) {
        this.metrics.userInteractions++;
        console.log(`📊 ${metricName}: ${this.metrics.toolLoadTimes[metricName]?.toFixed(2)}ms`);
    }

    reportPerformance() {
        const avgLoadTime = Object.values(this.metrics.toolLoadTimes).reduce((a, b) => a + b, 0) / 
                           Object.values(this.metrics.toolLoadTimes).length;
        
        console.group('🚀 Performance Report');
        console.table(this.metrics.toolLoadTimes);
        console.log(`📈 Average: ${avgLoadTime.toFixed(2)}ms`);
        console.log(`👆 User Interactions: ${this.metrics.userInteractions}`);
        console.groupEnd();
    }

    showError(message) {
        this.showOutput(`❌ ${message}`);
    }

    // Templates HTML (igual que antes pero optimizados)
    getVideoToolsHTML() {
        return `
            <section class="tool-section">
                <h2>🎬 Herramientas de Video</h2>
                <div class="tool-grid">
                    <div class="tool-card">
                        <h3>Descargador de Videos</h3>
                        <div class="input-group">
                            <input type="url" class="input-field" id="video-url" 
                                   placeholder="https://ejemplo.com/video" autocomplete="off">
                        </div>
                        <button class="btn tool-btn" data-tool="download-video">Descargar Video</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Extractor de Audio</h3>
                        <div class="input-group">
                            <input type="url" class="input-field" id="audio-url"
                                   placeholder="URL del video para extraer audio" autocomplete="off">
                        </div>
                        <button class="btn tool-btn" data-tool="extract-audio">Extraer MP3</button>
                    </div>
                </div>
            </section>
        `;
    }

    getQRToolsHTML() {
        return `
            <section class="tool-section">
                <h2>🔳 Generadores QR</h2>
                <div class="tool-grid">
                    <div class="tool-card">
                        <h3>QR Básico</h3>
                        <div class="input-group">
                            <input type="text" class="input-field" id="qr-text" 
                                   placeholder="Texto o URL para el QR" autocomplete="off">
                        </div>
                        <button class="btn tool-btn" data-tool="generate-qr">Generar QR</button>
                    </div>
                </div>
            </section>
        `;
    }

    getTextToolsHTML() {
        return `
            <section class="tool-section">
                <h2>📝 Procesador de Texto</h2>
                <div class="tool-grid">
                    <div class="tool-card">
                        <h3>Analizador de Texto</h3>
                        <div class="input-group">
                            <textarea class="input-field" id="text-input" rows="4" 
                                      placeholder="Escribe o pega tu texto aquí..." 
                                      style="resize: vertical;"></textarea>
                        </div>
                        <button class="btn tool-btn" data-tool="count-text">Analizar Texto</button>
                    </div>
                </div>
            </section>
        `;
    }

    bindToolEvents() {
        // Los eventos están manejados por delegation en bindEvents()
    }
}

// Inicialización optimizada
let app;

function initApp() {
    if (!app) {
        app = new ToolMasterApp();
    }
}

// Iniciar cuando sea seguro
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Exportar para uso global (solo en desarrollo)
if (typeof window !== 'undefined') {
    window.app = app;
}
