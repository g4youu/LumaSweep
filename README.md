# LumaSweep

<img width="1717" height="1059" alt="image" src="https://github.com/user-attachments/assets/9abd5756-ef34-4f91-9ccb-78832ed20b8f" />


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

## Local Packaging

Unsigned test bundle for local QA:

```bash
npm run build
```

Unsigned DMGs for local-only testing:

```bash
npm run dist:unsigned
```

These unsigned artifacts are useful for local checks, but they are not suitable for public GitHub releases.

## Public Release Installers (.dmg)

Public release builds now require valid Apple signing and notarization credentials. The release build will stop immediately if those credentials are missing so broken installers do not get published by accident.

Required secrets for GitHub Actions:

- `CSC_LINK`
- `CSC_KEY_PASSWORD`
- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `APPLE_TEAM_ID`

Optional alternative notarization secrets:

- `APPLE_API_KEY`
- `APPLE_API_KEY_ID`
- `APPLE_API_ISSUER`

To publish a release:

```bash
git tag v1.4.2
git push origin v1.4.2
```

The GitHub Actions workflow in [.github/workflows/release-macos.yml](/Users/gorenuga/Nextcloud/My%20Apps/mac-cleaner-app/.github/workflows/release-macos.yml) will build both signed DMGs, verify them, generate a checksum file, and attach them to the GitHub release automatically.

Public artifacts are generated in `dist/` with explicit arch names:

- `LumaSweep-<version>-arm64.dmg` (Apple Silicon)
- `LumaSweep-<version>-x64.dmg` (Intel)
- `LumaSweep-<version>-SHA256.txt`

## GitHub Release Flow

Releases should now be created from signed CI output instead of manual local uploads. That avoids the unsigned or malformed DMGs that macOS reports as damaged after download.

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
git commit -m "Release v1.3.0"

# 2) Push code
git push origin main

# 3) Tag and push tag
git tag v1.3.0
git push origin v1.3.0
```

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
- Public release builds fail unless signing and notarization credentials are configured.
- Unsigned local builds may still require a manual override in `Privacy & Security`.

## License

MIT. See `LICENSE`.
