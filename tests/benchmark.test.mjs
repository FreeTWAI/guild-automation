import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {escapeHtml, renderWorkspace} from '../scripts/build.mjs';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('Performance benchmark: renderWorkspace is fast', () => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
        renderWorkspace(workspace);
    }
    const end = performance.now();
    assert.ok(end - start < 1000, `renderWorkspace took too long: ${end - start}ms`);
});

test('Performance benchmark: escapeHtml handles large strings efficiently', () => {
    const str = '<div class="test">Hello & welcome\'s "world"</div>'.repeat(100);
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
        escapeHtml(str);
    }
    const end = performance.now();
    assert.ok(end - start < 500, `escapeHtml took too long: ${end - start}ms`);
});
