import type { Picture } from '@/types';

import { contentfulLoader } from '@delicious-simplicity/next-image-contentful-loader';
import clsx from 'clsx';

import Image from 'next/image';

type ProductPictureProps = {
    title: string;
    picture: Picture;
    rounded?: 'top' | 'bottom' | 'all';
    lazy?: boolean;
};

export const ProductPicture = ({ title, picture, rounded, lazy = true }: ProductPictureProps) => {
    return (
        <Image
            loader={(props) =>
                contentfulLoader(props, {
                    fm: 'jpg',
                    fl: 'progressive',
                    q: 50
                })
            }
            src={picture.url}
            alt={title}
            height={picture.height}
            width={picture.width}
            layout="responsive"
            loading={lazy ? 'lazy' : 'eager'}
            className={clsx(
                'bg-teal-50',
                rounded === 'top' && 'rounded-t-lg',
                rounded === 'bottom' && 'rounded-b-lg',
                rounded === 'all' && 'rounded-lg'
            )}
        />
    );
};
