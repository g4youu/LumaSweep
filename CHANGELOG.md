# Changelog

All notable changes to this project are documented in this file.

## [1.4.1] - 2026-04-19

- Reworked the app UI to a cleaner utility-style layout with a calmer dark palette, flatter panels, and more conventional navigation.
- Simplified the overview, storage, protection, and space-management surfaces to reduce decorative dashboard patterns and improve scan readability.
- Changed RAM cleanup so `Free Inactive RAM` no longer opens a password prompt directly.
- Added explicit `Unlock RAM Cleanup` actions in the app and tray menu for one-time authorization when users want it.
- Added a visible top-bar `Quit` action and kept tray quit controls available.
- Fixed `Recent Files` cleanup so it no longer removes login items.
- Sorted startup items more usefully and improved Finder reveal error handling.

## [1.3.0] - 2026-03-05

- Rebranded the app to `LumaSweep` across UI, tray, prompts, and packaging metadata.
- Added new brand icon set and tray icon assets:
  - `assets/icon.icns`
  - `assets/trayTemplate.png`
  - source icon exports in `assets/icon-1024.png` and `assets/icon.iconset/`
- Updated product metadata for distribution:
  - `name`: `lumasweep`
  - `appId`: `com.lumasweep.app`
  - `productName`: `LumaSweep`
- Refreshed README and license branding/docs for LumaSweep release packaging.

## [1.2.0] - 2026-02-23

- Added CPU Monitor page with top CPU processes and Activity Monitor shortcut.
- Added macOS menu bar (tray) integration with quick RAM actions and status.
- Added adaptive refresh engine and user-selectable refresh profiles:
  - Real-time
  - Balanced
  - Power Saver
- Added safer RAM tooling:
  - Deep RAM Clean (safe mode with guarded app termination)
  - Improved RAM cleanup reporting with immediate vs stabilized results
  - Session-based admin caching flow to reduce repeated password prompts
- Improved window behavior and UX:
  - Fixed tray "Show LumaSweep" crash after sleep/wake
  - Added dedicated top drag strip and updated header styling
  - Moved refresh action to a less distracting location
- Rebranded app and feature labels:
  - App name: `LumaSweep`
  - Smart Care -> `Pulse Hub`
  - CPU Monitor -> `CPU Scope`
  - RAM Cleaner -> `Memory Refresh`
  - Disk Cleaner -> `Storage Sweep`
  - Startup Items -> `Launch Control`
  - Privacy Cleaner -> `Shield Center`
  - My Clutter -> `Clutter Finder`
  - Cloud Cleanup -> `Cloud Trim`
  - Space Lens -> `Space Atlas`
- Updated packaging and release metadata to `v1.2.0`.

## [1.0.0] - 2026-02-23

- Initial public release of the app.
- Added System Overview, RAM Cleaner, Disk Cleaner, Uninstaller, Startup Items, and Privacy Cleaner.
- Fixed renderer crash caused by duplicate `api` declaration.
- Added packaging icon asset and generated macOS DMG outputs for arm64 and x64.
- Improved production behavior by limiting DevTools auto-open to development mode.
- Added loader error handling for disk/apps/startup views.
