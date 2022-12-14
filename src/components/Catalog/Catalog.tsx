import type { Product } from '@/types';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import dynamic from 'next/dynamic';

import { XCircleIcon } from '@heroicons/react/24/outline';
import { ProductCategories } from '~/ProductCategories';
import { ProductCards } from '~/ProductCards';
import { Spinner } from '~/UI';

// import ProductSlideover dynamically to reduce first load bundle size
const ProductSlideover = dynamic<{
    product: Product;
    isOpen: boolean;
    closeSlideover: () => void;
}>(() => import('~/ProductSlideover').then((mod) => mod.ProductSlideover), {
    ssr: false
});

export const Catalog = () => {
    const [filters, setFilters] = useState<string[]>([]);
    const [slideoverOpen, setSlideoverOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>('');

    const { data, isLoading, isError } = useProducts();

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
                <Spinner className="text-teal-800" />
                <p className="text-xl">טוען קטלוג</p>
                <p className="text-xl">Loading Catalog</p>
            </div>
        );
    }

    const filteredProducts = filters.length
        ? data.filter((product) => product.tags.some((tag) => filters.includes(tag)))
        : data;

    return (
        <>
            <ProductCategories filters={filters} setFilters={setFilters} />

            <ProductCards
                products={filteredProducts}
                setSelectedProductId={setSelectedProductId}
                setSlideoverOpen={setSlideoverOpen}
            />

            <ProductSlideover
                product={data.find((product) => product.id === selectedProductId) || data[0]}
                isOpen={slideoverOpen}
                closeSlideover={() => setSlideoverOpen(false)}
            />
        </>
    );
};
