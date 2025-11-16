import crypto from 'crypto';

class JwtService {
  constructor() {}

  generateToken(payload, secret, expiresIn = 86400) {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Payload must be a non-empty object');
    }
    if (!secret || typeof secret !== 'string') {
      throw new Error('Secret must be a non-empty string');
    }

    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const now = Math.floor(Date.now() / 1000);
    const jwtPayload = {
      ...payload,
      iat: now,
      exp: now + expiresIn,
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(jwtPayload));
    const data = `${encodedHeader}.${encodedPayload}`;

    const signature = crypto.createHmac('sha256', secret).update(data).digest();
    const encodedSignature = this.base64UrlEncode(signature);

    return `${data}.${encodedSignature}`;
  }

  verifyToken(token, secret) {
    if (!token || typeof token !== 'string') {
      throw new Error('Token must be a non-empty string');
    }
    if (!secret || typeof secret !== 'string') {
      throw new Error('Secret must be a non-empty string');
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format: must have 3 parts');
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    // Verify signature
    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto.createHmac('sha256', secret).update(data).digest();
    const expectedSignature = this.base64UrlEncode(signature);

    if (encodedSignature !== expectedSignature) {
      throw new Error('Invalid token signature');
    }

    // Decode and validate payload
    const payload = JSON.parse(this.base64UrlDecode(encodedPayload));

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      throw new Error('Token expired');
    }

    return payload;
  }

  base64UrlEncode(data) {
    const encoded = Buffer.from(data).toString('base64');
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  base64UrlDecode(encoded) {
    let data = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const padding = 4 - (data.length % 4);
    if (padding !== 4) {
      data += '='.repeat(padding);
    }
    return Buffer.from(data, 'base64').toString();
  }
}

export default JwtService;
