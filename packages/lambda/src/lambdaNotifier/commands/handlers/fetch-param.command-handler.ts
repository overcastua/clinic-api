import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { FetchParamCommand } from '../Impl/fetch-param.command';
import { SSM } from 'aws-sdk';
import { ParameterFetchedEvent } from '../../events/Impl/parameter-fetched.event';
import { SSMService } from '@repos/common/dist/src/aws/services/ssm';
import { config } from '../../config';

@CommandHandler(FetchParamCommand)
export class FetchParamCommandHandler
  implements ICommandHandler<FetchParamCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: FetchParamCommand) {
    const ssmClient = new SSMService(new SSM(config));
    const params = await ssmClient.fetchParamsByPath('/dev/');
    const parsedParamValues = params.map((parameter) => parameter.Value);
    const testValue = parsedParamValues[0];
    this.eventBus.publish(new ParameterFetchedEvent(testValue));
  }
}
