import Image from 'next/image';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import FacebookSVG from 'public/facebook.svg';
import InstagramSVG from 'public/instagram.svg';

export const Socials = () => {
    return (
        <div className="flex flex-row flex-wrap justify-center mt-5 text-teal-800">
            <a
                href="tel:+97236573714"
                className="flex flex-row items-center space-x-1 px-4 hover:underline"
                aria-label="Phone"
            >
                <PhoneIcon className="h-5 w-5" />
                <span className="text-lg">03-657-2714</span>
            </a>
            <a
                href="https://www.instagram.com/arouselbahar/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center space-x-1 px-4 hover:underline"
                aria-label="Instagram"
            >
                <span className="relative w-5 h-5">
                    <Image src={InstagramSVG} alt="Instagram" layout="fill" />
                </span>
                <span className="text-lg">@arouselbahar</span>
            </a>
            <a
                href="https://www.facebook.com/arous.elbahar.jaffa/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center space-x-1 px-4 hover:underline"
                aria-label="Facebook"
            >
                <span className="relative w-5 h-5">
                    <Image src={FacebookSVG} alt="Facebook" layout="fill" />
                </span>
                <span className="text-lg">fb.com/arous.elbahar.jaffa</span>
            </a>
            <a
                href="mailto:arouselbaharorg@gmail.com"
                className="flex flex-row items-center space-x-1 px-4 hover:underline"
                aria-label="Email"
            >
                <EnvelopeIcon className="w-d h-6" />
                <span className="text-lg">arouselbaharorg@gmail.com</span>
            </a>
        </div>
    );
};
