import { config, S3, CloudWatchLogs, SSM } from 'aws-sdk';
import { CloudWatchLogsService } from './services/cloudWatch';
import { S3Service } from './services/s3';
import { SSMService } from './services/ssm';

export class AWSClient {
  private static S3: S3Service;
  private static CloudWatchLogs: CloudWatchLogsService;
  private static SSM: SSMService;
  private static instance: AWSClient;

  private constructor() {
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
      throw new Error(
        'AWSClient ERROR: Service must be instantiated before accessing the instance',
      );
    }
    return this.instance;
  }

  static getSSMInstance(): SSMService {
    if (!this.instance) {
      throw new Error(
        'AWSClient ERROR: AWSClient must be instantiated before accessing any service instances',
      );
    }
    return this.SSM;
  }

  static getS3Instance(): S3Service {
    if (!this.instance) {
      throw new Error(
        'AWSClient ERROR: AWSClient must be instantiated before accessing any service instances',
      );
    }
    return this.S3;
  }

  static getCloudWatchLogsInstance(): CloudWatchLogsService {
    if (!this.instance) {
      throw new Error(
        'AWSClient ERROR: AWSClient must be instantiated before accessing any service instances',
      );
    }
    return this.CloudWatchLogs;
  }

  static instantiate(): void {
    if (!this.instance) {
      this.instance = new AWSClient();
    } else {
      throw new Error('AWSClient ERROR: Service has already been instantiated');
    }
  }
}
