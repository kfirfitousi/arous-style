import type { SetStateAction } from 'react';

import clsx from 'clsx';

type FilterButtonProps = {
    filter: string;
    label: string;
    active: boolean;
    setFilters: (value: SetStateAction<string[]>) => void;
};

const FilterButton = ({ filter, label, active, setFilters }: FilterButtonProps) => {
    const toggleFilter = (filterName: string) => {
        setFilters((activeFilters) =>
            activeFilters.includes(filterName)
                ? activeFilters.filter((f) => f !== filterName)
                : [...activeFilters, filterName]
        );
    };

    return (
        <button
            className={clsx(
                'w-fit m-0.5 p-2 rounded-lg text-xs sm:text-base',
                active ? 'bg-teal-500 text-teal-50' : 'bg-teal-50 hover:bg-teal-100 text-teal-800'
            )}
            onClick={() => toggleFilter(filter)}
        >
            {label}
        </button>
    );
};

export default FilterButton;
