// utils/clientFingerprint.js
function getClientFingerprint(req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || '';
    const acceptLang = req.headers['accept-language'] || '';
    const referer = req.headers['referer'] || '';
    const encoding = req.headers['accept-encoding'] || '';
    const connection = req.headers['connection'] || '';
    const host = req.headers['host'] || '';
  
    // Basic fingerprint string (can be hashed if needed)
    const fingerprintRaw = `${ip}|${userAgent}|${acceptLang}|${referer}|${encoding}|${connection}|${host}`;
  
    // Optional: Create hash of fingerprint (for consistent short ID)
    const crypto = require('crypto');
    const fingerprintHash = crypto.createHash('sha256').update(fingerprintRaw).digest('hex');
  
    return {
      ip,
      userAgent,
      acceptLang,
      referer,
      encoding,
      connection,
      host,
      fingerprintRaw,
      fingerprintHash,
    };
  }
  
  module.exports = getClientFingerprint;
  