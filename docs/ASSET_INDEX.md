# 正式素材索引｜请在网页中引用这些路径

`assets/` 共有 **13 张正式运行素材**。全部已逐一存在性和图片格式检查。

| ID | 路径 | 尺寸 | 用途 |
|---|---|---|---|
| `P1_BG_01` | `./assets/p1/P1_BG_01.webp` | 941×1672 | P1奶油像素小屋底图，原效果图拆分后的无文字背景；941x1672 |
| `P1_CAT_01` | `./assets/p1/P1_CAT_01.png` | 405×248 | P1门顶看守团子猫，透明PNG，可点击 |
| `P1_DOOR_01` | `./assets/p1/P1_DOOR_01.png` | 351×413 | P1原图提取木门，透明PNG，动效由CSS完成 |
| `P2_CH_F01` | `./assets/p2/P2_CH_F01.png` | 768×768 | P2读书初始帧（原上传1000095819.png） |
| `P2_CH_F02` | `./assets/p2/P2_CH_F02.png` | 768×768 | P2猫眨眼帧（原上传1000095820.png） |
| `P2_CH_F03` | `./assets/p2/P2_CH_F03.png` | 768×768 | P2开心惊喜帧（原上传1000095822.png） |
| `P2_CH_F04` | `./assets/p2/P2_CH_F04.png` | 768×768 | P2眯眼微笑帧（原上传1000095821.png） |
| `P3_BG_01` | `./assets/p3/P3_BG_01.webp` | 941×1672 | P3奶油色猫系室内背景，留白作计时器与人物排布 |
| `P3_CAT_01` | `./assets/p3/P3_CAT_01.png` | 1254×1254 | P3中间独立团子猫，透明PNG |
| `P3_CH_01` | `./assets/p3/P3_CH_01.png` | 1254×1254 | P3左侧小杨，朝右坐姿，无团子，透明PNG |
| `P3_CH_02` | `./assets/p3/P3_CH_02.png` | 1254×1254 | P3右侧诡秘，朝左坐姿，透明PNG |
| `P4_DEV_01` | `./assets/p4/P4_DEV_01.png` | 1254×1254 | P4两开发中页面共用黄色施工帽小杨 + 团子透明PNG |
| `P4_FORTUNE_MACHINE_01` | `./assets/p4/P4_FORTUNE_MACHINE_01.png` | 1254×1254 | P4透明猫咪星光抽签机，整体可轻摇 |

## 外部参考（不是运行时素材）

- `references/P1_APPROVED_VISUAL_01.png`：整页艺术基准，含画死文字/输入框，不要直接作为背景。
- `references/P1_LAYER_ALIGNMENT_01.jpg`：三层实际叠加预览，门底有白缝要修。
- `references/P3_LAYOUT_ONLY_USER_SKETCH.jpg`：用户给的 P3 简化布局图，只参考区块顺序，禁止替代正式角色和背景。

`source_originals/` 是原图备份，无需在运行时加载。P2默认使用 assets/p2 的 768px 版本、source_originals/p2 是 1254px 原图。
