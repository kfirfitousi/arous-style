import { createClient, CreateClientParams } from 'contentful';

const config: CreateClientParams = {
    space: 'ywc3ioqwvbsr',
    accessToken: 'hKY1ewipFTjq-sYIeMrnXn_tN9xSbg5h9hUi9bkjGF8'
};

export const client = createClient(config).withAllLocales;
