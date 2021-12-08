export default () => ({
  self: {
    name: 'SERVICE_NAME',
    port: 'APP_PORT',
    prefix: 'API_PREFIX',
  },
  GRPC: {
    profile: 'PROFILE_GRPC_URL',
  },
  database: {
    hostname: 'DB_HOSTNAME',
    port: 'DB_PORT',
    user: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
    run_migrations: 'RUN_MIGRATIONS',
  },
  jwt: {
    secret: 'JWT_SECRET',
  },
  env: 'NODE_ENV',
});
