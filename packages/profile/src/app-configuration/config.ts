export default () => ({
  port: 'env->APP_PORT',
  prefix: 'ssm->API_PREFIX',
  GRPC: {
    profile: 'ssm->PROFILE_GRPC_URL',
  },
  database: {
    hostname: 'ssm->DB_HOSTNAME',
    user: 'env->POSTGRES_USER',
    password: 'env->POSTGRES_PASSWORD',
    database: 'env->POSTGRES_DB',
    port: 'ssm->DB_PORT',
    run_migrations: 'ssm->RUN_MIGRATIONS',
  },
  jwt: {
    secret: 'ssm->JWT_SECRET',
  },
});
