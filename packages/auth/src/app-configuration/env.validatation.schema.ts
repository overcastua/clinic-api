import * as Joi from 'joi';

export const envSchema = Joi.object({
  DB_HOSTNAME: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  RUN_MIGRATIONS: Joi.boolean().required(),
  SALT: Joi.number().required(),
  API_PREFIX: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  CLINIC_GRPC_URL: Joi.string().required(),
  AUTH_GRPC_URL: Joi.string().required(),
  PROFILE_GRPC_URL: Joi.string().required(),
});
