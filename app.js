(() => {
  'use strict';

  const data = window.TimeHouseData;
  const logic = window.TimeHouseLogic;
  if (!data || !logic) throw new Error('时间小屋内容未能加载');

  const views = [...document.querySelectorAll('.view')];
  const p1 = document.getElementById('p1_password');
  const form = document.getElementById('password-form');
  const input = document.getElementById('password-input');
  const feedback = document.getElementById('password-feedback');
  const submit = document.getElementById('p1-submit');
  const p1Cat = document.getElementById('p1-cat');
  const p1CatBubble = document.getElementById('p1-cat-bubble');
  const p3Bubble = document.getElementById('character-bubble');
  const loadImage = document.getElementById('loading-character');
  const loadTitle = document.getElementById('loading-title');
  const progress = document.querySelector('.progress-shell');
  const progressFill = document.getElementById('progress-fill');
  const progressPercent = document.getElementById('progress-percent');
  const fortuneMachine = document.getElementById('fortune-machine');
  const fortuneDraw = document.getElementById('fortune-draw');
  const fortuneResult = document.getElementById('fortune-result');

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let currentView = 'p1_password';
  let passwordLocked = false;
  let wrongAttempts = 0;
  let timerInterval = null;
  let loadingRaf = null;
  let loadingTimeout = null;
  let lastFortuneIndex = -1;
  let bubbleTimeout = null;
  let lastP1Line = -1;
  let lastXiaoyangLine = -1;
  let lastTuanziLine = -1;

  const preload = [
    ...data.P2_CONTENT.frames,
    './assets/p3/P3_BG_01.webp',
    './assets/p3/P3_CH_01.png',
    './assets/p3/P3_CH_02.png',
    './assets/p3/P3_CAT_01.png',
  ];
  for (const source of preload) {
    const image = new Image();
    image.src = source;
  }

  function showView(id) {
    if (timerInterval !== null && id !== 'p3_home') {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    currentView = id;
    for (const view of views) {
      const active = view.id === id;
      view.hidden = !active;
      view.classList.toggle('is-current', active);
      view.setAttribute('aria-hidden', String(!active));
      if (active) view.scrollTop = 0;
    }
    if (id === 'p3_home') {
      updateTimer();
      if (timerInterval === null) timerInterval = setInterval(updateTimer, 1000);
    }
    const heading = document.querySelector(`#${id} h1, #${id} h2`);
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  function updateTimer() {
    const parts = logic.timeParts(Date.now());
    document.getElementById('timer-days').textContent = parts.days;
    document.getElementById('timer-hours').textContent = parts.hours;
    document.getElementById('timer-minutes').textContent = parts.minutes;
    document.getElementById('timer-seconds').textContent = parts.seconds;
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && currentView === 'p3_home') updateTimer();
  });

  function updateVisualViewport() {
    const vv = window.visualViewport;
    const bottom = vv ? vv.offsetTop + vv.height : window.innerHeight;
    document.documentElement.style.setProperty('--visual-bottom', `${Math.round(bottom)}px`);
  }

  updateVisualViewport();
  window.visualViewport?.addEventListener('resize', updateVisualViewport);
  window.visualViewport?.addEventListener('scroll', updateVisualViewport);
  window.addEventListener('resize', updateVisualViewport);

  input.addEventListener('focus', () => {
    p1.classList.add('is-typing');
    updateVisualViewport();
  });
  input.addEventListener('blur', () => p1.classList.remove('is-typing'));
  input.addEventListener('input', () => {
    const digits = input.value.replace(/\D/g, '').slice(0, 6);
    if (input.value !== digits) input.value = digits;
    if (feedback.textContent.trim()) feedback.textContent = '\u00a0';
  });

  function bounceCat() {
    p1Cat.classList.remove('is-bouncing');
    void p1Cat.offsetWidth;
    p1Cat.classList.add('is-bouncing');
  }

  function showBubble(element, line, className = '') {
    clearTimeout(bubbleTimeout);
    element.textContent = line;
    element.hidden = false;
    element.className = `bubble ${className} is-visible`;
    bubbleTimeout = setTimeout(() => {
      element.classList.remove('is-visible');
      setTimeout(() => { element.hidden = true; }, 200);
    }, 3000);
  }

  p1Cat.addEventListener('click', () => {
    bounceCat();
    const lines = data.P1_CONTENT.cat_click_lines;
    lastP1Line = logic.chooseDifferentIndex(lines.length, lastP1Line);
    showBubble(p1CatBubble, lines[lastP1Line], 'p1-cat-bubble');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (passwordLocked) return;
    const value = input.value;
    if (value === data.SITE_CONFIG.password) {
      passwordLocked = true;
      input.blur();
      submit.disabled = true;
      feedback.textContent = data.P1_CONTENT.right_reply;
      p1.classList.add('door-opening');
      setTimeout(startLoading, reducedMotion.matches ? 100 : 850);
      return;
    }
    if (value.length === 6) wrongAttempts += 1;
    feedback.textContent = logic.passwordFeedback(value, wrongAttempts, data.P1_CONTENT);
    form.classList.remove('is-shaking');
    void form.offsetWidth;
    form.classList.add('is-shaking');
    bounceCat();
  });

  function startLoading() {
    showView('p2_loading');
    let lastFrame = -1;
    let lastMessage = -1;
    const start = performance.now();
    const { duration_ms: duration, frame_ms: frameMs, frames, messages } = data.P2_CONTENT;

    function tick(now) {
      const elapsed = Math.min(now - start, duration);
      const frame = Math.floor(elapsed / frameMs) % frames.length;
      if (frame !== lastFrame) {
        loadImage.src = frames[frame];
        lastFrame = frame;
      }
      const message = messages.reduce((index, item, i) => elapsed >= item.start_ms ? i : index, 0);
      if (message !== lastMessage) {
        loadTitle.textContent = messages[message].text;
        lastMessage = message;
      }
      const percent = Math.round(elapsed / duration * 100);
      progressFill.style.transform = `scaleX(${elapsed / duration})`;
      progress.setAttribute('aria-valuenow', String(percent));
      progressPercent.textContent = `${percent}%`;
      if (elapsed < duration) {
        loadingRaf = requestAnimationFrame(tick);
      } else {
        loadingRaf = null;
        showView('p3_home');
      }
    }

    loadingRaf = requestAnimationFrame(tick);
    loadingTimeout = setTimeout(() => {
      if (currentView !== 'p2_loading') return;
      if (loadingRaf !== null) cancelAnimationFrame(loadingRaf);
      loadingRaf = null;
      showView('p3_home');
    }, duration + 250);
  }

  function characterSpeech(type) {
    const lines = data.P3_CONTENT.dialogue[type];
    const previous = type === 'xiaoyang' ? lastXiaoyangLine : lastTuanziLine;
    const index = logic.chooseDifferentIndex(lines.length, previous);
    if (type === 'xiaoyang') lastXiaoyangLine = index;
    else lastTuanziLine = index;
    showBubble(p3Bubble, lines[index], `character-bubble from-${type}`);
  }

  document.getElementById('character-xiaoyang').addEventListener('click', () => characterSpeech('xiaoyang'));
  document.getElementById('character-tuanzi').addEventListener('click', () => characterSpeech('tuanzi'));

  document.querySelectorAll('[data-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      button.classList.add('is-activated');
      setTimeout(() => {
        button.classList.remove('is-activated');
        showView(target);
      }, reducedMotion.matches ? 20 : 240);
    });
  });

  document.querySelectorAll('[data-back]').forEach((button) => {
    button.addEventListener('click', () => showView('p3_home'));
  });

  fortuneDraw.addEventListener('click', () => {
    if (fortuneDraw.disabled) return;
    fortuneDraw.disabled = true;
    fortuneMachine.classList.remove('is-shaking');
    void fortuneMachine.offsetWidth;
    fortuneMachine.classList.add('is-shaking');
    setTimeout(() => {
      const items = data.P4_FORTUNE_CONTENT.fortune_items;
      lastFortuneIndex = logic.chooseDifferentIndex(items.length, lastFortuneIndex);
      const item = items[lastFortuneIndex];
      document.getElementById('fortune-grade').textContent = item.grade;
      document.getElementById('fortune-tag').textContent = item.tag;
      document.getElementById('fortune-name').textContent = item.title;
      document.getElementById('fortune-description').textContent = item.description;
      document.getElementById('fortune-good').textContent = item.good;
      document.getElementById('fortune-avoid').textContent = item.avoid;
      fortuneResult.hidden = false;
      document.getElementById('fortune-intro').hidden = true;
      document.getElementById('p4_fortune').classList.add('has-result');
      fortuneDraw.textContent = data.P4_CONTENT.fortune.redraw_button;
      fortuneDraw.disabled = false;
      fortuneResult.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest' });
    }, reducedMotion.matches ? 80 : 680);
  });
})();
