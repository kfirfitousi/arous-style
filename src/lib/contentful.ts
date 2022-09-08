import type { ImageLoader } from 'next/image';

import { contentfulLoader as cfLoader } from '@delicious-simplicity/next-image-contentful-loader';
import { createClient } from 'contentful';

/**
 * Contentful client for fetching data from the Contentful API.
 * Set these environment variables in .env.local.
 * See README.md for more info
 */
export const contentfulClient = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!
});

export const contentfulLoader: ImageLoader = (props) =>
    cfLoader(props, {
        fm: 'jpg',
        fl: 'progressive',
        q: 50
    });
