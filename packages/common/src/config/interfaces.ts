import { ParameterList } from 'aws-sdk/clients/ssm';

export interface ModuleOptions {
  awsParamStorePaths?: string[];
  load?: () => Record<string, any>;
}

export interface ServiceOptions {
  params: ParameterList;
  load?: () => Record<string, any>;
}

export interface FetchResult {
  Parameters: ParameterList;
}

export enum Source {
  SSM = 'ssm',
  ENV = 'env',
}
