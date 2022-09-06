import type { NextApiResponse, NextApiRequest } from 'next';
import { ContactFormFields, ContactResponse, ContactSchema } from '@/types';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
        pass: process.env.NEXT_PUBLIC_PASSWORD
    }
});

const handler = async (req: NextApiRequest, res: NextApiResponse<ContactResponse>) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const formData: ContactFormFields = req.body;
    const validation = ContactSchema.safeParse(formData);

    if (!validation.success) {
        return res.status(400).json({
            message: validation.error.issues
                .map((issue) => `${issue.path} - ${issue.message}.`)
                .join(' ')
        });
    }

    const { name, phone, message, productName } = validation.data;

    const email = await transporter.sendMail({
        to: 'kfirfitousi@gmail.com',
        from: 'kfirfitousi@gmail.com',
        subject: 'פנייה חדשה התקבלה באתר לקנות בסטייל',
        text: `
            שם: ${name}
            מס׳ טלפון: ${phone}
            מוצר: ${productName || 'לא נבחר'}
            הודעה: ${message || '-'}
        `,
        html: `
            <p dir="rtl">
                שם: ${name}<br>
                מס׳ טלפון: ${phone}<br>
                מוצר: ${productName || 'לא נבחר'}<br>
                הודעה: ${message?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '-'}
            </p>
        `
    });

    if (!email) {
        return res.status(500).json({ message: 'Email not sent' });
    }

    return res.status(200).json({ message: 'Email sent' });
};

export default handler;
