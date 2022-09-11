import { MapPinIcon } from '@heroicons/react/24/outline';

type InfoBoxProps = {
    title: string;
    text: string;
    address: string;
    rtl?: boolean;
};

export const InfoBox = ({ title, text, address, rtl = false }: InfoBoxProps) => {
    return (
        <div className="basis-1/3 px-3 mt-3 sm:mt-0 flex flex-col items-center justify-between text-center sm:border-r border-gray-700">
            <p className="text-xl underline sm:no-underline" aria-label="Title">
                {title}
            </p>
            <p className="mt-4 text-sm" dir={rtl ? 'rtl' : 'ltr'} aria-label="Text">
                {text}
            </p>
            <div className="mt-4" dir={rtl ? 'rtl' : 'ltr'} aria-label="Address">
                <MapPinIcon className="w-6 h-6 pb-1 inline" />
                <a
                    href="https://goo.gl/maps/1yXRdcgZ6rXQWs9w5"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                >
                    {address}
                </a>
            </div>
        </div>
    );
};
