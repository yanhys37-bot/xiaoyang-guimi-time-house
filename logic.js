(function (root) {
  'use strict';

  const START_MS = Date.parse('2026-10-09T08:15:00+08:00');

  function timeParts(now = Date.now()) {
    const total = Math.max(0, Math.floor((now - START_MS) / 1000));
    return {
      days: Math.floor(total / 86400),
      hours: String(Math.floor((total % 86400) / 3600)).padStart(2, '0'),
      minutes: String(Math.floor((total % 3600) / 60)).padStart(2, '0'),
      seconds: String(total % 60).padStart(2, '0'),
    };
  }

  function passwordFeedback(value, wrongAttempt, content) {
    if (!value) return content.empty_error;
    if (value.length < 6) {
      return content.short_error_template.replace('{remaining}', String(6 - value.length));
    }
    return content.wrong_by_attempt[Math.min(Math.max(wrongAttempt - 1, 0), content.wrong_by_attempt.length - 1)];
  }

  function chooseDifferentIndex(length, previousIndex = -1, random = Math.random) {
    if (length <= 0) return -1;
    if (length === 1) return 0;
    if (previousIndex < 0 || previousIndex >= length) return Math.min(length - 1, Math.floor(random() * length));
    const slot = Math.min(length - 2, Math.floor(random() * (length - 1)));
    return slot >= previousIndex ? slot + 1 : slot;
  }

  const api = { START_MS, timeParts, passwordFeedback, chooseDifferentIndex };
  root.TimeHouseLogic = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
