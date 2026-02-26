use hidapi::HidApi;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::thread;
use std::time::Duration;
use tauri::{AppHandle, Emitter};

use super::protocol::{build_state_request, build_test_mode_command, parse_state_response, RAW_HID_REPORT_SIZE};

const VID: u16 = 0x4653;
const PID: u16 = 0x0002;
const USAGE_PAGE: u16 = 0xFF60;
const POLL_INTERVAL: Duration = Duration::from_millis(16); // ~60Hz
const RECONNECT_INTERVAL: Duration = Duration::from_secs(2);

use hidapi::HidDevice;
use std::sync::Mutex;

pub struct HidConnection {
    running: Arc<AtomicBool>,
    device: Arc<Mutex<Option<HidDevice>>>,
}

impl HidConnection {
    pub fn new() -> Self {
        Self {
            running: Arc::new(AtomicBool::new(false)),
            device: Arc::new(Mutex::new(None)),
        }
    }

    pub fn set_test_mode(&self, enable: bool) -> Result<(), String> {
        let device_lock = self.device.lock().map_err(|e| e.to_string())?;
        if let Some(ref dev) = *device_lock {
            let cmd = build_test_mode_command(enable);
            dev.write(&cmd).map_err(|e| e.to_string())?;
            Ok(())
        } else {
            Err("Device not connected".to_string())
        }
    }

    pub fn start(&self, app: AppHandle) {
        if self.running.load(Ordering::SeqCst) {
            return;
        }
        self.running.store(true, Ordering::SeqCst);
        let running = self.running.clone();
        let device = self.device.clone();

        thread::spawn(move || {
            Self::poll_loop(app, running, device);
        });
    }

    pub fn stop(&self) {
        self.running.store(false, Ordering::SeqCst);
    }

    pub fn is_running(&self) -> bool {
        self.running.load(Ordering::SeqCst)
    }

    fn poll_loop(app: AppHandle, running: Arc<AtomicBool>, shared_device: Arc<Mutex<Option<HidDevice>>>) {
        while running.load(Ordering::SeqCst) {
            // Try to connect
            let api = match HidApi::new() {
                Ok(api) => api,
                Err(_) => {
                    thread::sleep(RECONNECT_INTERVAL);
                    continue;
                }
            };

            let device_info_opt = api.device_list().find(|d| {
                d.vendor_id() == VID
                    && d.product_id() == PID
                    && d.usage_page() == USAGE_PAGE
            });

            let device_info = match device_info_opt {
                Some(info) => info,
                None => {
                    let _ = app.emit("macro11:device-status", serde_json::json!({ "connected": false }));
                    thread::sleep(RECONNECT_INTERVAL);
                    continue;
                }
            };

            let hid_device = match device_info.open_device(&api) {
                Ok(d) => d,
                Err(_) => {
                    let _ = app.emit("macro11:device-status", serde_json::json!({ "connected": false }));
                    thread::sleep(RECONNECT_INTERVAL);
                    continue;
                }
            };

            // Store device reference
            {
                let mut dev_lock = shared_device.lock().unwrap();
                *dev_lock = Some(hid_device);
            }

            let _ = app.emit("macro11:device-status", serde_json::json!({ "connected": true }));

            // Poll loop
            let request = build_state_request();
            while running.load(Ordering::SeqCst) {
                let write_result = {
                    let dev_lock = shared_device.lock().unwrap();
                    if let Some(ref dev) = *dev_lock {
                        dev.write(&request)
                    } else {
                        break;
                    }
                };

                if write_result.is_err() {
                    break;
                }

                let mut buf = [0u8; RAW_HID_REPORT_SIZE];
                let read_result = {
                    let dev_lock = shared_device.lock().unwrap();
                    if let Some(ref dev) = *dev_lock {
                        dev.read_timeout(&mut buf, 100)
                    } else {
                        break;
                    }
                };

                match read_result {
                    Ok(n) if n > 0 => {
                        if let Some(state) = parse_state_response(&buf) {
                            let _ = app.emit(
                                "macro11:key-event",
                                serde_json::json!({
                                    "keys": state.keys,
                                    "layer": state.layer
                                }),
                            );
                            let _ = app.emit(
                                "macro11:pot-value",
                                serde_json::json!({
                                    "value": state.pot_value,
                                    "layer": state.layer
                                }),
                            );
                        }
                    }
                    Ok(_) => {} // timeout, no data
                    Err(_) => break, // device disconnected
                }

                thread::sleep(POLL_INTERVAL);
            }

            // Device disconnected
            {
                let mut dev_lock = shared_device.lock().unwrap();
                *dev_lock = None;
            }
            let _ = app.emit("macro11:device-status", serde_json::json!({ "connected": false }));
            thread::sleep(RECONNECT_INTERVAL);
        }
    }
}

/// Check if the device is currently visible on USB.
pub fn detect_device() -> bool {
    let api = match HidApi::new() {
        Ok(api) => api,
        Err(_) => return false,
    };
    let found = api.device_list().any(|d| {
        d.vendor_id() == VID && d.product_id() == PID && d.usage_page() == USAGE_PAGE
    });
    found
}
