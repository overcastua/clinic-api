import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { GetParametersByPathResult, ParameterList } from 'aws-sdk/clients/ssm';
import { AWSClient } from 'index';
import { AWS_PARAM_STORE_PROVIDER } from './constants';
import { FetchResult, ModuleOptions, ServiceOptions } from './interfaces';
import { CustomConfigService } from './params.service';

@Global()
@Module({})
export class CustomConfigModule {
  public static forRoot(moduleOptions: ModuleOptions): DynamicModule {
    return {
      module: CustomConfigModule,
      providers: [CustomConfigService, ...this.createProviders(moduleOptions)],
      exports: [CustomConfigService],
    };
  }

  private static createProviders(moduleOptions: ModuleOptions): Provider[] {
    return [
      {
        provide: AWS_PARAM_STORE_PROVIDER,
        useFactory: async () => {
          const ssmClient = AWSClient.getSSMInstance().service;
          const requestsArray: Promise<GetParametersByPathResult>[] = [];
          const result: FetchResult = {
            Parameters: [],
          };

          if (
            Array.isArray(moduleOptions.awsParamStorePaths) &&
            moduleOptions.awsParamStorePaths.length
          ) {
            moduleOptions.awsParamStorePaths.forEach((path: string) => {
              requestsArray.push(
                ssmClient
                  .getParametersByPath({
                    Path: path,
                    Recursive: true,
                    WithDecryption: false,
                  })
                  .promise(),
              );
            });

            const fetchedParameters = await Promise.all(requestsArray);

            result.Parameters = fetchedParameters
              .map((resp): ParameterList => {
                return resp.Parameters;
              })
              .flat();

            if (result.Parameters.length === 0) {
              throw new Error(
                'Error: No parameters were fetched from AWS SSM. Was the given path correct?',
              );
            }
          }

          const data: ServiceOptions = {
            params: result.Parameters,
            load: moduleOptions.load,
            validationSchema: moduleOptions.validationSchema,
          };

          return data;
        },
      },
    ];
  }
}
