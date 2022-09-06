import { ContactFormFields, ContactSchema, Product } from '@/types';
import { useState } from 'react';
import { useContact } from '@/hooks/useContact';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CheckCircleIcon } from '@heroicons/react/24/outline';

type ContactFormProps = {
    product: Product;
};

const ContactForm = ({ product }: ContactFormProps) => {
    const [submitError, setSubmitError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ContactFormFields>({
        resolver: zodResolver(ContactSchema)
    });

    const { isSuccess, isLoading, mutate } = useContact({
        config: {
            onMutate: () => setSubmitError(false),
            onError: () => setSubmitError(true)
        }
    });

    const onSubmit: SubmitHandler<ContactFormFields> = async (data) => {
        mutate({ ...data, product });
    };

    if (isSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-lg text-teal-800">
                <CheckCircleIcon className="h-12 w-12" />
                <p dir="rtl">פנייתך התקבלה בהצלחה!</p>
                <p>Your message has been sent!</p>
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
            {errors.message && <span className="text-red-500">{errors.message.message}</span>}

            <button
                type="submit"
                className="mt-3 rounded-lg p-1 text-white bg-teal-800  hover:bg-teal-500"
                disabled={isSubmitting || isLoading}
                onClick={handleSubmit(onSubmit)}
            >
                {isSubmitting || isLoading ? '•••' : 'Send • שלח • إرسال'}
            </button>

            {submitError && (
                <span className="text-sm text-red-500 text-center mt-1">
                    <p dir="rtl">התרחשה שגיאה בעת שליחת ההודעה. אנא נסו שנית.</p>
                    <p>An error occured while sending your message. Please try again.</p>
                </span>
            )}
        </form>
    );
};

export default ContactForm;
