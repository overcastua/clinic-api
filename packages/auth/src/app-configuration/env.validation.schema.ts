import * as Joi from 'joi';

export const envSchema = Joi.object({
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  API_PREFIX: Joi.string().required(),
  PROFILE_GRPC_URL: Joi.string().required(),
  CLINIC_GRPC_URL: Joi.string().required(),
  AUTH_GRPC_URL: Joi.string().required(),
  DB_HOSTNAME: Joi.string().required(),
  RUN_MIGRATIONS: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  SALT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  SERVICE_NAME: Joi.string().required(),
  CL_SERVICE_NAME: Joi.string().required(),
  PROF_SERVICE_NAME: Joi.string().required(),
});
