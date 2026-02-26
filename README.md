# Embedded Projects

Microcontroller and hardware projects workspace.

## Structure

```
embedded/
├── shared/                 # Reusable components (DDD: Shared Kernel)
│   ├── libs/               # Common libraries
│   │   ├── button-debounce/
│   │   ├── rotary-encoder/
│   │   ├── hid-keycodes/
│   │   ├── led-matrix/
│   │   └── key-matrix/
│   └── drivers/            # Hardware abstraction
│       ├── ws2812/
│       ├── oled-ssd1306/
│       └── usb-hid/
│
├── domains/                # Project domains (DDD: Bounded Contexts)
│   └── macropads/          # Macropad projects
│       ├── _template/      # Project template
│       ├── four-pad/       # 9-key Pico macropad
│       └── macro-eleven/   # 11-key app launcher macropad
│
├── sandbox/                # Experiments and prototypes
├── sdks/                   # SDKs (pico-sdk, etc.)
├── tools/                  # Build scripts, utilities
└── docs/                   # Global documentation
```

## Setup

### QMK (for keyboard/macropad firmware)

```bash
# Install QMK CLI
brew install qmk/qmk/qmk

# Setup QMK
qmk setup
```

### Pico SDK (for non-QMK projects)

```bash
# Install toolchain
brew install cmake arm-none-eabi-gcc

# Clone SDK
git clone https://github.com/raspberrypi/pico-sdk.git ~/embedded/sdks/pico-sdk
cd ~/embedded/sdks/pico-sdk && git submodule update --init

# Set environment variable (add to ~/.zshrc)
export PICO_SDK_PATH=~/embedded/sdks/pico-sdk
```

### PlatformIO (alternative build system)

```bash
brew install platformio
```

## Creating a New Project

1. Copy `domains/<domain>/_template` to new project folder
2. Update README with project details
3. For QMK projects: firmware lives in the project; build script syncs to `~/qmk_firmware` before compiling

## Domains

| Domain | Description |
|--------|-------------|
| macropads | Custom keyboard macropads |

## External Dependencies

- **QMK Firmware**: Required for macropad builds. Clone to `~/qmk_firmware` (see [sdks/README.md](sdks/README.md)). The build scripts sync keyboard source from each project into the QMK tree before compiling.
