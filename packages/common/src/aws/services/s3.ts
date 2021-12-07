import { S3 } from 'aws-sdk';
import { createReadStream } from 'fs';

export class S3Service {
  readonly service: S3;

  constructor(s3: S3) {
    this.service = s3;
  }

  async putBase64AndGetURL(
    file: Express.Multer.File,
    profileId: number,
  ): Promise<string> {
    const fileStream = createReadStream(file.path);

    const fileName = profileId + '.jpg';

    const options: S3.PutObjectRequest = {
      Key: fileName,
      Body: fileStream,
      Bucket: 'clinic-profile-pictures',
    };

    const uploadedImage = await this.service.upload(options).promise();

    return uploadedImage.Location;
  }
}
