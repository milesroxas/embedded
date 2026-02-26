mod commands;
mod hid;
mod keymap;

use std::sync::Mutex;

use hid::connection::HidConnection;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(Mutex::new(HidConnection::new()))
        .invoke_handler(tauri::generate_handler![
            commands::device::detect_device_cmd,
            commands::device::connect_device,
            commands::device::disconnect_device,
            commands::device::set_test_mode,
            commands::layers::get_layer_data,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
