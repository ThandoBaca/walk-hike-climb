// api/dev_server.js - Local development & email testing server (No PHP installation required)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const ROOT = path.resolve(__dirname, '..');
const TEST_EMAILS_DIR = path.join(ROOT, 'test_emails');

if (!fs.existsSync(TEST_EMAILS_DIR)) {
  fs.mkdirSync(TEST_EMAILS_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS & Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Intercept POST /api/contact.php
  if (req.method === 'POST' && (req.url === '/api/contact.php' || req.url === '/api/contact')) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let data = {};
      try {
        data = JSON.parse(body);
      } catch (e) {
        // Fallback urlencoded
        const params = new URLSearchParams(body);
        for (const [k, v] of params.entries()) data[k] = v;
      }

      // 1. Honeypot check
      if (data._hp_company) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Inquiry received.' }));
        return;
      }

      // 2. Validation
      const name = (data.name || '').trim();
      const email = (data.email || '').trim();
      const phone = (data.phone || '').trim();
      const country = (data.country || '').trim();
      const packageTour = (data.package || 'General Inquiry').trim();
      const groupSize = data.groupSize || 1;
      const date = (data.date || '').trim();
      const message = (data.message || '').trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || name.length < 2) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Please provide a valid name (at least 2 characters).' }));
        return;
      }
      if (!email || !emailRegex.test(email)) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Please provide a valid email address.' }));
        return;
      }

      // 3. Save email mock to disk in test_emails/
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `inquiry_${timestamp}_mock.txt`;
      const emailContent = `Walk Hike Climb - Website Inquiry (LOCAL TEST MOCK)\n` +
        `=======================================================\n` +
        `Timestamp:  ${new Date().toLocaleString()}\n` +
        `Name:       ${name}\n` +
        `Email:      ${email}\n` +
        `Phone:      ${phone || 'Not provided'}\n` +
        `Country:    ${country || 'Not specified'}\n` +
        `Package:    ${packageTour}\n` +
        `Group Size: ${groupSize}\n` +
        `Date:       ${date || 'Flexible'}\n\n` +
        `Notes / Message:\n` +
        `${message}\n`;

      fs.writeFileSync(path.join(TEST_EMAILS_DIR, filename), emailContent, 'utf-8');
      console.log(`[TEST EMAIL LOGGED] Saved to test_emails/${filename}`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        mode: 'test_mock',
        message: 'Inquiry received and logged to test_emails directory.',
        file: filename
      }));
    });
    return;
  }

  // Static file serving
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(ROOT, reqPath);
  // Directory traversal defense
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`Walk Hike Climb Local Test Server running at:`);
  console.log(`  > http://localhost:${PORT}`);
  console.log(`  > Test emails will be written to: test_emails/`);
  console.log(`======================================================\n`);
});
