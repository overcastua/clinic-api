import { Inject, Injectable } from '@nestjs/common';
import { ServiceOptions, Source } from './interfaces';
import { AWS_PARAM_STORE_PROVIDER } from './constants';
import Joi from 'joi';

@Injectable()
export class CustomConfigService {
  private readonly _paramStoreParameters: Record<string, any>;
  private readonly schema: Record<string, any>;
  private envParams: Record<string, any>;
  private ssmParams: Record<string, any>;

  constructor(
    @Inject(AWS_PARAM_STORE_PROVIDER)
    data: ServiceOptions,
  ) {
    this._paramStoreParameters = {};
    this.envParams = {};
    this.ssmParams = {};

    if (data.params.length > 0) {
      data.params.forEach((parameter) => {
        const parameterPathTokens = parameter.Name.split('/');
        this._paramStoreParameters[
          parameterPathTokens[parameterPathTokens.length - 1]
        ] = parameter.Value;
      });
    }
    this.schema = this.substitute(data.load());

    if (data.validationSchema) {
      this.validate(data.validationSchema);
    }
  }

  private substitute(schema: Record<string, any>): Record<string, any> {
    const loadedSchema = schema;

    Object.keys(loadedSchema).forEach((key) => {
      if (typeof loadedSchema[key] === 'object') {
        this.substitute(loadedSchema[key] as Record<string, any>);
      } else if (typeof loadedSchema[key] === 'string') {
        const [source, value] = (loadedSchema[key] as string).split('->') as [
          Source,
          string,
        ];

        if (source === Source.SSM) {
          if (!this._paramStoreParameters[value]) {
            throw new Error(
              `Error: No ${source} parameter '${value}' was found, unable to assign`,
            );
          } else {
            this.ssmParams[value] = this._paramStoreParameters[value];
            loadedSchema[key] = this._paramStoreParameters[value];
          }
        } else if (source === Source.ENV) {
          if (!process.env[value]) {
            throw new Error(
              `Error: No ${source} parameter '${value}' was found, unable to assign`,
            );
          } else {
            this.envParams[value] = process.env[value];
            loadedSchema[key] = process.env[value];
          }
        } else {
          throw new Error(
            `Error: Unknown configuration source '${source}' specified, the parameter was omitted`,
          );
        }
      }
    });

    return loadedSchema;
  }

  private validate(schema: Joi.ObjectSchema<any>): void {
    const loadedData = merge(this.envParams, this.ssmParams);

    const { error } = schema.validate(loadedData);

    if (error) {
      throw new Error(`Config schema validation error: ${error.message}`);
    } else {
      delete this.envParams;
      delete this.ssmParams;
    }
  }

  get<T extends number | string>(key: string): T {
    const value = key
      .split('.')
      .reduce(
        (object: Record<string, any>, i: string) => object[i],
        this.schema,
      );

    if (!value) {
      throw new Error(`Error: Wrong config parameter location '${key}' given`);
    }

    return isNaN(value) ? value : +value;
  }
}

function merge(
  obj1: Record<string, any>,
  obj2: Record<string, any>,
): Record<string, any> {
  return { ...obj1, ...obj2 };
}
