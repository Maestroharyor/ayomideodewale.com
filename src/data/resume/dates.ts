import type { YearMonth } from '../../types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Formats by splitting the string, not via `new Date(ym)`. Date parses a bare
 * 'YYYY-MM' as UTC midnight, so `new Date('2026-01')` renders as December 2025
 * anywhere west of Greenwich — which would make SSR and the browser disagree
 * and put a wrong start date on the resume.
 */
export function formatMonth(ym: YearMonth): string {
	const [year, month] = ym.split('-');
	return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** 'Oct 2023 – Apr 2026', or 'Jan 2026 – Present' for an open-ended role. */
export function formatPeriod(start: YearMonth, end: YearMonth | null): string {
	return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}

/** Year granularity for the website cards: '2022 - 2023', or just '2022'. */
export function formatYearRange(start: YearMonth, end: YearMonth | null): string {
	const from = start.slice(0, 4);
	const to = end ? end.slice(0, 4) : 'PRESENT';
	return from === to ? from : `${from} - ${to}`;
}
