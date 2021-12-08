import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const configureGRPC = (
  url: string,
  packageName: string,
): ClientOptions => ({
  transport: Transport.GRPC,
  options: {
    url,
    package: packageName,
    protoPath: join(__dirname, `../../grpc/proto/${packageName}.proto`),
  },
});
