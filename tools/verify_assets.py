"""校验正式图片、相对路径与文案数据；无需第三方依赖。
运行: python tools/verify_assets.py (从项目根目录)
"""
from pathlib import Path
import hashlib, json, sys
root = Path(__file__).resolve().parent.parent
manifest = json.loads((root/'docs'/'ASSET_MANIFEST.json').read_text(encoding='utf-8'))
errors=[]
for item in manifest['assets']:
    rel=item['path'].removeprefix('./')
    path=root/rel
    if not path.is_file():
        errors.append(f'MISSING: {rel}')
        continue
    if hashlib.sha256(path.read_bytes()).hexdigest()!=item['sha256']:
        errors.append(f'HASH MISMATCH: {rel}')
    if path.stat().st_size != item['bytes']:
        errors.append(f'SIZE MISMATCH: {rel}')
for f in (root/'content').glob('*.json'):
    try: json.loads(f.read_text(encoding='utf-8'))
    except Exception as exc: errors.append(f'INVALID JSON {f.name}: {exc}')
ft=json.loads((root/'content'/'P4_FORTUNE_CONTENT.json').read_text(encoding='utf-8'))
if len(ft['fortune_items'])!=10:
    errors.append('FORTUNE COUNT !=10')
print('Assets verified:',len(manifest['assets']))
print('Fortune items:',len(ft['fortune_items']))
if errors:
    print('\n'.join(errors));sys.exit(1)
print('All passed.')
