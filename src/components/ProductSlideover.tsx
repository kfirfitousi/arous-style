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
    useEffect(() => {
        setSelectedPictureNumber(0);
    }, [product]);

    return (
        <Slideover
            isOpen={isOpen}
            title={`${product.title_en && `${product.title_en} • `}${product.title}`}
            handleClose={closeSlideover}
        >
            <div className="relative w-full h-full max-h-[50%] mt-1">
                <Image
                    loader={contentfulLoader}
                    src={product.pictures[selectedPictureNumber].url}
                    alt={product.title}
                    quality={50}
                    layout="fill"
                    objectFit="scale-down"
                    priority
                />
            </div>

            <div className="p-2 flex flex-row flex-wrap items-center justify-center mt-1">
                {product.pictures.map((picture, index) => (
                    <button
                        key={picture.id}
                        className="relative w-14 h-14 m-0.5"
                        onClick={() => {
                            setSelectedPictureNumber(index);
                        }}
                    >
                        <Image
                            loader={contentfulLoader}
                            src={picture.url}
                            alt={product.title}
                            quality={50}
                            layout="fill"
                            objectFit="cover"
                            className="bg-teal-50 rounded-lg"
                        />
                    </button>
                ))}
            </div>

            <h2 className="text-lg text-teal-800 underline">Contact us - יצירת קשר - اتصل بنا</h2>

            <ContactForm product={product} />
        </Slideover>
    );
};

export default ProductSlideover;
