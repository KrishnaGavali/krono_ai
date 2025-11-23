import redis from '../providers/redis.js';

class RedisAuthSession {
  constructor() {
    this.redisClient = redis;
  }

  async checkAuthSessionExists(code) {
    try {
      const lookup_key = `phone_auth_code_lookup:${code}`;
      const sessionData = await this.redisClient.get(lookup_key);

      if (sessionData) {
        return sessionData;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Error checking auth session: ' + error.message);
    }
  }

  async deleteAuthSession(code) {
    try {
      const lookup_key = `phone_auth_code_lookup:${code}`;
      await this.redisClient.del(lookup_key);
    } catch (error) {
      throw new Error('Error deleting auth session: ' + error.message);
    }
  }
}

export default RedisAuthSession;
