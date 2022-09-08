import type { SetStateAction } from 'react';

import FilterButton from './FilterButton';
import { XMarkIcon } from '@heroicons/react/24/outline';

const filterTags = [
    ['dress', 'Dresses • שמלות • فساتين'],
    ['skirt', 'Skirts • חצאיות • التنورات'],
    ['shirt', 'Shirts • חולצות • القمصان'],
    ['accessory', 'Accessories • אביזרים • اكسسوارات'],
    ['shoes', 'Shoes • נעליים • الاحذيه'],
    ['jewelry', 'Jewelry • תכשיטים • المجوهرات']
];

type FilterButtonsProps = {
    filters: string[];
    setFilters: (value: SetStateAction<string[]>) => void;
};

const FilterButtons = ({ filters, setFilters }: FilterButtonsProps) => {
    return (
        <section className="flex flex-row flex-wrap justify-center mt-3 px-2">
            <button
                className="w-fit px-1 m-0.5 leading-3 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800"
                onClick={() => setFilters([])}
            >
                <XMarkIcon className="h-6 w-6" />
                <label className="sr-only">Clear filters • בטל סינון</label>
            </button>

            {filterTags.map(([tag, label]) => (
                <FilterButton
                    key={tag}
                    filter={tag}
                    label={label}
                    active={filters.includes(tag)}
                    setFilters={setFilters}
                />
            ))}
        </section>
    );
};
export default FilterButtons;
