const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rutas
const videoRoutes = require('./routes/video');
const qrRoutes = require('./routes/qr');
const toolsRoutes = require('./routes/tools');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('C:/Users/saido/Desktop/free-toolkit.github.io-main/public'));

// Usar rutas
app.use('/api/video', videoRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/tools', toolsRoutes);

// Ruta principal - servir el frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Ruta de salud del servidor
app.get('/api/health', (req, res) => {
    res.json({ 
        status: '✅ Servidor funcionando', 
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Manejo de errores 404
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
    console.error('❌ Error del servidor:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🚀 ====================================');
    console.log('🚀 ToolMaster Backend INICIADO');
    console.log(`� Puerto: ${PORT}`);
    console.log(`🚀 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔧 API Health: http://localhost:${PORT}/api/health`);
    console.log('🚀 ====================================');
});

module.exports = app;
