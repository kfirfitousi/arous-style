import { useState } from 'react';
import { usePictures } from '@/hooks/getPictures';
import { contentfulLoader } from '@delicious-simplicity/next-image-contentful-loader';

import Image from 'next/image';
import { FilterButton } from './FilterButton';
import clsx from 'clsx';

export const Gallery = () => {
    const [query, setQuery] = useState<string[]>([]);
    const { data, isError } = usePictures({
        query,
        config: {
            staleTime: 60 * 60 * 1000,
            keepPreviousData: true
        }
    });

    if (isError) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-teal-800">
                <p>Error occured while fetching Images.</p>
                <p>Try refreshing the page.</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-row flex-wrap justify-center mt-3 px-2">
                <button
                    className="w-fit p-2 m-0.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800"
                    onClick={() => setQuery([])}
                >
                    X
                </button>
                <FilterButton
                    tag="dress"
                    text="Dresses • שמלות • فساتين"
                    query={query}
                    setQuery={setQuery}
                />
                <FilterButton
                    tag="skirt"
                    text="Skirts • חצאיות • التنورات"
                    query={query}
                    setQuery={setQuery}
                />
                <FilterButton
                    tag="shirt"
                    text="Shirts • חולצות • القمصان"
                    query={query}
                    setQuery={setQuery}
                />
                <FilterButton
                    tag="accessory"
                    text="Accessories • אביזרים • اكسسوارات"
                    query={query}
                    setQuery={setQuery}
                />
                <FilterButton
                    tag="shoes"
                    text="Shoes • נעליים • الاحذيه"
                    query={query}
                    setQuery={setQuery}
                />
                <FilterButton
                    tag="jewelry"
                    text="Jewelry • תכשיטים • المجوهرات"
                    query={query}
                    setQuery={setQuery}
                />
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center mt-4 px-4">
                {data?.length === 0 && <div className="text-teal-800 my-20">No products found</div>}

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
                            {picture.price && (
                                <p className="text-center text-sm">₪{picture.price}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
