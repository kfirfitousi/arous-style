import type { Product } from '@/types';

import ProductCard from './ProductCard';
import { XCircleIcon } from '@heroicons/react/24/outline';

type ProductCardsProps = {
    products: Product[];
    setSelectedProductId: (id: string) => void;
    setSlideoverOpen: (value: boolean) => void;
};

const ProductCards = ({ products, setSelectedProductId, setSlideoverOpen }: ProductCardsProps) => {
    return (
        <section className="flex flex-row flex-wrap justify-center items-center my-4 px-4">
            {!products.length && (
                <div className="text-teal-800 my-20">
                    <XCircleIcon className="h-12 w-12 mx-auto" />
                    <p>לא נמצאו מוצרים בקטגוריה זו</p>
                    <p>No products found in this category</p>
                </div>
            )}

            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={() => {
                        setSelectedProductId(product.id);
                        setSlideoverOpen(true);
                    }}
                />
            ))}
        </section>
    );
};

export default ProductCards;
