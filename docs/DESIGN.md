---
name: Haru Hanjang (하루한장)
verified: 2026-10-16
reference:
  name: Claude (Anthropic) — oh-my-design
  url: https://oh-my-design.kr/design-systems/claude
runtime_deps:
  icons: lucide-react
  fonts: [Pretendard, "Noto Serif KR"]
colors:
  primary: '#c96442'
  canvas: '#f5f4ed'
  surface: '#ffffff'
  foreground: '#141413'
  muted: '#5e5d59'
  surface-dark: '#30302e'
  hairline: '#f0eee6'
  warm-sand: '#e8e6dc'
typography:
  display:
    fontSize: 64px
    fontWeight: 500
    lineHeight: 1.1
    use: Date heading of the sheet (장)
  heading:
    fontSize: 52px
    fontWeight: 500
    lineHeight: 1.2
    use: Quote of the day (오늘의 한 줄), section headings
  body:
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.6
    use: To-do (할 일) items and body text
  control:
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
    use: Button and input text
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  card: 24px
  media: 32px
spacing:
  xs: 4
  sm: 8
  md: 12
  lg: 16
  xl: 24
  xxl: 32
  3xl: 48
components:
  slot-tab:
    type: tab
    backgroundColor: '#ffffff'
    textColor: '#141413'
    rounded: 12px
    padding: 8px 16px 8px 12px
    typography: 20px/400 Pretendard
    states: selected, hover, and pressed observed on the reference tabs
    use: Slot (칸) tab — 새벽 / 오전 / 오후 / 밤
  sheet-card:
    type: card
    backgroundColor: '#ffffff'
    border: '1px solid #f0eee6'
    rounded: 32px
    padding: 48px
    use: Today's sheet (오늘 장) — the single page of the day
  past-sheet-card:
    type: card
    backgroundColor: '#ffffff'
    border: '1px solid #f0eee6'
    rounded: 24px
    padding: 32px
    use: Past sheet (지난 장) when flipping back through the notebook
fonts:
  roles:
    ui: Pretendard
    display: Noto Serif KR
---

<!--
Conversion note (design-brandfit, 2026-10-16)
- Reference: Claude (Anthropic) — oh-my-design, https://oh-my-design.kr/design-systems/claude (verified 2026-07-13)
- Visual tokens (color values, type scale/weight/line-height, spacing, radius, elevation, component values) are kept from the reference unchanged.
- Meta, naming, rationale, and voice are rewritten from docs/VOICE.md and docs/PRODUCT.md.
- Removed: Brand Narrative, Personas (covered by VOICE.md / PRODUCT.md).
- Font families replaced for web availability and Korean coverage: Anthropic Sans → Pretendard, Anthropic Serif → Noto Serif KR. Scale, weight, and line-height unchanged.
- Icons: Lucide (lucide-react) added; the reference specifies no icon library.
- Colors: all values kept. The vivid terracotta accent is managed by a "rare by design" rule rather than changed.
- Voice samples are unvalidated planning copy for a new service.
- Known gaps (not filled, the reference has no evidence): mobile breakpoints, touch targets, empty/error/success states, motion values. Define them during userflow and build.
-->

# Design System — Haru Hanjang (하루한장)

## Overview

### Visual Theme & Atmosphere

Haru Hanjang (하루한장) is a to-do notebook that opens to a single sheet (장) for today, divided into four slots (칸) — 새벽, 오전, 오후, 밤. The interface is built from a restrained warm-neutral system rather than a generic blue software palette: a `#f5f4ed` parchment canvas, near-black `#141413` ink, white cards, and a pairing of a serif for display and a sans for everything else. Serif display text gives the sheet an editorial, hand-set cadence for the date and the quote of the day (오늘의 한 줄); the sans carries to-do items, tabs, and controls. A terracotta `#c96442` appears rarely, as a single accent.

Why this mood: the brand is a quiet, courteous butler's notebook — it lays out a fresh sheet each morning and tidies what is left at night. A warm paper canvas and soft ink make the screen feel like a page you want to write on rather than an app to manage. Flat white cards bounded by a hairline read as a sheet laid on a desk; the absence of decorative shadow keeps the page calm. The single accent is held back so that nothing on the page hurries the user — color appears only where one action matters.

**Key characteristics:**

- Warm paper canvas and near-black ink: `#f5f4ed` and `#141413`.
- White sheet cards bounded by the quiet `#f0eee6` hairline.
- Serif (Noto Serif KR) for the date and the quote of the day; sans (Pretendard) for to-do items and UI.
- Rounded slot tabs (12px), past-sheet cards (24px), and today's sheet (32px).
- A limited `#c96442` accent, rare by design.

### Primary tasks

- Open the app and see only today's sheet (오늘 한 장)
- Tap a slot and write a to-do right away (4칸 하루)
- Strike through a finished to-do, keeping it as a record (줄 긋기 완료)
- Send unfinished to-dos to the same slot on tomorrow's sheet (내일로 보내기)
- Read the quote of the day at the top of the sheet (오늘의 명언)
- Flip back through past sheets (지난 장 넘겨보기)

### Principles

1. **Courteous (정중한).** The page speaks politely and plainly, like a neighbor rather than a concierge. *UI implication:* labels are full, polite sentences in the "~해요" form; no confirm dialogs — act right away and quietly offer undo.
2. **Quiet (조용한).** Say little; leave the page empty like paper, but speak at the moments that matter. *UI implication:* whitespace and hairlines carry structure; the accent and any feedback appear only when one action or moment matters (a finished sheet, an error).
3. **Generous (너그러운).** Unfinished days are not judged. *UI implication:* no scores, streaks, percentages, or warning colors for leftover to-dos; unfinished items are simply moved to tomorrow's same slot.
4. **Tidy (가지런히).** After reading the page, the user should feel the day is arranged on one sheet. *UI implication:* struck-through items stay visible as a record, aligned in place rather than removed.

### Usage Boundaries

| Element | Use for | Never use for |
|---|---|---|
| primary (`#c96442`) | One primary action per screen (e.g. 내일로 보내기); today marker | Background fills, body text, decoration, warnings about unfinished to-dos |
| canvas (`#f5f4ed`) | Page background — the desk under the sheet | Card or sheet surfaces |
| surface (`#ffffff`) | Today's sheet and past-sheet cards | Page background |
| foreground (`#141413`) | Body text, to-do items, strike-through lines | Large fills |
| hairline (`#f0eee6`) | Sheet borders, ruled lines between slots | Text |
| Display serif (Noto Serif KR) | Quote of the day (오늘의 한 줄), date heading | Buttons, to-do items, body text |

## Colors

### Palette

- **Ink** (`#141413`): text, strike-through lines, borders, and dark surfaces — the pen on the page.
- **Desk Parchment** (`#f5f4ed`): page background; the desk the sheet lies on.
- **Sheet White** (`#ffffff`): today's sheet, past sheets, and the selected slot tab.
- **Pencil Gray** (`#5e5d59`): secondary text — dates, slot labels, empty-slot hints.
- **Night Ink** (`#30302e`): dark surface.
- **Ruled Line** (`#f0eee6`): hairline borders and ruled lines between slots.
- **Kraft Sand** (`#e8e6dc`): quiet secondary fills and rings.
- **Morning Terracotta** (`#c96442`): the single accent, rare by design. Not a complete action scale.

### Surface boundary

The reference also includes a blue-tinted featured card variant; it is not promoted to the palette and is unused here (see Components).

## Typography

### Font families

The reference families (Anthropic Sans, Anthropic Serif) are proprietary and do not cover Korean, so the families are replaced while the scale, weight, and line-height stay unchanged.

| Role | Reference family | Haru Hanjang family | Reason |
|---|---|---|---|
| UI / body | Anthropic Sans | **Pretendard** | Neutral geometric sans with excellent Hangul; variable; closest to the reference sans |
| Display | Anthropic Serif | **Noto Serif KR** | Editorial serif with full Hangul; keeps the hand-set cadence of the reference serif |

- UI stack: `Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`
- Display stack: `"Noto Serif KR", "Apple Myungjo", Georgia, serif`
- License: both are SIL Open Font License (OFL).
- No mono scale is used.

### Captured hierarchy

| Role | Family | Size | Weight | Line Height | Evidence boundary |
|---|---|---:|---:|---:|---|
| Date heading (h1) | Noto Serif KR | 64px | 500 | 70.4px | two public-route h1 occurrences |
| Quote of the day (h2) | Noto Serif KR | 52px | 500 | 62.4px | five public-route h2 occurrences |
| Section heading (h3) | Noto Serif KR | 36px | 500 | 46.8px | four public-route h3 occurrences |
| Body / to-do item | Pretendard | 20px | 400 | 32px | public overview/pricing text and list items |
| Control | Pretendard | 15px | 400 | 24px | observed buttons and inputs; preserve selector-specific geometry |
| Slot tab | Pretendard | 20px | 400 | 32px | overview and pricing tab controls |

Load Pretendard and Noto Serif KR as web fonts; do not let a system fallback stand in for them silently.

## Layout

### Captured spacing and shape observations

- The artifact clusters 4px, 8px, 12px, 16px, 24px, 32px, and 48px spacing values. This is an observed public-style inventory, not a declared global spacing scale.
- Recorded public radii include 6px, 8px, 12px, 16px, 24px, and 32px. The 12px slot tab, 24px past-sheet card, and 32px today's sheet have component use below.
- The supplied capture has no mobile viewport, container-width, or responsive-breakpoint measurement. Do not derive breakpoints or a universal grid from this packet.

### Responsive Behavior

No responsive breakpoint or mobile-surface evidence was supplied. The reference intentionally has no breakpoint, collapse, or touch-target token claims.

## Elevation & Depth

The standard sheet cards are flat white surfaces with `#f0eee6` borders and no computed shadow. One featured card variant in the reference (unused here) alone uses a cool translucent border and `rgba(98, 158, 218, 0.16) 0px 4px 20px 0px` shadow; the overview appearance control uses a one-pixel warm ring. These are selector-specific observations, not a general elevation scale.

## Motion & Easing

No duration, easing, reduced-motion, streaming, or page-transition value was captured. The only interaction evidence is tab selection/pressed state and tab-panel expansion; it establishes neither an animation curve nor a motion scale.

---

**Reference evidence (Claude, verified 2026-07-13):**
**Tier 1 sources:** https://www.anthropic.com/ (marketing); https://claude.com/product/overview (public product overview); https://claude.com/pricing (public pricing); supplied raw artifact `artifacts/reference-evidence/claude.json`.
**Tier 2 sources:** https://getdesign.md/claude (directory page; no canonical numeric values promoted); https://styles.refero.design/?q=Anthropic → https://styles.refero.design/style/d469cba4-c448-4a43-a033-883f8bfcdc42 (independent analysis; conflicts recorded in `.verification.md`).
**Context sources:** https://www.anthropic.com/company; https://www.anthropic.com/constitution; https://www.anthropic.com/news/claude-new-constitution.
**Conflicts unresolved:** none

## Components

### Slot navigation

**Slot Tab (칸) — selected**
- Background: `#ffffff`
- Text: `#141413`
- Radius: 12px
- Padding: 8px 16px 8px 12px
- Font: 20px / 400 / Pretendard
- Use: the selected slot among 새벽 / 오전 / 오후 / 밤.

**Slot Tab (칸) — unselected, pressed sample**
- Text: `#5d5c58`
- Radius: 12px
- Padding: 8px 16px 8px 12px
- Font: 20px / 400 / Pretendard
- Pressed: `surface-2::[data-omd-capture="6"]::state-pressed` records `rgba(255, 255, 255, 0.004)` background and `#5d5c58` text.
- Use: an unselected slot tab; this is the observed pressed state, not a universal hover or focus rule.

### Sheets

**Today's Sheet (오늘 장)**
- Background: `#ffffff`
- Text: `#141413`
- Border: 1px solid `#f0eee6`
- Radius: 32px
- Padding: 48px
- Font: 20px / 400 / Pretendard
- Use: the single sheet of the day holding the date, the quote of the day, and the four slots.

**Past Sheet (지난 장)**
- Background: `#ffffff`
- Text: `#141413`
- Border: 1px solid `#f0eee6`
- Radius: 24px
- Padding: 32px
- Font: 20px / 400 / Pretendard
- Use: a past sheet when flipping back through the notebook (지난 장 넘겨보기).

**Featured Card (unused — reference-specific)**
- Background: `#ffffff`
- Border: 1px solid `color(srgb 0.415686 0.607843 0.8 / 0.2)`
- Radius: 24px
- Padding: 32px
- Shadow: `rgba(98, 158, 218, 0.16) 0px 4px 20px 0px`
- Use: a featured pricing-card variant in the reference. Do not reproduce.

### Appearance control

**Appearance Toggle Tile (unused — reference-specific)**
- Background: `#e8e6dc` (computed as `color(srgb 0.909804 0.901961 0.862745)`)
- Text: `#4d4c48`
- Radius: 16px
- Shadow: `#e8e6dc 0px 0px 0px 0px, #d1cfc5 0px 0px 0px 1px`
- Font: 16px / 400 / Pretendard
- Use: an appearance toggle in the reference. No selected/disabled variant was captured. Do not reproduce until a feature needs it.

Only tab selection, tab pressed, and tab-panel expansion were observed as interactions. No generic modal, toast, menu, error, disabled, or hover system is inferred from the reference.

### States

The reference records only selected and pressed tab behavior. Visual treatments for empty, loading, error, success, and disabled states are not specified yet and should be defined during userflow and build. When they are, their copy follows VOICE.md:

| State | Copy (from VOICE.md) |
|---|---|
| Empty slot | 오후에 할 일을 적어 두세요. |
| First open | 오늘 장을 펼쳐 두었어요. 칸을 톡 눌러 적어 보세요. |
| Sheet finished | 오늘 장, 다 그었어요 ✨ 가지런히 남겨 둘게요. |
| Unfinished at night | 남은 일 2개는 내일 같은 칸에 옮겨 둘게요. |
| Error | 방금 적은 할 일을 저장하지 못했어요. 잠시 후 다시 적어 주세요. |

## Do's and Don'ts

### Do

- Keep the page as paper: warm canvas, white sheet, hairline borders, generous whitespace.
- Use the serif only for the date and the quote of the day; everything else in Pretendard.
- Use the terracotta accent for one primary action per screen at most.
- Keep struck-through to-dos visible in place as a record.

### Don't

- Don't add decorative shadows; the featured-card blue shadow is not for ordinary sheets.
- Don't color unfinished to-dos as warnings, or show scores, streaks, or percentages.
- Don't add confirm dialogs; act right away and offer undo.
- Don't invent error, toast, menu, disabled, or responsive variants without defining them first.

## Voice & Tone

Voice is defined in `docs/VOICE.md`: a kind butler's notebook — courteous, quiet, generous. Polite "~해요" form; short but complete sentences; no confirm questions.

| Context | Tone (example) |
|---|---|
| Onboarding / first screen | Courteous, minimal explanation ("오늘 장을 펼쳐 두었어요. 칸을 톡 눌러 적어 보세요.") |
| Empty state | Quietest; one suggesting sentence ("오후에 할 일을 적어 두세요.") |
| Success / sheet finished | Warmer, one emoji allowed ("오늘 장, 다 그었어요 ✨ 가지런히 남겨 둘게요.") |
| Morning first open | Brighter, one emoji and one exclamation allowed ("오늘 장이 준비됐어요 ☀️ 어제 넘긴 일 1개가 기다리고 있어요!") |
| Unfinished at night | Most generous; move, don't blame ("남은 일 2개는 내일 같은 칸에 옮겨 둘게요.") |
| Error | More courteous, less bright; what happened and what to do ("방금 적은 할 일을 저장하지 못했어요. 잠시 후 다시 적어 주세요.") |
| Push notification | Minimal, once a day ("새 장이 펼쳐졌어요 ☀️ 오늘의 한 줄도 바뀌었어요.") |

**Words to use:** 장 · 칸 · 적다 · 긋다 · 내일로 보내기 · 남겨 둘게요 · 할 일 · 오늘의 한 줄

**Forbidden phrases**
- Service-industry formality: 고객님, 주인님, ~드리겠습니다, ~하시겠습니까?
- Jargon: 태스크, 투두, 싱크, 리마인더
- Gamified motivation: 스트릭, 연속 기록, 🔥 N일째, 배지, 레벨, 달성률
- Pressure or fear: 꼭, 반드시, 놓치지 마세요, 사라져요, 지금 안 하면, 분발하세요, 힘내세요 💪
- Confirm questions: 정말 ~하시겠어요?, 저장할까요?
- Mechanical status: 완료 / 미완료, "2개 남음."

**Emoji:** only on morning open, a finished sheet, and notifications — at most one per message, from ☀️ ✨ 🌙. Never 💪 🔥 😢.

**CTA labels:** 내일로 보내기 · 지난 장 넘겨 보기

## Agent Prompt Guide

Build Haru Hanjang (하루한장) screens as a sheet of paper on a desk: a `#f5f4ed` canvas, near-black `#141413` ink, a white sheet card with a 32px radius (24px for past sheets) and a `#f0eee6` hairline, Pretendard for UI and Noto Serif KR only for the date and the quote of the day. Use `#c96442` for at most one primary action per screen. Icons come from `lucide-react`. Copy follows `docs/VOICE.md`.


---
Visual tokens kept from the reference: Claude (Anthropic) — https://oh-my-design.kr/design-systems/claude (verified 2026-07-13). Meta and voice rewritten from docs/VOICE.md (2026-10-16). Voice samples are unvalidated planning copy.
