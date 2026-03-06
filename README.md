# LumaSweep
<img width="1096" height="603" alt="LumaSweep app screenshot" src="https://github.com/user-attachments/assets/69808e67-2aec-4b69-af31-7f5ad3d1d1ba" />

LumaSweep is a macOS utility app built with Electron to monitor system health and clean common junk safely from one interface.

## Features

- Pulse Hub: One-click health scan across system modules.
- System Deck: Live RAM, CPU, disk, and battery stats.
- Memory Refresh: Memory breakdown with safe `purge` flow.
- Storage Sweep: Scan and clean cache/log/trash categories.
- App Manager: Remove apps and common leftovers.
- Launch Control: Inspect and control startup items.
- Shield Center: Startup hardening plus privacy trace cleanup.
- Clutter Finder / Space Atlas / Cloud Trim modules.
- Menu bar quick actions and RAM cleanup shortcut.

## Requirements

- macOS 11+
- Node.js 18+
- npm 9+

## Install from DMG

1. Download the correct DMG for your Mac from Releases.
2. Open the DMG.
3. Drag `LumaSweep` into `Applications`.
4. On first launch, allow it in `System Settings -> Privacy & Security` if prompted.

## Local Development

```bash
npm install
npm start
```

## Build Installers (.dmg)

```bash
npm run dist
```

Artifacts are generated in `dist/`:

- `LumaSweep-<version>-arm64.dmg` (Apple Silicon)
- `LumaSweep-<version>.dmg` (Intel)

## GitHub Release Flow

```bash
git tag v1.2.0
git push origin v1.2.0
```

Then on GitHub:

1. Open `Releases` and click `Draft a new release`.
2. Select tag `v1.2.0`.
3. Upload both DMGs from `dist/`.
4. Publish.

## Publish With Transparency (Code + Installers)

Recommended approach:

1. Keep source code in the Git repo.
2. Keep DMGs in GitHub Releases (not git history).

Why:

- DMGs are large binaries and quickly bloat repository history.
- GitHub Releases are built for installer distribution.

### Step-by-step

```bash
# 1) Commit code
git add .
git commit -m "Release v1.2.0"

# 2) Push code
git push origin main

# 3) Tag and push tag
git tag v1.2.0
git push origin v1.2.0
```

Then upload:

- `dist/LumaSweep-1.2.0-arm64.dmg`
- `dist/LumaSweep-1.2.0.dmg`

### If you must store DMGs in git

Use Git LFS:

```bash
git lfs install
git lfs track "*.dmg"
git add .gitattributes dist/*.dmg
git commit -m "Track DMGs with Git LFS"
git push origin main
```

## Security and Permissions

Some actions use native macOS commands and may prompt for admin credentials (for example RAM purge and some startup-item operations).

## Project Structure

```text
mac-cleaner-app/
├── main.js
├── preload.js
├── renderer/
│   └── index.html
├── assets/
│   └── icon.icns
├── entitlements.mac.plist
└── package.json
```

## Troubleshooting

- App blocked by macOS: allow in `Privacy & Security` and relaunch.
- Browser history cleanup fails: close Safari/Chrome first.
- Unsigned build warnings are expected for local builds; configure Developer ID for public distribution.

## License

MIT. See `LICENSE`.
