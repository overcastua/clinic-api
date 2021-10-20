import * as Joi from 'joi';

export const envSchema = Joi.object({
  DB_HOSTNAME: Joi.string().default('localhost'),
  DB_USER: Joi.string().default('root'),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_PASSWORD: Joi.string().required(),
  RUN_MIGRATIONS: Joi.boolean().required(),
  JWT_SECRET: Joi.string().required(),
  SALT: Joi.number().required(),
  APP_PORT: Joi.number().default(8080),
});
