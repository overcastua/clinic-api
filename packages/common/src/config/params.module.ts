import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { SSM } from 'aws-sdk';
import { AWSClient } from 'index';
import { AWS_PARAM_STORE_PROVIDER } from './constants';
import { CustomConfigService } from './params.service';

@Global()
@Module({})
export class CustomConfigModule {
  public static forRoot(moduleOptions): DynamicModule {
    return {
      module: CustomConfigModule,
      providers: [CustomConfigService, ...this.createProviders(moduleOptions)],
      exports: [CustomConfigService],
    };
  }

  private static createProviders(moduleOptions): Provider[] {
    return [
      {
        provide: AWS_PARAM_STORE_PROVIDER,
        useFactory: async () => {
          const ssmClient = AWSClient.getSSMInstance().service;
          const requestsArray: Promise<SSM.GetParametersByPathResult>[] = [];
          const result: { Parameters: SSM.ParameterList } = {
            Parameters: [],
          };

          if (
            Array.isArray(moduleOptions.awsParamStorePaths) &&
            moduleOptions.awsParamStorePaths.length > 0
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
            const fetchedParameters: SSM.GetParametersByPathResult[] =
              await Promise.all(requestsArray);

            result.Parameters = fetchedParameters
              .map((data): SSM.ParameterList => {
                return data.Parameters;
              })
              .flat();
          }

          const data = {
            params: result?.Parameters,
            load: moduleOptions.load,
          };

          return data;
        },
      },
    ];
  }
}
