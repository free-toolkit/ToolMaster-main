const express = require('express');
const router = express.Router();
const { downloadVideo, getVideoInfo } = require('../utils/downloader');

// POST /api/video/download - Descargar video
router.post('/download', async (req, res) => {
    try {
        const { url, format, quality } = req.body;
        
        console.log('📥 Solicitud de descarga recibida:', { url, format, quality });

        if (!url) {
            return res.status(400).json({ 
                success: false, 
                error: 'URL de video requerida' 
            });
        }

        // Validar URL
        if (!isValidUrl(url)) {
            return res.status(400).json({ 
                success: false, 
                error: 'URL no válida' 
            });
        }

        const result = await downloadVideo(url, format, quality);
        
        res.json({
            success: true,
            message: '✅ Video descargado exitosamente',
            data: result
        });

    } catch (error) {
        console.error('❌ Error en /api/video/download:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Error procesando el video' 
        });
    }
});

// GET /api/video/info - Obtener información del video
router.get('/info', async (req, res) => {
    try {
        const { url } = req.query;
        
        if (!url) {
            return res.status(400).json({ 
                success: false, 
                error: 'URL de video requerida' 
            });
        }

        const videoInfo = await getVideoInfo(url);
        
        res.json({
            success: true,
            data: videoInfo
        });

    } catch (error) {
        console.error('❌ Error en /api/video/info:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error obteniendo información del video' 
        });
    }
});

// GET /api/video/formats - Formatos disponibles
router.get('/formats', (req, res) => {
    const formats = {
        video: [
            { id: 'mp4-1080', name: 'MP4 1080p', quality: 'Alta', size: '~100MB' },
            { id: 'mp4-720', name: 'MP4 720p', quality: 'Media', size: '~50MB' },
            { id: 'mp4-480', name: 'MP4 480p', quality: 'Estándar', size: '~25MB' },
            { id: 'webm', name: 'WEBM', quality: 'Web Optimizado', size: '~30MB' }
        ],
        audio: [
            { id: 'mp3-320', name: 'MP3 320kbps', quality: 'Alta', size: '~10MB' },
            { id: 'mp3-256', name: 'MP3 256kbps', quality: 'Media', size: '~8MB' },
            { id: 'mp3-128', name: 'MP3 128kbps', quality: 'Estándar', size: '~5MB' },
            { id: 'm4a', name: 'M4A AAC', quality: 'Apple', size: '~7MB' }
        ]
    };

    res.json({
        success: true,
        data: formats
    });
});

// Función auxiliar para validar URLs
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

module.exports = router;
