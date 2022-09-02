import type { SetStateAction } from 'react';

import clsx from 'clsx';

type FilterButtonProps = {
    tag: string;
    text: string;
    active: boolean;
    setFilters: (value: SetStateAction<string[]>) => void;
};

export const FilterButton = ({ tag, text, active, setFilters }: FilterButtonProps) => {
    const handleFilterSelect = (filter: string) => {
        setFilters((activeFilters) => {
            if (activeFilters.includes(filter)) {
                return activeFilters.filter((f) => f !== filter);
            }

            return [...activeFilters, filter];
        });
    };

    return (
        <button
            className={clsx(
                'w-fit m-0.5 p-2 rounded-lg text-xs sm:text-base',
                active ? 'bg-teal-500 text-teal-50' : 'bg-teal-50 hover:bg-teal-100 text-teal-800'
            )}
            onClick={() => handleFilterSelect(tag)}
        >
            {text}
        </button>
    );
};
