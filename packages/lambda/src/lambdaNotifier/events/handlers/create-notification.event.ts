import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ParameterFetchedEvent } from '../Impl/parameter-fetched.event';
import { config } from '../../config';
import { CloudWatchLogs } from 'aws-sdk';
import { CloudWatchLogsService } from '@repos/common/dist/src/aws/services/cloudWatch';

@EventsHandler(ParameterFetchedEvent)
export class ParameterFetchedEventHandler implements IEventHandler {
  private sequenceToken: string;
  constructor() {
    this.sequenceToken = null;
  }
  async handle(event: ParameterFetchedEvent) {
    try {
      const cloudWatchClient = new CloudWatchLogsService(
        new CloudWatchLogs(config),
      );

      if (this.sequenceToken === null) {
        const initial = await cloudWatchClient.cloudWatchDescribeLogStreams(
          'notifications',
        );
        const [stream] = initial.logStreams.filter(
          (s) => s.logStreamName === 'lambda',
        );

        this.sequenceToken = stream.uploadSequenceToken || null;
      }

      const log: CloudWatchLogs.InputLogEvent = {
        message: event.value,
        timestamp: new Date().getTime(),
      };

      const res = await cloudWatchClient.cloudWatchPutLogEvents(
        [log],
        'notifications',
        'lambda',
        this.sequenceToken,
      );

      this.sequenceToken = res.nextSequenceToken;
    } catch (e) {}
  }
}
