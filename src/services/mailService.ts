import FormData from "form-data";
import Mailgun from "mailgun.js";
import dotenv from 'dotenv';

dotenv.config();

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY! });

const sendPasswordResetEmail = async (to: string, token: string) => {
    const text = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n 
    Please click on the following link, or paste this into your browser to complete the process:\n\n 
    ${process.env.CLIENT_URL}/reset-password/${token}\n\n 
    If you did not request this, please ignore this email and your password will remain unchanged.\n`;

    try {
        const response = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
            from: process.env.MAILGUN_FROM_EMAIL!,
            to: to,
            subject: 'Password Reset',
            text: text
        });

        return { message: 'Password reset email sent successfully', response };
    } catch (error: any) {
        console.error('Error sending password reset email:', error);
        throw new Error(`Error sending password reset email: ${error.message}`);
    }
};

const sendRegisterSuccessfulEmail = async (to: string) => {
    try {
        const response = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
            from: process.env.MAILGUN_FROM_EMAIL!,
            to: to,
            subject: 'Register Successful',
            text: 'You have successfully registered your account.'
        });

        return { message: 'Register email sent successfully', response };
    } catch (error: any) {
        console.error('Error sending register email:', error);
        throw new Error(`Error sending register email: ${error.message}`);
    }
};

const sendOrderConfirmationEmail = async (to: string, order: any) => {
    try {
        const response = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
            from: process.env.MAILGUN_FROM_EMAIL!,
            to: to,
            subject: 'Order Confirmation',
            text: `Your order has been confirmed. Order ID: ${order._id}`
        });

        return { message: 'Order confirmation email sent successfully', response };
    } catch (error: any) {
        console.error('Error sending order confirmation email:', error);
        throw new Error(`Error sending order confirmation email: ${error.message}`);
    }
};

const sendOrderShippedEmail = async (to: string, order: any) => {
    try {
        const response = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
            from: process.env.MAILGUN_FROM_EMAIL!,
            to: to,
            subject: 'Order Shipped',
            text: `Your order has been shipped. Order ID: ${order._id}`
        });

        return { message: 'Order shipped email sent successfully', response };
    } catch (error: any) {
        console.error('Error sending order shipped email:', error);
        throw new Error(`Error sending order shipped email: ${error.message}`);
    }
};

export {
    sendPasswordResetEmail,
    sendRegisterSuccessfulEmail,
    sendOrderConfirmationEmail,
    sendOrderShippedEmail
};
