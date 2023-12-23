import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass, 
    },
});

export const emailoptions = {
    from:email,
    to:"gtgkartik@gmail.com" , 
}

