import { useState } from 'react';
import { usePictures } from '@/hooks/getPictures';
import { contentfulLoader } from '@delicious-simplicity/next-image-contentful-loader';

import Image from 'next/image';
import clsx from 'clsx';

export const Gallery = () => {
    const [filter, setFilter] = useState('');
    const { data, isError } = usePictures({
        filter,
        config: {
            staleTime: 60 * 60 * 1000
        }
    });

    if (isError) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-yellow-800">
                <p>Error occured while fetching Images.</p>
                <p>Try refreshing the page.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-row flex-wrap justify-center items-center mt-4 px-4">
            {data?.map((picture) => (
                <div
                    key={picture.id}
                    className={clsx(
                        'p-2 basis-full',
                        picture.height > picture.width
                            ? 'sm:basis-1/2 lg:basis-1/3'
                            : 'sm:basis-full lg:basis-1/2'
                    )}
                >
                    <Image
                        loader={(props) =>
                            contentfulLoader(props, { fm: 'jpg', fl: 'progressive', q: 50 })
                        }
                        src={picture.url}
                        quality={50}
                        width={picture.width}
                        height={picture.height}
                        alt={picture.title}
                        layout="responsive"
                        loading="lazy"
                        className="rounded-t-lg"
                    />
                    <div className="text-teal-700 bg-teal-50 rounded-b-lg">
                        <h3 className="text-center text-lg">{picture.title}</h3>
                        {picture.price && <p className="text-center text-sm">₪{picture.price}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};
