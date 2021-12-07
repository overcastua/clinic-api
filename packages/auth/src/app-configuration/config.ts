export default () => ({
  port: 'APP_PORT',
  prefix: 'API_PREFIX',
  GRPC: {
    profile: 'PROFILE_GRPC_URL',
    clinic: 'CLINIC_GRPC_URL',
    auth: 'AUTH_GRPC_URL',
  },
  database: {
    hostname: 'DB_HOSTNAME',
    user: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
    port: 'DB_PORT',
    run_migrations: 'RUN_MIGRATIONS',
  },
  jwt: {
    secret: 'JWT_SECRET',
  },
  salt: 'SALT',
});
