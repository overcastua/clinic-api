import { SSM } from 'aws-sdk';

export class SSMService {
  readonly service: SSM;

  constructor(ssm: SSM) {
    this.service = ssm;
  }

  // async fetchParameters() {
  //   const options: SSM.GetParametersByPathRequest = {
  //     Path: '/dev/',
  //     Recursive: true,
  //     WithDecryption: false,
  //   };

  //   const res = await this.service.getParametersByPath(options).promise();
  //   const params: unknown = {};

  //   res.Parameters.map((p) => {
  //     const arr = p.Name.split('/');
  //     params[arr.pop()] = p.Value;
  //   });

  //   return params;
  // }
}
