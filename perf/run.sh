#!/usr/bin/env bash
# Draait Lighthouse 3× en rapporteert de MEDIAAN van LCP/TBT/score.
# Eén meting zegt niets: Lighthouse varieert flink met CPU-belasting.
# Gebruik: perf/run.sh <label> [url]
set -u
LABEL="${1:-run}"
URL="${2:-http://localhost:4600/}"
DIR="$(cd "$(dirname "$0")" && pwd)"

for i in 1 2 3; do
  CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  npx --yes lighthouse "$URL" \
    --output=json --output-path="$DIR/${LABEL}-$i.json" \
    --only-categories=performance \
    --chrome-flags="--headless=new --no-sandbox" \
    --quiet > /dev/null 2>&1
done

node -e '
const fs = require("fs");
const [dir, label] = process.argv.slice(1);
const pick = (r, id) => r.audits[id]?.numericValue ?? NaN;
const runs = [1, 2, 3].map((i) => JSON.parse(fs.readFileSync(`${dir}/${label}-${i}.json`, "utf8")));
const med = (xs) => [...xs].sort((a, b) => a - b)[1];
const lcp = med(runs.map((r) => pick(r, "largest-contentful-paint")));
const fcp = med(runs.map((r) => pick(r, "first-contentful-paint")));
const tbt = med(runs.map((r) => pick(r, "total-blocking-time")));
const score = med(runs.map((r) => r.categories.performance.score * 100));
console.log(JSON.stringify({ label, lcp: +(lcp / 1000).toFixed(3), fcp: +(fcp / 1000).toFixed(3), tbt: Math.round(tbt), score: Math.round(score) }));
' "$DIR" "$LABEL"
