import clsx from 'clsx';

type FilterButtonProps = {
    tag: string;
    text: string;
    query: string[];
    setQuery: (query: string[]) => void;
};

export const FilterButton = ({ tag, text, query, setQuery }: FilterButtonProps) => {
    const handleFilter = (filter: string) => {
        if (query.includes(filter)) {
            setQuery(query.filter((f) => f !== filter));
        } else {
            setQuery([...query, filter]);
        }
    };

    return (
        <button
            className={clsx(
                'w-fit m-0.5 p-2 rounded-lg',
                query.includes(tag)
                    ? 'bg-teal-500 text-teal-50'
                    : 'bg-teal-50 hover:bg-teal-100 text-teal-800'
            )}
            onClick={() => handleFilter(tag)}
        >
            {text}
        </button>
    );
};
