import { opts } from '@repos/common';

const connectionOptions = opts(__dirname, process.env);

export = connectionOptions;
