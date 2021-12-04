import { CloudWatchLogs } from 'aws-sdk';

export class CloudWatchLogsService {
  readonly service: CloudWatchLogs;

  constructor(cwl: CloudWatchLogs) {
    this.service = cwl;
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

    return this.service.putLogEvents(options).promise();
  }

  async cloudWatchDescribeLogStreams(group: string) {
    const params: CloudWatchLogs.DescribeLogStreamsRequest = {
      logGroupName: group,
    };

    return this.service.describeLogStreams(params).promise();
  }
}
