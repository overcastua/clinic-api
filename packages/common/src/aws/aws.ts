import { config, S3, CloudWatchLogs, SSM } from 'aws-sdk';
import { CloudWatchLogsService } from './services/cloudWatch';
import { S3Service } from './services/s3';
import { SSMService } from './services/ssm';

export class AWSClient {
  private static S3: S3Service;
  private static CloudWatchLogs: CloudWatchLogsService;
  private static SSM: SSMService;
  private static instance: AWSClient;
  private static NO_INST_MSG: string;

  private constructor() {
    if (
      !(
        process.env.AWS_DEFAULT_REGION &&
        process.env.AWS_ACCESS_KEY_ID &&
        process.env.AWS_SECRET_ACCESS_KEY
      )
    ) {
      throw new Error(
        'Error: Some of the env variables [AWS_DEFAULT_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY] are missing',
      );
    }

    AWSClient.NO_INST_MSG =
      'Error: AWSClient must be instantiated before accessing any services';

    config.update({
      region: process.env.AWS_DEFAULT_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    AWSClient.S3 = new S3Service(new S3());
    AWSClient.CloudWatchLogs = new CloudWatchLogsService(new CloudWatchLogs());
    AWSClient.SSM = new SSMService(new SSM());
  }

  static getInstance(): AWSClient {
    if (!this.instance) {
      throw new Error(AWSClient.NO_INST_MSG);
    }
    return this.instance;
  }

  static getSSMInstance(): SSMService {
    if (!this.instance) {
      throw new Error(AWSClient.NO_INST_MSG);
    }
    return this.SSM;
  }

  static getS3Instance(): S3Service {
    if (!this.instance) {
      throw new Error(AWSClient.NO_INST_MSG);
    }
    return this.S3;
  }

  static getCloudWatchLogsInstance(): CloudWatchLogsService {
    if (!this.instance) {
      throw new Error(AWSClient.NO_INST_MSG);
    }
    return this.CloudWatchLogs;
  }

  static instantiate(): void {
    if (!this.instance) {
      this.instance = new AWSClient();
    } else {
      throw new Error('Error: AWSClient has already been instantiated');
    }
  }
}
