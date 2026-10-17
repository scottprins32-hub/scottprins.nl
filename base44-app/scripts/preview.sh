#!/usr/bin/env bash
# Preview van de Base44-versie op GitHub Pages: bouwt met PREVIEW=1 (onder
# /scottprins.nl/, zonder Base44-plugin) en zet alleen de bestanden op de
# tak gh-pages. Het formulier valt daar terug op WhatsApp of mail.
set -euo pipefail
cd "$(dirname "$0")/.."

PREVIEW=1 npm run build

SRC=$(git rev-parse --short HEAD)
DIRTY=$(git status --porcelain -- . | grep -q . && echo ' + niet-gecommitte wijzigingen' || true)
REMOTE=$(git remote get-url origin)

cd dist
# Vercel bouwt anders elke tak als preview; deze niet.
printf '{\n  "git": { "deploymentEnabled": false }\n}\n' > vercel.json
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name || echo preview)" \
    -c user.email="$(git -C .. config user.email || echo preview@localhost)" \
    commit -q -m "Preview (Base44-versie) van ${SRC}${DIRTY}"
for wait in 2 4 8 16 0; do
  if git push -q -f "$REMOTE" gh-pages; then break; fi
  [ "$wait" = 0 ] && exit 1
  sleep "$wait"
done
rm -rf .git
echo "Preview staat op gh-pages (Base44-versie, bron ${SRC}${DIRTY})."
