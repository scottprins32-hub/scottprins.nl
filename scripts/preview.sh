#!/usr/bin/env bash
# Preview-spoor: bouwt de statische preview en zet alleen de kant-en-klare
# bestanden op de branch gh-pages. GitHub Pages serveert die onder
# https://scottprins32-hub.github.io/scottprins.nl/ zonder eigen build, dus
# push en live zit binnen een minuut. Vercel (productie) blijft hierbuiten.
set -euo pipefail
cd "$(dirname "$0")/.."

bash scripts/preview-build.sh

SRC=$(git rev-parse --short HEAD)
DIRTY=$(git status --porcelain | grep -q . && echo ' + niet-gecommitte wijzigingen' || true)
REMOTE=$(git remote get-url origin)

cd dist-preview
# Vercel bouwt anders elke branch als preview; deze niet.
printf '{\n  "git": { "deploymentEnabled": false }\n}\n' > vercel.json
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name || echo preview)" \
    -c user.email="$(git -C .. config user.email || echo preview@localhost)" \
    commit -q -m "Preview van ${SRC}${DIRTY}"
for wait in 2 4 8 16 0; do
  if git push -q -f "$REMOTE" gh-pages; then break; fi
  [ "$wait" = 0 ] && exit 1
  sleep "$wait"
done
rm -rf .git
echo "Preview staat op gh-pages (bron ${SRC}${DIRTY})."
