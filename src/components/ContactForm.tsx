import { ContactFormFields, ContactSchema, Product } from '@/types';
import { useState } from 'react';
import { useContact } from '@/hooks/useContact';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type ContactFormProps = {
    product: Product;
};

const ContactForm = ({ product }: ContactFormProps) => {
    const [submitError, setSubmitError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ContactFormFields>({
        resolver: zodResolver(ContactSchema)
    });

    const { isSuccess, isLoading, mutate } = useContact({
        config: {
            onMutate: () => {
                setSubmitError('');
            },
            onError: (error) => {
                setSubmitError(error.message);
            }
        }
    });

    const onSubmit: SubmitHandler<ContactFormFields> = async (data) => {
        mutate({
            ...data,
            product
        });
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center text-teal-800">
                <p>פנייתך התקבלה בהצלחה!</p>
                <p>Your message has been sent!</p>
            </div>
        );
    }

    return (
        <form className="flex flex-col">
            <label htmlFor="name" className="mt-2 text-right text-teal-800">
                <span className="text-red-500 text-center">*</span> Name - שם - الاسم
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

            <label htmlFor="phone" className="mt-2 text-right text-teal-800">
                <span className="text-red-500">*</span> Phone number - מספר טלפון - رقم الهاتف
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

            <label htmlFor="message" className="mt-2 text-right text-teal-800">
                Message - הודעה - رسالة
            </label>
            <textarea className="border border-teal-800 rounded-lg p-1" {...register('message')} />
            {errors.message && <span className="text-red-500">{errors.message.message}</span>}

            <button
                type="submit"
                className="mt-3 bg-teal-800 text-white rounded-lg p-1"
                disabled={isSubmitting || isLoading}
                onClick={handleSubmit(onSubmit)}
            >
                Send - שלח - إرسال
            </button>

            {submitError.length > 0 && (
                <span className="text-sm text-red-500 text-center">
                    {submitError}
                </span>
            )}
        </form>
    );
};

export default ContactForm;
