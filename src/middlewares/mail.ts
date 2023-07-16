import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

interface EmailMessage {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

interface NodeMailerEmail {
	from: string;
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

const sendEmail = async ({ to, subject, text, html }: EmailMessage) => {
	/* Create nodemailer transporter using environment variables. */
	const { EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env;

	if (!EMAIL_ADDRESS || !EMAIL_PASSWORD || !EMAIL_HOST || !EMAIL_PORT) {
		throw new Error('Missing environment variables');
	}

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST!,
		port: Number(process.env.EMAIL_PORT!),
		secure: true,
		auth: {
			user: process.env.EMAIL_ADDRESS!,
			pass: process.env.EMAIL_PASSWORD!
		}
	});

	// console.log({ user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD });

	/* Send the email */

	const message: NodeMailerEmail = {
		from: `"${process.env.EMAIL_NAME} 🇧" <${process.env.EMAIL_ADDRESS}>`,
		to,
		subject
	};

	if (html) {
		message.html = html;
	}

	if (text) {
		message.text = text;
	}

	try {
		const info = await transporter.sendMail(message);
		console.log('Message sent successfully!');
		console.log({ info });
		console.log(nodemailer.getTestMessageUrl(info));

		console.log('Message sent: %s', info.messageId);

		// only needed when using pooled connections
		transporter.close();

		return { message: 'successfull', info };
	} catch (error: any) {
		console.log('Error occurred');
		console.log(error.message);

		// only needed when using pooled connections
		transporter.close();

		return { message: 'failed', error };
	}
};

export { sendEmail };
