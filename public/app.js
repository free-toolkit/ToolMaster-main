
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
