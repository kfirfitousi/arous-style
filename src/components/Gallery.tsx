import type { Product } from '@/types';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { contentfulLoader } from '@/lib/contentful';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

import Image from 'next/image';
import FilterButton from './FilterButton';
import { XMarkIcon, XCircleIcon } from '@heroicons/react/24/outline';

// import ProductSlideover dynamically to reduce first load bundle size
const ProductSlideover = dynamic<{
    product: Product;
    isOpen: boolean;
    closeSlideover: () => void;
}>(() => import('./ProductSlideover'), { ssr: false });

const Gallery = () => {
    const [filters, setFilters] = useState<string[]>([]);
    const [slideoverOpen, setSlideoverOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>('');

    const { data, isLoading, isError } = useProducts({
        config: {
            staleTime: 60 * 60 * 1000
        }
    });

    const filterTags = [
        ['dress', 'Dresses • שמלות • فساتين'],
        ['skirt', 'Skirts • חצאיות • التنورات'],
        ['shirt', 'Shirts • חולצות • القمصان'],
        ['accessory', 'Accessories • אביזרים • اكسسوارات'],
        ['shoes', 'Shoes • נעליים • الاحذيه'],
        ['jewelry', 'Jewelry • תכשיטים • المجوهرات']
    ];

    if (isError) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-teal-800">
                <XCircleIcon className="h-12 w-12" />
                <p dir="rtl">התרחשה שגיאה. נסו לרענן את הדף.</p>
                <p>Error occured, try refreshing the page.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-teal-800">
                Loading...
            </div>
        );
    }

    const filteredProducts = data.filter(
        (product) => !filters.length || product.tags.some((tag) => filters.includes(tag.id))
    );

    return (
        <section>
            <div className="flex flex-row flex-wrap justify-center mt-3 px-2">
                <button
                    className="w-fit px-1 m-0.5 leading-3 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800"
                    onClick={() => setFilters([])}
                >
                    <XMarkIcon className="h-6 w-6" />
                    <label className="sr-only">Clear filters</label>
                </button>

                {filterTags.map(([tag, label]) => (
                    <FilterButton
                        key={tag}
                        tag={tag}
                        label={label}
                        active={filters.includes(tag)}
                        setFilters={setFilters}
                    />
                ))}
            </div>

            <section className="flex flex-row flex-wrap justify-center items-center my-4 px-4">
                {!filteredProducts.length && (
                    <div className="text-teal-800 my-20">
                        <XCircleIcon className="h-12 w-12 mx-auto" />
                        <p>לא נמצאו מוצרים</p>
                        <p>No products found</p>
                    </div>
                )}

                {filteredProducts.map((product) => (
                    <button
                        key={product.id}
                        onClick={() => {
                            setSelectedProductId(product.id);
                            setSlideoverOpen(true);
                        }}
                        className={clsx(
                            'p-2 basis-full hover:scale-105 hover:z-10',
                            product.pictures[0].height > product.pictures[0].width
                                ? 'sm:basis-1/2 lg:basis-1/3'
                                : 'sm:basis-full lg:basis-1/2'
                        )}
                    >
                        <Image
                            loader={contentfulLoader}
                            src={product.pictures[0].url}
                            width={product.pictures[0].width}
                            height={product.pictures[0].height}
                            alt={product.title}
                            quality={50}
                            layout="responsive"
                            loading="lazy"
                            className="rounded-t-lg bg-teal-50"
                        />

                        <div className="text-teal-700 bg-teal-50 rounded-b-lg">
                            <h3 className="text-center text-lg px-0.5 flex flex-row flex-wrap justify-center">
                                {product.title_en && (
                                    <span className="mr-0.5 whitespace-nowrap">
                                        {product.title_en} •{' '}
                                    </span>
                                )}
                                <span>{product.title}</span>
                            </h3>
                            {product.price && (
                                <p className="text-center text-sm pb-1">₪{product.price}</p>
                            )}
                        </div>
                    </button>
                ))}
            </section>

            <ProductSlideover
                product={data.find((product) => product.id === selectedProductId) || data[0]}
                isOpen={slideoverOpen}
                closeSlideover={() => {
                    setSlideoverOpen(false);
                }}
            />
        </section>
    );
};

export default Gallery;
