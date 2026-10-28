const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function getSafeFilePath(requestUrl) {
  const parsed = new URL(requestUrl, 'http://localhost');
  let cleanPath = decodeURIComponent(parsed.pathname);
  
  // Support Tomcat-style prefix if accessed via /SmartCity/ or /SmartCity
  if (cleanPath === '/SmartCity' || cleanPath === '/SmartCity/') {
    cleanPath = '/index.html';
  } else if (cleanPath.startsWith('/SmartCity/')) {
    cleanPath = cleanPath.replace(/^\/SmartCity/, '');
  }

  if (cleanPath === '/' || cleanPath === '') {
    cleanPath = '/index.html';
  }

  const safeSuffix = path.normalize(cleanPath).replace(/^(\.\.[\/\\])+/, '');
  return path.join(ROOT_DIR, safeSuffix);
}

function startServer(port) {
  const server = http.createServer((req, res) => {
    // Add CORS headers for local development convenience
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Method Not Allowed');
      return;
    }

    const filePath = getSafeFilePath(req.url);

    // Prevent directory traversal outside ROOT_DIR
    if (!filePath.startsWith(ROOT_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('403 Forbidden: Access Denied');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<!DOCTYPE html>
<html>
<head><title>404 Not Found</title><style>body{font-family:sans-serif;padding:40px;background:#f8fafc;color:#1e293b;}h1{color:#ef4444;}a{color:#0ea5e9;}</style></head>
<body>
  <h1>404 - File Not Found</h1>
  <p>The requested file <code>${req.url}</code> could not be found.</p>
  <p><a href="/">Return to Smart City Home</a></p>
</body>
</html>`);
        return;
      }

      let targetPath = filePath;
      if (stats.isDirectory()) {
        targetPath = path.join(filePath, 'index.html');
      }

      fs.readFile(targetPath, (readErr, data) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('500 Internal Server Error');
          return;
        }

        const ext = path.extname(targetPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': data.length,
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });

        if (req.method === 'HEAD') {
          res.end();
        } else {
          res.end(data);
        }
      });
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`[Smart City Server] Port ${port} is in use. Retrying on port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('[Smart City Server] Error:', err);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`🏙️  Safe & Smart City - Civic Issue Reporting System`);
    console.log(`======================================================`);
    console.log(`🚀 Server running successfully!`);
    console.log(`👉 Local:   http://localhost:${port}/`);
    console.log(`👉 Network: http://127.0.0.1:${port}/`);
    console.log(`👉 Alias:   http://localhost:${port}/SmartCity/`);
    console.log(`======================================================\n`);
  });
}

startServer(DEFAULT_PORT);
