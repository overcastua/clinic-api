import { config, S3, CloudWatchLogs } from 'aws-sdk';
import { join } from 'path';

export class AWS {
  private readonly S3: S3;
  private readonly CloudWatchLogs: CloudWatchLogs;
  private static instance: AWS;

  private constructor(mode: string) {
    if (mode === 'dev') {
      config.loadFromPath(join(__dirname, '/../../../../../aws.json'));
    } else if (mode !== 'prod') {
      throw new Error(
        `AWS ERROR: Wrong mode ${mode} declared; 'dev' or 'prod' expected.`,
      );
    }

    this.S3 = new S3();
    this.CloudWatchLogs = new CloudWatchLogs();
  }

  static getInstance(): AWS {
    if (!this.instance) {
      throw new Error(
        'AWS ERROR: Service must be instantiated before accessing the instance',
      );
    }
    return this.instance;
  }

  static instantiate(mode: string): void {
    if (!this.instance) {
      this.instance = new AWS(mode);
    } else {
      throw new Error('AWS ERROR: Service has already been instantiated');
    }
  }

  async putBase64AndGetURL(file: string, profileId: number): Promise<string> {
    const buffer = Buffer.from(
      file.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const fileName = profileId.toString();

    const params: S3.PutObjectRequest = {
      Key: fileName,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      Bucket: 'clinic-profile-pictures',
    };

    await this.S3.putObject(params).promise();

    return `https://clinic-profile-pictures.s3.amazonaws.com/${fileName}.jpg`;
  }

  async cloudWatchPutLogEvents(
    events: CloudWatchLogs.InputLogEvents,
    group: string,
    stream: string,
    sequenceToken: string,
  ) {
    const params: CloudWatchLogs.PutLogEventsRequest = {
      logEvents: events,
      logGroupName: group,
      logStreamName: stream,
      sequenceToken: sequenceToken,
    };

    return this.CloudWatchLogs.putLogEvents(params).promise();
  }

  async cloudWatchDescribeLogStreams(group: string) {
    const params: CloudWatchLogs.DescribeLogStreamsRequest = {
      logGroupName: group,
    };

    return this.CloudWatchLogs.describeLogStreams(params).promise();
  }
}
