import type { Product } from '@/types';

import { contentfulLoader } from '@delicious-simplicity/next-image-contentful-loader';
import { Fragment, useState } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

type ProductModalProps = {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
};

export const ProductSlideover = ({ product, isOpen, onClose }: ProductModalProps) => {
    const [selectedPictureNumber, setSelectedPictureNumber] = useState(0);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => onClose()}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>

                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-center text-lg font-medium text-teal-800">
                                                {product.title_en && `${product.title_en} • `}
                                                {product.title}
                                            </Dialog.Title>
                                        </div>

                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                <section className="h-full flex flex-col items-center">
                                                    <div className="relative w-full h-full max-h-[50%] mt-1">
                                                        <Image
                                                            loader={(props) =>
                                                                contentfulLoader(props, {
                                                                    fm: 'jpg',
                                                                    fl: 'progressive',
                                                                    q: 50
                                                                })
                                                            }
                                                            src={
                                                                product.pictures[
                                                                    selectedPictureNumber
                                                                ]?.url
                                                            }
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
                                                                    loader={(props) =>
                                                                        contentfulLoader(props, {
                                                                            fm: 'jpg',
                                                                            fl: 'progressive',
                                                                            q: 50
                                                                        })
                                                                    }
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

                                                    <h2 className="text-lg text-teal-800">
                                                        Contact us - יצירת קשר - اتصل بنا
                                                    </h2>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
