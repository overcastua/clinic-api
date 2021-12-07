import { S3 } from 'aws-sdk';

export class S3Service {
  readonly service: S3;

  constructor(s3: S3) {
    this.service = s3;
  }

  async putAndGetURL(
    file: Express.Multer.File,
    profileId: number,
  ): Promise<string> {
    const fileName = profileId + '.png';

    const options: S3.PutObjectRequest = {
      Key: fileName,
      Body: file.buffer,
      ContentType: 'image/png',
      Bucket: 'clinic-profile-pictures',
    };

    const uploadedImage = await this.service.upload(options).promise();

    return uploadedImage.Location;
  }
}
