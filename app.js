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
            case 'images':
                contentArea.innerHTML = this.getImageToolsHTML();
                break;
            case 'urls':
                contentArea.innerHTML = this.getUrlToolsHTML();
                break;
            case 'quick':
                contentArea.innerHTML = this.getQuickToolsHTML();
                break;
        }
    }

    getVideoToolsHTML() {
        return `
            <section class="tool-section">
                <h2>🎬 Herramientas de Video</h2>
                <div class="tool-grid">
                    <div class="tool-card">
                        <h3>Descargador Multiplataforma</h3>
                        <p>YouTube, TikTok, Instagram, Twitter</p>
                        <div class="input-group">
                            <input type="url" class="input-field" placeholder="https://youtube.com/watch?v=...">
                        </div>
                        <button class="btn tool-btn" data-tool="download-video">Descargar Video</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Extractor de Audio</h3>
                        <p>MP3, WAV, OGG - Alta calidad</p>
                        <div class="input-group">
                            <input type="url" class="input-field" placeholder="URL del video">
                        </div>
                        <button class="btn tool-btn" data-tool="extract-audio">Extraer Audio</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Conversor a GIF</h3>
                        <p>Con controles de tiempo y tamaño</p>
                        <div class="input-group">
                            <input type="url" class="input-field" placeholder="URL del video">
                        </div>
                        <div class="input-group">
                            <input type="number" class="input-field" placeholder="Duración (segundos)" value="5">
                        </div>
                        <button class="btn tool-btn" data-tool="convert-gif">Crear GIF</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Recortador de Video</h3>
                        <p>Recorta online sin programas</p>
                        <div class="input-group">
                            <input type="file" accept="video/*" class="input-field">
                        </div>
                        <button class="btn tool-btn" data-tool="trim-video">Recortar Video</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Convertidor de Formatos</h3>
                        <p>MP4, WEBM, AVI, MOV</p>
                        <div class="input-group">
                            <input type="file" accept="video/*" class="input-field">
                        </div>
                        <select class="input-field">
                            <option>MP4</option>
                            <option>WEBM</option>
                            <option>AVI</option>
                        </select>
                        <button class="btn tool-btn" data-tool="convert-format">Convertir</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Compresor de Video</h3>
                        <p>Reduce tamaño manteniendo calidad</p>
                        <div class="input-group">
                            <input type="file" accept="video/*" class="input-field">
                        </div>
                        <button class="btn tool-btn" data-tool="compress-video">Comprimir</button>
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
                        <p>Texto, URLs, contactos</p>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Texto o URL">
                        </div>
                        <button class="btn tool-btn" data-tool="generate-qr">Generar QR</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>QR con Logo</h3>
                        <p>Personaliza con tu imagen</p>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Contenido QR">
                        </div>
                        <div class="input-group">
                            <input type="file" accept="image/*" class="input-field">
                        </div>
                        <button class="btn tool-btn" data-tool="qr-logo">QR con Logo</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>QR Dinámico</h3>
                        <p>Editable después de crear</p>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Contenido inicial">
                        </div>
                        <button class="btn tool-btn" data-tool="dynamic-qr">QR Dinámico</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>QR para WhatsApp</h3>
                        <p>Chat directo con número</p>
                        <div class="input-group">
                            <input type="tel" class="input-field" placeholder="+34 600 000 000">
                        </div>
                        <button class="btn tool-btn" data-tool="qr-whatsapp">QR WhatsApp</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>QR para WiFi</h3>
                        <p>Comparte acceso WiFi fácil</p>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Nombre WiFi (SSID)">
                        </div>
                        <div class="input-group">
                            <input type="password" class="input-field" placeholder="Contraseña">
                        </div>
                        <button class="btn tool-btn" data-tool="qr-wifi">QR WiFi</button>
                    </div>
                </div>
            </section>
        `;
    }

    getTextToolsHTML() {
        return `
            <section class="tool-section">
                <h2>📝 Herramientas de Texto</h2>
                <div class="tool-grid">
                    <div class="tool-card">
                        <h3>Contador de Caracteres</h3>
                        <p>Análisis completo de texto</p>
                        <div class="input-group">
                            <textarea class="input-field" rows="4" placeholder="Escribe tu texto..."></textarea>
                        </div>
                        <button class="btn tool-btn" data-tool="count-chars">Analizar Texto</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Convertidor de Mayúsculas</h3>
                        <p>MAYÚSCULAS, minúsculas, Tipo Título</p>
                        <div class="input-group">
                            <textarea class="input-field" rows="4" placeholder="Texto a convertir..."></textarea>
                        </div>
                        <button class="btn tool-btn" data-tool="uppercase">A MAYÚSCULAS</button>
                        <button class="btn tool-btn" data-tool="lowercase">a minúsculas</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Generador Lorem Ipsum</h3>
                        <p>Texto de relleno profesional</p>
                        <div class="input-group">
                            <input type="number" class="input-field" placeholder="Número de párrafos" value="3">
                        </div>
                        <button class="btn tool-btn" data-tool="lorem-ipsum">Generar Texto</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Extracción de Enlaces</h3>
                        <p>Encuentra todos los URLs en texto</p>
                        <div class="input-group">
                            <textarea class="input-field" rows="4" placeholder="Texto con enlaces..."></textarea>
                        </div>
                        <button class="btn tool-btn" data-tool="extract-links">Extraer Enlaces</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Comparador de Textos</h3>
                        <p>Encuentra diferencias entre textos</p>
                        <div class="input-group">
                            <textarea class="input-field" rows="3" placeholder="Texto original..."></textarea>
                            <textarea class="input-field" rows="3" placeholder="Texto modificado..."></textarea>
                        </div>
                        <button class="btn tool-btn" data-tool="compare-texts">Comparar</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Codificador Base64</h3>
                        <p>Codifica/decodifica texto</p>
                        <div class="input-group">
                            <textarea class="input-field" rows="4" placeholder="Texto a codificar..."></textarea>
                        </div>
                        <button class="btn tool-btn" data-tool="encode-base64">Codificar</button>
                        <button class="btn tool-btn" data-tool="decode-base64">Decodificar</button>
                    </div>
                </div>
            </section>
        `;
    }

    getImageToolsHTML() {
        return `
            <section class="tool-section">
                <h2>🖼️ Herramientas de Imágenes</h2>
                <div class="tool-grid">
                    <div class="tool-card">
                        <h3>Compresor de Imágenes</h3>
                        <p>Reduce tamaño JPG, PNG, WEBP</p>
                        <div class="input-group">
                            <input type="file" accept="image/*" class="input-field">
                        </div>
                        <button class="btn tool-btn" data-tool="compress-image">Comprimir</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Convertidor de Formatos</h3>
                        <p>JPG, PNG, WEBP, GIF</p>
                        <div class="input-group">
                            <input type="file" accept="image/*" class="input-field">
                        </div>
                        <select class="input-field">
                            <option>JPG</option>
                            <option>PNG</option>
                            <option>WEBP</option>
                        </select>
                        <button class="btn tool-btn" data-tool="convert-image">Convertir</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Redimensionador</h3>
                        <p>Cambia tamaño manteniendo calidad</p>
                        <div class="input-group">
                            <input type="file" accept="image/*" class="input-field">
                        </div>
                        <div class="input-group">
                            <input type="number" class="input-field" placeholder="Ancho (px)">
                            <input type="number" class="input-field" placeholder="Alto (px)">
                        </div>
                        <button class="btn tool-btn" data-tool="resize-image">Redimensionar</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Editor Básico Online</h3>
                        <p>Recortar, rotar, ajustes básicos</p>
                        <div class="input-group">
                            <input type="file" accept="image/*" class="input-field">
                        </div>
                        <button class="btn tool-btn" data-tool="edit-image">Editar Imagen</button>
                    </div>
                </div>
            </section>
        `;
    }

    getUrlToolsHTML() {
        return `
            <section class="tool-section">
                <h2>🔗 Herramientas de URLs</h2>
                <div class="tool-grid">
                    <div class="tool-card">
                        <h3>Acortador de Links</h3>
                        <p>Links cortos y personalizados</p>
                        <div class="input-group">
                            <input type="url" class="input-field" placeholder="https://url-muy-larga.com/...">
                        </div>
                        <button class="btn tool-btn" data-tool="shorten-url">Acortar URL</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>QR desde URL</h3>
                        <p>Convierte enlaces en código QR</p>
                        <div class="input-group">
                            <input type="url" class="input-field" placeholder="https://tu-web.com">
                        </div>
                        <button class="btn tool-btn" data-tool="url-to-qr">Generar QR</button>
                    </div>
                    
                    <div class="tool-card">
                        <h3>Verificador de Links</h3>
                        <p>Comprueba si URLs están activos</p>
                        <div class="input-group">
                            <textarea class="input-field" rows="4" placeholder="Lista de URLs a verificar..."></textarea>
                        </div>
                        <button class="btn tool-btn" data-tool="check-urls">Verificar Links</button>
                    </div>
                </div>
            </section>
        `;
    }

    getQuickToolsHTML() {
        return `
            <section class="tool-section">
                <h2>⚡ Herramientas Rápidas</h2>
                <p class="section-description">Acceso directo a las herramientas más usadas</p>
                <div class="tool-grid">
                    <div class="tool-card quick-tool" onclick="app.loadTab('video')">
                        <h3>🎬 Descargar Video</h3>
                        <p>YouTube, TikTok, Instagram</p>
                    </div>
                    
                    <div class="tool-card quick-tool" onclick="app.loadTab('qr')">
                        <h3>🔳 Generar QR</h3>
                        <p>Códigos QR instantáneos</p>
                    </div>
                    
                    <div class="tool-card quick-tool" onclick="app.loadTab('text')">
                        <h3>📝 Contar Caracteres</h3>
                        <p>Análisis de texto rápido</p>
                    </div>
                    
                    <div class="tool-card quick-tool" onclick="app.loadTab('images')">
                        <h3>🖼️ Comprimir Imagen</h3>
                        <p>Reduce tamaño de fotos</p>
                    </div>
                    
                    <div class="tool-card quick-tool" onclick="app.loadTab('urls')">
                        <h3>🔗 Acortar URL</h3>
                        <p>Links cortos al instante</p>
                    </div>
                    
                    <div class="tool-card quick-tool" data-tool="random-password">
                        <h3>🔐 Generar Contraseña</h3>
                        <p>Contraseñas seguras</p>
                    </div>
                </div>
            </section>
        `;
    }

    handleToolClick(button) {
        const tool = button.dataset.tool;
        this.showOutput(`🛠️ Ejecutando: ${tool} - <em>Esta herramienta está en desarrollo</em>`);
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
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ToolMasterApp();
});
