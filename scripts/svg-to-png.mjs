#!/usr/bin/env node
/**
 * Convert SVG preview files to 1280x720 PNG using sharp.
 * Usage: node scripts/svg-to-png.mjs [extension-path...]
 * If no paths given, converts all extensions missing preview.png
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.log('sharp not installed. Installing...');
  const { execSync } = await import('child_process');
  execSync('npm install sharp --no-save', { cwd: join(__dirname, '..'), stdio: 'inherit' });
  sharp = require('sharp');
}

const WIDTH = 1280;
const HEIGHT = 720;

async function convertSvgToPng(svgPath, pngPath) {
  const svgBuffer = readFileSync(svgPath);
  await sharp(svgBuffer, { density: 300 })
    .resize(WIDTH, HEIGHT, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(pngPath);
  console.log(`  ✓ ${pngPath}`);
}

// Find all extensions with preview.svg but no preview.png, or use args
const extensionsDir = join(__dirname, '..', 'extensions');
const args = process.argv.slice(2);

if (args.length > 0) {
  for (const extPath of args) {
    const svgPath = join(extPath, 'preview.svg');
    const pngPath = join(extPath, 'preview.png');
    if (existsSync(svgPath)) {
      await convertSvgToPng(svgPath, pngPath);
    } else {
      console.log(`  ✗ No preview.svg in ${extPath}`);
    }
  }
} else {
  // Scan all extensions
  const { readdirSync } = await import('fs');
  const types = readdirSync(extensionsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  for (const type of types) {
    const typeDir = join(extensionsDir, type);
    const exts = readdirSync(typeDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
    
    for (const ext of exts) {
      const extDir = join(typeDir, ext);
      const svgPath = join(extDir, 'preview.svg');
      const pngPath = join(extDir, 'preview.png');
      if (existsSync(svgPath) && !existsSync(pngPath)) {
        await convertSvgToPng(svgPath, pngPath);
      }
    }
  }
}

console.log('Done.');
