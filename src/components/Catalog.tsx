import type { Product } from '@/types';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import dynamic from 'next/dynamic';

import { XCircleIcon } from '@heroicons/react/24/outline';
import FilterButtons from './FilterButtons';
import ProductCards from './ProductCards';
import Spinner from './Spinner';

// import ProductSlideover dynamically to reduce first load bundle size
const ProductSlideover = dynamic<{
    product: Product;
    isOpen: boolean;
    closeSlideover: () => void;
}>(() => import('./ProductSlideover'), { ssr: false });

const Catalog = () => {
    const [filters, setFilters] = useState<string[]>([]);
    const [slideoverOpen, setSlideoverOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>('');

    const { data, isLoading, isError } = useProducts({
        config: {
            staleTime: 60 * 60 * 1000
        }
    });

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

    const filteredProducts = data.filter(
        (product) => !filters.length || product.tags.some((tag) => filters.includes(tag))
    );

    return (
        <section>
            <FilterButtons filters={filters} setFilters={setFilters} />

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
        </section>
    );
};

export default Catalog;
