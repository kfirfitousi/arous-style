import { useState } from 'react';
import { useProducts } from '@/hooks/getProducts';
import { contentfulLoader } from '@delicious-simplicity/next-image-contentful-loader';
import clsx from 'clsx';

import Image from 'next/image';
import ClearSVG from 'public/clear.svg';
import { FilterButton } from './FilterButton';
import { ProductSlideover } from './ProductModal';

export const Gallery = () => {
    const [filters, setFilters] = useState<string[]>([]);
    const [selectedProductNumber, setSelectedProductNumber] = useState<number | null>(null);
    const { data, isSuccess, isLoading, isError } = useProducts({
        config: {
            staleTime: 60 * 60 * 1000
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

    if (isLoading) {
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

            <section className="flex flex-row flex-wrap justify-center items-center my-4 px-4">
                {data.length === 0 && <div className="text-teal-800 my-20">No products found</div>}

                {data
                    .filter(
                        (product) =>
                            !filters.length || product.tags.some((tag) => filters.includes(tag.id))
                    )
                    .map((product) => (
                        <button
                            key={product.id}
                            onClick={() => setSelectedProductNumber(data?.indexOf(product))}
                            className={clsx(
                                'p-2 basis-full hover:scale-105 hover:z-10',
                                product.pictures[0].width > product.pictures[0].height
                                    ? 'sm:basis-1/2 lg:basis-1/3'
                                    : 'sm:basis-full lg:basis-1/2'
                            )}
                        >
                            <Image
                                loader={(props) =>
                                    contentfulLoader(props, { fm: 'jpg', fl: 'progressive', q: 50 })
                                }
                                src={product.pictures[0].url}
                                quality={50}
                                width={product.pictures[0].width}
                                height={product.pictures[0].height}
                                alt={product.title}
                                layout="responsive"
                                loading="lazy"
                                className="rounded-t-lg bg-teal-50"
                            />

                            <div className="text-teal-700 bg-teal-50 rounded-b-lg">
                                <h3 className="text-center text-lg px-0.5">
                                    {product.title_en && `${product.title_en} • `}
                                    {product.title}
                                </h3>
                                {product.price && (
                                    <p className="text-center text-sm pb-1">₪{product.price}</p>
                                )}
                            </div>
                        </button>
                    ))}
            </section>

            <ProductSlideover
                product={data[selectedProductNumber ?? 0]}
                isOpen={selectedProductNumber !== null}
                onClose={() => {
                    setSelectedProductNumber(null);
                }}
            />
        </>
    );
};
