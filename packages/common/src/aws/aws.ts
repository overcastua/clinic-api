import { config, S3, CloudWatchLogs, SSM } from 'aws-sdk';
import { join } from 'path';
import { SSMService } from './services/ssm';

export class AWSClient {
  private readonly S3: S3;
  private readonly CloudWatchLogs: CloudWatchLogs;
  private static SSM: SSMService;
  private static instance: AWSClient;

  private constructor() {
    config.loadFromPath(join(__dirname, '/../../../../../aws.json'));

    this.S3 = new S3();
    this.CloudWatchLogs = new CloudWatchLogs();
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

  static instantiate(): void {
    if (!this.instance) {
      this.instance = new AWSClient();
    } else {
      throw new Error('AWSClient ERROR: Service has already been instantiated');
    }
  }

  async putBase64AndGetURL(file: string, profileId: number): Promise<string> {
    const buffer = Buffer.from(
      file.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const fileName = profileId.toString();

    const options: S3.PutObjectRequest = {
      Key: fileName,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      Bucket: 'clinic-profile-pictures',
    };

    await this.S3.putObject(options).promise();

    return `https://clinic-profile-pictures.s3.amazonaws.com/${fileName}.jpg`;
  }

  async cloudWatchPutLogEvents(
    events: CloudWatchLogs.InputLogEvents,
    group: string,
    stream: string,
    sequenceToken: string,
  ) {
    const options: CloudWatchLogs.PutLogEventsRequest = {
      logEvents: events,
      logGroupName: group,
      logStreamName: stream,
      sequenceToken: sequenceToken,
    };

    return this.CloudWatchLogs.putLogEvents(options).promise();
  }

  async cloudWatchDescribeLogStreams(group: string) {
    const params: CloudWatchLogs.DescribeLogStreamsRequest = {
      logGroupName: group,
    };

    return this.CloudWatchLogs.describeLogStreams(params).promise();
  }
}
