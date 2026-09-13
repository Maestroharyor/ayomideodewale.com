import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '$env/dynamic/private';

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

let transporter: Transporter | null = null;

/**
 * One pooled transporter for the process rather than a fresh connection per
 * message: a single contact submission sends three emails, which previously meant
 * three separate SMTP handshakes.
 *
 * Built lazily so a missing env var surfaces as a request-time error rather than
 * an import-time crash that would take the whole server down.
 */
function getTransporter(): Transporter {
	const { EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT, EMAIL_NAME } = env;

	// EMAIL_NAME belongs in this guard: it is interpolated into the From header
	// below, so a missing value used to ship a literal "undefined" to recipients.
	if (!EMAIL_ADDRESS || !EMAIL_PASSWORD || !EMAIL_HOST || !EMAIL_PORT || !EMAIL_NAME) {
		throw new Error('Missing environment variables');
	}

	// Truthiness is not enough: Number('abc') is NaN, which would build a transporter
	// that only fails later, at send time, with a confusing connection error.
	const port = Number(EMAIL_PORT);
	if (!Number.isInteger(port) || port <= 0 || port > 65535) {
		throw new Error(`EMAIL_PORT must be a port number, received "${EMAIL_PORT}"`);
	}

	if (!transporter) {
		transporter = nodemailer.createTransport({
			host: EMAIL_HOST,
			port,
			// 465 is implicit TLS; 587 and 25 negotiate with STARTTLS. Hardcoding
			// `true` silently fails to connect on anything but 465.
			secure: port === 465,
			pool: true,
			maxConnections: 3,
			auth: {
				user: EMAIL_ADDRESS,
				pass: EMAIL_PASSWORD
			}
		});
	}

	return transporter;
}

const sendEmail = async ({ to, subject, text, html }: EmailMessage) => {
	const mailer = getTransporter();

	const message: NodeMailerEmail = {
		from: `"${env.EMAIL_NAME} 🇧" <${env.EMAIL_ADDRESS}>`,
		to,
		subject
	};

	if (html) {
		message.html = html;
	}

	if (text) {
		message.text = text;
	}

	const info = await mailer.sendMail(message);

	return { message: 'successful' as const, info };
};

export { sendEmail };
