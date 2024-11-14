'use strict';
import nodemailer from 'nodemailer';

interface MailOptions {
    email: string;
    subject: string;
    message: string;
}

async function sendMail(options: MailOptions): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'test.hmmmzadev@gmail.com',
            pass: 'bsyr mcoe atrj lmqc'
        }
    });

    // mail options
    const mailOptions = {
        from: 'Mosouq <support@mosouq.ae>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.message,
    };

    // sending the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully');
    } catch (err) {
        console.error('Mail not sent successfully');
        console.error(err);
    }
};

export default sendMail;
