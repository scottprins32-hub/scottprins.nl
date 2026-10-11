#!/usr/bin/env bash
# Statische preview voor GitHub Pages, onder /scottprins.nl/.
# Zonder adapter en zonder /api/lead: die map gaat tijdens de build even
# opzij (Astro kan een server-route niet statisch bouwen) en komt altijd
# terug, ook als de build faalt.
set -euo pipefail
cd "$(dirname "$0")/.."

API=src/pages/api
PARK=.preview-api-parked
if [ -d "$API" ]; then
  mv "$API" "$PARK"
  trap 'mv "$PARK" "$API"' EXIT
fi

PREVIEW=1 npx astro build --outDir dist-preview
touch dist-preview/.nojekyll
echo "Preview klaar in dist-preview/ (test onder /scottprins.nl/)."
