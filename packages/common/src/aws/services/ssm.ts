import { SSM } from 'aws-sdk';

export class SSMService {
  readonly service: SSM;

  constructor(ssm: SSM) {
    this.service = ssm;
  }
}
