#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } = require('node:fs');
const path = require('node:path');

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const packageJson = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const productName = packageJson.build.productName;
const version = packageJson.version;

const targets = [
  { arch: 'x64', appDir: 'mac', artifact: `${productName}-${version}-x64.dmg` },
  { arch: 'arm64', appDir: 'mac-arm64', artifact: `${productName}-${version}-arm64.dmg` },
];

function fail(message) {
  console.error(`\nRelease build blocked: ${message}\n`);
  process.exit(1);
}

function run(command, args, options = {}) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    cwd: rootDir,
    ...options,
  });

  if (result.error) {
    fail(result.error.message);
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function hasSigningCredentials() {
  if (process.env.CSC_NAME) {
    return true;
  }

  return Boolean(process.env.CSC_LINK && process.env.CSC_KEY_PASSWORD);
}

function hasNotarizationCredentials() {
  const appleIdFlow = process.env.APPLE_ID
    && process.env.APPLE_APP_SPECIFIC_PASSWORD
    && process.env.APPLE_TEAM_ID;

  const apiKeyFlow = process.env.APPLE_API_KEY
    && process.env.APPLE_API_KEY_ID
    && process.env.APPLE_API_ISSUER;

  return Boolean(appleIdFlow || apiKeyFlow || process.env.APPLE_KEYCHAIN_PROFILE);
}

function ensureReleaseCredentials() {
  if (!hasSigningCredentials()) {
    fail(
      'No macOS signing identity is configured. Set CSC_NAME for a local Developer ID certificate, or CSC_LINK plus CSC_KEY_PASSWORD for a certificate archive.'
    );
  }

  if (!hasNotarizationCredentials()) {
    fail(
      'No notarization credentials are configured. Set APPLE_ID plus APPLE_APP_SPECIFIC_PASSWORD plus APPLE_TEAM_ID, or APPLE_API_KEY plus APPLE_API_KEY_ID plus APPLE_API_ISSUER.'
    );
  }
}

function cleanPreviousArtifacts() {
  mkdirSync(distDir, { recursive: true });

  for (const target of targets) {
    const artifactPath = path.join(distDir, target.artifact);
    const blockmapPath = `${artifactPath}.blockmap`;

    if (existsSync(artifactPath)) {
      rmSync(artifactPath);
    }

    if (existsSync(blockmapPath)) {
      rmSync(blockmapPath);
    }
  }

  const checksumPath = path.join(distDir, `${productName}-${version}-SHA256.txt`);
  if (existsSync(checksumPath)) {
    rmSync(checksumPath);
  }
}

function verifyBundle(target) {
  const appPath = path.join(distDir, target.appDir, `${productName}.app`);

  if (!existsSync(appPath)) {
    fail(`Expected app bundle missing: ${appPath}`);
  }

  run('codesign', ['--verify', '--deep', '--strict', '--verbose=2', appPath]);
  run('spctl', ['-a', '-vv', appPath]);
}

function verifyArtifact(target) {
  const artifactPath = path.join(distDir, target.artifact);

  if (!existsSync(artifactPath)) {
    fail(`Expected installer missing: ${artifactPath}`);
  }

  run('xcrun', ['stapler', 'validate', artifactPath]);
}

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

function writeChecksums() {
  const checksumPath = path.join(distDir, `${productName}-${version}-SHA256.txt`);
  const lines = targets.map((target) => {
    const artifactPath = path.join(distDir, target.artifact);
    return `${sha256(artifactPath)}  ${target.artifact}`;
  });

  writeFileSync(checksumPath, `${lines.join('\n')}\n`, 'utf8');
  console.log(`\nWrote ${path.relative(rootDir, checksumPath)}`);
}

ensureReleaseCredentials();
cleanPreviousArtifacts();

for (const target of targets) {
  run('npx', ['electron-builder', '--mac', 'dmg', `--${target.arch}`, '-c.forceCodeSigning=true']);
  verifyBundle(target);
  verifyArtifact(target);
}

writeChecksums();
