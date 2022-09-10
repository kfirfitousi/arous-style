import { z } from 'zod';

export const ContactSchema = z.object({
    name: z.string().min(1, 'Name is required • נא להזין שם'),
    phone: z
        .string()
        .min(1, 'Phone number is required • נא להזין מס׳ טלפון')
        .min(8, 'Invalid phone number • מס׳ טלפון לא תקין'),
    message: z.string().optional(),
    productName: z.string().min(1, 'Product name is required • נא להזין שם מוצר')
});
