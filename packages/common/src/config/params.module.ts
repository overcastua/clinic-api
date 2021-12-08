import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ParameterList } from 'aws-sdk/clients/ssm';
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
          const ssmClient = AWSClient.getSSMInstance();
          const requestsArray: Promise<ParameterList>[] = [];
          const result: FetchResult = {
            Parameters: [],
          };

          if (
            Array.isArray(moduleOptions.awsParamStorePaths) &&
            moduleOptions.awsParamStorePaths.length
          ) {
            moduleOptions.awsParamStorePaths.forEach((path: string) => {
              requestsArray.push(ssmClient.fetchParamsByPath(path));
            });

            const fetchedParameters = await Promise.all(requestsArray);

            result.Parameters = fetchedParameters.flat();

            if (result.Parameters.length === 0) {
              throw new Error(
                'Error: No parameters were fetched from AWS SSM. Were the given paths correct?',
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
