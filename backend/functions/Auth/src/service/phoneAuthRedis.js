import redis from '../providers/upstashRedis.js';

class phoneAuthRedis {
  redisClient = redis;

  constructor() {}

  async createAuthSession(code, userId, name) {
    try {
      const sessionData = {
        code: code,
        name: name,
        userId: userId,
      };

      const pipeline = this.redisClient.pipeline();

      const session_key = `phone_auth_code:${userId}`;
      const lookup_key = `phone_auth_code_lookup:${code}`;

      // check if session already exists
      const existingSession = await this.redisClient.get(lookup_key);
      if (existingSession) {
        return {
          status: 'exists',
          message: 'Auth session already exists',
          code: existingSession.code,
        };
      }

      pipeline.set(session_key, JSON.stringify(sessionData));
      pipeline.set(lookup_key, JSON.stringify(sessionData));

      pipeline.expire(session_key, 5 * 60); // 10 minutes
      pipeline.expire(lookup_key, 5 * 60); // 10 minutes

      await pipeline.exec();

      return {
        status: 'success',
        message: 'Auth session created successfully',
        code: code,
      };
    } catch (error) {
      console.error('Error creating auth session:', error);
      return {
        status: 'error',
        message: 'Failed to create auth session: ' + error.message,
      };
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
