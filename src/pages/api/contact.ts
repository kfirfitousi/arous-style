import type { NextApiResponse, NextApiRequest } from 'next';
import { ContactFormFields, ContactSchema } from '@/types';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
        pass: process.env.NEXT_PUBLIC_PASSWORD
    }
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, phone, message, product }: ContactFormFields = req.body;

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method not allowed');
    }

    const validation = ContactSchema.safeParse({ name, phone, message });

    if (!validation.success) {
        return res.status(400).end(validation.error.message);
    }

    const email = await transporter.sendMail({
        to: 'kfirfitousi@gmail.com',
        from: 'kfirfitousi@gmail.com',
        subject: 'פנייה חדשה התקבלה באתר לקנות בסטייל',
        text: `שם: ${name}
            מס׳ טלפון: ${phone}
            מוצר: ${product?.title}
            הודעה: ${message || '-'}`,
        html: `<p>שם: ${name}
            מס׳ טלפון: ${phone}
            מוצר: ${product?.title}</p>
            <p>${message?.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>`
    });

    if (!email) {
        return res.status(500).end('Email not sent');
    }

    return res.status(200).end();
};

export default handler;
