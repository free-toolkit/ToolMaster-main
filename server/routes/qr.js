const express = require('express');
const router = express.Router();
const qr = require('qr-image');

// POST /api/qr/generate - Generar código QR
router.post('/generate', async (req, res) => {
    try {
        const { text, size = 300, color = '000000' } = req.body;
        
        if (!text) {
            return res.status(400).json({ 
                success: false, 
                error: 'Texto para QR requerido' 
            });
        }

        // Generar QR
        const qr_png = qr.imageSync(text, { 
            type: 'png', 
            size: parseInt(size),
            margin: 2
        });

        const qrBase64 = qr_png.toString('base64');
        
        res.json({
            success: true,
            data: {
                qrImage: `data:image/png;base64,${qrBase64}`,
                text: text,
                size: size,
                format: 'PNG'
            }
        });

    } catch (error) {
        console.error('❌ Error en /api/qr/generate:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error generando código QR' 
        });
    }
});

// POST /api/qr/generate-with-logo - QR con logo
router.post('/generate-with-logo', (req, res) => {
    // Por implementar - QR con logo personalizado
    res.json({
        success: true,
        message: '🚧 Función en desarrollo - QR con logo',
        data: { coming_soon: true }
    });
});

module.exports = router;
