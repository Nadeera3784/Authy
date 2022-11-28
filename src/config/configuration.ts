export default () => ({
    app: {
      environment: process.env.ENV,
      jwtkey: process.env.APP_JWT_KEY,
    },
    database: {
      postgres: {
        host: process.env.DATABASE_URL,
      },
    },
    services: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackUri: process.env.GOOGLE_CALLBACK_URI,
      },
      facebook: {
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackUri: process.env.FACEBOOK_CALLBACK_URI,
      },
    },
    mail: {
      mailtrap: {
        username: process.env.MAILTRAP_KEY_ID,
        password: process.env.MAILTRAP_KEY_SECRET,
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
      },
    },
    queue: {
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    },
    cache: {
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    }
});
  