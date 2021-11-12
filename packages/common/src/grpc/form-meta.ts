import { Metadata } from '@grpc/grpc-js';
import { InternalServerErrorException } from '@nestjs/common';

export function formMetadata(): Metadata {
  if (!this.configService) {
    throw new InternalServerErrorException(
      `${this.constructor.name} class does not have configService provided.`,
    );
  }

  const metadata = new Metadata();
  metadata.set('token', this.configService.get('jwt.secret'));
  return metadata;
}
