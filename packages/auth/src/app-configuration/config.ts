export default () => ({
  port: parseInt(process.env.APP_PORT),
  prefix: process.env.API_PREFIX,
  URI: {
    clinic: process.env.CLINIC_URI,
    profile: process.env.PROFILE_URI,
  },
  database: {
    hostname: process.env.DB_HOSTNAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: parseInt(process.env.DB_PORT),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  salt: parseInt(process.env.SALT),
});
