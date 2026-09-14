import {
	Body,
	Column,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text
} from '@react-email/components';
import * as React from 'react';
import { colors, SITE_NAME, SITE_URL, socialIconFile, socialMenu, TOKEN } from './brand.js';

type Props = {
	/** Inbox-preview line. The old template had none, so clients showed raw markup. */
	preview: string;
	heading: string;
	children: React.ReactNode;
};

/**
 * The shell every email shares.
 *
 * react-email's primitives render table-based HTML with the mso conditionals and
 * presentation roles that Outlook needs. The template this replaces used
 * `display:flex`, `gap` and `rem` units, none of which Outlook supports, so its
 * social row collapsed and its type sized unpredictably.
 */
export function Layout({ preview, heading, children }: Props) {
	return (
		<Html lang="en">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="color-scheme" content="light" />
			</Head>
			<Preview>{preview}</Preview>
			<Body
				style={{
					margin: 0,
					padding: '24px 0',
					backgroundColor: colors.page,
					fontFamily:
						"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
				}}
			>
				<Container
					style={{
						width: '100%',
						maxWidth: '600px',
						margin: '0 auto',
						backgroundColor: colors.card,
						borderRadius: '10px',
						overflow: 'hidden'
					}}
				>
					<Section style={{ backgroundColor: colors.primary, padding: '28px 32px' }}>
						<Text
							style={{
								margin: 0,
								color: '#ffffff',
								fontSize: '22px',
								lineHeight: '30px',
								fontWeight: 700
							}}
						>
							{heading}
						</Text>
					</Section>

					<Section style={{ padding: '28px 32px 8px' }}>{children}</Section>

					<Hr style={{ margin: '24px 32px 0', borderColor: colors.line }} />

					<Section style={{ padding: '20px 32px 28px' }}>
						<Row>
							{socialMenu.map((social) => (
								<Column key={social.link} align="left" style={{ width: '38px' }}>
									<Link href={social.link} title={social.title}>
										<Img
											src={`${TOKEN.origin}/email/${socialIconFile[social.title]}`}
											width="24"
											height="24"
											alt={social.title}
											style={{ display: 'block', border: 0 }}
										/>
									</Link>
								</Column>
							))}
						</Row>

						<Text style={{ margin: '18px 0 0', fontSize: '13px', color: colors.muted }}>
							{SITE_NAME} ·{' '}
							<Link href={SITE_URL} style={{ color: colors.accent }}>
								ayomideodewale.com
							</Link>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}
