// PDF Tools - Funcionalidad Completa
class PDFTools {
    constructor() {
        this.init();
    }

    init() {
        console.log('📄 PDF Tools initialized');
        this.setupFileUploads();
        this.setupEventListeners();
    }

    setupFileUploads() {
        // Crear inputs de archivo dinámicamente
        document.querySelectorAll('.upload-area').forEach((area, index) => {
            // Crear input file
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.style.display = 'none';
            
            // Configurar aceptación de archivos según la herramienta
            if (area.closest('.pdf-tool-card').querySelector('h3').textContent.includes('Merge')) {
                fileInput.multiple = true; // Para el merger, múltiples archivos
            }
            fileInput.accept = '.pdf'; // Solo PDFs
            
            area.appendChild(fileInput);
            
            // Cuando se hace clic en el área de upload
            area.addEventListener('click', () => {
                fileInput.click();
            });
            
            // Cuando se selecciona un archivo
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelect(e, area);
            });
        });
    }

    setupEventListeners() {
        // Configurar botones de acción
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const toolCard = e.target.closest('.pdf-tool-card');
                const toolName = toolCard.querySelector('h3').textContent;
                this.processTool(toolName, toolCard);
            });
        });
    }

    handleFileSelect(event, uploadArea) {
        const files = event.target.files;
        if (files.length > 0) {
            this.showSelectedFile(files[0], uploadArea);
        }
    }

    showSelectedFile(file, uploadArea) {
        // Actualizar la apariencia del área de upload
        uploadArea.innerHTML = `
            <div class="upload-content">
                <i class="fas fa-file-pdf" style="color: #e74c3c;"></i>
                <h4>${file.name}</h4>
                <p>${this.formatFileSize(file.size)}</p>
                <span class="file-types">Listo para procesar</span>
            </div>
        `;
        
        // Añadir estilo para mostrar que hay archivo seleccionado
        uploadArea.style.borderColor = '#10b981';
        uploadArea.style.background = 'rgba(16, 185, 129, 0.1)';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    processTool(toolName, toolCard) {
        // Verificar si hay archivo seleccionado
        const uploadArea = toolCard.querySelector('.upload-area');
        const hasFile = uploadArea.innerHTML.includes('fa-file-pdf');
        
        if (!hasFile) {
            alert('⚠️ Por favor, selecciona un archivo PDF primero.');
            return;
        }

        // Mostrar animación de procesamiento
        this.showProcessingAnimation(toolCard);
        
        // Simular procesamiento (2 segundos)
        setTimeout(() => {
            this.showCPAOffer(toolName);
        }, 2000);
    }

    showProcessingAnimation(toolCard) {
        const button = toolCard.querySelector('.btn');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        button.disabled = true;
        
        // Restaurar después de 2 segundos (si no se mostró el CPA)
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }

    showCPAOffer(toolName) {
        // Crear modal de CPA
        const modalHTML = `
            <div class="cpa-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            ">
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 20px;
                    max-width: 500px;
                    text-align: center;
                ">
                    <h3>🎁 ¡Desbloquea tu Archivo!</h3>
                    <p>Para descargar tu PDF procesado, completa esta oferta rápida:</p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h4>Oferta Especial</h4>
                        <p>Completa una encuesta rápida para desbloquear la descarga</p>
                        <!-- AQUÍ VA TU ENLACE CPA -->
                        <a href="TU_ENLACE_CPA_AQUI" target="_blank" style="
                            display: inline-block;
                            background: #007bff;
                            color: white;
                            padding: 15px 30px;
                            border-radius: 10px;
                            text-decoration: none;
                            margin: 10px 0;
                            font-weight: bold;
                        ">
                            🚀 Acceder a Oferta
                        </a>
                    </div>
                    
                    <button onclick="this.closest('.cpa-modal').remove()" style="
                        background: #28a745;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">
                        ✅ Ya completé la oferta
                    </button>
                    
                    <p style="font-size: 12px; color: #666; margin-top: 15px;">
                        Esto nos ayuda a mantener el servicio gratis para todos
                    </p>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    window.pdfTools = new PDFTools();
});
