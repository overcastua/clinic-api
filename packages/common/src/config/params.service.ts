import { Inject, Injectable } from '@nestjs/common';
import { ServiceOptions, Source } from './interfaces';
import { AWS_PARAM_STORE_PROVIDER } from './constants';

@Injectable()
export class CustomConfigService {
  private readonly _paramStoreParameters: Record<string, any>;

  constructor(
    @Inject(AWS_PARAM_STORE_PROVIDER)
    data: ServiceOptions,
  ) {
    this._paramStoreParameters = {};

    if (data.params.length > 0) {
      data.params.forEach((parameter) => {
        const parameterPathTokens = parameter.Name.split('/');
        this._paramStoreParameters[
          parameterPathTokens[parameterPathTokens.length - 1]
        ] = parameter.Value;
      });
    }

    this._paramStoreParameters = this.substitute(data.load());
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
            console.warn(
              `Warning: No ${source} parameter '${value}' was found, unable to assign`,
            );

            delete loadedSchema[key];
          } else {
            loadedSchema[key] = this._paramStoreParameters[value];
          }
        } else if (source === Source.ENV) {
          if (!process.env[value]) {
            console.warn(
              `Warning: No ${source} parameter '${value}' was found, unable to assign`,
            );

            delete loadedSchema[key];
          } else {
            loadedSchema[key] = process.env[value];
          }
        } else {
          console.warn(
            `Warning: Unknown configuration source '${source}' specified, the parameter was ignored`,
          );

          delete loadedSchema[key];
        }
      }
    });

    return loadedSchema;
  }

  get<T extends number | string>(key: string): T {
    const value = key
      .split('.')
      .reduce(
        (object: Record<string, any>, i: string) => object[i],
        this._paramStoreParameters,
      );

    if (!value) {
      throw new Error(`Error: Wrong config parameter location '${key}' given`);
    }

    return isNaN(value) ? value : +value;
  }
}
