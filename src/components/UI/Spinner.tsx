type SpinnerProps = {
    className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
    return (
        <span className={className}>
            <span className="animate-fade-in-out">•</span>
            <span className="animate-fade-in-out-delay-1">•</span>
            <span className="animate-fade-in-out-delay-2">•</span>
        </span>
    );
};
