import type { SetStateAction } from 'react';

import { useTags } from '@/hooks/useTags';

import { FilterButton } from './FilterButton';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../UI';

type FilterButtonsProps = {
    filters: string[];
    setFilters: (value: SetStateAction<string[]>) => void;
};

export const FilterButtons = ({ filters, setFilters }: FilterButtonsProps) => {
    const { data, isLoading } = useTags();

    if (isLoading) {
        return (
            <div className="h-14 flex items-center justify-center">
                <Spinner className="text-xl text-teal-800" />
            </div>
        );
    }

    return (
        <section className="flex flex-row flex-wrap justify-center mt-3 px-2">
            <button
                className="w-fit px-1 m-0.5 leading-3 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800"
                onClick={() => setFilters([])}
            >
                <XMarkIcon className="h-6 w-6" />
                <label className="sr-only">Clear filters • בטל סינון</label>
            </button>

            {data?.map(({ id, name }) => (
                <FilterButton
                    key={id}
                    filter={id}
                    label={name}
                    active={filters.includes(id)}
                    setFilters={setFilters}
                />
            ))}
        </section>
    );
};
