---
name: Alvaro Training Command
description: Mobile-first training tracker with a tactical, high-focus athletic interface.
colors:
  surface: "#0f1419"
  surface-dim: "#0a0e12"
  surface-bright: "#1c242d"
  surface-container-lowest: "#080b0e"
  surface-container-low: "#121820"
  surface-container: "#161d26"
  surface-container-high: "#1d2630"
  surface-container-highest: "#24303c"
  on-surface: "#edf4fb"
  on-surface-variant: "#94a6b8"
  inverse-surface: "#edf4fb"
  inverse-on-surface: "#182029"
  outline: "#314050"
  outline-variant: "#22303d"
  surface-tint: "#c7ff3d"
  primary: "#c7ff3d"
  on-primary: "#0c1115"
  primary-container: "#dfff7a"
  on-primary-container: "#1a2300"
  inverse-primary: "#5b7700"
  secondary: "#59d8ff"
  on-secondary: "#082430"
  secondary-container: "#123a4a"
  on-secondary-container: "#bcefff"
  tertiary: "#ff7a59"
  on-tertiary: "#2e1209"
  tertiary-container: "#4a2318"
  on-tertiary-container: "#ffd7cc"
  error: "#ff8f7a"
  on-error: "#31110b"
  error-container: "#4c1f18"
  on-error-container: "#ffd9d1"
  background: "#0b1015"
  on-background: "#edf4fb"
  surface-variant: "#24303c"
typography:
  display:
    fontFamily: Barlow Condensed
    fontSize: 52px
    fontWeight: "700"
    lineHeight: 52px
    letterSpacing: 0.04em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 36px
    letterSpacing: 0.03em
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 28px
    letterSpacing: 0.03em
  title-md:
    fontFamily: Barlow
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 24px
  body-lg:
    fontFamily: Barlow
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: Barlow
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-md:
    fontFamily: Barlow Condensed
    fontSize: 13px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Barlow Condensed
    fontSize: 11px
    fontWeight: "600"
    lineHeight: 14px
    letterSpacing: 0.1em
rounded:
  sm: 0.375rem
  DEFAULT: 0.75rem
  md: 1rem
  lg: 1.25rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  touch-height: 52px
  mobile-gutter: 16px
components:
  app-shell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  card-session:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  card-session-active:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: "{spacing.touch-height}"
    padding: 0 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-container}"
  button-secondary:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: "{spacing.touch-height}"
    padding: 0 20px
  input-field:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    height: "{spacing.touch-height}"
    padding: 0 16px
  list-item-exercise:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  list-item-exercise-active:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  badge-complete:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px
  badge-pending:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px
---

## Overview

This design system is built for a training session, not a generic dashboard. The interface should feel like a compact field console: focused, fast, and physically usable on a phone mid-workout. The mood is athletic and technical rather than luxurious.

The visual identity combines a dark control-room base with bright lime action highlights and cool cyan data accents. It should feel energetic without becoming noisy. The UI must privilege pace, scanability, and tactile confidence over decorative flourish.

## Colors

The color system is anchored in deep charcoal surfaces so that actions and status changes stand out immediately.

- **Primary lime** is reserved for high-importance actions, completed states, and progress emphasis.
- **Secondary cyan** is used for metrics, informative highlights, and subtle data accents.
- **Tertiary orange** is used sparingly for strain, caution, or notable session callouts.
- **Surface layers** should create depth through tonal shifts rather than heavy borders alone.

Backgrounds should remain dark throughout the app. Large fields of pure black are discouraged; use layered blue-charcoal surfaces to keep the interface alive and legible.

## Typography

The typography uses **Barlow Condensed** for headings and labels to create an athletic, locker-room scoreboard tone. **Barlow** is used for body content and inputs because it remains readable while moving, tapping, or glancing quickly during a workout.

- Headings should feel compact, uppercase-friendly, and directional.
- Labels should use wider tracking to reinforce the tactical system feel.
- Body text should stay straightforward and low-drama.

Avoid soft editorial styling. Typography should feel functional and performance-oriented.

## Layout

The layout is mobile-first and optimized for one-thumb interaction.

- Use a consistent 8px spacing rhythm.
- Maintain generous vertical separation between stacked touch targets.
- Primary content should fit within a narrow, centered session column.
- Session controls should bias toward full-width actions on mobile.

The exercise list should feel like an operational queue: each item readable in one glance, expandable without disorienting the user, and dense enough to reduce unnecessary scrolling.

## Elevation & Depth

Depth should come from tonal steps, glow accents, and restrained shadows.

- Standard surfaces use adjacent charcoal layers.
- Active surfaces may add a thin lime outline or soft inner glow.
- Buttons should feel solid and pressable, not glassy or translucent.
- Inputs should appear inset into the session surface.

Avoid frosted-glass aesthetics, pastel shadows, or effects that reduce clarity on small screens.

## Shapes

The shape language should feel sturdy and tactile.

- Main cards and rows use medium to large rounding.
- Inputs and buttons should have enough radius to feel touch-friendly, but not bubble-like.
- Status badges should be fully rounded to read as quick metadata tokens.

Corners should support a modern athletic feel: robust, controlled, and slightly softened.

## Components

### Session Shell

The main shell acts as a training console. It should use dark layered surfaces, a subtle technical grid or texture only when it does not interfere with readability, and strong spacing around the active session area.

### Exercise Rows

Exercise rows are compact, information-dense, and highly scannable. The inactive state should remain calm; the active state should become brighter and more assertive through background lift and accent edging rather than huge size changes.

### Buttons

Primary buttons should be unmistakable and energetic, using the lime accent. Secondary buttons should remain dark and integrated with the surface system. Full-width actions are preferred for the main session flow on mobile.

### Inputs

Inputs should be large enough for rapid touch editing, especially the weight field. They must stand out from the row background through tonal contrast, not through white fills.

### Status

Completed states should feel rewarding and obvious. Pending states should stay quiet and neutral. Any future warning or discomfort states should draw from the tertiary orange family rather than introducing new arbitrary colors.

## Do's and Don'ts

- Do make the current action obvious.
- Do keep mobile touch targets large and vertically separated.
- Do use lime sparingly so it stays meaningful.
- Do favor compact, tactical summaries over verbose UI blocks.
- Don't turn every surface into a high-contrast bordered box.
- Don't use soft pastel tones or luxury glassmorphism.
- Don't overload the workout flow with decorative gradients inside the core session controls.
