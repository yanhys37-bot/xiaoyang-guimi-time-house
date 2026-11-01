const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = process.env.TIME_HOUSE_URL || 'http://127.0.0.1:4174/';
const PREVIEW = path.join(ROOT, 'preview');
const PORT = 9224;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

async function waitJson(url, timeout = 10000) {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    try { const response = await fetch(url); if (response.ok) return response.json(); } catch { /* Browser startup. */ }
    await wait(150);
  }
  throw new Error(`Browser did not start at ${url}`);
}

class Cdp {
  constructor(url) { this.id = 0; this.pending = new Map(); this.events = []; this.socket = new WebSocket(url); }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      if (!message.id) { this.events.push(message); return; }
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
  close() { this.socket.close(); }
}

async function evaluate(client, expression) {
  const response = await client.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text || 'Browser expression failed');
  return response.result.value;
}

async function shot(client, name) {
  const result = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
  fs.writeFileSync(path.join(PREVIEW, name), Buffer.from(result.data, 'base64'));
}

async function size(client, width, height) {
  await client.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: true, screenWidth: width, screenHeight: height });
  await wait(100);
}

async function active(client) { return evaluate(client, `document.querySelector('.view.is-current')?.id`); }

async function main() {
  fs.mkdirSync(PREVIEW, { recursive: true });
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'time-house-edge-'));
  const browser = spawn(EDGE, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', '--disable-default-apps', '--disable-extensions', 'about:blank'], { windowsHide: true, stdio: 'ignore' });
  let client;
  try {
    const targets = await waitJson(`http://127.0.0.1:${PORT}/json/list`);
    const page = targets.find((target) => target.type === 'page');
    assert(page, 'No browser page');
    client = new Cdp(page.webSocketDebuggerUrl);
    await client.open();
    await Promise.all(['Page.enable', 'Runtime.enable', 'Log.enable', 'Network.enable'].map((method) => client.send(method)));
    await size(client, 390, 844);
    await client.send('Page.navigate', { url: URL });
    await wait(700);
    assert(await active(client) === 'p1_password', 'P1 did not open');
    await shot(client, 'p1-390x844.png');
    for (const [width, height] of [[360, 640], [375, 667]]) {
      await size(client, width, height);
      const metrics = await evaluate(client, `(() => { const input = document.querySelector('#password-input').getBoundingClientRect(); const button = document.querySelector('#password-form button').getBoundingClientRect(); return { scrollWidth: document.documentElement.scrollWidth, input: { left: input.left, right: input.right, top: input.top, bottom: input.bottom }, button: { left: button.left, right: button.right, top: button.top, bottom: button.bottom }, scrollHeight: document.documentElement.scrollHeight }; })()`);
      assert(metrics.scrollWidth <= width + 1, `P1 horizontal overflow at ${width}x${height}`);
      assert(metrics.input.left >= 0 && metrics.input.right <= width, `P1 input clipped at ${width}x${height}`);
      assert(metrics.button.left >= 0 && metrics.button.right <= width, `P1 button clipped at ${width}x${height}`);
      await shot(client, `p1-${width}x${height}.png`);
      console.log(`P1 ${width}x${height}: input and button visible, scroll height ${metrics.scrollHeight}px`);
    }
    await size(client, 390, 500);
    await evaluate(client, `document.querySelector('#password-input').focus()`);
    const typing = await evaluate(client, `(() => { const box = document.querySelector('#password-form').getBoundingClientRect(); return { active: document.activeElement.id, top: box.top, bottom: box.bottom, height: innerHeight }; })()`);
    assert(typing.active === 'password-input' && typing.top >= 0 && typing.bottom <= typing.height, 'P1 typing controls outside compact viewport');
    await shot(client, 'p1-typing-390x500.png');
    await evaluate(client, `document.querySelector('#password-input').blur()`);
    await size(client, 390, 844);

    await evaluate(client, `document.querySelector('#password-form').requestSubmit()`);
    assert(await evaluate(client, `document.querySelector('#password-feedback').textContent`) === '还没输入暗号呢，喵～', 'Empty password response wrong');
    await evaluate(client, `document.querySelector('#password-input').value='123'; document.querySelector('#password-form').requestSubmit()`);
    assert(await evaluate(client, `document.querySelector('#password-feedback').textContent`) === '咦？暗号还差3位哦。', 'Short password response wrong');
    for (const expected of ['喵？这串暗号好像不太对哦。', '团子歪了歪脑袋：再想想嘛～', '团子表示：不对不对，再试一次！']) {
      await evaluate(client, `document.querySelector('#password-input').value='000000'; document.querySelector('#password-form').requestSubmit()`);
      assert(await evaluate(client, `document.querySelector('#password-feedback').textContent`) === expected, `Wrong password response wrong: ${expected}`);
    }
    await evaluate(client, `document.querySelector('#p1-cat').click()`);
    assert((await evaluate(client, `document.querySelector('#p1-cat-bubble').textContent`)).length > 0, 'P1 cat bubble missing');
    await evaluate(client, `document.querySelector('#password-input').value='261009'; document.querySelector('#password-form').requestSubmit()`);
    await wait(1300);
    assert(await active(client) === 'p2_loading', 'P2 did not open');
    await shot(client, 'p2-390x844.png');
    await wait(2150);
    assert(await active(client) === 'p3_home', 'P3 did not open after 2.4 s');
    await shot(client, 'p3-390x844.png');
    assert(Number(await evaluate(client, `document.querySelector('#timer-days').textContent`)) >= 0, 'Timer did not render');
    await evaluate(client, `document.querySelector('#character-xiaoyang').click()`);
    assert((await evaluate(client, `document.querySelector('#character-bubble').textContent`)).length > 0, 'P3 character bubble missing');

    await evaluate(client, `document.querySelector('[data-target="p4_fortune"]').click()`);
    await wait(280);
    assert(await active(client) === 'p4_fortune', 'Fortune page did not open');
    await shot(client, 'p4-fortune-390x844.png');
    await evaluate(client, `document.querySelector('#fortune-draw').click()`);
    await wait(1100);
    const firstId = await evaluate(client, `document.querySelector('#fortune-name').textContent`);
    assert(firstId && !(await evaluate(client, `document.querySelector('#fortune-result').hidden`)), 'Fortune result missing');
    await shot(client, 'p4-result-390x844.png');
    await evaluate(client, `document.querySelector('#fortune-draw').click()`);
    await wait(1100);
    assert((await evaluate(client, `document.querySelector('#fortune-name').textContent`)) !== firstId, 'Fortune repeated immediately');
    await evaluate(client, `document.querySelector('#p4_fortune [data-back]').click()`);
    assert(await active(client) === 'p3_home', 'Fortune return failed');

    for (const [target, expected] of [['p4_capsule_placeholder', '时间胶囊'], ['p4_emergency_placeholder', '应急按钮']]) {
      await evaluate(client, `document.querySelector('[data-target="${target}"]').click()`);
      await wait(280);
      assert(await active(client) === target, `${target} did not open`);
      assert(await evaluate(client, `document.querySelector('#${target} h1').textContent`) === expected, `${target} heading wrong`);
      await shot(client, `${target}-390x844.png`);
      await evaluate(client, `document.querySelector('#${target} [data-back]').click()`);
      assert(await active(client) === 'p3_home', `${target} return failed`);
    }

    for (const [width, height] of [[360,640], [375,667], [412,915], [1280,800]]) {
      await size(client, width, height);
      const metrics = await evaluate(client, `({width:innerWidth,scrollWidth:document.documentElement.scrollWidth, viewScroll:document.querySelector('#p3_home').scrollHeight, controls:[...document.querySelectorAll('#p3_home .charm')].map(el=>{const r=el.getBoundingClientRect();return {w:r.width,h:r.height}})})`);
      assert(metrics.scrollWidth <= width + 1, `Horizontal overflow at ${width}x${height}`);
      assert(metrics.controls.every((control) => control.w >= 44 && control.h >= 44), `Small touch target at ${width}x${height}`);
      if (width === 360) await shot(client, 'p3-360x640.png');
      if (width === 412) await shot(client, 'p3-412x915.png');
      console.log(`${width}x${height}: no horizontal overflow; touch targets >=44px; home scroll height ${metrics.viewScroll}px`);
    }

    const errors = client.events.filter((event) => event.method === 'Runtime.exceptionThrown' || event.method === 'Network.loadingFailed' || (event.method === 'Log.entryAdded' && event.params?.entry?.level === 'error'));
    assert(errors.length === 0, `Browser reported ${errors.length} error event(s): ${JSON.stringify(errors.slice(0,2))}`);
    console.log('Browser flow passed: P1 → P2 → P3 → all three P4 views → P3; 0 browser errors.');
  } finally {
    client?.close();
    browser.kill();
  }
}

main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
