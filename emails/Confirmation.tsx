import { Link, Text } from '@react-email/components';
import * as React from 'react';
import { Layout } from './Layout.js';
import { colors, SITE_URL, TOKEN } from './brand.js';

const paragraph = {
	margin: '0 0 16px',
	fontSize: '16px',
	lineHeight: '26px',
	color: colors.ink
} as const;

/**
 * Sent to whoever used the contact form.
 *
 * The copy this replaces assumed every message was a freelance project brief:
 * it asked for "technologies you have in mind" and a "desired timeline", then
 * proposed discussing "pricing" and "value for your investment". Most messages
 * now come from recruiters, and that email answered a question they had not
 * asked. It also recited a stack including MySQL, which appears on no other
 * surface.
 *
 * This version does one job: confirm the message arrived, say what happens next,
 * and get out of the way.
 */
export function Confirmation() {
	return (
		<Layout
			preview="Your message reached me. I usually reply within a day or two."
			heading="Thanks for getting in touch"
		>
			<Text style={paragraph}>Hi {TOKEN.name},</Text>

			<Text style={paragraph}>
				Your message reached me. I read everything that comes through the site myself, and I usually
				reply within a day or two.
			</Text>

			<Text style={paragraph}>
				If it is about a role, it helps to know the team, the stack and whether it is remote. If it
				is about building something, tell me what the thing needs to do and who it is for. Either
				way, no rush, and no need to send anything else in the meantime.
			</Text>

			<Text style={paragraph}>
				While you wait, my{' '}
				<Link href={`${SITE_URL}/projects`} style={{ color: colors.accent }}>
					project write-ups
				</Link>{' '}
				go into how things were actually built, and my{' '}
				<Link href={`${SITE_URL}/resume`} style={{ color: colors.accent }}>
					resume
				</Link>{' '}
				is the short version.
			</Text>

			<Text style={{ ...paragraph, marginBottom: '4px' }}>Speak soon,</Text>
			<Text style={{ ...paragraph, fontWeight: 700 }}>Ayomide</Text>
		</Layout>
	);
}

export default Confirmation;
