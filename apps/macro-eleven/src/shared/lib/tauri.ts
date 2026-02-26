import { invoke } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import type { LayerData } from "../../entities/layer";
import type { KeyEvent, PotEvent } from "../../entities/key";
import type { DeviceStatusEvent } from "../../entities/device";

export async function detectDevice(): Promise<boolean> {
  return invoke<boolean>("detect_device_cmd");
}

export async function connectDevice(): Promise<boolean> {
  return invoke<boolean>("connect_device");
}

export async function disconnectDevice(): Promise<void> {
  return invoke<void>("disconnect_device");
}

export async function setTestMode(enable: boolean): Promise<void> {
  return invoke<void>("set_test_mode", { enable });
}

export async function getLayerData(path?: string): Promise<LayerData[]> {
  return invoke<LayerData[]>("get_layer_data", { path: path ?? null });
}

export function onKeyEvent(
  callback: (event: KeyEvent) => void
): Promise<UnlistenFn> {
  return listen<KeyEvent>("macro11:key-event", (e) => callback(e.payload));
}

export function onPotValue(
  callback: (event: PotEvent) => void
): Promise<UnlistenFn> {
  return listen<PotEvent>("macro11:pot-value", (e) => callback(e.payload));
}

export function onDeviceStatus(
  callback: (event: DeviceStatusEvent) => void
): Promise<UnlistenFn> {
  return listen<DeviceStatusEvent>("macro11:device-status", (e) =>
    callback(e.payload)
  );
}
