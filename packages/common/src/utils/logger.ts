import { ConsoleLogger } from '@nestjs/common';
import { CloudWatchLogs } from 'aws-sdk';
import { AWSClient } from '../aws/aws';

export class CloudWatchLogger extends ConsoleLogger {
  private nextSequenceToken: string;
  private service: string;
  private mode: string;
  private aws: AWSClient;

  constructor() {
    super();
    this.nextSequenceToken = null;
  }

  async init(mode: string, service: string) {
    this.aws = AWSClient.getInstance();
    this.mode = mode;
    this.service = service;

    const res = await this.aws.cloudWatchDescribeLogStreams(this.service);
    this.nextSequenceToken = res.logStreams[0]?.uploadSequenceToken;
  }

  async error(message: any, stack?: string, context?: string) {
    const event: CloudWatchLogs.InputLogEvent = {
      message: message.toString(),
      timestamp: new Date().getTime(),
    };

    const res = await this.aws.cloudWatchPutLogEvents(
      [event],
      this.service,
      this.mode,
      this.nextSequenceToken,
    );

    this.nextSequenceToken = res.nextSequenceToken;

    super.error(message, stack, context);
  }
}
