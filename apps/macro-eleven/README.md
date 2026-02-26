# Macro Eleven

Desktop companion app for the Macro Eleven macropad. Configures layer mappings and tests inputs (key presses + potentiometer) via Raw HID.

## Features

- **Key Tester** — Live key press detection with visual feedback
- **Layer Viewer** — Browse key assignments per layer (parsed from QMK keymap.c)
- **Pot Monitor** — Real-time potentiometer ADC value (0–1023)
- **Overlay** — Compact always-on-top window for quick reference

## Tech Stack

- React 19 + TypeScript + Vite
- Tauri v2 (Rust)
- Raw HID via `hidapi` (32-byte reports, usage page `0xFF60`)

## Requirements

- Node.js 18+
- Rust (for Tauri)
- Macro Eleven macropad connected via USB (VID `0x4653`, PID `0x0002`)

## Commands

```bash
pnpm install
pnpm tauri dev     # Dev mode (frontend HMR + Rust rebuild)
pnpm tauri build   # Production build
```

## Hardware

- **MCU:** RP2040
- **Matrix:** 3×4, 11 keys (position [0,3] empty)
- **Potentiometer:** 10-bit ADC on GP26
- **Layers:** 11 (0 = App Selection, 1–10 = app shortcuts)
