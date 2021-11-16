import { Metadata } from '@grpc/grpc-js';

export function formMetadata(token: string): Metadata {
  const metadata = new Metadata();
  metadata.set('token', token);
  return metadata;
}
