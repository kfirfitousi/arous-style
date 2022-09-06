import type { ImageLoaderProps } from 'next/image';

import { contentfulLoader as cfLoader } from '@delicious-simplicity/next-image-contentful-loader';
import { createClient, CreateClientParams } from 'contentful';

const config: CreateClientParams = {
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!
};

export const client = createClient(config).withAllLocales;

export const contentfulLoader = (props: ImageLoaderProps) =>
    cfLoader(props, {
        fm: 'jpg',
        fl: 'progressive',
        q: 50
    });
