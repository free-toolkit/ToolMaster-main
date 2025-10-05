class ToolMasterApp {
    constructor() {
        this.currentTab = 'video';
        this.init();
    }

    init() {
        this.showLoadingBar();
        this.loadTab(this.currentTab);
        this.bindEvents();
        setTimeout(() => {
            this.hideLoadingBar();
        }, 500);
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-btn')) {
                this.handleNavClick(e.target);
            }
            
            if (e.target.classList.contains('tool-btn')) {
                this.handleToolClick(e.target);
            }
            
            if (e.target.id === 'close-output') {
                this.hideOutput();
            }
        });
    }

    handleNavClick(button) {
        const tab = button.dataset.tab;
        if (this.currentTab === tab) return;
        
        this.showLoadingBar();
        this.currentTab = tab;
        
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        this.loadTab(tab);
        
        setTimeout(() => {
            this.hideLoadingBar();
        }, 300);
    }

    loadTab(tab) {
        const contentArea = document.getElementById('content-area');
        
        switch(tab) {
            case 'video':
                contentArea.innerHTML = this.getVideoToolsHTML();
                break;
            case 'qr':
                contentArea.innerHTML = this.getQRToolsHTML();
                break;
            case 'text':
                contentArea.innerHTML = this.getTextToolsHTML();
                break;
        }
    }

    handleToolClick(button) {
        const tool = button.dataset.tool;
        
        switch(tool) {
            case 'download-video':
                this.processVideoDownload();
                break;
            case 'generate-qr':
                this.generateQRCode();
                break;
            case 'analyze-text':
                this.analyzeText();
                break;
        }
    }

    getVideoToolsHTML() {
        return `
            <section class="tool-section">
                <h2>🎬 Herramientas de Video</h2>
                <div class="tool-grid">
                    <div class="tool-card">
                        <h3>Descargador de Videos</h3>
                        <div class="input-group">
                            <input type="url" class="input-field" id="video-url" 
                                   placeholder="https://ejemplo.com/video">
                        </div>
                        <button class="btn tool-btn" data-tool="download-video">Descargar Video</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Extractor de Audio</h3>
                        <div class="input-group">
                            <input type="url" class="input-field" id="audio-url"
                                   placeholder="URL del video para extraer audio">
                        </div>
                        <button class="btn tool-btn" data-tool="extract-audio">Extraer MP3</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Conversor a GIF</h3>
                        <div class="input-group">
                            <input type="url" class="input-field" id="gif-url"
                                   placeholder="URL del video para convertir a GIF">
                        </div>
                        <button class="btn tool-btn" data-tool="convert-gif">Crear GIF</button>
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
                                   placeholder="Texto o URL para el QR">
                        </div>
                        <button class="btn tool-btn" data-tool="generate-qr">Generar QR</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>QR con Diseño</h3>
                        <div class="input-group">
                            <input type="text" class="input-field" id="qr-design-text"
                                   placeholder="Contenido del QR">
                        </div>
                        <div class="input-group">
                            <input type="color" id="qr-color" value="#2563eb">
                            <label>Color del QR</label>
                        </div>
                        <button class="btn tool-btn" data-tool="generate-design-qr">Generar QR con Diseño</button>
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
                                      placeholder="Escribe o pega tu texto aquí..."></textarea>
                        </div>
                        <button class="btn tool-btn" data-tool="analyze-text">Analizar Texto</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Convertidor de Mayúsculas</h3>
                        <div class="input-group">
                            <textarea class="input-field" id="case-text" rows="4" 
                                      placeholder="Texto a convertir..."></textarea>
                        </div>
                        <button class="btn tool-btn" data-tool="uppercase-text">A MAYÚSCULAS</button>
                        <button class="btn tool-btn" data-tool="lowercase-text">a minúsculas</button>
                    </div>
                </div>
            </section>
        `;
    }

    processVideoDownload() {
        const url = document.getElementById('video-url')?.value;
        if (!url) {
            this.showOutput('❌ Por favor, introduce una URL válida');
            return;
        }

        this.showOutput(`
            <h4>🎬 Procesando Video</h4>
            <p>URL: ${url}</p>
            <div class="download-options">
                <button class="btn" onclick="app.downloadFile('video', 'mp4')">Descargar MP4</button>
                <button class="btn" onclick="app.downloadFile('video', 'webm')">Descargar WEBM</button>
            </div>
            <p><small>Nota: Esta es una demostración. En producción se conectaría a una API real.</small></p>
        `);
    }

    generateQRCode() {
        const text = document.getElementById('qr-text')?.value;
        if (!text) {
            this.showOutput('❌ Introduce texto o URL para generar el QR');
            return;
        }

        // Simular generación de QR (en producción usarías una librería)
        this.showOutput(`
            <h4>🔳 QR Generado</h4>
            <div style="background: white; padding: 20px; border-radius: 8px; display: inline-block;">
                <div style="width: 200px; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border: 2px dashed #ccc;">
                    <span style="color: #666; font-size: 12px;">[QR CODE]</span>
                </div>
            </div>
            <p style="margin-top: 1rem; word-break: break-all;">Contenido: ${text}</p>
            <button class="btn" onclick="app.downloadFile('qr', 'png')">Descargar QR</button>
        `);
    }

    analyzeText() {
        const text = document.getElementById('text-input')?.value || '';
        
        const stats = {
            characters: text.length,
            words: text.trim() ? text.trim().split(/\s+/).length : 0,
            lines: text.split('\n').length,
            spaces: (text.match(/ /g) || []).length,
            readingTime: Math.ceil(text.split(/\s+/).length / 200)
        };
        
        this.showOutput(`
            <h4>📊 Análisis de Texto</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin: 1rem 0;">
                <div><strong>Caracteres:</strong> ${stats.characters}</div>
                <div><strong>Palabras:</strong> ${stats.words}</div>
                <div><strong>Líneas:</strong> ${stats.lines}</div>
                <div><strong>Espacios:</strong> ${stats.spaces}</div>
                <div><strong>Tiempo lectura:</strong> ${stats.readingTime} min</div>
            </div>
        `);
    }

    showOutput(content) {
        const outputPanel = document.getElementById('output-panel');
        const outputContent = document.getElementById('output-content');
        
        outputContent.innerHTML = content;
        outputPanel.classList.remove('hidden');
    }

    hideOutput() {
        document.getElementById('output-panel').classList.add('hidden');
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

    downloadFile(type, format) {
        this.showOutput(`📥 Descargando ${type} en formato ${format}... (simulación)`);
        
        // Simular descarga
        setTimeout(() => {
            this.showOutput(`✅ ${type}.${format} descargado correctamente!`);
        }, 1500);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ToolMasterApp();
});
