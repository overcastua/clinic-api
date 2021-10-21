import * as Joi from 'joi';

export const envSchema = Joi.object({
  DB_HOSTNAME: Joi.string().default('localhost'),
  POSTGRES_USER: Joi.string().default('root'),
  POSTGRES_DB: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  RUN_MIGRATIONS: Joi.boolean().required(),
  JWT_SECRET: Joi.string().required(),
  SALT: Joi.number().required(),
  APP_PORT: Joi.number().default(8080),
});
