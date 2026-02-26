use crate::keymap::parser::{parse_keymap, LayerData};

const DEFAULT_KEYMAP_PATH: &str =
    "/Users/milesroxas/qmk_firmware/keyboards/handwired/macro_eleven/keymaps/apps/keymap.c";

#[tauri::command]
pub fn get_layer_data(path: Option<String>) -> Result<Vec<LayerData>, String> {
    let keymap_path = path.unwrap_or_else(|| DEFAULT_KEYMAP_PATH.to_string());
    let source = std::fs::read_to_string(&keymap_path)
        .map_err(|e| format!("Failed to read keymap: {}", e))?;
    Ok(parse_keymap(&source))
}
