import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Parameter } from 'aws-sdk/clients/ssm';
import { AWSClient } from 'index';
import { AWS_PARAM_STORE_PATH, AWS_PARAM_STORE_PROVIDER } from './constants';
import { CustomConfigService } from './params.service';

@Global()
@Module({})
export class CustomConfigModule {
  public static register(moduleOptions): DynamicModule {
    return {
      module: CustomConfigModule,
      providers: [CustomConfigService, ...this.createProviders(moduleOptions)],
      exports: [CustomConfigService],
    };
  }

  public static registerAsync(moduleAsyncOptions): DynamicModule {
    return {
      module: CustomConfigModule,
      providers: [
        CustomConfigService,
        ...this.createAsyncProviders(moduleAsyncOptions),
      ],
      exports: [CustomConfigService],
    };
  }

  private static createProviders(moduleOptions): Provider[] {
    return [
      {
        provide: AWS_PARAM_STORE_PROVIDER,
        useFactory: async () => {
          const ssmClient = AWSClient.getSSMInstance().service;
          const result = await ssmClient
            .getParametersByPath({
              Path: moduleOptions.awsParamStorePath,
              Recursive: true,
              WithDecryption: false,
            })
            .promise();
          const data = { params: result?.Parameters, load: moduleOptions.load };
          return data;
        },
      },
    ];
  }

  private static createAsyncProviders(moduleAsyncOptions): Provider[] {
    return [
      {
        provide: AWS_PARAM_STORE_PROVIDER,
        useFactory: async (
          configService: ConfigService,
        ): Promise<Parameter[]> => {
          const ssmClient = AWSClient.getSSMInstance().service;
          const result = await ssmClient
            .getParametersByPath({
              Path: configService.get(AWS_PARAM_STORE_PATH),
              Recursive: true,
            })
            .promise();
          return result?.Parameters;
        },
        inject: [moduleAsyncOptions.useClass],
      },
    ];
  }
}
