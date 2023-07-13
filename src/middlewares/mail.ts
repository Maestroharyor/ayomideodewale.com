import nodemailer from 'nodemailer';

interface EmailMessage {
	to: string;
	subject: string;
	text: string;
}

const sendEmail = async ({ to, subject, text }: EmailMessage) => {
	/* Create nodemailer transporter using environment variables. */
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
	const message = {
		from: `"${process.env.EMAIL_NAME} 🇧" <${process.env.EMAIL_ADDRESS}>`,
		to,
		subject,
		text
	};

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
