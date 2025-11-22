import phoneAuthRedis from '../service/phoneAuthRedis.js';

const generateRamdomCode = (length = 6) => {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const createPhoneAuthCodeAndSession = async ({ name, userId, phone }) => {
  const phoneAuthRedisService = new phoneAuthRedis();

  const code = generateRamdomCode(6);

  try {
    const createdAuthSession = await phoneAuthRedisService.createAuthSession(
      code,
      userId,
      name,
      phone
    );

    return {
      status: 200,
      message: 'Phone auth code created successfully',
      code: createdAuthSession.code,
    };
  } catch (error) {
    return {
      status: 500,
      error: 'phone_auth_session_creation_failed',
      message: 'Failed to create phone auth session: ' + error.message,
    };
  }
};

export { createPhoneAuthCodeAndSession };
