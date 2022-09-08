import nodemailer from 'nodemailer';

/**
 * Create a nodemailer transporter for sending emails
 * Set these environment variables in .env.local
 * See README.md for more info
 */
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
        pass: process.env.NEXT_PUBLIC_PASSWORD
    }
});
