import clsx from 'clsx';

type ButtonProps = {
    children?: React.ReactNode | React.ReactNode[];
    active: boolean;
    className?: string;
    onClick: () => void;
};

export const Button = ({ children, active, className, onClick }: ButtonProps) => {
    return (
        <button
            className={clsx(
                className,
                'w-fit m-0.5 p-2 rounded-lg text-xs sm:text-base',
                active ? 'bg-teal-500 text-teal-50' : 'bg-teal-50 hover:bg-teal-100 text-teal-800'
            )}
            onClick={onClick}
            aria-pressed={active}
        >
            {children}
        </button>
    );
};
