import { ConsoleLogger } from '@nestjs/common';
import { CloudWatchLogs } from 'aws-sdk';
import { CloudWatchLogsService } from 'src/aws/services/cloudWatch';
import { AWSClient } from '../aws/aws';

export class CloudWatchLogger extends ConsoleLogger {
  private nextSequenceToken: string;
  private readonly service: string;
  private readonly mode: string;
  private cwl: CloudWatchLogsService;

  constructor(mode: string, service: string) {
    super();

    this.mode = mode;
    this.service = service;

    this.nextSequenceToken = null;
    this.init();
  }

  async init() {
    this.cwl = AWSClient.getCloudWatchLogsInstance();

    const res = await this.cwl.cloudWatchDescribeLogStreams(this.service);
    this.nextSequenceToken = res.logStreams[0]?.uploadSequenceToken;
  }

  async error(message: any, stack?: string, context?: string) {
    const event: CloudWatchLogs.InputLogEvent = {
      message: message.toString(),
      timestamp: new Date().getTime(),
    };

    const res = await this.cwl.cloudWatchPutLogEvents(
      [event],
      this.service,
      this.mode,
      this.nextSequenceToken,
    );

    this.nextSequenceToken = res.nextSequenceToken;

    super.error(message, stack, context);
  }
}
