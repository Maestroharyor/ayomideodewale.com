import { Link, Section, Text } from '@react-email/components';
import * as React from 'react';
import { Layout } from './Layout.js';
import { colors, TOKEN } from './brand.js';

const label = {
	margin: '0 0 4px',
	fontSize: '12px',
	lineHeight: '16px',
	fontWeight: 700,
	letterSpacing: '0.08em',
	textTransform: 'uppercase',
	color: colors.muted
} as const;

const value = {
	margin: '0 0 18px',
	fontSize: '16px',
	lineHeight: '24px',
	color: colors.ink
} as const;

/**
 * Sent to the owner's inbox when someone uses the form.
 *
 * This was plain text with everything on one line, which is hard to scan on a
 * phone and made the sender's address something you had to select by hand. The
 * endpoint also sets Reply-To to the sender, so replying goes straight to them.
 */
export function Notification() {
	return (
		<Layout preview={`New message from ${TOKEN.name}`} heading="New message from the site">
			<Text style={label}>From</Text>
			<Text style={value}>{TOKEN.name}</Text>

			<Text style={label}>Email</Text>
			<Text style={value}>
				<Link href={`mailto:${TOKEN.email}`} style={{ color: colors.accent }}>
					{TOKEN.email}
				</Link>
			</Text>

			<Text style={label}>Message</Text>
			<Section
				style={{
					padding: '16px 18px',
					marginBottom: '8px',
					backgroundColor: colors.page,
					borderLeft: `3px solid ${colors.primary}`,
					borderRadius: '6px'
				}}
			>
				<Text
					style={{
						margin: 0,
						fontSize: '16px',
						lineHeight: '26px',
						color: colors.ink
					}}
				>
					{TOKEN.message}
				</Text>
			</Section>

			<Text style={{ margin: '16px 0 0', fontSize: '13px', color: colors.muted }}>
				Reply to this email and it goes straight back to them.
			</Text>
		</Layout>
	);
}

export default Notification;
