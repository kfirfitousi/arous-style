import { useState } from 'react';
import { usePictures } from '@/hooks/getPictures';
import { contentfulLoader } from '@delicious-simplicity/next-image-contentful-loader';
import clsx from 'clsx';

import Image from 'next/image';
import ClearSVG from 'public/clear.svg';
import { FilterButton } from './FilterButton';

export const Gallery = () => {
    const [filters, setFilters] = useState<string[]>([]);
    const { data, isError } = usePictures({
        query: filters,
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
                    className="w-fit px-1 m-0.5 leading-3 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800"
                    onClick={() => setFilters([])}
                >
                    <Image src={ClearSVG} alt="Clear Filters" width={20} height={20} />
                </button>
                <FilterButton
                    tag="dress"
                    text="Dresses • שמלות • فساتين"
                    active={filters.includes('dress')}
                    setFilters={setFilters}
                />
                <FilterButton
                    tag="skirt"
                    text="Skirts • חצאיות • التنورات"
                    active={filters.includes('skirt')}
                    setFilters={setFilters}
                />
                <FilterButton
                    tag="shirt"
                    text="Shirts • חולצות • القمصان"
                    active={filters.includes('shirt')}
                    setFilters={setFilters}
                />
                <FilterButton
                    tag="accessory"
                    text="Accessories • אביזרים • اكسسوارات"
                    active={filters.includes('accessory')}
                    setFilters={setFilters}
                />
                <FilterButton
                    tag="shoes"
                    text="Shoes • נעליים • الاحذيه"
                    active={filters.includes('shoes')}
                    setFilters={setFilters}
                />
                <FilterButton
                    tag="jewelry"
                    text="Jewelry • תכשיטים • المجوهرات"
                    active={filters.includes('jewelry')}
                    setFilters={setFilters}
                />
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center my-4 px-4">
                {data?.length === 0 && <div className="text-teal-800 my-20">No products found</div>}

                {data?.map((picture) => (
                    <button
                        key={picture.id}
                        className={clsx(
                            'p-2 basis-full hover:scale-105 hover:z-10',
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
                            className="rounded-t-lg bg-teal-50"
                        />

                        <div className="text-teal-700 bg-teal-50 rounded-b-lg">
                            <h3 className="text-center text-lg px-0.5">
                                {picture.title_en && `${picture.title_en} • `}
                                {picture.title}
                            </h3>
                            {picture.price && (
                                <p className="text-center text-sm pb-1">₪{picture.price}</p>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
};
