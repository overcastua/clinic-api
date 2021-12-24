export default () => ({
  self: {
    name: 'SERVICE_NAME',
    port: 'APP_PORT',
    prefix: 'API_PREFIX',
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
  env: 'NODE_ENV',
});
