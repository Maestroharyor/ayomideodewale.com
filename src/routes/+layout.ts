/**
 * Every route is prerendered unless it opts out.
 *
 * The content is static TypeScript in src/data, so serving it from a serverless
 * function was paying a cold start to render the same HTML every time. It also
 * matters for correctness, not just speed: the crawlers that build link previews
 * and AI answers — X's card crawler among them — do not execute JavaScript, so a
 * page whose markup only exists after hydration has no tags for them to read.
 *
 * Opted out explicitly: /api/contact (POST) and /r/[variant] (dev-only PDF
 * render targets), each in its own file.
 */
export const prerender = true;
