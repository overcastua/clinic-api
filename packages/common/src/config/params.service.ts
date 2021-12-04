import { Inject, Injectable } from '@nestjs/common';
import { Parameter } from 'aws-sdk/clients/ssm';
import { AWS_PARAM_STORE_PROVIDER } from './constants';

@Injectable()
export class CustomConfigService {
  private readonly _paramStoreParameters;

  constructor(
    @Inject(AWS_PARAM_STORE_PROVIDER)
    data: {
      params: Parameter[];
      load: () => unknown;
    },
  ) {
    this._paramStoreParameters = {};
    data.params.forEach((parameter) => {
      const parameterPathTokens = parameter.Name.split('/');
      this._paramStoreParameters[
        parameterPathTokens[parameterPathTokens.length - 1]
      ] = parameter.Value;
    });

    if (data.load) {
      this._paramStoreParameters = this.substitute(data.load());
    }
  }

  private substitute(schema: unknown) {
    const copy = schema;

    Object.keys(copy).forEach((key) => {
      if (typeof copy[key] === 'object') {
        this.substitute(copy[key]);
      } else if (typeof copy[key] === 'string') {
        const getFromAndName = copy[key].split('->');
        if (getFromAndName[0] === 'ssm') {
          if (objectIsEmpty(this._paramStoreParameters)) {
            throw new Error(
              'Error: No ssm data was fetched, nothing to assign',
            );
          }
          copy[key] = this._paramStoreParameters[getFromAndName[1]];
        } else if (getFromAndName[0] === 'env') {
          copy[key] = process.env[getFromAndName[1]];
        } else {
          throw new Error(
            `Error: Unknown config location ${getFromAndName[0]}`,
          );
        }
      }
    });

    return copy;
  }

  get<T extends number | string>(key: string): T {
    const value = key
      .split('.')
      .reduce((o, i) => o[i], this._paramStoreParameters);

    if (!value) {
      throw new Error(
        `Error: Unknown config parameter location '${key}', the value is undefined`,
      );
    }

    return isNaN(value) ? value : +value;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
function objectIsEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
