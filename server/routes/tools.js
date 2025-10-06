const express = require('express');
const router = express.Router();

// GET /api/tools/health - Salud de herramientas
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: '🛠️ Todas las herramientas funcionando',
        timestamp: new Date().toISOString(),
        tools: {
            video_downloader: 'active',
            qr_generator: 'active', 
            text_analyzer: 'active',
            image_processor: 'active',
            url_shortener: 'development'
        }
    });
});

// POST /api/tools/analyze-text - Análisis de texto
router.post('/analyze-text', (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ 
                success: false, 
                error: 'Texto requerido para análisis' 
            });
        }

        // Análisis real del texto
        const analysis = analyzeText(text);
        
        res.json({
            success: true,
            data: analysis
        });

    } catch (error) {
        console.error('❌ Error en /api/tools/analyze-text:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error analizando texto' 
        });
    }
});

// Función de análisis de texto
function analyzeText(text) {
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const lines = text.split('\n').length;
    const paragraphs = text.split('\n\n').filter(p => p.trim()).length;
    
    // Frecuencia de palabras
    const wordFreq = {};
    words.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        if (cleanWord.length > 0) {
            wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
        }
    });

    const topWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word, count]) => ({ word, count }));

    return {
        statistics: {
            characters: {
                total: characters,
                without_spaces: charactersNoSpaces,
                spaces: characters - charactersNoSpaces
            },
            words: {
                total: words.length,
                unique: Object.keys(wordFreq).length
            },
            lines: lines,
            paragraphs: paragraphs,
            reading_time: Math.ceil(words.length / 200), // minutos
            speaking_time: Math.ceil(words.length / 130) // minutos
        },
        top_words: topWords,
        density: calculateWordDensity(wordFreq, words.length)
    };
}

function calculateWordDensity(wordFreq, totalWords) {
    const densities = Object.entries(wordFreq)
        .map(([word, count]) => ({
            word,
            density: (count / totalWords * 100).toFixed(2) + '%'
        }))
        .sort((a, b) => b.density - a.density)
        .slice(0, 5);

    return densities;
}

module.exports = router;
