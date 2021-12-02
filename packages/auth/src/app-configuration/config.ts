export default () => ({
  port: parseInt(process.env.APP_PORT),
  mode: process.env.NODE_ENV,
  prefix: process.env.API_PREFIX,
  GRPC: {
    clinic: process.env.CLINIC_GRPC_URL,
    auth: process.env.AUTH_GRPC_URL,
    profile: process.env.PROFILE_GRPC_URL,
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
