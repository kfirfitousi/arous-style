import type { ContactFormFields } from '@/types';

import { useContact } from '@/hooks/useContact';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema } from './ContactSchema';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Spinner } from '~/UI';

type ContactFormProps = {
    productName: string;
};

export const ContactForm = ({ productName }: ContactFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ContactFormFields>({
        resolver: zodResolver(ContactSchema),
        defaultValues: { productName }
    });

    const { isSuccess, isLoading, isError, mutate } = useContact();

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-lg text-center text-teal-800">
                <CheckCircleIcon className="h-12 w-12" />
                <p dir="rtl">פנייתך התקבלה בהצלחה!</p>
                <p dir="rtl">ניצור איתך קשר בהקדם.</p>
                <p>Your message has been sent!</p>
                <p>We&apos;ll contact you soon.</p>
            </div>
        );
    }

    return (
        <form className="flex flex-col">
            <h2 className="text-lg text-center text-teal-800 underline">
                Contact us • יצירת קשר • اتصل بنا
            </h2>

            <label htmlFor="name" className="mt-1 text-right text-sm sm:text-base text-teal-800">
                <span className="text-red-500">*</span> Name • שם • الاسم
            </label>
            <input
                type="text"
                dir="rtl"
                className="border border-teal-800 rounded-lg p-1"
                {...register('name')}
            />
            {errors.name && (
                <span className="text-sm text-red-500 text-center">{errors.name.message}</span>
            )}

            <label htmlFor="phone" className="mt-1 text-right text-sm sm:text-base text-teal-800">
                <span className="text-red-500">*</span> Phone number • מספר טלפון • رقم الهاتف
            </label>
            <input
                type="tel"
                dir="rtl"
                className="border border-teal-800 rounded-lg p-1"
                {...register('phone')}
            />
            {errors.phone && (
                <span className="text-sm text-red-500 text-center">{errors.phone.message}</span>
            )}

            <label htmlFor="message" className="mt-1 text-right text-sm sm:text-base text-teal-800">
                Message • הודעה • رسالة
            </label>
            <textarea
                dir="rtl"
                className="border border-teal-800 rounded-lg p-1"
                {...register('message')}
            />
            {errors.message && (
                <span className="text-red-500 text-center">{errors.message.message}</span>
            )}

            <button
                type="submit"
                className="mt-3 rounded-lg p-1 text-white bg-teal-800  hover:bg-teal-500"
                disabled={isLoading}
                onClick={handleSubmit((data) => mutate(data))}
            >
                {isLoading ? <Spinner className="text-white" /> : 'Send • שלח • إرسال'}
            </button>

            {isError && (
                <span className="flex flex-row text-sm text-center mt-1 text-red-500">
                    <p>An error occured while sending your message. Please try again.</p>
                    <p dir="rtl">התרחשה שגיאה בעת שליחת ההודעה. אנא נסו שנית.</p>
                </span>
            )}
        </form>
    );
};
