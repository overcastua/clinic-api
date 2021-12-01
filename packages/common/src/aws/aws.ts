import { config, S3 } from 'aws-sdk';
import { join } from 'path';

export const AWS = new (class AWS_SDK {
  readonly S3: S3;

  constructor() {
    config.loadFromPath(join(__dirname, '/../../../../../aws.json'));
    this.S3 = new S3({ apiVersion: '2006-03-01' });
  }

  async putBase64AndGetURL(file: string, profileId: number): Promise<string> {
    const buffer = Buffer.from(
      file.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const fileName = profileId.toString();

    const data: AWS.S3.PutObjectRequest = {
      Key: fileName,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      Bucket: 'clinic-profile-pictures',
    };

    await this.S3.putObject(data).promise();

    return `https://clinic-profile-pictures.s3.amazonaws.com/${fileName}.jpg`;
  }
})();
