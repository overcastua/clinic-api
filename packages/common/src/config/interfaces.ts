import { ParameterList } from 'aws-sdk/clients/ssm';
import Joi from 'joi';

export interface ModuleOptions {
  awsParamStorePaths?: string[];
  load: () => Record<string, any>;
  validationSchema?: Joi.ObjectSchema<any>;
}

export interface ServiceOptions {
  params: ParameterList;
  load: () => Record<string, any>;
  validationSchema?: Joi.ObjectSchema<any>;
}

export interface FetchResult {
  Parameters: ParameterList;
}

export enum Source {
  SSM = 'ssm',
  ENV = 'env',
}
