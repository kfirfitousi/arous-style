import type { NextApiResponse, NextApiRequest } from 'next';
import { ContactFormFields, ContactResponse, ContactSchema } from '@/types';

import { transporter } from '@/lib/nodemailer';
import { contactEmailConfig } from '@/config';

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
        from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
        to: contactEmailConfig.recipient,
        subject: contactEmailConfig.subject,
        html: contactEmailConfig.body({ name, phone, message, productName })
    });

    if (!email) {
        return res.status(500).json({ message: 'Email not sent' });
    }

    return res.status(200).json({ message: 'Email sent' });
};

export default handler;
