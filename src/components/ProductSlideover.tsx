import type { Product } from '@/types';

import { useEffect, useState } from 'react';
import { contentfulLoader } from '@/lib/contentful';

import Image from 'next/image';
import Slideover from './Slideover';
import ContactForm from './ContactForm';

type ProductSlideoverProps = {
    product: Product;
    isOpen: boolean;
    closeSlideover: () => void;
};

const ProductSlideover = ({ product, isOpen, closeSlideover }: ProductSlideoverProps) => {
    const [selectedPictureNumber, setSelectedPictureNumber] = useState(0);

    // reset selected picture when product changes
    useEffect(() => setSelectedPictureNumber(0), [product]);

    return (
        <Slideover
            isOpen={isOpen}
            handleClose={closeSlideover}
            title={
                <>
                    {product.title_en && (
                        <span className="mr-1 whitespace-nowrap">{product.title_en} •</span>
                    )}
                    <span>{product.title}</span>
                </>
            }
        >
            <div className="relative w-full h-full max-h-[50%]">
                <Image
                    loader={contentfulLoader}
                    src={product.pictures[selectedPictureNumber]?.url || product.pictures[0].url}
                    alt={product.title}
                    quality={50}
                    layout="fill"
                    objectFit="scale-down"
                    priority
                />
            </div>

            <div className="p-2 flex flex-row flex-wrap items-center justify-center mt-1">
                {product.pictures.map(({ id, url }, index) => (
                    <button
                        key={id}
                        className="relative w-10 h-10 sm:w-14 sm:h-14 m-0.5 rounded-lg hover:border-2 border-teal-800"
                        onClick={() => setSelectedPictureNumber(index)}
                    >
                        <Image
                            loader={contentfulLoader}
                            src={url}
                            alt={product.title}
                            quality={50}
                            layout="fill"
                            objectFit="cover"
                            className="bg-teal-50 rounded-lg hover:rounded-md"
                        />
                    </button>
                ))}
            </div>

            <ContactForm productName={product.title} />
        </Slideover>
    );
};

export default ProductSlideover;
