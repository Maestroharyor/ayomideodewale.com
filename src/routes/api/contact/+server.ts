import { error } from '@sveltejs/kit';
import { sendEmail } from '../../../middlewares/mail.js';
import { confirmHTMLResponse, toJSONString } from '../../../utils/index.js';
import type { ContactErrorResponse } from '../../../types/index.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ url, request }) {
	const body = await request.json();
	console.log(body);
	const { name, email, message } = body;

	// Validate the input fields
	if (!name || !email || !message) {
		const error: ContactErrorResponse = {};
		if (!name) error.name = 'Name is required';
		if (!email) error.email = 'Email is required';
		if (!message) error.message = 'Message is required';

		return new Response(
			toJSONString({
				success: false,
				message: 'All fields are required',
				error
			}),
			{
				status: 400,
				statusText: 'Bad Request Sent '
			}
		);
	}

	try {
		const [email1, email2, email3] = await Promise.all([
			sendEmail({
				to: email,
				subject: 'Thanks for getting in touch',
				html: confirmHTMLResponse(name)
			}),
			sendEmail({
				to: process.env.EMAIL_ADDRESS!,
				subject: 'New Email Received',
				text: `You have received a new email from ${name} (${email}).\n\nMessage:\n${message}`
			}),
			sendEmail({
				to: 'ayomide.odewale1@gmail.com',
				subject: 'New Email Received',
				text: `You have received a new email from ${name} (${email}).\n\nMessage:\n${message}`
			})
		]);

		console.log('email1', email1);
		console.log('email2', email2);
		console.log('email3', email3);

		// Return success response
		return new Response(
			toJSONString({
				success: true,
				message: 'Message sent successfully'
			})
		);
	} catch (error) {
		console.log('Error sending email:', error);
		return new Response(
			toJSONString({
				success: false,
				message: 'Error sending email',
				error
			}),
			{
				status: 400
			}
		);
	}

	// const body = await request.json();
	// console.log(body);
	// const min = Number(url.searchParams.get('min') ?? '0');
	// const max = Number(url.searchParams.get('max') ?? '1');

	// const d = max - min;

	// if (isNaN(d) || d < 0) {
	// 	throw error(400, 'min and max must be numbers, and min must be less than max');
	// }

	// const random = min + Math.random() * d;

	// return new Response(String(random));
}
