import { z } from 'zod';

export type Picture = {
    id: string;
    url: string;
    width: number;
    height: number;
};

export type Product = {
    id: string;
    title: string;
    title_en: string;
    price: number;
    tags: string[];
    pictures: Picture[];
};

export type ContactFormFields = {
    name: string;
    phone: string;
    message?: string;
    productName: string;
};

export type ContactResponse = {
    message: string;
};

export const ContactSchema = z.object({
    name: z.string().min(1, 'Name is required • נא להזין שם'),
    phone: z
        .string()
        .min(1, 'Phone number is required • נא להזין מס׳ טלפון')
        .min(8, 'Invalid phone number • מס׳ טלפון לא תקין'),
    message: z.string().optional(),
    productName: z.string().optional()
});
