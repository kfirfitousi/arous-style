import Image from 'next/image';
import PhoneSVG from 'public/phone.svg';
import EmailSVG from 'public/email.svg';
import FacebookSVG from 'public/facebook.svg';
import InstagramSVG from 'public/instagram.svg';

export const Socials = () => {
    return (
        <div className="flex flex-row flex-wrap justify-center mt-5">
            <div className="flex flex-row items-center space-x-1 px-4">
                <Image src={PhoneSVG} alt="Phone" width={18} height={18} />
                <span className="text-lg">03-657-2714</span>
            </div>
            <a
                href="https://www.instagram.com/arouselbahar/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center space-x-1 px-4"
            >
                <Image src={InstagramSVG} alt="Instagram" width={18} height={18} />
                <span className="text-lg">@arouselbahar</span>
            </a>
            <a
                href="https://www.facebook.com/arous.elbahar.jaffa/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center space-x-1 px-4"
            >
                <Image src={FacebookSVG} alt="Email" width={20} height={20} />
                <span className="text-lg">fb.com/arous.elbahar.jaffa</span>
            </a>
            <a
                href="mailto:arouselbaharorg@gmail.com"
                className="flex flex-row items-center space-x-1 px-4"
            >
                <Image src={EmailSVG} alt="Email" width={20} height={20} />
                <span className="text-lg">arouselbaharorg@gmail.com</span>
            </a>
        </div>
    );
};
