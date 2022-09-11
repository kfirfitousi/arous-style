import type { SetStateAction } from 'react';

import { useTags } from '@/hooks/useTags';

import { Button, Spinner } from '~/UI';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ProductCategoriesProps = {
    filters: string[];
    setFilters: (value: SetStateAction<string[]>) => void;
};

export const ProductCategories = ({ filters, setFilters }: ProductCategoriesProps) => {
    const { data, isLoading } = useTags();

    if (isLoading) {
        return (
            <div className="h-14 flex items-center justify-center">
                <Spinner className="text-xl text-teal-800" />
            </div>
        );
    }

    return (
        <section
            className="flex flex-row flex-wrap justify-center mt-3 px-2"
            aria-label="Product Categories"
        >
            <Button className="px-1 py-0" onClick={() => setFilters([])}>
                <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <label className="sr-only">Clear filters • בטל סינון</label>
            </Button>

            {data?.map(({ id, name }) => (
                <Button
                    key={id}
                    active={filters.includes(id)}
                    onClick={() => {
                        setFilters((activeFilters) =>
                            activeFilters.includes(id)
                                ? activeFilters.filter((filterId) => filterId !== id)
                                : [...activeFilters, id]
                        );
                    }}
                >
                    {name}
                </Button>
            ))}
        </section>
    );
};
