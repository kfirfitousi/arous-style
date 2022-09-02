import type { ImageLoaderProps } from 'next/image';

import { contentfulLoader as cfLoader } from '@delicious-simplicity/next-image-contentful-loader';
import { createClient, CreateClientParams } from 'contentful';

const config: CreateClientParams = {
    space: process.env.CONTENTFUL_SPACE_ID ?? '0',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '0'
};

export const client = createClient(config).withAllLocales;

export const contentfulLoader = (props: ImageLoaderProps) =>
    cfLoader(props, {
        fm: 'jpg',
        fl: 'progressive',
        q: 50
    });
