import * as Joi from 'joi';

export const envSchema = Joi.object({
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  API_PREFIX: Joi.string().required(),
  DB_HOSTNAME: Joi.string().required(),
  RUN_MIGRATIONS: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),
  SERVICE_NAME: Joi.string().required(),
  BROKER_ADDR: Joi.string().required(),
});
