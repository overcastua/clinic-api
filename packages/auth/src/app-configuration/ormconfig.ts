import { TypeormAsyncConfiguration } from '@repos/common';

const connectionOptions = TypeormAsyncConfiguration(__dirname);

export = connectionOptions;
