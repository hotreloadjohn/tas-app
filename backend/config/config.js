export const config = {
  databaseHost: process.env.DB_HOST,
  databaseUserName: process.env.DB_USERNAME,
  databasePassword: process.env.DB_PASSWORD,
  databaseName: process.env.DB_DATABASE_NAME,
  databaseTestName: process.env.DB_TEST_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWTExpire: process.env.JWT_EXPIRES_IN,
};
