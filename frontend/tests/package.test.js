import test from 'node:test';
import assert from 'node:assert/strict';
import packageJson from '../package.json' with { type: 'json' };

test('frontend package has required build script', () => {
  assert.equal(packageJson.scripts.build, 'vite build');
  assert.ok(packageJson.dependencies.react);
});
