import { SSM } from 'aws-sdk';
import { ParameterList } from 'aws-sdk/clients/ssm';

export class SSMService {
  private readonly service: SSM;

  constructor(ssm: SSM) {
    this.service = ssm;
  }

  private async recursivelyFetchAllPages(
    path: string,
    memo: ParameterList = [],
    nextToken: string = null,
  ): Promise<ParameterList> {
    const { Parameters, NextToken } = await this.service
      .getParametersByPath({
        Path: path,
        Recursive: true,
        WithDecryption: false,
        NextToken: nextToken,
        MaxResults: 10,
      })
      .promise();

    const newMemo: ParameterList = memo.concat(Parameters);
    return NextToken
      ? this.recursivelyFetchAllPages(path, newMemo, NextToken)
      : newMemo;
  }

  /** 
    Fetches all the parameter pages from AWS SSM for the given path and returns them in a concatenated array.
  */
  async fetchParamsByPath(path: string): Promise<ParameterList> {
    return this.recursivelyFetchAllPages(path);
  }
}
