import type { NextApiResponse, NextApiRequest } from 'next';
import type { ContactResponse } from '@/types';

import { transporter } from '@/lib/nodemailer';
import { ContactSchema } from '~/ContactForm';
import { contactEmailConfig } from '@/config';

const handler = async (req: NextApiRequest, res: NextApiResponse<ContactResponse>) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: 'Method not allowed' });
    }

    /** validating the request body with zod */
    const request = ContactSchema.safeParse(req.body);

    if (!request.success) {
        return res.status(400).json({
            message: request.error.issues
                .map((issue) => `${issue.path} - ${issue.message}.`)
                .join(' ')
        });
    }

    const { recipient, subject, body } = contactEmailConfig;

    try {
        await transporter.sendMail({
            to: recipient,
            subject,
            html: body(request.data)
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error occured. Email could not be sent'
        });
    }

    return res.status(200).json({
        message: 'Email sent successfully'
    });
};

export default handler;
