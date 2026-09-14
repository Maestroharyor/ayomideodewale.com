/**
 * Validation rules shared by the contact form and the endpoint.
 *
 * These lived only in `ContactForm.svelte`, so the server accepted anything the
 * client happened not to send: a script posting `{"email":"x"}` passed, and the
 * address went straight to nodemailer's `to:`. Both sides import from here now,
 * so they cannot disagree again.
 */

export const NAME_MIN = 5;
export const MESSAGE_MIN = 10;

export const MAX_LENGTH = { name: 100, email: 254, message: 5000 } as const;

/**
 * Deliberately permissive. The only thing worth rejecting here is input that is
 * obviously not an address; anything stricter starts refusing valid, unusual
 * mailboxes, and the real proof of an address is whether the mail arrives.
 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The hidden field a bot fills in and a person never sees. */
export const HONEYPOT_FIELD = 'website';

/** Minimum time a genuine visitor needs to read the form and type into it. */
export const MIN_FILL_MS = 3000;

/** Beyond this the timestamp is stale enough to be a replayed or forged payload. */
export const MAX_FILL_MS = 24 * 60 * 60 * 1000;

export type ContactFields = { name: string; email: string; message: string };

/** Field-level errors, empty string where the field is fine. */
export function validateContact(fields: ContactFields) {
	const { name, email, message } = fields;

	return {
		name: !name
			? 'Name is required'
			: name.length < NAME_MIN
				? `Name requires at least ${NAME_MIN} characters.`
				: name.length > MAX_LENGTH.name
					? 'Name is too long'
					: '',
		email: !email
			? 'Email is required'
			: !EMAIL_RE.test(email)
				? 'Email is not valid'
				: email.length > MAX_LENGTH.email
					? 'Email is too long'
					: '',
		message: !message
			? 'Message is required'
			: message.length < MESSAGE_MIN
				? `Message requires at least ${MESSAGE_MIN} characters.`
				: message.length > MAX_LENGTH.message
					? 'Message is too long'
					: ''
	};
}

export function isContactValid(errors: Record<string, string>): boolean {
	return Object.values(errors).every((error) => error === '');
}
