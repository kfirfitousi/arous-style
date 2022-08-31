import { createClient, CreateClientParams } from 'contentful';

const config: CreateClientParams = {
    space: 'ywc3ioqwvbsr',
    accessToken: 'lBIlnZhr121Tutkng-5ZWIjtbEaDpNrFgn56Q2nZqjc'
};

export const client = createClient(config);
