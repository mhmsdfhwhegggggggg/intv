const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Start Python Backend
const startBackend = () => {
    console.log('Starting Python backend (FastAPI)...');
    
    // Determine python command
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    
    const backend = spawn(pythonCmd, ['-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', '8000'], {
        cwd: path.join(__dirname, 'backend'),
        shell: true
    });

    backend.stdout.on('data', (data) => {
        console.log(`[Backend]: ${data}`);
    });

    backend.stderr.on('data', (data) => {
        console.error(`[Backend Error]: ${data}`);
    });

    backend.on('close', (code) => {
        console.log(`Backend process exited with code ${code}. Restarting...`);
        setTimeout(startBackend, 2000);
    });
};

startBackend();

// Proxy /api requests to the FastAPI backend
app.use('/api', createProxyMiddleware({
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api', // keep /api prefix as backend expects it
    },
}));

// Serve static files from the React frontend build
const distPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(distPath));

// Fallback for SPA routing: serve index.html for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`================================================`);
    console.log(`🚀 INVESTCORP Platform is running!`);
    console.log(`🔗 Local Address: http://localhost:${PORT}`);
    console.log(`⚙️  Node Server: Handling Proxy & Static Assets`);
    console.log(`🐍 Python Backend: Running on port 8000`);
    console.log(`================================================`);
});
