"""
Maakt de responsive WebP-versies van alle foto's, zoals Astro's <Image> dat
eerder bij de build deed. Draai opnieuw als er een foto bijkomt of wijzigt:

    npm run images

Uitvoer: src/assets/gen/<naam>-<breedte>.webp plus manifest.json met de
breedtes en de echte afmetingen (voor width/height, tegen verspringen).
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src' / 'assets'
OUT = SRC / 'gen'
OUT.mkdir(exist_ok=True)

TRADES = ['bakker', 'kapper', 'restaurant', 'bouw', 'praktijk', 'sport']
JOBS = {}
for t in TRADES:
    JOBS[f'{t}-na'] = (SRC / 'trades' / f'{t}-na.jpg', [480, 960])
    JOBS[f'{t}-voor'] = (SRC / 'trades' / f'{t}-voor.jpg', [320, 560])
JOBS['scott'] = (SRC / 'img' / 'scott.webp', [400, 640, 800])
JOBS['modernpitching-desktop'] = (SRC / 'proof' / 'modernpitching-desktop.webp', [560, 840, 1120])
JOBS['modernpitching-phone'] = (SRC / 'proof' / 'modernpitching-phone.webp', [160, 240, 320])

manifest = {}
for name, (path, widths) in JOBS.items():
    im = Image.open(path).convert('RGB')
    w, h = im.size
    made = []
    for target in widths:
        if target > w:
            continue
        out = im if target == w else im.resize((target, round(h * target / w)), Image.LANCZOS)
        out.save(OUT / f'{name}-{target}.webp', quality=80, method=6)
        made.append(target)
    manifest[name] = {'widths': made, 'width': w, 'height': h}

(OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'{len(manifest)} beelden, {sum(len(m["widths"]) for m in manifest.values())} bestanden')
