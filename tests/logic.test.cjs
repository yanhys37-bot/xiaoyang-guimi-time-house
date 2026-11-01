const test = require('node:test');
const assert = require('node:assert/strict');

const { timeParts, passwordFeedback, chooseDifferentIndex } = require('../logic.js');
const p1 = require('../content/P1_CONTENT.json');

test('the recorded start instant is zero regardless of viewer timezone', () => {
  const start = Date.parse('2026-10-09T08:15:00+08:00');
  assert.deepEqual(timeParts(start), { days: 0, hours: '00', minutes: '00', seconds: '00' });
  assert.deepEqual(timeParts(start + 86401000), { days: 1, hours: '00', minutes: '00', seconds: '01' });
});

test('password feedback follows the supplied wording and attempt count', () => {
  assert.equal(passwordFeedback('', 0, p1), p1.empty_error);
  assert.equal(passwordFeedback('123', 0, p1), '咦？暗号还差3位哦。');
  assert.equal(passwordFeedback('123456', 1, p1), p1.wrong_by_attempt[0]);
  assert.equal(passwordFeedback('123456', 8, p1), p1.wrong_by_attempt[2]);
});

test('redraw excludes the previous fortune and preserves uniform index mapping', () => {
  assert.equal(chooseDifferentIndex(10, -1, () => 0), 0);
  assert.equal(chooseDifferentIndex(10, 4, () => 0), 0);
  assert.equal(chooseDifferentIndex(10, 4, () => 4 / 9), 5);
  assert.equal(chooseDifferentIndex(10, 4, () => 0.999999), 9);
});
