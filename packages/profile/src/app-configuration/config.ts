export default () => ({
  port: 'env->APP_PORT',
  prefix: 'env->API_PREFIX',
  GRPC: {
    profile: 'ssm->PROFILE_GRPC_URL',
  },
  database: {
    hostname: 'env->DB_HOSTNAME',
    user: 'env->POSTGRES_USER',
    password: 'env->POSTGRES_PASSWORD',
    database: 'env->POSTGRES_DB',
    port: 'env->DB_PORT',
    run_migrations: 'env->RUN_MIGRATIONS',
  },
  jwt: {
    secret: 'ssm->JWT_SECRET',
  },
});
