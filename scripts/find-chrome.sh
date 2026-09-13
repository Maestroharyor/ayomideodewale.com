#!/usr/bin/env bash
# Print a path to a headless-capable Chrome binary, or exit 1.
#
# chrome-headless-shell is preferred and tried first: the full
# /Applications/Google Chrome.app hands the URL to an already-running instance
# and then hangs forever instead of honouring --screenshot / --print-to-pdf.
# The shell build is a separate binary with no such app lifecycle, and it is
# already on disk under ~/.cache/puppeteer, so this needs no new dependency.
set -euo pipefail

if [[ -n ${CHROME_PATH:-} && -x ${CHROME_PATH:-} ]]; then
	echo "$CHROME_PATH"; exit 0
fi

# Newest cached chrome-headless-shell first (version sort).
shell_bin=$(find "$HOME/.cache/puppeteer/chrome-headless-shell" -name chrome-headless-shell -type f 2>/dev/null \
	| sort -V | tail -1)
if [[ -n $shell_bin && -x $shell_bin ]]; then
	echo "$shell_bin"; exit 0
fi

testing_bin=$(find "$HOME/.cache/puppeteer/chrome" -name "Google Chrome for Testing" -type f 2>/dev/null \
	| sort -V | tail -1)
if [[ -n $testing_bin && -x $testing_bin ]]; then
	echo "$testing_bin"; exit 0
fi

for c in /usr/bin/google-chrome /usr/bin/chromium /usr/bin/chromium-browser; do
	[[ -x $c ]] && { echo "$c"; exit 0; }
done

cat >&2 <<'MSG'
No headless-capable Chrome found.

Install one with:
  npx --yes @puppeteer/browsers install chrome-headless-shell@stable

Or set CHROME_PATH to a binary yourself. Note that
/Applications/Google Chrome.app is NOT a working choice: it delegates to the
running Chrome instance and hangs instead of writing output.
MSG
exit 1
