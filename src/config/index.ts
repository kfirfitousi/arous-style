import type { ContactEmailConfig } from '@/types';

/**
 * Options for the contact form email.
 * - recipient is the address that will receive the email
 * - subject is the subject of the email
 * - body is a function that returns the HTML body of the email
 */
export const contactEmailConfig: ContactEmailConfig = {
    recipient: 'kfirfitousi@gmail.com',
    subject: 'פנייה חדשה התקבלה באתר לקנות בסטייל',
    body: ({ name, phone, message, productName }) => `
        <div dir="rtl" style="font-size: 1.5rem">
            <p>שם: ${name}</p>
            <p>מס׳ טלפון: ${phone}</p>
            <p>מוצר: ${productName}</p>
            <p>הודעה: ${message?.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
        </div>
    `
};
