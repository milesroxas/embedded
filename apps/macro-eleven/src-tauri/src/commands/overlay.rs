use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindowBuilder};

const OVERLAY_LABEL: &str = "macro11-overlay";
// Sized to fit: header (~60px) + separator (1px) + padding (20*2) + grid (4*40 + 3*4 = 172w, 3*38 + 2*4 = 122h)
const OVERLAY_WIDTH: f64 = 260.0;
const OVERLAY_HEIGHT: f64 = 270.0;

/// Opens the compact overlay window. If already open, focuses it.
#[tauri::command]
pub async fn open_overlay_window(app: AppHandle) -> Result<(), String> {
    if let Some(window) = app.get_webview_window(OVERLAY_LABEL) {
        let _ = window.set_focus();
        return Ok(());
    }

    let url = WebviewUrl::App("index.html".into());
    let init_script = "window.location.hash = '#/overlay';";

    WebviewWindowBuilder::new(&app, OVERLAY_LABEL, url)
        .title("Macro Eleven — Overlay")
        .inner_size(OVERLAY_WIDTH, OVERLAY_HEIGHT)
        .resizable(true)
        .min_inner_size(240.0, 260.0)
        .decorations(true)
        .always_on_top(true)
        .initialization_script(init_script)
        .build()
        .map_err(|e| e.to_string())?;

    Ok(())
}
