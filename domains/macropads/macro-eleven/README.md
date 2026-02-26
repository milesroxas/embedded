# Macro Eleven

11-key macropad on Raspberry Pi Pico (RP2040) with QMK. App launcher and per-app shortcuts for macOS.

## Quick Start

```bash
./build.sh apps         # Build apps keymap
./build.sh apps flash   # Build and flash (hold top-left key 2s first to enter bootloader)
```

## Flashing

- **Preferred:** Hold the top-left key for 2 seconds to enter bootloader, then run `./build.sh apps flash`
- **Alternative:** Hold BOOTSEL when plugging in USB, then drag `handwired_macro_eleven_apps.uf2` to RPI-RP2
- **Watch mode:** Run `./watch-and-flash.sh` — it detects bootloader and prompts for keymap

## Keymaps

| Keymap | Use |
|--------|-----|
| `apps` | App launcher + per-app shortcuts (Chrome, Figma, VSCode, etc.) |
| `via` | VIA-compatible for GUI remapping |
| `default` | Minimal test keymap |

## Documentation

See [docs/macro-eleven.md](docs/macro-eleven.md) for hardware details, configuration, and keymap customization.
