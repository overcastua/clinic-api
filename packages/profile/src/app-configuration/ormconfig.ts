import { configureTypeorm } from '@repos/common';

const connectionOptions = configureTypeorm(__dirname, process.env);

export = connectionOptions;
