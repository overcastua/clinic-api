import { S3 } from 'aws-sdk';

export class S3Service {
  readonly service: S3;

  constructor(s3: S3) {
    this.service = s3;
  }

  async putBase64AndGetURL(file: string, profileId: number): Promise<string> {
    const buffer = Buffer.from(
      file.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const fileName = profileId.toString();

    const options: S3.PutObjectRequest = {
      Key: fileName,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      Bucket: 'clinic-profile-pictures',
    };

    await this.service.putObject(options).promise();

    return `https://clinic-profile-pictures.s3.amazonaws.com/${fileName}.jpg`;
  }
}
