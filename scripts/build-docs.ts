import { spawnSync } from 'child_process';
import { resolve } from 'path';
import { rmSync, existsSync } from 'fs';

const docsApiDir = resolve(__dirname, '../docs/api');

console.log('Cleaning output directory:', docsApiDir);
if (existsSync(docsApiDir)) {
  try {
    rmSync(docsApiDir, { recursive: true, force: true });
  } catch (e) {
    console.warn('Failed to clean output directory, continuing...', e);
  }
}

console.log('Building documentation...');

const result = spawnSync('pnpm', ['typedoc'], {
  stdio: 'inherit',
  shell: true,
  cwd: resolve(__dirname, '..')
});

if (result.error) {
  console.error('Error executing typedoc:', result.error);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`typedoc failed with exit code ${result.status}`);
  process.exit(result.status ?? 1);
}

console.log('Documentation generated successfully at docs/api');
