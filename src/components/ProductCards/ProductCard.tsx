import type { Product } from '@/types';

import { contentfulLoader } from '@/lib/contentful';
import Image from 'next/image';

type ProductCardProps = {
    product: Product;
    onSelect: () => void;
};

export const ProductCard = ({ product, onSelect }: ProductCardProps) => {
    return (
        <button
            key={product.id}
            onClick={onSelect}
            className="p-2 h-full sm:h-80 md:h-96 flex flex-col basis-full hover:scale-105 sm:basis-1/2 xl:basis-1/3"
            aria-label="Product"
        >
            <div className="relative w-full h-96 sm:h-64 md:h-80 flex-shrink">
                <Image
                    loader={contentfulLoader}
                    src={product.pictures[0].url}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    quality={50}
                    loading="lazy"
                    className="rounded-t-lg bg-teal-50"
                />
            </div>

            <div className="w-full text-teal-700 bg-teal-50 rounded-b-lg">
                <label className="text-center text-lg px-0.5 flex flex-row flex-wrap justify-center">
                    {product.title_en && (
                        <span className="mr-1 whitespace-nowrap">{product.title_en} •</span>
                    )}
                    <span>{product.title}</span>
                </label>
                {product.price && (
                    <p className="text-center text-sm pb-1" aria-label="Price">
                        ₪{product.price}
                    </p>
                )}
            </div>
        </button>
    );
};
