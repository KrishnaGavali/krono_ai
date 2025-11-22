import redis from '../providers/upstashRedis.js';

class phoneAuthRedis {
  redisClient = redis;

  constructor() {}

  async createAuthSession(code, userId, name) {
    try {
      const sessionData = {
        userId: userId,
        name: name,
      };

      const session_key = `phone_auth_code:${code}`;

      await this.redisClient.set(session_key, JSON.stringify(sessionData), {
        ex: 600,
      });

      return true;
    } catch (error) {
      throw new Error('Error creating auth session: ' + error.message);
    }
  }

  async getAuthSession(code) {
    try {
      const session_key = `phone_auth_code:${code}`;
      const sessionData = await this.redisClient.get(session_key);

      if (!sessionData) {
        return null;
      }

      return JSON.parse(sessionData);
    } catch (error) {
      throw new Error('Error retrieving auth session: ' + error.message);
    }
  }
}

export default phoneAuthRedis;
