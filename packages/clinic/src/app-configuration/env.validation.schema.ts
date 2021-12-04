import * as Joi from 'joi';

export const envSchema = Joi.object({
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  AWS_DEFAULT_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
});
