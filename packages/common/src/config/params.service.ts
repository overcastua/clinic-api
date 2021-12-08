import { Inject, Injectable } from '@nestjs/common';
import { ServiceOptions } from './interfaces';
import { AWS_PARAM_STORE_PROVIDER } from './constants';
import Joi from 'joi';

@Injectable()
export class CustomConfigService {
  private readonly internalConfig: Record<string, any>;
  private readonly env: string;

  private _paramStoreParameters: Record<string, any>;
  private usedParams: Record<string, any>;

  constructor(
    @Inject(AWS_PARAM_STORE_PROVIDER)
    data: ServiceOptions,
  ) {
    this._paramStoreParameters = {};
    this.usedParams = {};

    if (data.params.length > 0) {
      data.params.forEach((parameter) => {
        const parameterPathTokens = parameter.Name.split('/');
        this._paramStoreParameters[
          parameterPathTokens[parameterPathTokens.length - 1]
        ] = parameter.Value;
      });
    }
    this.internalConfig = this.substitute(data.load());
    delete this._paramStoreParameters;

    if (data.validationSchema) {
      this.validate(data.validationSchema);
    }

    this.env = process.env.NODE_ENV;
  }

  private substitute(schema: Record<string, any>): Record<string, any> {
    const loadedSchema = schema;

    Object.keys(loadedSchema).forEach((key) => {
      if (typeof loadedSchema[key] === 'object') {
        this.substitute(loadedSchema[key] as Record<string, any>);
      } else if (typeof loadedSchema[key] === 'string') {
        const value: string = loadedSchema[key];

        if (this._paramStoreParameters[value]) {
          loadedSchema[key] = this._paramStoreParameters[value];

          this.usedParams[value] = this._paramStoreParameters[value];
        } else if (process.env[value]) {
          loadedSchema[key] = process.env[value];

          this.usedParams[value] = process.env[value];
        } else {
          throw new Error(
            `Error: No parameter '${value}' was found, unable to assign`,
          );
        }
      }
    });

    return loadedSchema;
  }

  private validate(schema: Joi.ObjectSchema<any>): void {
    const { error } = schema.validate(this.usedParams);

    if (error) {
      throw new Error(`Config schema validation error: ${error.message}`);
    } else {
      delete this.usedParams;
    }
  }

  get<T extends number | string>(key: string): T {
    const value = key
      .split('.')
      .reduce(
        (object: Record<string, any>, i: string) => object[i],
        this.internalConfig,
      );

    if (!value) {
      throw new Error(`Error: Wrong config parameter location '${key}' given`);
    }

    return isNaN(value) ? value : +value;
  }

  isProd(): boolean {
    return this.env === 'production';
  }
}
