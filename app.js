class ToolMasterApp {
    constructor() {
        this.currentTab = 'video';
        this.backend = new MockBackend();
        this.init();
    }

    init() {
        this.showLoadingBar();
        this.loadTab(this.currentTab);
        this.bindEvents();
        setTimeout(() => this.hideLoadingBar(), 500);
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
            if (e.target.classList.contains('format-btn')) {
                this.handleFormatClick(e.target);
            }
            if (e.target.classList.contains('quick-tool')) {
                this.handleQuickTool(e.target);
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.id === 'video-url') this.analyzeVideoUrl(e.target.value);
            if (e.target.id === 'qr-text') this.previewQRData(e.target.value);
            if (e.target.id === 'text-input') this.liveTextAnalysis(e.target.value);
        });
    }

    handleNavClick(button) {
        const tab = button.dataset.tab;
        if (this.currentTab === tab) return;
        
        this.showLoadingBar();
        this.currentTab = tab;
        
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        this.loadTab(tab);
        
        setTimeout(() => this.hideLoadingBar(), 300);
    }

    loadTab(tab) {
        const contentArea = document.getElementById('content-area');
        const templates = {
            video: this.getVideoToolsHTML(),
            qr: this.getQRToolsHTML(),
            text: this.getTextToolsHTML(),
            images: this.getImageToolsHTML(),
            urls: this.getUrlToolsHTML(),
            quick: this.getQuickToolsHTML()
        };
        contentArea.innerHTML = templates[tab] || '<div>Contenido no disponible</div>';
    }

     // 🎬 CATEGORÍA VIDEO - COMPLETA CON 6 HERRAMIENTAS
   getVideoToolsHTML() {
    return `
        <section class="tool-section">
            <h2>🎬 Herramientas de Video Profesionales</h2>
            <div class="tool-grid">
                <!-- DESCARGADOR PROFESIONAL -->
                <div class="tool-card">
                    <h3>📥 Descargador Multiplataforma</h3>
                    <p class="tool-description">YouTube, TikTok, Instagram, Twitter, Facebook</p>
                    
                    <div class="input-group">
                        <input type="url" id="video-url" class="input-field" 
                               placeholder="https://youtube.com/watch?v=..." autocomplete="off">
                        <div class="url-status" id="url-status"></div>
                    </div>

                    <div class="platform-info hidden" id="platform-info">
                        <div class="platform-badge" id="platform-badge"></div>
                        <div class="video-meta" id="video-meta"></div>
                    </div>

                    <div class="format-options">
                        <label>🎯 Formato y Calidad:</label>
                        <select id="video-format" class="input-field">
                            <optgroup label="🎥 Video HD">
                                <option value="1080-mp4">1080p MP4 (HD Premium)</option>
                                <option value="720-mp4">720p MP4 (HD Balanced)</option>
                                <option value="480-mp4">480p MP4 (Standard)</option>
                            </optgroup>
                            <optgroup label="🎥 Video Web">
                                <option value="1080-webm">1080p WEBM (VP9)</option>
                                <option value="720-webm">720p WEBM (Optimized)</option>
                            </optgroup>
                            <optgroup label="🎵 Audio Premium">
                                <option value="mp3-320">MP3 320kbps (Studio Quality)</option>
                                <option value="mp3-256">MP3 256kbps (High Quality)</option>
                                <option value="flac">FLAC (Lossless Audio)</option>
                            </optgroup>
                            <optgroup label="🎵 Audio Estándar">
                                <option value="mp3-128">MP3 128kbps (Standard)</option>
                                <option value="m4a">M4A AAC (Apple Devices)</option>
                                <option value="ogg">OGG Vorbis (Web Audio)</option>
                            </optgroup>
                            <optgroup label="🖼️ Otros Formatos">
                                <option value="gif-hd">GIF HD 60fps</option>
                                <option value="gif-standard">GIF Standard</option>
                                <option value="thumbnail">Miniatura HD</option>
                            </optgroup>
                        </select>
                    </div>

                    <div class="download-options">
                        <label>⚡ Opciones de Descarga:</label>
                        <div class="option-group">
                            <input type="checkbox" id="include-metadata" checked>
                            <label for="include-metadata">Incluir metadatos</label>
                        </div>
                        <div class="option-group">
                            <input type="checkbox" id="high-speed" checked>
                            <label for="high-speed">Modo alta velocidad</label>
                        </div>
                    </div>

                    <button class="btn tool-btn download-main-btn" onclick="app.processVideoDownload()">
                        🚀 Iniciar Descarga Profesional
                    </button>

                    <div class="progress-container hidden" id="progress-container">
                        <div class="progress-info">
                            <span id="progress-text">Preparando descarga...</span>
                            <span id="progress-percent">0%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                        <div class="progress-details" id="progress-details"></div>
                    </div>
                </div>

                <!-- EXTRACTOR DE AUDIO PROFESIONAL -->
                <div class="tool-card">
                    <h3>🎵 Extractor de Audio Pro</h3>
                    <p class="tool-description">Extrae audio en calidad de estudio desde cualquier video</p>
                    
                    <div class="input-group">
                        <input type="url" id="audio-url" class="input-field" placeholder="URL del video">
                    </div>

                    <div class="audio-formats">
                        <label>🎚️ Formatos de Audio Disponibles:</label>
                        <div class="format-buttons">
                            <button class="format-btn active" data-format="mp3-320" data-quality="320kbps">MP3 320k</button>
                            <button class="format-btn" data-format="flac" data-quality="Lossless">FLAC</button>
                            <button class="format-btn" data-format="wav" data-quality="HD">WAV</button>
                            <button class="format-btn" data-format="m4a" data-quality="256kbps">M4A</button>
                            <button class="format-btn" data-format="ogg" data-quality="Vorbis">OGG</button>
                        </div>
                    </div>

                    <div class="audio-options">
                        <label>🎛️ Configuración de Audio:</label>
                        <select class="input-field" id="audio-bitrate">
                            <option value="320">320 kbps (Máxima Calidad)</option>
                            <option value="256">256 kbps (Alta Calidad)</option>
                            <option value="192">192 kbps (Calidad Estándar)</option>
                            <option value="128">128 kbps (Tamaño Optimizado)</option>
                        </select>
                    </div>

                    <button class="btn tool-btn" onclick="app.extractAudioPro()">
                        🎧 Extraer Audio Profesional
                    </button>
                </div>

                <!-- CONVERSOR GIF AVANZADO -->
                <div class="tool-card">
                    <h3>🔄 Conversor GIF Avanzado</h3>
                    <p class="tool-description">Crea GIFs de alta calidad con controles precisos</p>
                    
                    <div class="input-group">
                        <input type="url" id="gif-url" class="input-field" placeholder="URL del video">
                    </div>

                    <div class="gif-controls">
                        <div class="input-row">
                            <div class="input-group">
                                <label>⏱️ Inicio (segundos):</label>
                                <input type="number" class="input-field" value="0" min="0" id="gif-start">
                            </div>
                            <div class="input-group">
                                <label>⏱️ Duración (segundos):</label>
                                <input type="number" class="input-field" value="5" min="1" max="15" id="gif-duration">
                            </div>
                        </div>
                        
                        <div class="input-row">
                            <div class="input-group">
                                <label>📐 Resolución:</label>
                                <select class="input-field" id="gif-resolution">
                                    <option value="1080">1080p (Full HD)</option>
                                    <option value="720">720p (HD)</option>
                                    <option value="480" selected>480p (Optimizado)</option>
                                    <option value="360">360p (Rápido)</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label>🎞️ FPS:</label>
                                <select class="input-field" id="gif-fps">
                                    <option value="30">30 FPS (Suave)</option>
                                    <option value="24" selected>24 FPS (Estándar)</option>
                                    <option value="15">15 FPS (Ligero)</option>
                                    <option value="10">10 FPS (Muy Ligero)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button class="btn tool-btn" onclick="app.convertToGifPro()">
                        🖼️ Crear GIF Avanzado
                    </button>
                </div>

                <!-- RECORTADOR DE VIDEO -->
                <div class="tool-card">
                    <h3>✂️ Recortador de Video</h3>
                    <p class="tool-description">Recorta videos online sin instalar programas</p>
                    
                    <div class="input-group">
                        <input type="file" accept="video/*" class="input-field" id="trim-file">
                        <div class="file-info">Formatos soportados: MP4, WEBM, AVI, MOV</div>
                    </div>

                    <div class="trim-controls">
                        <div class="input-row">
                            <div class="input-group">
                                <label>⏱️ Tiempo de inicio:</label>
                                <input type="number" class="input-field" placeholder="Segundos" value="0" min="0" id="trim-start">
                            </div>
                            <div class="input-group">
                                <label>⏱️ Tiempo final:</label>
                                <input type="number" class="input-field" placeholder="Segundos" value="10" min="1" id="trim-end">
                            </div>
                        </div>
                        
                        <div class="option-group">
                            <input type="checkbox" id="preview-trim" checked>
                            <label for="preview-trim">Vista previa antes de descargar</label>
                        </div>
                    </div>

                    <button class="btn tool-btn" onclick="app.trimVideo()">
                        ✂️ Recortar Video
                    </button>
                </div>

                <!-- CONVERTIDOR DE FORMATOS -->
                <div class="tool-card">
                    <h3>🔄 Convertidor de Formatos</h3>
                    <p class="tool-description">Convierte entre MP4, WEBM, AVI, MOV y más</p>
                    
                    <div class="input-group">
                        <input type="file" accept="video/*" class="input-field" id="convert-file">
                        <div class="file-info">Selecciona el video a convertir</div>
                    </div>

                    <div class="conversion-options">
                        <div class="input-row">
                            <div class="input-group">
                                <label>📹 Formato origen:</label>
                                <input type="text" id="source-format" class="input-field" placeholder="Auto-detectado" readonly>
                            </div>
                            <div class="input-group">
                                <label>🎯 Formato destino:</label>
                                <select id="target-format" class="input-field">
                                    <option value="mp4">MP4 (Universal)</option>
                                    <option value="webm">WEBM (Web Optimizado)</option>
                                    <option value="avi">AVI (Compatible)</option>
                                    <option value="mov">MOV (Apple)</option>
                                    <option value="mkv">MKV (Alta calidad)</option>
                                    <option value="gif">GIF Animado</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="quality-options">
                            <label>🎚️ Calidad de salida:</label>
                            <select class="input-field" id="conversion-quality">
                                <option value="original">Original</option>
                                <option value="high">Alta calidad</option>
                                <option value="medium" selected>Calidad media</option>
                                <option value="low">Tamaño optimizado</option>
                            </select>
                        </div>
                    </div>

                    <button class="btn tool-btn" onclick="app.convertVideoFormat()">
                        🔄 Convertir Formato
                    </button>
                </div>

                <!-- COMPRESOR DE VIDEO -->
                <div class="tool-card">
                    <h3>📦 Compresor de Video</h3>
                    <p class="tool-description">Reduce tamaño manteniendo la calidad visual</p>
                    
                    <div class="input-group">
                        <input type="file" accept="video/*" class="input-field" id="compress-file">
                        <div class="file-info">Tamaño máximo: 500MB</div>
                    </div>

                    <div class="compression-controls">
                        <div class="input-group">
                            <label>🎚️ Nivel de compresión:</label>
                            <input type="range" id="compression-level" min="0" max="100" value="75" class="slider">
                            <div class="slider-labels">
                                <span>Máxima calidad</span>
                                <span id="compression-value">75%</span>
                                <span>Máxima compresión</span>
                            </div>
                        </div>
                        
                        <div class="compression-preview">
                            <div class="size-comparison">
                                <div class="original-size">
                                    <strong>Tamaño original:</strong> 
                                    <span id="original-size">-- MB</span>
                                </div>
                                <div class="compressed-size">
                                    <strong>Tamaño estimado:</strong> 
                                    <span id="estimated-size">-- MB</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="btn tool-btn" onclick="app.compressVideo()">
                        📦 Comprimir Video
                    </button>
                </div>
            </div>
        </section>
    `;
}

    // 🔳 CATEGORÍA QR - COMPLETAMENTE NUEVA
    getQRToolsHTML() {
        return `
            <section class="tool-section">
                <h2>🔳 Generadores QR Profesionales</h2>
                <div class="tool-grid">
                    <!-- QR BÁSICO AVANZADO -->
                    <div class="tool-card">
                        <h3>🔳 QR Básico Avanzado</h3>
                        <p>Genera códigos QR personalizables</p>
                        <div class="input-group">
                            <input type="text" id="qr-text" class="input-field" placeholder="Texto, URL, teléfono, email...">
                            <div class="qr-preview" id="qr-preview">
                                <div class="qr-placeholder">🔳 Vista previa del QR</div>
                            </div>
                        </div>
                        
                        <div class="qr-options">
                            <label>🎨 Personalización:</label>
                            <div class="input-row">
                                <div class="input-group">
                                    <label>Color:</label>
                                    <input type="color" id="qr-color" value="#000000" class="input-field">
                                </div>
                                <div class="input-group">
                                    <label>Tamaño:</label>
                                    <select id="qr-size" class="input-field">
                                        <option value="200">200x200</option>
                                        <option value="300" selected>300x300</option>
                                        <option value="400">400x400</option>
                                        <option value="500">500x500</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="input-group">
                                <label>Margen:</label>
                                <input type="range" id="qr-margin" min="0" max="50" value="20" class="slider">
                                <span id="qr-margin-value">20px</span>
                            </div>
                        </div>

                        <button class="btn tool-btn" onclick="app.generateQRCode()">
                            🎯 Generar QR Avanzado
                        </button>
                    </div>

                    <!-- QR CON LOGO -->
                    <div class="tool-card">
                        <h3>🏢 QR con Logo</h3>
                        <p>Personaliza con tu marca o imagen</p>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Contenido del QR" id="qr-logo-text">
                        </div>
                        <div class="input-group">
                            <label>Subir logo:</label>
                            <input type="file" id="qr-logo-file" accept="image/*" class="input-field">
                            <small>Tamaño recomendado: 80x80px</small>
                        </div>
                        <div class="logo-options">
                            <label>Tamaño del logo:</label>
                            <input type="range" id="logo-size" min="20" max="100" value="50" class="slider">
                            <span id="logo-size-value">50%</span>
                        </div>
                        <button class="btn tool-btn" onclick="app.generateQRWithLogo()">
                            🏢 Generar QR con Logo
                        </button>
                    </div>

                    <!-- QR DINÁMICO -->
                    <div class="tool-card">
                        <h3>🔄 QR Dinámico</h3>
                        <p>Editable después de crear - Con analytics</p>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Contenido inicial" id="dynamic-qr-text">
                        </div>
                        <div class="dynamic-features">
                            <label>🔄 Funciones Dinámicas:</label>
                            <div class="option-group">
                                <input type="checkbox" id="qr-analytics" checked>
                                <label for="qr-analytics">Activar analytics</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="qr-editable" checked>
                                <label for="qr-editable">Permitir edición</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="qr-password">
                                <label for="qr-password">Proteger con contraseña</label>
                            </div>
                        </div>
                        <button class="btn tool-btn" onclick="app.createDynamicQR()">
                            🔄 Crear QR Dinámico
                        </button>
                    </div>

                    <!-- QR WHATSAPP -->
                    <div class="tool-card">
                        <h3>💬 QR para WhatsApp</h3>
                        <p>Chat directo con número específico</p>
                        <div class="input-group">
                            <input type="tel" class="input-field" placeholder="+34 600 000 000" id="whatsapp-number">
                        </div>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Mensaje predeterminado (opcional)" id="whatsapp-message">
                        </div>
                        <button class="btn tool-btn" onclick="app.generateWhatsAppQR()">
                            💬 QR WhatsApp
                        </button>
                    </div>

                    <!-- QR WIFI -->
                    <div class="tool-card">
                        <h3>📶 QR para WiFi</h3>
                        <p>Comparte acceso WiFi fácilmente</p>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Nombre de la red (SSID)" id="wifi-ssid">
                        </div>
                        <div class="input-group">
                            <input type="password" class="input-field" placeholder="Contraseña WiFi" id="wifi-password">
                        </div>
                        <div class="input-group">
                            <label>Tipo de seguridad:</label>
                            <select class="input-field" id="wifi-security">
                                <option value="WPA">WPA/WPA2</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">Sin contraseña</option>
                            </select>
                        </div>
                        <button class="btn tool-btn" onclick="app.generateWiFiQR()">
                            📶 QR WiFi
                        </button>
                    </div>

                    <!-- QR TARJETA CONTACTO -->
                    <div class="tool-card">
                        <h3>👤 QR Tarjeta Contacto</h3>
                        <p>vCard para compartir información de contacto</p>
                        <div class="input-row">
                            <div class="input-group">
                                <input type="text" class="input-field" placeholder="Nombre" id="contact-name">
                            </div>
                            <div class="input-group">
                                <input type="tel" class="input-field" placeholder="Teléfono" id="contact-phone">
                            </div>
                        </div>
                        <div class="input-group">
                            <input type="email" class="input-field" placeholder="Email" id="contact-email">
                        </div>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Empresa (opcional)" id="contact-company">
                        </div>
                        <div class="input-group">
                            <input type="text" class="input-field" placeholder="Puesto (opcional)" id="contact-title">
                        </div>
                        <button class="btn tool-btn" onclick="app.generateContactQR()">
                            👤 QR Contacto
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    // 📝 CATEGORÍA TEXTO - COMPLETAMENTE NUEVA
    getTextToolsHTML() {
        return `
            <section class="tool-section">
                <h2>📝 Herramientas de Texto Avanzadas</h2>
                <div class="tool-grid">
                    <!-- ANALIZADOR DE TEXTO PROFESIONAL -->
                    <div class="tool-card">
                        <h3>📊 Analizador de Texto Pro</h3>
                        <p>Análisis completo y estadísticas detalladas</p>
                        <div class="input-group">
                            <textarea class="input-field" id="text-input" rows="6" 
                                      placeholder="Escribe o pega tu texto aquí..."></textarea>
                            <div class="live-stats" id="live-stats">
                                <div class="stat-item">Caracteres: <span id="char-count">0</span></div>
                                <div class="stat-item">Palabras: <span id="word-count">0</span></div>
                                <div class="stat-item">Líneas: <span id="line-count">0</span></div>
                            </div>
                        </div>
                        <div class="analysis-options">
                            <label>📈 Métricas Avanzadas:</label>
                            <div class="option-group">
                                <input type="checkbox" id="count-spaces" checked>
                                <label for="count-spaces">Incluir espacios</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="count-punctuation" checked>
                                <label for="count-punctuation">Incluir puntuación</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="reading-time">
                                <label for="reading-time">Calcular tiempo lectura</label>
                            </div>
                        </div>
                        <button class="btn tool-btn" onclick="app.analyzeTextPro()">
                            📊 Analizar Texto Profesional
                        </button>
                    </div>

                    <!-- CONVERTIDOR DE MAYÚSCULAS -->
                    <div class="tool-card">
                        <h3>🔄 Convertidor de Texto</h3>
                        <p>Transforma texto entre diferentes formatos</p>
                        <div class="input-group">
                            <textarea class="input-field" id="convert-text" rows="4" placeholder="Texto a convertir..."></textarea>
                        </div>
                        <div class="conversion-buttons">
                            <button class="btn conversion-btn" onclick="app.convertToUppercase()">MAYÚSCULAS</button>
                            <button class="btn conversion-btn" onclick="app.convertToLowercase()">minúsculas</button>
                            <button class="btn conversion-btn" onclick="app.convertToTitleCase()">Tipo Título</button>
                            <button class="btn conversion-btn" onclick="app.convertToSentenceCase()">Tipo Oración</button>
                            <button class="btn conversion-btn" onclick="app.invertCase()">InVeRtIr CaSo</button>
                        </div>
                        <div class="additional-options">
                            <button class="btn secondary-btn" onclick="app.removeExtraSpaces()">Quitar espacios extra</button>
                            <button class="btn secondary-btn" onclick="app.reverseText()">Invertir texto</button>
                        </div>
                    </div>

                    <!-- GENERADOR LOREM IPSUM -->
                    <div class="tool-card">
                        <h3>📄 Generador Lorem Ipsum</h3>
                        <p>Texto de relleno profesional para maquetación</p>
                        <div class="input-row">
                            <div class="input-group">
                                <label>Cantidad:</label>
                                <input type="number" id="lorem-amount" class="input-field" value="3" min="1" max="20">
                            </div>
                            <div class="input-group">
                                <label>Tipo:</label>
                                <select id="lorem-type" class="input-field">
                                    <option value="paragraphs">Párrafos</option>
                                    <option value="words">Palabras</option>
                                    <option value="sentences">Oraciones</option>
                                </select>
                            </div>
                        </div>
                        <div class="lorem-options">
                            <label>Opciones avanzadas:</label>
                            <div class="option-group">
                                <input type="checkbox" id="lorem-html">
                                <label for="lorem-html">Formato HTML</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="lorem-decorate">
                                <label for="lorem-decorate">Texto decorativo</label>
                            </div>
                        </div>
                        <button class="btn tool-btn" onclick="app.generateLoremIpsum()">
                            📄 Generar Lorem Ipsum
                        </button>
                    </div>

                    <!-- EXTRACTOR DE ENLACES/EMAILS -->
                    <div class="tool-card">
                        <h3>🔗 Extractor de URLs/Emails</h3>
                        <p>Encuentra y extrae automáticamente</p>
                        <div class="input-group">
                            <textarea class="input-field" id="extract-text" rows="4" 
                                      placeholder="Texto con URLs, emails, teléfonos..."></textarea>
                        </div>
                        <div class="extraction-options">
                            <label>Extraer:</label>
                            <div class="option-group">
                                <input type="checkbox" id="extract-urls" checked>
                                <label for="extract-urls">URLs</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="extract-emails" checked>
                                <label for="extract-emails">Emails</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="extract-phones">
                                <label for="extract-phones">Teléfonos</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="extract-hashtags">
                                <label for="extract-hashtags">Hashtags</label>
                            </div>
                        </div>
                        <button class="btn tool-btn" onclick="app.extractElements()">
                            🔗 Extraer Elementos
                        </button>
                    </div>

                    <!-- COMPARADOR DE TEXTOS -->
                    <div class="tool-card">
                        <h3>⚖️ Comparador de Textos</h3>
                        <p>Encuentra diferencias y similitudes</p>
                        <div class="input-group">
                            <label>Texto Original:</label>
                            <textarea class="input-field" id="original-text" rows="3" placeholder="Primer texto..."></textarea>
                        </div>
                        <div class="input-group">
                            <label>Texto Modificado:</label>
                            <textarea class="input-field" id="modified-text" rows="3" placeholder="Segundo texto..."></textarea>
                        </div>
                        <div class="comparison-options">
                            <label>Tipo de comparación:</label>
                            <select id="comparison-type" class="input-field">
                                <option value="word">Por palabras</option>
                                <option value="character">Por caracteres</option>
                                <option value="line">Por líneas</option>
                            </select>
                        </div>
                        <button class="btn tool-btn" onclick="app.compareTexts()">
                            ⚖️ Comparar Textos
                        </button>
                    </div>

                    <!-- CODIFICADOR BASE64 -->
                    <div class="tool-card">
                        <h3>🔐 Codificador Base64</h3>
                        <p>Codifica y decodifica texto en Base64</p>
                        <div class="input-group">
                            <textarea class="input-field" id="base64-text" rows="4" placeholder="Texto a codificar/decodificar..."></textarea>
                        </div>
                        <div class="base64-actions">
                            <button class="btn conversion-btn" onclick="app.encodeBase64()">🔒 Codificar</button>
                            <button class="btn conversion-btn" onclick="app.decodeBase64()">🔓 Decodificar</button>
                        </div>
                        <div class="advanced-options">
                            <label>Opciones avanzadas:</label>
                            <div class="option-group">
                                <input type="checkbox" id="base64-url">
                                <label for="base64-url">URL Safe</label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // 🖼️ CATEGORÍA IMÁGENES - COMPLETAMENTE NUEVA
    getImageToolsHTML() {
        return `
            <section class="tool-section">
                <h2>🖼️ Herramientas de Imagen</h2>
                <div class="tool-grid">
                    <!-- COMPRESOR DE IMÁGENES -->
                    <div class="tool-card">
                        <h3>📦 Compresor de Imágenes</h3>
                        <p>Reduce tamaño manteniendo calidad</p>
                        <div class="input-group">
                            <input type="file" id="compress-image" accept="image/*" class="input-field">
                            <div class="file-info" id="compress-file-info"></div>
                        </div>
                        <div class="compression-options">
                            <label>Nivel de compresión:</label>
                            <input type="range" id="compression-level" min="0" max="100" value="75" class="slider">
                            <div class="slider-labels">
                                <span>Máxima calidad</span>
                                <span id="compression-value">75%</span>
                                <span>Máxima compresión</span>
                            </div>
                        </div>
                        <div class="format-options">
                            <label>Formato de salida:</label>
                            <select id="output-format" class="input-field">
                                <option value="original">Original</option>
                                <option value="jpg">JPG</option>
                                <option value="png">PNG</option>
                                <option value="webp">WEBP</option>
                            </select>
                        </div>
                        <button class="btn tool-btn" onclick="app.compressImage()">
                            📦 Comprimir Imagen
                        </button>
                    </div>

                    <!-- CONVERSOR DE FORMATOS -->
                    <div class="tool-card">
                        <h3>🔄 Conversor de Formatos</h3>
                        <p>Convierte entre JPG, PNG, WEBP, GIF</p>
                        <div class="input-group">
                            <input type="file" id="convert-image" accept="image/*" class="input-field">
                        </div>
                        <div class="conversion-options">
                            <div class="input-row">
                                <div class="input-group">
                                    <label>Formato origen:</label>
                                    <input type="text" id="source-format" class="input-field" readonly>
                                </div>
                                <div class="input-group">
                                    <label>Formato destino:</label>
                                    <select id="target-format" class="input-field">
                                        <option value="jpg">JPG</option>
                                        <option value="png">PNG</option>
                                        <option value="webp">WEBP</option>
                                        <option value="gif">GIF</option>
                                        <option value="bmp">BMP</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button class="btn tool-btn" onclick="app.convertImageFormat()">
                            🔄 Convertir Formato
                        </button>
                    </div>

                    <!-- REDIMENSIONADOR -->
                    <div class="tool-card">
                        <h3>📐 Redimensionador de Imágenes</h3>
                        <p>Cambia tamaño manteniendo proporciones</p>
                        <div class="input-group">
                            <input type="file" id="resize-image" accept="image/*" class="input-field">
                        </div>
                        <div class="resize-options">
                            <div class="input-row">
                                <div class="input-group">
                                    <label>Ancho (px):</label>
                                    <input type="number" id="resize-width" class="input-field" placeholder="Auto">
                                </div>
                                <div class="input-group">
                                    <label>Alto (px):</label>
                                    <input type="number" id="resize-height" class="input-field" placeholder="Auto">
                                </div>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="maintain-aspect" checked>
                                <label for="maintain-aspect">Mantener proporción</label>
                            </div>
                            <div class="preset-sizes">
                                <label>Tamaños predefinidos:</label>
                                <div class="size-buttons">
                                    <button class="size-btn" data-width="1920" data-height="1080">HD (1920x1080)</button>
                                    <button class="size-btn" data-width="1280" data-height="720">720p (1280x720)</button>
                                    <button class="size-btn" data-width="800" data-height="600">800x600</button>
                                    <button class="size-btn" data-width="400" data-height="300">Miniatura</button>
                                </div>
                            </div>
                        </div>
                        <button class="btn tool-btn" onclick="app.resizeImage()">
                            📐 Redimensionar
                        </button>
                    </div>

                    <!-- EDITOR BÁSICO -->
                    <div class="tool-card">
                        <h3>🎨 Editor Básico Online</h3>
                        <p>Edita imágenes directamente en el navegador</p>
                        <div class="input-group">
                            <input type="file" id="edit-image" accept="image/*" class="input-field">
                        </div>
                        <div class="editor-tools">
                            <label>Herramientas de edición:</label>
                            <div class="tool-buttons">
                                <button class="tool-option" data-tool="crop">✂️ Recortar</button>
                                <button class="tool-option" data-tool="rotate">🔄 Rotar</button>
                                <button class="tool-option" data-tool="flip">↔️ Voltear</button>
                                <button class="tool-option" data-tool="brightness">☀️ Brillo</button>
                                <button class="tool-option" data-tool="contrast">🎭 Contraste</button>
                                <button class="tool-option" data-tool="filter">🌈 Filtros</button>
                            </div>
                        </div>
                        <div class="editor-preview">
                            <div class="preview-placeholder">Vista previa del editor</div>
                        </div>
                        <button class="btn tool-btn" onclick="app.openImageEditor()">
                            🎨 Abrir Editor
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    // 🔗 CATEGORÍA URLs - COMPLETAMENTE NUEVA
    getUrlToolsHTML() {
        return `
            <section class="tool-section">
                <h2>🔗 Herramientas de URLs</h2>
                <div class="tool-grid">
                    <!-- ACORTADOR DE LINKS -->
                    <div class="tool-card">
                        <h3>🔗 Acortador de URLs</h3>
                        <p>Links cortos y personalizados</p>
                        <div class="input-group">
                            <input type="url" id="long-url" class="input-field" placeholder="https://url-muy-larga.com/...">
                        </div>
                        <div class="custom-options">
                            <label>Personalizar enlace (opcional):</label>
                            <div class="input-row">
                                <span class="url-prefix">toolmaster.com/</span>
                                <input type="text" id="custom-alias" class="input-field" placeholder="mi-enlace">
                            </div>
                        </div>
                        <div class="url-options">
                            <div class="option-group">
                                <input type="checkbox" id="url-tracking">
                                <label for="url-tracking">Activar tracking de clics</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="url-password">
                                <label for="url-password">Proteger con contraseña</label>
                            </div>
                        </div>
                        <button class="btn tool-btn" onclick="app.shortenURL()">
                            🔗 Acortar URL
                        </button>
                    </div>

                    <!-- QR DESDE URL -->
                    <div class="tool-card">
                        <h3>🔳 QR desde URL</h3>
                        <p>Convierte enlaces en códigos QR</p>
                        <div class="input-group">
                            <input type="url" id="url-to-qr" class="input-field" placeholder="https://tu-web.com">
                        </div>
                        <div class="qr-options">
                            <label>Opciones del QR:</label>
                            <select id="qr-style" class="input-field">
                                <option value="standard">Estándar</option>
                                <option value="color">Colorido</option>
                                <option value="gradient">Gradiente</option>
                                <option value="rounded">Esquinas redondeadas</option>
                            </select>
                        </div>
                        <button class="btn tool-btn" onclick="app.generateURLQR()">
                            🔳 Generar QR desde URL
                        </button>
                    </div>

                    <!-- VERIFICADOR DE LINKS -->
                    <div class="tool-card">
                        <h3>🔍 Verificador de URLs</h3>
                        <p>Comprueba si enlaces están activos</p>
                        <div class="input-group">
                            <textarea class="input-field" id="urls-to-check" rows="4" 
                                      placeholder="Una URL por línea..."></textarea>
                        </div>
                        <div class="verification-options">
                            <label>Opciones de verificación:</label>
                            <div class="option-group">
                                <input type="checkbox" id="check-redirects">
                                <label for="check-redirects">Seguir redirecciones</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="check-timeout">
                                <label for="check-timeout">Tiempo de espera (10s)</label>
                            </div>
                        </div>
                        <button class="btn tool-btn" onclick="app.checkURLs()">
                            🔍 Verificar URLs
                        </button>
                    </div>

                    <!-- EXTRACTOR DE METADATOS -->
                    <div class="tool-card">
                        <h3>📊 Extractor de Metadatos</h3>
                        <p>Información SEO y metadatos de páginas web</p>
                        <div class="input-group">
                            <input type="url" id="metadata-url" class="input-field" placeholder="https://ejemplo.com">
                        </div>
                        <div class="metadata-options">
                            <label>Extraer:</label>
                            <div class="option-group">
                                <input type="checkbox" id="meta-seo" checked>
                                <label for="meta-seo">Datos SEO</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="meta-social" checked>
                                <label for="meta-social">Meta tags sociales</label>
                            </div>
                            <div class="option-group">
                                <input type="checkbox" id="meta-images">
                                <label for="meta-images">Imágenes</label>
                            </div>
                        </div>
                        <button class="btn tool-btn" onclick="app.extractMetadata()">
                            📊 Extraer Metadatos
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    // ⚡ CATEGORÍA HERRAMIENTAS RÁPIDAS
    getQuickToolsHTML() {
        return `
            <section class="tool-section">
                <h2>⚡ Herramientas Rápidas</h2>
                <p class="section-description">Acceso directo a las herramientas más populares - Un solo clic</p>
                <div class="tool-grid">
                    <div class="tool-card quick-tool" data-action="video-download">
                        <h3>🎬 Descargar Video Rápido</h3>
                        <p>YouTube, TikTok, Instagram al instante</p>
                        <div class="quick-input hidden">
                            <input type="url" class="input-field quick-url" placeholder="Pega URL del video">
                            <button class="btn quick-download">⬇️ Descargar</button>
                        </div>
                    </div>

                    <div class="tool-card quick-tool" data-action="generate-qr">
                        <h3>🔳 QR Instantáneo</h3>
                        <p>Código QR en segundos</p>
                        <div class="quick-input hidden">
                            <input type="text" class="input-field quick-text" placeholder="Texto para QR">
                            <button class="btn quick-generate">🎯 Generar</button>
                        </div>
                    </div>

                    <div class="tool-card quick-tool" data-action="count-chars">
                        <h3>📝 Contar Caracteres</h3>
                        <p>Análisis de texto rápido</p>
                        <div class="quick-input hidden">
                            <textarea class="input-field quick-textarea" placeholder="Pega tu texto"></textarea>
                            <button class="btn quick-analyze">📊 Analizar</button>
                        </div>
                    </div>

                    <div class="tool-card quick-tool" data-action="compress-image">
                        <h3>🖼️ Comprimir Imagen</h3>
                        <p>Reduce tamaño al instante</p>
                        <div class="quick-input hidden">
                            <input type="file" class="input-field quick-file" accept="image/*">
                            <button class="btn quick-compress">📦 Comprimir</button>
                        </div>
                    </div>

                    <div class="tool-card quick-tool" data-action="shorten-url">
                        <h3>🔗 Acortar URL</h3>
                        <p>Links cortos inmediatos</p>
                        <div class="quick-input hidden">
                            <input type="url" class="input-field quick-url" placeholder="URL larga">
                            <button class="btn quick-shorten">🔗 Acortar</button>
                        </div>
                    </div>

                    <div class="tool-card quick-tool" data-action="generate-password">
                        <h3>🔐 Generar Contraseña</h3>
                        <p>Contraseñas seguras al instante</p>
                        <div class="quick-result">
                            <div class="password-display" id="quick-password">••••••••</div>
                            <button class="btn quick-generate-pw">🎲 Generar</button>
                            <button class="btn secondary-btn quick-copy">📋 Copiar</button>
                        </div>
                    </div>

                    <div class="tool-card quick-tool" data-action="color-picker">
                        <h3>🎨 Selector de Color</h3>
                        <p>Elige y copia colores fácilmente</p>
                        <div class="color-picker-interface">
                            <input type="color" id="quick-color" value="#2563eb">
                            <div class="color-values">
                                <div>HEX: <span id="color-hex">#2563eb</span></div>
                                <div>RGB: <span id="color-rgb">rgb(37, 99, 235)</span></div>
                                <div>HSL: <span id="color-hsl">hsl(224, 83%, 53%)</span></div>
                            </div>
                            <button class="btn quick-copy-color">📋 Copiar HEX</button>
                        </div>
                    </div>

                    <div class="tool-card quick-tool" data-action="unit-converter">
                        <h3>📏 Conversor de Unidades</h3>
                        <p>Conversiones rápidas y precisas</p>
                        <div class="unit-converter-interface">
                            <div class="input-row">
                                <input type="number" class="input-field unit-value" value="1">
                                <select class="input-field unit-from">
                                    <option value="cm">Centímetros</option>
                                    <option value="m">Metros</option>
                                    <option value="km">Kilómetros</option>
                                    <option value="in">Pulgadas</option>
                                    <option value="ft">Pies</option>
                                </select>
                            </div>
                            <div class="input-row">
                                <input type="number" class="input-field unit-result" readonly>
                                <select class="input-field unit-to">
                                    <option value="in">Pulgadas</option>
                                    <option value="ft">Pies</option>
                                    <option value="cm">Centímetros</option>
                                    <option value="m">Metros</option>
                                    <option value="km">Kilómetros</option>
                                </select>
                            </div>
                            <button class="btn quick-convert">🔄 Convertir</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // 🎯 FUNCIONES PARA CATEGORÍA QR
    previewQRData(text) {
        const preview = document.getElementById('qr-preview');
        if (text.length > 0) {
            preview.innerHTML = `<div class="qr-preview-content">🔳 QR Preview: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"</div>`;
        } else {
            preview.innerHTML = '<div class="qr-placeholder">🔳 Vista previa del QR</div>';
        }
    }

    async generateQRCode() {
        const text = document.getElementById('qr-text').value;
        const color = document.getElementById('qr-color').value;
        const size = document.getElementById('qr-size').value;
        const margin = document.getElementById('qr-margin').value;

        if (!text) {
            this.showOutput('❌ Introduce texto o URL para generar el QR');
            return;
        }

        this.showProgress('Generando código QR...', 2000);

        const result = await this.backend.generateQR(text, color, size, margin);
        this.showOutput(`
            <div class="qr-result">
                <h4>✅ QR Generado Exitosamente</h4>
                <div class="qr-display">
                    <div class="qr-image" style="background: #f0f0f0; padding: 20px; border-radius: 8px; display: inline-block;">
                        <div style="width: ${size}px; height: ${size}px; background: linear-gradient(45deg, ${color}, #333); 
                                    display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                            <span style="color: white; font-size: 12px;">[QR SIMULADO]</span>
                        </div>
                    </div>
                </div>
                <div class="qr-info">
                    <p><strong>Contenido:</strong> ${text}</p>
                    <p><strong>Tamaño:</strong> ${size}x${size}px</p>
                    <p><strong>Color:</strong> <span style="color: ${color}">${color}</span></p>
                    <p><strong>Margen:</strong> ${margin}px</p>
                </div>
                <div class="download-actions">
                    <button class="btn download-action-btn" onclick="app.downloadQR()">
                        ⬇️ Descargar QR
                    </button>
                    <button class="btn secondary-btn" onclick="app.copyQRCode()">
                        📋 Copiar QR
                    </button>
                </div>
            </div>
        `);
    }

    async generateQRWithLogo() {
        this.showOutput('🏢 Generando QR con logo... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ QR con logo creado exitosamente');
    }

    async createDynamicQR() {
        this.showOutput('🔄 Creando QR dinámico con analytics... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ QR dinámico creado - Panel de analytics activado');
    }

    async generateWhatsAppQR() {
        this.showOutput('💬 Generando QR para WhatsApp... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ QR WhatsApp listo - Escanea y chatea directamente');
    }

    async generateWiFiQR() {
        this.showOutput('📶 Generando QR WiFi... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ QR WiFi creado - Escanea para conectar automáticamente');
    }

    async generateContactQR() {
        this.showOutput('👤 Generando QR de contacto... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ QR de contacto creado - Escanea para agregar a contactos');
    }

    // 📝 FUNCIONES PARA CATEGORÍA TEXTO
    liveTextAnalysis(text) {
        const charCount = document.getElementById('char-count');
        const wordCount = document.getElementById('word-count');
        const lineCount = document.getElementById('line-count');

        charCount.textContent = text.length;
        wordCount.textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
        lineCount.textContent = text.split('\n').length;
    }

    async analyzeTextPro() {
        const text = document.getElementById('text-input').value;
        
        if (!text) {
            this.showOutput('❌ Introduce texto para analizar');
            return;
        }

        this.showProgress('Analizando texto profesionalmente...', 2000);

        const analysis = await this.backend.analyzeText(text);
        this.showOutput(`
            <div class="text-analysis-result">
                <h4>📊 Análisis de Texto Completo</h4>
                <div class="analysis-grid">
                    <div class="analysis-section">
                        <h5>📈 Estadísticas Básicas</h5>
                        <div class="stats-grid">
                            <div class="stat"><strong>Caracteres:</strong> ${analysis.characters.total}</div>
                            <div class="stat"><strong>Caracteres (sin espacios):</strong> ${analysis.characters.noSpaces}</div>
                            <div class="stat"><strong>Palabras:</strong> ${analysis.words.total}</div>
                            <div class="stat"><strong>Palabras únicas:</strong> ${analysis.words.unique}</div>
                            <div class="stat"><strong>Líneas:</strong> ${analysis.lines}</div>
                            <div class="stat"><strong>Párrafos:</strong> ${analysis.paragraphs}</div>
                        </div>
                    </div>
                    
                    <div class="analysis-section">
                        <h5>⏱️ Tiempos de Lectura</h5>
                        <div class="stats-grid">
                            <div class="stat"><strong>Lectura rápida:</strong> ${analysis.readingTime.fast}</div>
                            <div class="stat"><strong>Lectura media:</strong> ${analysis.readingTime.medium}</div>
                            <div class="stat"><strong>Lectura lenta:</strong> ${analysis.readingTime.slow}</div>
                            <div class="stat"><strong>Habla:</strong> ${analysis.speakingTime}</div>
                        </div>
                    </div>
                    
                    <div class="analysis-section">
                        <h5>🔤 Distribución</h5>
                        <div class="stats-grid">
                            <div class="stat"><strong>Letras:</strong> ${analysis.distribution.letters}</div>
                            <div class="stat"><strong>Dígitos:</strong> ${analysis.distribution.digits}</div>
                            <div class="stat"><strong>Espacios:</strong> ${analysis.distribution.spaces}</div>
                            <div class="stat"><strong>Puntuación:</strong> ${analysis.distribution.punctuation}</div>
                        </div>
                    </div>
                </div>
                
                <div class="word-cloud">
                    <h5>☁️ Palabras Más Frecuentes</h5>
                    <div class="cloud-tags">
                        ${analysis.topWords.map(word => 
                            `<span class="cloud-tag" style="font-size: ${word.size}px">${word.word}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `);
    }

    convertToUppercase() {
        const text = document.getElementById('convert-text').value;
        document.getElementById('convert-text').value = text.toUpperCase();
        this.showOutput('✅ Texto convertido a MAYÚSCULAS');
    }

    convertToLowercase() {
        const text = document.getElementById('convert-text').value;
        document.getElementById('convert-text').value = text.toLowerCase();
        this.showOutput('✅ Texto convertido a minúsculas');
    }

    convertToTitleCase() {
        const text = document.getElementById('convert-text').value;
        document.getElementById('convert-text').value = text.replace(/\w\S*/g, 
            txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        this.showOutput('✅ Texto convertido a Tipo Título');
    }

    convertToSentenceCase() {
        const text = document.getElementById('convert-text').value;
        document.getElementById('convert-text').value = text.replace(/.+?[\.\?\!](\s|$)/g, 
            txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        this.showOutput('✅ Texto convertido a Tipo Oración');
    }

    invertCase() {
        const text = document.getElementById('convert-text').value;
        document.getElementById('convert-text').value = text.split('').map(char => 
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join('');
        this.showOutput('✅ Caso del texto invertido');
    }

    removeExtraSpaces() {
        const text = document.getElementById('convert-text').value;
        document.getElementById('convert-text').value = text.replace(/\s+/g, ' ').trim();
        this.showOutput('✅ Espacios extra removidos');
    }

    reverseText() {
        const text = document.getElementById('convert-text').value;
        document.getElementById('convert-text').value = text.split('').reverse().join('');
        this.showOutput('✅ Texto invertido');
    }

    async generateLoremIpsum() {
        const amount = document.getElementById('lorem-amount').value;
        const type = document.getElementById('lorem-type').value;
        
        this.showProgress('Generando texto Lorem Ipsum...', 1000);

        const lorem = await this.backend.generateLoremIpsum(amount, type);
        this.showOutput(`
            <div class="lorem-result">
                <h4>📄 Lorem Ipsum Generado</h4>
                <div class="lorem-content">
                    ${lorem}
                </div>
                <div class="text-actions">
                    <button class="btn" onclick="app.copyToClipboard('${lorem.replace(/'/g, "\\'")}')">
                        📋 Copiar Texto
                    </button>
                    <button class="btn secondary-btn" onclick="app.clearLorem()">
                        🗑️ Limpiar
                    </button>
                </div>
            </div>
        `);
    }

    async extractElements() {
        this.showOutput('🔗 Extrayendo URLs, emails y elementos... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ Elementos extraídos y organizados');
    }

    async compareTexts() {
        this.showOutput('⚖️ Comparando textos... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ Análisis de diferencias completado');
    }

    encodeBase64() {
        const text = document.getElementById('base64-text').value;
        document.getElementById('base64-text').value = btoa(unescape(encodeURIComponent(text)));
        this.showOutput('✅ Texto codificado en Base64');
    }

    decodeBase64() {
        const text = document.getElementById('base64-text').value;
        try {
            document.getElementById('base64-text').value = decodeURIComponent(escape(atob(text)));
            this.showOutput('✅ Texto decodificado de Base64');
        } catch (e) {
            this.showOutput('❌ Error: Texto no válido en Base64');
        }
    }

    // 🖼️ FUNCIONES PARA CATEGORÍA IMÁGENES
    async compressImage() {
        this.showOutput('📦 Comprimiendo imagen... (Backend simulado)');
        await this.delay(2000);
        this.showOutput('✅ Imagen comprimida - Reducción del 65% en tamaño');
    }

    async convertImageFormat() {
        this.showOutput('🔄 Convirtiendo formato de imagen... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ Formato convertido exitosamente');
    }

    async resizeImage() {
        this.showOutput('📐 Redimensionando imagen... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ Imagen redimensionada manteniendo calidad');
    }

    async openImageEditor() {
        this.showOutput('🎨 Abriendo editor de imágenes... (Backend simulado)');
        await this.delay(1000);
        this.showOutput('✅ Editor de imágenes listo - Arrastra y suelta para comenzar');
    }

    // 🔗 FUNCIONES PARA CATEGORÍA URLs
    async shortenURL() {
        this.showOutput('🔗 Acortando URL... (Backend simulado)');
        await this.delay(1000);
        this.showOutput('✅ URL acortada: toolmaster.com/abc123');
    }

    async generateURLQR() {
        this.showOutput('🔳 Generando QR desde URL... (Backend simulado)');
        await this.delay(1000);
        this.showOutput('✅ QR generado desde la URL proporcionada');
    }

    async checkURLs() {
        this.showOutput('🔍 Verificando URLs... (Backend simulado)');
        await this.delay(2000);
        this.showOutput('✅ Verificación completada - 5/5 URLs activos');
    }

    async extractMetadata() {
        this.showOutput('📊 Extrayendo metadatos... (Backend simulado)');
        await this.delay(1500);
        this.showOutput('✅ Metadatos extraídos - Información SEO disponible');
    }

    // ⚡ FUNCIONES PARA HERRAMIENTAS RÁPIDAS
    handleQuickTool(tool) {
        const action = tool.dataset.action;
        const quickInput = tool.querySelector('.quick-input');
        
        if (quickInput) {
            quickInput.classList.toggle('hidden');
        }

        switch(action) {
            case 'generate-password':
                this.generateQuickPassword();
                break;
            case 'color-picker':
                this.setupColorPicker();
                break;
            case 'unit-converter':
                this.setupUnitConverter();
                break;
        }
    }

    generateQuickPassword() {
        const length = 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        document.getElementById('quick-password').textContent = password;
        this.showOutput('🔐 Contraseña generada exitosamente');
    }

    setupColorPicker() {
        const colorPicker = document.getElementById('quick-color');
        colorPicker.addEventListener('input', (e) => {
            const hex = e.target.value;
            const rgb = this.hexToRgb(hex);
            const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
            
            document.getElementById('color-hex').textContent = hex;
            document.getElementById('color-rgb').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            document.getElementById('color-hsl').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        });
    }

    setupUnitConverter() {
        const convertBtn = document.querySelector('.quick-convert');
        convertBtn.addEventListener('click', () => {
            this.convertUnits();
        });
    }

    convertUnits() {
        // Simulación de conversión de unidades
        this.showOutput('📏 Unidades convertidas exitosamente');
    }

    // 🛠️ FUNCIONES DE UTILIDAD
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 0, g: 0, b: 0};
    }

    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    showProgress(message, duration) {
        this.showOutput(`⏳ ${message}`);
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        setTimeout(() => loadingBar.style.transform = 'scaleX(0)', 300);
    }

    // 🎬 FUNCIONES DE VIDEO (las que ya teníamos)
    async processVideoDownload() {
        this.showOutput('🎬 Procesando descarga de video... (Backend simulado)');
        await this.delay(2000);
        this.showOutput('✅ Video descargado exitosamente - 1080p MP4 listo');
    }

    analyzeVideoUrl(url) {
        // Implementación existente
    }
}

// 🏗️ BACKEND SIMULADO EXPANDIDO
class MockBackend {
    // ... (métodos existentes del backend simulado)

    async generateQR(text, color, size, margin) {
        await this.simulateNetworkDelay();
        return {
            text: text,
            color: color,
            size: size,
            margin: margin,
            format: 'PNG'
        };
    }

    async analyzeText(text) {
        await this.simulateNetworkDelay();
        
        const words = text.trim() ? text.trim().split(/\s+/) : [];
        const wordFreq = {};
        words.forEach(word => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
            if (cleanWord) wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
        });

        const topWords = Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word, count], index) => ({
                word,
                count,
                size: 16 + (10 - index) * 2
            }));

        return {
            characters: {
                total: text.length,
                noSpaces: text.replace(/\s/g, '').length
            },
            words: {
                total: words.length,
                unique: new Set(words.map(w => w.toLowerCase())).size
            },
            lines: text.split('\n').length,
            paragraphs: text.split('\n\n').filter(p => p.trim()).length,
            readingTime: {
                fast: `${Math.ceil(words.length / 300)} min`,
                medium: `${Math.ceil(words.length / 250)} min`,
                slow: `${Math.ceil(words.length / 200)} min`
            },
            speakingTime: `${Math.ceil(words.length / 130)} min`,
            distribution: {
                letters: (text.match(/[a-zA-Z]/g) || []).length,
                digits: (text.match(/\d/g) || []).length,
                spaces: (text.match(/\s/g) || []).length,
                punctuation: (text.match(/[^\w\s]/g) || []).length
            },
            topWords: topWords
        };
    }

    async generateLoremIpsum(amount, type) {
        await this.simulateNetworkDelay();
        
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
        
        if (type === 'words') {
            return lorem.split(' ').slice(0, amount).join(' ');
        } else if (type === 'sentences') {
            return Array(amount).fill(lorem.split('.')[0] + '.').join(' ');
        } else {
            return Array(amount).fill(lorem).join('\n\n');
        }
    }

    simulateNetworkDelay(max = 1000) {
        return new Promise(resolve => 
            setTimeout(resolve, Math.random() * max + 500)
        );
    }
}

// 🚀 INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ToolMasterApp();
});
